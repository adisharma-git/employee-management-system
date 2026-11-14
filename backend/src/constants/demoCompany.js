// ==========================================
// DEMO SAMPLE COMPANY
// The fake company that demo visitors explore (see src/utils/demoSeed.js).
// All names and figures are made up. Dates are relative to the day of the
// reset, so the data always looks current.
// ==========================================
const { PERMISSIONS } = require('./permissions');
const { DEFAULT_EMPLOYEE_PERMISSIONS } = require('../utils/defaultRolePermissions');

// Every permission here must also be in DEMO_PERMISSIONS: a visitor can add
// an employee with any of these roles and log in as them, so a role with more
// access would let them get around the demo's limits. The seed drops any
// permission that isn't.
const ROLES = [
  {
    name: 'Employee',
    description: 'Standard employee access',
    permissions: DEFAULT_EMPLOYEE_PERMISSIONS
  },
  {
    name: 'Team Lead',
    description: 'Runs a team: approves leave, plans projects and assigns tasks',
    permissions: [
      ...DEFAULT_EMPLOYEE_PERMISSIONS,
      PERMISSIONS.VIEW_EMPLOYEES,
      PERMISSIONS.VIEW_ALL_ATTENDANCE,
      PERMISSIONS.VIEW_ALL_LEAVES,
      PERMISSIONS.APPROVE_LEAVE,
      PERMISSIONS.REJECT_LEAVE,
      PERMISSIONS.CREATE_PROJECT,
      PERMISSIONS.EDIT_PROJECT,
      PERMISSIONS.CREATE_TASK,
      PERMISSIONS.EDIT_TASK,
      PERMISSIONS.ASSIGN_TASK,
      PERMISSIONS.CREATE_MEETING,
      PERMISSIONS.EDIT_MEETING,
      PERMISSIONS.VIEW_LOGS
    ]
  },
  {
    name: 'HR Manager',
    description: 'Manages people, leave, payroll and company announcements',
    permissions: [
      ...DEFAULT_EMPLOYEE_PERMISSIONS,
      PERMISSIONS.VIEW_EMPLOYEES,
      PERMISSIONS.CREATE_EMPLOYEE,
      PERMISSIONS.VIEW_ALL_ATTENDANCE,
      PERMISSIONS.VIEW_ALL_LEAVES,
      PERMISSIONS.APPROVE_LEAVE,
      PERMISSIONS.REJECT_LEAVE,
      PERMISSIONS.CREATE_ANNOUNCEMENT,
      PERMISSIONS.EDIT_ANNOUNCEMENT,
      PERMISSIONS.CREATE_MEETING,
      PERMISSIONS.EDIT_MEETING,
      PERMISSIONS.GENERATE_PAYROLL,
      PERMISSIONS.UPDATE_PAYROLL,
      PERMISSIONS.CREATE_HOLIDAYS,
      PERMISSIONS.VIEW_ROLES
    ]
  }
];

const LEAVE_TYPES = [
  { name: 'Casual', defaultDays: 12, description: 'Short personal time off.' },
  { name: 'Sick', defaultDays: 8, description: 'Illness or medical appointments.' },
  { name: 'Earned', defaultDays: 15, description: 'Planned vacation, accrued through the year.' }
];

// Fixed-date holidays, added for last year, this year and next year.
const HOLIDAYS = [
  { month: 1, day: 1, name: "New Year's Day" },
  { month: 1, day: 26, name: 'Republic Day' },
  { month: 5, day: 1, name: 'Labour Day' },
  { month: 8, day: 15, name: 'Independence Day' },
  { month: 10, day: 2, name: 'Gandhi Jayanti' },
  { month: 12, day: 25, name: 'Christmas' }
];

// `key` is the email's local part (key@DEMO_SEED_EMAIL_DOMAIN) and how the
// rest of this file refers to a person. Salaries are monthly. The newest
// joiner has no salary yet, so the payroll screens have someone to set up.
const PEOPLE = [
  { key: 'kavya.menon', name: 'Kavya Menon', department: 'HR', designation: 'HR Manager', role: 'HR Manager', joinedDaysAgo: 1460, salary: { baseSalary: 110000, allowances: 15000, taxRate: 15 } },
  { key: 'tanvi.desai', name: 'Tanvi Desai', department: 'HR', designation: 'HR Executive', role: 'Employee', joinedDaysAgo: 90, salary: { baseSalary: 45000, allowances: 6000, taxRate: 5 } },
  { key: 'rohan.iyer', name: 'Rohan Iyer', department: 'Engineering', designation: 'Engineering Manager', role: 'Team Lead', joinedDaysAgo: 1300, salary: { baseSalary: 185000, allowances: 25000, taxRate: 20 } },
  { key: 'priya.sharma', name: 'Priya Sharma', department: 'Engineering', designation: 'Senior Software Engineer', role: 'Employee', joinedDaysAgo: 1000, salary: { baseSalary: 140000, allowances: 20000, taxRate: 20 } },
  { key: 'arjun.nair', name: 'Arjun Nair', department: 'Engineering', designation: 'Software Engineer', role: 'Employee', joinedDaysAgo: 600, salary: { baseSalary: 90000, allowances: 12000, taxRate: 10 } },
  { key: 'sneha.kulkarni', name: 'Sneha Kulkarni', department: 'Engineering', designation: 'Software Engineer', role: 'Employee', joinedDaysAgo: 520, salary: { baseSalary: 88000, allowances: 12000, taxRate: 10 } },
  { key: 'karan.mehta', name: 'Karan Mehta', department: 'Engineering', designation: 'Frontend Developer', role: 'Employee', joinedDaysAgo: 300, salary: { baseSalary: 82000, allowances: 10000, taxRate: 10 } },
  { key: 'vikram.singh', name: 'Vikram Singh', department: 'Engineering', designation: 'DevOps Engineer', role: 'Employee', joinedDaysAgo: 900, salary: { baseSalary: 115000, allowances: 15000, taxRate: 15 } },
  { key: 'neha.gupta', name: 'Neha Gupta', department: 'Engineering', designation: 'QA Engineer', role: 'Employee', joinedDaysAgo: 430, salary: { baseSalary: 72000, allowances: 9000, taxRate: 10 } },
  { key: 'meera.joshi', name: 'Meera Joshi', department: 'Design', designation: 'Product Designer', role: 'Employee', joinedDaysAgo: 700, salary: { baseSalary: 95000, allowances: 12000, taxRate: 10 } },
  { key: 'ishaan.kapoor', name: 'Ishaan Kapoor', department: 'Design', designation: 'UI/UX Designer', role: 'Employee', joinedDaysAgo: 200, salary: { baseSalary: 70000, allowances: 8000, taxRate: 5 } },
  { key: 'ananya.das', name: 'Ananya Das', department: 'Product', designation: 'Product Manager', role: 'Team Lead', joinedDaysAgo: 1100, salary: { baseSalary: 150000, allowances: 20000, taxRate: 20 } },
  { key: 'rahul.verma', name: 'Rahul Verma', department: 'Sales', designation: 'Sales Manager', role: 'Employee', joinedDaysAgo: 800, salary: { baseSalary: 120000, allowances: 18000, taxRate: 15 } },
  { key: 'pooja.reddy', name: 'Pooja Reddy', department: 'Sales', designation: 'Account Executive', role: 'Employee', joinedDaysAgo: 250, salary: { baseSalary: 58000, allowances: 12000, taxRate: 5 } },
  { key: 'siddharth.bose', name: 'Siddharth Bose', department: 'Finance', designation: 'Finance Manager', role: 'Employee', joinedDaysAgo: 1200, salary: { baseSalary: 130000, allowances: 18000, taxRate: 15 } },
  { key: 'divya.pillai', name: 'Divya Pillai', department: 'Finance', designation: 'Accountant', role: 'Employee', joinedDaysAgo: 380, salary: { baseSalary: 55000, allowances: 7000, taxRate: 5 } },
  { key: 'farhan.ali', name: 'Farhan Ali', department: 'Operations', designation: 'Operations Executive', role: 'Employee', joinedDaysAgo: 4, salary: null }
];

// Who approves (or rejects) leave, writes announcements, etc.
const HR_LEAD = 'kavya.menon';

// `startInWorkdays` counts working days from today (negative = past, 0 = the
// next working day from today). A leave covers `days` working days.
const LEAVES = [
  { who: 'priya.sharma', type: 'Casual', startInWorkdays: -38, days: 2, status: 'approved', reason: 'Family function out of town' },
  { who: 'meera.joshi', type: 'Earned', startInWorkdays: -33, days: 3, status: 'approved', reason: 'Short vacation' },
  { who: 'arjun.nair', type: 'Sick', startInWorkdays: -27, days: 1, status: 'approved', reason: 'Fever' },
  { who: 'vikram.singh', type: 'Earned', startInWorkdays: -22, days: 5, status: 'approved', reason: 'Annual vacation' },
  { who: 'rahul.verma', type: 'Casual', startInWorkdays: -18, days: 1, status: 'approved', reason: 'Personal errand' },
  { who: 'karan.mehta', type: 'Casual', startInWorkdays: -15, days: 2, status: 'rejected', reason: 'Extending the long weekend' },
  { who: 'neha.gupta', type: 'Sick', startInWorkdays: -12, days: 2, status: 'approved', reason: 'Viral infection, doctor advised rest' },
  { who: 'divya.pillai', type: 'Casual', startInWorkdays: -8, days: 1, isHalfDay: true, status: 'approved', reason: 'Bank appointment' },
  { who: 'sneha.kulkarni', type: 'Sick', startInWorkdays: 0, days: 1, status: 'approved', reason: 'Migraine' },
  { who: 'ishaan.kapoor', type: 'Sick', startInWorkdays: 1, days: 1, isHalfDay: true, status: 'pending', reason: 'Dentist appointment in the afternoon' },
  { who: 'arjun.nair', type: 'Casual', startInWorkdays: 3, days: 1, status: 'pending', reason: 'Moving to a new apartment' },
  { who: 'ananya.das', type: 'Earned', startInWorkdays: 6, days: 4, status: 'approved', reason: 'Visiting family' },
  { who: 'pooja.reddy', type: 'Earned', startInWorkdays: 8, days: 5, status: 'pending', reason: 'Year-end holiday with family' },
  { who: 'tanvi.desai', type: 'Casual', startInWorkdays: 10, days: 2, status: 'pending', reason: "Sister's wedding" },
  { who: 'vikram.singh', type: 'Casual', startInWorkdays: 12, days: 1, status: 'pending', reason: 'Personal work' }
];

// Task status values match the Kanban columns: todo, in-progress,
// code-review, qa-testing, done. `dueInDays` is in calendar days.
// The Tasks page opens on the newest project (smallest `startedDaysAgo`).
const PROJECTS = [
  {
    name: 'Customer Portal Revamp',
    startedDaysAgo: 20,
    description: 'Rebuilding the customer self-service portal with a faster checkout and a new account area.',
    status: 'active',
    owner: 'rohan.iyer',
    tasks: [
      { title: 'Design the new checkout flow', assignee: 'meera.joshi', status: 'done', priority: 'high', dueInDays: -12 },
      { title: 'Set up the staging environment', assignee: 'vikram.singh', status: 'done', priority: 'medium', dueInDays: -5 },
      { title: 'Build checkout API endpoints', assignee: 'priya.sharma', status: 'code-review', priority: 'high', dueInDays: 2, description: 'Cart, address and payment endpoints, with validation and tests.' },
      { title: 'Implement the checkout UI', assignee: 'karan.mehta', status: 'in-progress', priority: 'high', dueInDays: 4 },
      { title: 'Fix the flaky login test', assignee: 'neha.gupta', status: 'in-progress', priority: 'high', dueInDays: -1 },
      { title: 'Add payment gateway sandbox tests', assignee: 'neha.gupta', status: 'todo', priority: 'medium', dueInDays: 7 },
      { title: 'Accessibility audit of the account pages', assignee: 'ishaan.kapoor', status: 'todo', priority: 'low', dueInDays: 10 }
    ]
  },
  {
    name: 'Mobile App 2.0',
    startedDaysAgo: 60,
    description: 'Next major release of the iOS and Android apps: offline mode and push notifications.',
    status: 'active',
    owner: 'ananya.das',
    tasks: [
      { title: 'Set up crash reporting', assignee: 'vikram.singh', status: 'done', priority: 'medium', dueInDays: -9 },
      { title: 'Push notification service', assignee: 'sneha.kulkarni', status: 'qa-testing', priority: 'medium', dueInDays: 1 },
      { title: 'Offline mode: local data cache', assignee: 'arjun.nair', status: 'in-progress', priority: 'high', dueInDays: 6, description: 'Cache the last 30 days of data and sync changes when the connection returns.' },
      { title: 'Regression test plan for 2.0', assignee: 'neha.gupta', status: 'in-progress', priority: 'medium', dueInDays: 5 },
      { title: 'App store screenshots and listing copy', assignee: 'ishaan.kapoor', status: 'todo', priority: 'low', dueInDays: 14 }
    ]
  },
  {
    name: 'HR Analytics Dashboard',
    startedDaysAgo: 45,
    description: 'Internal dashboard for attrition, hiring and attendance trends.',
    status: 'active',
    owner: 'rohan.iyer',
    tasks: [
      { title: 'Define attrition and hiring metrics', assignee: 'tanvi.desai', status: 'done', priority: 'medium', dueInDays: -7 },
      { title: 'Review payroll summary figures', assignee: 'divya.pillai', status: 'qa-testing', priority: 'medium', dueInDays: 3 },
      { title: 'Attendance trends chart', assignee: 'karan.mehta', status: 'todo', priority: 'medium', dueInDays: 9 },
      { title: 'Export reports to CSV', assignee: 'priya.sharma', status: 'todo', priority: 'low', dueInDays: 12 }
    ]
  },
  {
    name: 'Website Migration',
    startedDaysAgo: 120,
    description: 'Moved the marketing site to the new CMS and CDN.',
    status: 'completed',
    owner: 'rohan.iyer',
    tasks: [
      { title: 'Migrate blog posts to the new CMS', assignee: 'sneha.kulkarni', status: 'done', priority: 'medium', dueInDays: -30 },
      { title: 'Configure the CDN and redirects', assignee: 'vikram.singh', status: 'done', priority: 'high', dueInDays: -28 }
    ]
  }
];

const ANNOUNCEMENTS = [
  {
    author: HR_LEAD,
    daysAgo: 1,
    title: 'Welcome Farhan Ali to the Operations team',
    content: 'Farhan joins us as Operations Executive. Say hello when you see him around, and help him settle in during his first few weeks.'
  },
  {
    author: HR_LEAD,
    daysAgo: 4,
    title: 'Updated leave policy',
    content: 'From next month, up to 5 unused Earned leaves carry over to the next year. Casual and Sick leaves still reset on 1 January. You can check your balances on the Leaves page.'
  },
  {
    author: 'rohan.iyer',
    daysAgo: 9,
    title: 'Customer Portal beta is live on staging',
    content: 'The new checkout flow is ready for internal testing on staging. Please try it out and report anything odd on the project board.'
  },
  {
    author: HR_LEAD,
    daysAgo: 16,
    title: 'Town hall recap',
    content: 'Thanks to everyone who joined the quarterly town hall. Highlights: two new client wins, the Mobile App 2.0 roadmap, and the hiring plan for next quarter.'
  }
];

// `inDays` is in calendar days (moved to the next working day if it lands on
// a weekend); `time` is India time (IST).
const MEETINGS = [
  { author: 'ananya.das', inDays: -2, time: '12:00', title: 'Mobile App 1.9 release retro', description: 'What went well, what to change for 2.0.' },
  { author: 'rohan.iyer', inDays: 1, time: '10:30', title: 'Sprint planning', description: 'Plan the next two-week sprint for the Customer Portal.', meetLink: 'https://meet.example.com/sprint-planning' },
  { author: 'ananya.das', inDays: 1, time: '15:00', title: 'Mobile App 2.0 design review', description: 'Walk through the offline mode and notification designs.', meetLink: 'https://meet.example.com/app-design-review' },
  { author: HR_LEAD, inDays: 3, time: '16:00', title: 'All-hands meeting', description: 'Monthly company update and open Q&A.', meetLink: 'https://meet.example.com/all-hands' },
  { author: 'rohan.iyer', inDays: 5, time: '11:00', title: 'Architecture review: payments', description: 'Review the payment gateway integration before it goes to production.' },
  { author: HR_LEAD, inDays: 8, time: '14:30', title: 'Benefits enrolment walkthrough', description: 'How to choose your health cover for next year.', meetLink: 'https://meet.example.com/benefits' }
];

module.exports = {
  ROLES,
  LEAVE_TYPES,
  HOLIDAYS,
  PEOPLE,
  HR_LEAD,
  LEAVES,
  PROJECTS,
  ANNOUNCEMENTS,
  MEETINGS
};
