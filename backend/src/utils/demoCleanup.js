const prisma = require('./prisma');
const { DEMO_CLEANUP_BATCH_SIZE } = require('../constants/demo');

// A big backlog (e.g. after the server slept for hours) is spread over
// several runs instead of one long one.
const MAX_BATCHES_PER_RUN = 20;

// ==========================================
// PURGE EXPIRED DEMO USERS
// Deletes demo accounts whose time is up, together with everything they own.
// Only ever touches users with isDemo = true.
//
// Deleting a user cascades to its employee profile, and from there to
// attendance, leaves, leave balances, salary, payroll and assigned tasks, plus
// the user's notifications and revoked tokens. leaves.approved_by and
// tasks.assigned_by are set to NULL. Four relations are ON DELETE RESTRICT and
// would block the delete, so those rows go first:
//   DailyLog.employeeId, projects.created_by (tasks cascade),
//   announcements.created_by, meetings.created_by
// ==========================================
async function purgeExpiredDemoUsers(now = new Date()) {
  let purged = 0;

  for (let batch = 0; batch < MAX_BATCHES_PER_RUN; batch++) {
    const expiredUsers = await prisma.user.findMany({
      where: { isDemo: true, expiresAt: { lte: now } },
      select: { id: true, employee: { select: { id: true } } },
      take: DEMO_CLEANUP_BATCH_SIZE
    });

    if (expiredUsers.length === 0) break;

    const userIds = expiredUsers.map((user) => user.id);
    const employeeIds = expiredUsers.map((user) => user.employee?.id).filter(Boolean);

    // All or nothing: if a late request from one of these users inserts a
    // blocking row mid-run, the batch rolls back and the next run retries.
    await prisma.$transaction([
      prisma.dailyLog.deleteMany({ where: { employeeId: { in: employeeIds } } }),
      prisma.project.deleteMany({ where: { createdBy: { in: userIds } } }),
      prisma.announcement.deleteMany({ where: { createdBy: { in: userIds } } }),
      prisma.meeting.deleteMany({ where: { createdBy: { in: userIds } } }),
      prisma.user.deleteMany({ where: { id: { in: userIds }, isDemo: true } })
    ]);

    purged += userIds.length;

    if (expiredUsers.length < DEMO_CLEANUP_BATCH_SIZE) break;
  }

  return purged;
}

module.exports = {
  purgeExpiredDemoUsers
};
