// ==========================================
// DEMO SEED
// Builds the sample company (src/constants/demoCompany.js) that demo visitors
// explore. Only called by the demo reset (src/utils/demoReset.js), which
// empties the database first.
// ==========================================
const { createHash, randomUUID } = require('crypto');
const { hashPassword } = require('./password');
const { ensureDemoRole, DEMO_PERMISSIONS } = require('./defaultRolePermissions');
const { DEMO_SEED_EMAIL_DOMAIN } = require('../constants/demo');
const COMPANY = require('../constants/demoCompany');

const DAY_MS = 24 * 60 * 60 * 1000;
const IST_OFFSET_MINUTES = 330;

// Dates work like the attendance controller: a day is a UTC midnight, and
// date-only columns store that midnight.
const utcDay = (date) => new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
const addDays = (day, days) => new Date(day.getTime() + days * DAY_MS);
const dayKey = (day) => day.toISOString().slice(0, 10);
const isWeekend = (day) => day.getUTCDay() === 0 || day.getUTCDay() === 6;

// A clock time in India (IST), given in minutes after midnight, on `day`.
const atIst = (day, minutes) => new Date(day.getTime() + (minutes - IST_OFFSET_MINUTES) * 60 * 1000);
const parseIstTime = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const seedEmail = (key) => `${key}@${DEMO_SEED_EMAIL_DOMAIN}`;
const seededAccountsWhere = { isDemo: false, email: { endsWith: `@${DEMO_SEED_EMAIL_DOMAIN}` } };

// A number in [0, 1) that's always the same for the same key. Attendance is
// generated from it, so the seed and the regular top-up (which can run on
// another server instance, hours later) agree without storing a plan.
const stableRandom = (key) => createHash('sha256').update(key).digest().readUInt32BE(0) / 2 ** 32;

// One person's attendance on one working day: ~4% absent, ~6% late (after the
// 10:15 grace period, which the app marks as a half-day), the rest on time.
function planAttendance(email, day) {
  const key = `${email}|${dayKey(day)}`;
  const roll = stableRandom(`${key}|status`);

  if (roll < 0.04) return { status: 'absent' };

  const late = roll < 0.1;
  const checkIn = late
    ? 10 * 60 + 20 + Math.floor(stableRandom(`${key}|in`) * 70) // 10:20 to 11:29
    : 9 * 60 + 20 + Math.floor(stableRandom(`${key}|in`) * 55); // 9:20 to 10:14
  const checkOut = checkIn + 8 * 60 + 30 + Math.floor(stableRandom(`${key}|out`) * 90);
  const lunchStart = 13 * 60 + Math.floor(stableRandom(`${key}|lunch`) * 45);
  const lunchMinutes = 20 + Math.floor(stableRandom(`${key}|lunch-length`) * 21);

  return {
    status: late ? 'half-day' : 'present',
    checkInTime: atIst(day, checkIn),
    checkOutTime: atIst(day, checkOut),
    breakHistory: [
      { start: atIst(day, lunchStart).toISOString(), end: atIst(day, lunchStart + lunchMinutes).toISOString() }
    ],
    totalBreakMinutes: lunchMinutes
  };
}

// ==========================================
// ATTENDANCE TOP-UP
// Writes the sample company's attendance from `from` up to `now`: people
// check in once their check-in time has passed and check out once their
// check-out time has. Absences are written once the day is over. Skips
// weekends, holidays, approved leave and days before someone joined. Safe to
// run repeatedly; only adds what's missing.
// ==========================================
async function syncDemoAttendance(db, { from, now = new Date() }) {
  const today = utcDay(now);
  const start = utcDay(from);

  const employees = await db.employee.findMany({
    where: { user: seededAccountsWhere },
    select: { id: true, dateOfJoining: true, user: { select: { email: true } } }
  });
  if (employees.length === 0) return { created: 0, checkedOut: 0 };

  const employeeIds = employees.map((employee) => employee.id);

  const holidays = await db.holiday.findMany({
    where: { date: { gte: start, lte: today } },
    select: { date: true }
  });
  const leaves = await db.leave.findMany({
    where: {
      employeeId: { in: employeeIds },
      status: 'approved',
      fromDate: { lte: today },
      toDate: { gte: start }
    },
    select: { employeeId: true, fromDate: true, toDate: true }
  });
  const existingRows = await db.attendance.findMany({
    where: { employeeId: { in: employeeIds }, date: { gte: start, lte: today } },
    select: { id: true, employeeId: true, date: true, checkOutTime: true }
  });

  const holidayDays = new Set(holidays.map((holiday) => dayKey(holiday.date)));
  const existing = new Map(existingRows.map((row) => [`${row.employeeId}|${dayKey(row.date)}`, row]));
  const isOnLeave = (employeeId, day) => leaves.some(
    (leave) => leave.employeeId === employeeId && leave.fromDate <= day && leave.toDate >= day
  );

  const toCreate = [];
  const toCheckOut = [];

  for (let day = start; day <= today; day = addDays(day, 1)) {
    if (isWeekend(day) || holidayDays.has(dayKey(day))) continue;

    for (const employee of employees) {
      if (employee.dateOfJoining && employee.dateOfJoining > day) continue;
      if (isOnLeave(employee.id, day)) continue;

      const plan = planAttendance(employee.user.email, day);
      const row = existing.get(`${employee.id}|${dayKey(day)}`);

      if (plan.status === 'absent') {
        if (!row && day < today) {
          toCreate.push({ employeeId: employee.id, date: day, status: 'absent' });
        }
        continue;
      }

      if (plan.checkInTime > now) continue;

      const checkedOut = plan.checkOutTime <= now;
      const checkOutData = {
        checkOutTime: plan.checkOutTime,
        breakHistory: plan.breakHistory,
        totalBreakMinutes: plan.totalBreakMinutes
      };

      if (!row) {
        toCreate.push({
          employeeId: employee.id,
          date: day,
          status: plan.status,
          checkInTime: plan.checkInTime,
          ...(checkedOut && checkOutData)
        });
      } else if (checkedOut && !row.checkOutTime) {
        toCheckOut.push({ id: row.id, data: checkOutData });
      }
    }
  }

  if (toCreate.length > 0) {
    // skipDuplicates: two runs at once (e.g. two server instances) can't
    // create the same day twice.
    await db.attendance.createMany({ data: toCreate, skipDuplicates: true });
  }
  for (const { id, data } of toCheckOut) {
    await db.attendance.updateMany({ where: { id, checkOutTime: null }, data });
  }

  return { created: toCreate.length, checkedOut: toCheckOut.length };
}

// Moves to the next working day (or the previous one, for step = -1) unless
// `day` already is one.
function toWorkingDay(day, holidayDays, step = 1) {
  let current = day;
  while (isWeekend(current) || holidayDays.has(dayKey(current))) {
    current = addDays(current, step);
  }
  return current;
}

// The working day `offset` working days away from `today`. Offset 0 is today,
// or the next working day if today isn't one.
function workingDayFrom(today, offset, holidayDays) {
  const step = offset < 0 ? -1 : 1;
  let day = toWorkingDay(today, holidayDays);
  for (let remaining = Math.abs(offset); remaining > 0; remaining--) {
    day = toWorkingDay(addDays(day, step), holidayDays, step);
  }
  return day;
}

// Same formula as payrollController.generateMonthlyPayroll.
function calculatePayslip(salary, { year, month, absences, halfDays }) {
  const totalDays = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const lopDays = absences + halfDays * 0.5;
  const payableDays = totalDays - lopDays;
  const grossEarnings = (salary.baseSalary / totalDays) * payableDays + salary.allowances;
  const taxDeduction = grossEarnings * (salary.taxRate / 100);

  return {
    basicSalary: salary.baseSalary,
    allowances: salary.allowances,
    totalDays,
    payableDays,
    lopDays,
    grossEarnings: parseFloat(grossEarnings.toFixed(2)),
    taxDeduction: parseFloat(taxDeduction.toFixed(2)),
    netPay: parseFloat((grossEarnings - taxDeduction).toFixed(2))
  };
}

// ==========================================
// SEED
// Expects an empty database apart from roles. `db` is a Prisma client or
// transaction. Returns counts for the log.
// ==========================================
async function seedDemoCompany(db, now = new Date()) {
  const today = utcDay(now);
  // Attendance goes back to the start of the month before last, so the
  // payroll history for the last two months is complete.
  const historyStart = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - 2, 1));

  // Roles are kept between resets; make sure they all exist and are current.
  // None may grant more than the Demo role (see demoCompany.js).
  await ensureDemoRole(db);
  const roleIds = {};
  for (const role of COMPANY.ROLES) {
    const data = {
      description: role.description,
      permissions: role.permissions.filter((permission) => DEMO_PERMISSIONS.includes(permission))
    };
    const saved = await db.role.upsert({
      where: { name: role.name },
      update: data,
      create: { name: role.name, ...data },
      select: { id: true }
    });
    roleIds[role.name] = saved.id;
  }

  const leaveTypeIds = {};
  for (const leaveType of COMPANY.LEAVE_TYPES) {
    const saved = await db.leaveType.create({ data: leaveType, select: { id: true } });
    leaveTypeIds[leaveType.name] = saved.id;
  }

  const holidays = [];
  for (const year of [today.getUTCFullYear() - 1, today.getUTCFullYear(), today.getUTCFullYear() + 1]) {
    for (const holiday of COMPANY.HOLIDAYS) {
      const date = new Date(Date.UTC(year, holiday.month - 1, holiday.day));
      if (date >= historyStart) holidays.push({ name: holiday.name, date });
    }
  }
  await db.holiday.createMany({ data: holidays });
  const holidayDays = new Set(holidays.map((holiday) => dayKey(holiday.date)));

  // Nobody can log in as these people: the password is random and thrown away.
  const passwordHash = await hashPassword(randomUUID());
  const people = {};
  for (const person of COMPANY.PEOPLE) {
    const user = await db.user.create({
      data: {
        email: seedEmail(person.key),
        passwordHash,
        roleId: roleIds[person.role],
        employee: {
          create: {
            name: person.name,
            department: person.department,
            designation: person.designation,
            dateOfJoining: addDays(today, -person.joinedDaysAgo)
          }
        }
      },
      select: { id: true, employee: { select: { id: true } } }
    });
    people[person.key] = { ...person, userId: user.id, employeeId: user.employee.id, joined: addDays(today, -person.joinedDaysAgo) };
  }
  const everyone = Object.values(people);
  const hrLead = people[COMPANY.HR_LEAD];

  await db.salaryStructure.createMany({
    data: everyone
      .filter((person) => person.salary)
      .map((person) => ({ employeeId: person.employeeId, ...person.salary }))
  });

  // Leave requests, and balances that match the approved ones.
  const usedDays = {};
  const leaves = COMPANY.LEAVES.map((leave) => {
    const fromDate = workingDayFrom(today, leave.startInWorkdays, holidayDays);
    let toDate = fromDate;
    for (let i = 1; i < leave.days; i++) {
      toDate = toWorkingDay(addDays(toDate, 1), holidayDays);
    }
    const appliedDays = leave.days - (leave.isHalfDay ? 0.5 : 0);
    const person = people[leave.who];

    if (leave.status === 'approved') {
      const key = `${person.employeeId}|${leave.type}`;
      usedDays[key] = (usedDays[key] || 0) + appliedDays;
    }

    return {
      employeeId: person.employeeId,
      leaveTypeId: leaveTypeIds[leave.type],
      fromDate,
      toDate,
      reason: leave.reason,
      isHalfDay: Boolean(leave.isHalfDay),
      appliedDays,
      status: leave.status,
      approvedBy: leave.status === 'pending' ? null : hrLead.userId,
      // Requested a week or two before the leave starts (at most yesterday).
      createdAt: new Date(Math.min(addDays(fromDate, -10).getTime(), now.getTime() - DAY_MS))
    };
  });
  await db.leave.createMany({ data: leaves });

  await db.leaveBalance.createMany({
    data: everyone.flatMap((person) => COMPANY.LEAVE_TYPES.map((leaveType) => ({
      employeeId: person.employeeId,
      leaveTypeId: leaveTypeIds[leaveType.name],
      allocated: leaveType.defaultDays,
      used: usedDays[`${person.employeeId}|${leaveType.name}`] || 0
    })))
  });

  const attendance = await syncDemoAttendance(db, { from: historyStart, now });

  // Payslips for the last two full months, from the attendance above.
  const payslips = [];
  for (const monthsAgo of [2, 1]) {
    const monthStart = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - monthsAgo, 1));
    const nextMonthStart = new Date(Date.UTC(monthStart.getUTCFullYear(), monthStart.getUTCMonth() + 1, 1));
    const counts = await db.attendance.groupBy({
      by: ['employeeId', 'status'],
      where: { date: { gte: monthStart, lt: nextMonthStart }, status: { in: ['absent', 'half-day'] } },
      _count: { _all: true }
    });
    const countFor = (employeeId, status) =>
      counts.find((row) => row.employeeId === employeeId && row.status === status)?._count._all || 0;

    for (const person of everyone) {
      if (!person.salary || person.joined >= monthStart) continue;

      payslips.push({
        employeeId: person.employeeId,
        month: monthStart.getUTCMonth() + 1,
        year: monthStart.getUTCFullYear(),
        ...calculatePayslip(person.salary, {
          year: monthStart.getUTCFullYear(),
          month: monthStart.getUTCMonth() + 1,
          absences: countFor(person.employeeId, 'absent'),
          halfDays: countFor(person.employeeId, 'half-day')
        }),
        status: 'paid',
        createdAt: nextMonthStart
      });
    }
  }
  await db.payrollRecord.createMany({ data: payslips });

  let tasks = 0;
  for (const project of COMPANY.PROJECTS) {
    const owner = people[project.owner];
    const positions = {};
    await db.project.create({
      data: {
        name: project.name,
        description: project.description,
        status: project.status,
        createdBy: owner.userId,
        createdAt: atIst(addDays(today, -project.startedDaysAgo), 10 * 60),
        tasks: {
          create: project.tasks.map((task) => {
            positions[task.status] = (positions[task.status] || 0) + 1;
            return {
              title: task.title,
              description: task.description || null,
              priority: task.priority,
              status: task.status,
              position: positions[task.status] - 1,
              dueDate: addDays(today, task.dueInDays),
              assignedTo: people[task.assignee].employeeId,
              assignedBy: owner.userId
            };
          })
        }
      }
    });
    tasks += project.tasks.length;
  }

  await db.announcement.createMany({
    data: COMPANY.ANNOUNCEMENTS.map((announcement) => {
      const postedAt = atIst(addDays(today, -announcement.daysAgo), 11 * 60);
      return {
        title: announcement.title,
        content: announcement.content,
        createdBy: people[announcement.author].userId,
        createdAt: postedAt,
        updatedAt: postedAt
      };
    })
  });

  await db.meeting.createMany({
    data: COMPANY.MEETINGS.map((meeting) => {
      const day = toWorkingDay(addDays(today, meeting.inDays), new Set(), meeting.inDays < 0 ? -1 : 1);
      return {
        title: meeting.title,
        description: meeting.description,
        date: atIst(day, parseIstTime(meeting.time)),
        meetLink: meeting.meetLink || null,
        createdBy: people[meeting.author].userId
      };
    })
  });

  return {
    employees: everyone.length,
    attendance: attendance.created,
    leaves: leaves.length,
    payslips: payslips.length,
    projects: COMPANY.PROJECTS.length,
    tasks
  };
}

module.exports = {
  seedDemoCompany,
  syncDemoAttendance,
  seededAccountsWhere,
  utcDay,
  addDays
};
