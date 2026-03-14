# Frontend API Handoff Guide

This document is for the frontend team to understand the current backend API behavior, especially the attendance changes that were recently made.

It is written as a handoff document, not just a route dump. The goal is to make implementation and testing faster.

## 1. Purpose

Use this guide for:
- integrating frontend screens with backend APIs
- understanding the updated attendance payloads
- testing flows in Postman
- mapping API fields directly to UI fields

## 2. What Changed Recently

The main backend changes were made in attendance.

### Attendance updates
- Attendance date handling was normalized to avoid local-vs-live timezone mismatch.
- Attendance `date` is now returned as `YYYY-MM-DD` for attendance-related responses.
- `checkInTime` and `checkOutTime` now use the real current day instead of a `1970-01-01` base date.
- Attendance history now supports:
  - full history
  - single-day filter
  - date-range filter
- Attendance history records now include frontend-friendly fields:
  - `punchedInTime`
  - `punchedOutTime`
  - `presentStatus`
  - `breakHistory`
  - `breakStats`

### Backend fixes also applied
- Log controller bug fixed for daily log creation/update flow.
- Attendance route cleanup done to remove stale handler imports.

## 3. Base Setup

### Base URL
- Local: `http://localhost:5000`
- Live: use your deployed backend base URL

### Required Headers

For protected APIs:

```http
Authorization: Bearer <token>
Content-Type: application/json
```

### Authentication Rule
- First call login.
- Save the returned JWT token.
- Send the token in the `Authorization` header for protected endpoints.

## 4. Response Pattern

### Common success format

```json
{
  "success": true,
  "message": "Optional message",
  "data": {}
}
```

### Common error format

```json
{
  "success": false,
  "message": "Error message"
}
```

### Common auth errors

```json
{
  "message": "Access Denied. No token provided."
}
```

```json
{
  "message": "Invalid or Expired Token"
}
```

```json
{
  "message": "Access Denied: Admins Only"
}
```

## 5. Quick Frontend Workflow

### Employee flow
1. Login
2. Fetch profile
3. Fetch punch status
4. Punch in
5. Start break
6. End break
7. Checkout
8. Fetch attendance history
9. Use logs, leaves, announcements as needed

### Admin flow
1. Login as admin
2. View employees
3. View all attendance
4. View all leave requests
5. Approve/reject leave
6. Create leave type
7. Create announcement

## 6. Endpoint Matrix

| Module | Method | Endpoint | Auth | Purpose |
|---|---|---|---|---|
| Health | GET | `/api/health` | No | Server and DB health |
| Auth | POST | `/api/auth/register` | No | Register employee |
| Auth | POST | `/api/auth/login` | No | Login user |
| Employee | GET | `/api/employee/me` | Employee/Admin | Get own profile |
| Employee | PUT | `/api/employee/update` | Employee/Admin | Update own profile |
| Attendance | GET | `/api/attendance/punch-status` | Employee/Admin | Get today's attendance state |
| Attendance | POST | `/api/attendance/mark` | Employee/Admin | Punch in |
| Attendance | POST | `/api/attendance/break` | Employee/Admin | Start/end break |
| Attendance | PATCH | `/api/attendance/checkout` | Employee/Admin | Punch out |
| Attendance | GET | `/api/attendance/my-attendance-history` | Employee/Admin | Get own attendance history |
| Attendance | GET | `/api/attendance/all-employees-attendance` | Admin | Get all employees attendance |
| Logs | GET | `/api/logs` | Employee/Admin | Get logs |
| Logs | POST | `/api/logs/add` | Employee/Admin | Add log item |
| Logs | PUT | `/api/logs/update` | Employee/Admin | Update log item |
| Logs | DELETE | `/api/logs/delete` | Employee/Admin | Delete log item |
| Leave Types | GET | `/api/leave-types` | Employee/Admin | Get active leave types |
| Leave Types | POST | `/api/leave-types` | Admin | Create leave type |
| Leaves | GET | `/api/leaves/my-balances` | Employee/Admin | Get own leave balances |
| Leaves | POST | `/api/leaves/apply` | Employee/Admin | Apply for leave |
| Leaves | GET | `/api/leaves/my-history` | Employee/Admin | Get own leave history |
| Leaves | GET | `/api/leaves/all` | Admin | Get all leave requests |
| Leaves | PATCH | `/api/leaves/:id/status` | Admin | Approve/reject leave |
| Announcements | GET | `/api/announcements` | Employee/Admin | Get announcements |
| Announcements | POST | `/api/announcements` | Admin | Create announcement |
| Admin | GET | `/api/admin/employees` | Admin | Get employee directory |
| Admin | POST | `/api/admin/employees` | Admin | Create employee |

## 7. Health

### GET `/api/health`

Used to verify server and database connectivity.

#### Response

```json
{
  "status": "success",
  "message": "Server is running and Database is connected!"
}
```

## 8. Authentication

### POST `/api/auth/register`

Creates a new employee account.

#### Payload

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Response

```json
{
  "success": true,
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "email": "john@example.com",
    "role": "employee",
    "name": "John Doe"
  }
}
```

### POST `/api/auth/login`

Logs in an existing user.

#### Payload

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Response

```json
{
  "success": true,
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "email": "john@example.com",
    "role": "employee",
    "name": "John Doe"
  }
}
```

## 9. Employee Profile

### GET `/api/employee/me`

Returns the current logged-in employee profile.

#### Response

```json
{
  "success": true,
  "data": {
    "id": "employee-id",
    "userId": "user-id",
    "name": "John Doe",
    "department": "Engineering",
    "designation": "Developer",
    "phone": "9999999999",
    "dateOfJoining": "2026-03-01T00:00:00.000Z",
    "user": {
      "email": "john@example.com",
      "role": "employee"
    }
  }
}
```

### PUT `/api/employee/update`

Updates editable profile fields.

#### Payload

```json
{
  "phone": "9999999999",
  "department": "Engineering",
  "designation": "Frontend Developer",
  "dateOfJoining": "2026-03-01"
}
```

#### Response

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "employee-id",
    "userId": "user-id",
    "name": "John Doe",
    "department": "Engineering",
    "designation": "Frontend Developer",
    "phone": "9999999999",
    "dateOfJoining": "2026-03-01T00:00:00.000Z"
  }
}
```

## 10. Attendance

This is the most important module for current frontend work.

### 10.1 Attendance state model

The frontend should think in terms of these states:
- not punched in yet
- punched in and active
- on break
- checked out

### 10.2 UI field mapping

| UI need | Backend field |
|---|---|
| Current punch state | `data.isPunchedIn` from punch status |
| Current attendance date | `todayAttendance.date` |
| Punch in time | `todayAttendance.checkInTime` or history `punchedInTime` |
| Punch out time | `todayAttendance.checkOutTime` or history `punchedOutTime` |
| Current status label | `todayAttendance.status` or history `presentStatus` |
| Break used | `breakStats.totalBreakTime` |
| Break left | `breakStats.leftBreakTime` |
| Break rows or timeline | `breakHistory` |

### 10.3 GET `/api/attendance/punch-status`

Returns the current day's attendance state for the logged-in employee.

#### Response

```json
{
  "success": true,
  "data": {
    "isPunchedIn": true,
    "employee": {
      "id": "employee-id",
      "name": "John Doe",
      "department": "Engineering",
      "designation": "Developer"
    },
    "todayAttendance": {
      "id": "attendance-id",
      "status": "present",
      "checkInTime": "2026-03-14T03:30:00.000Z",
      "checkOutTime": null,
      "date": "2026-03-14",
      "totalBreakMinutes": 0,
      "breakHistory": []
    },
    "breakStats": {
      "totalBreakTime": 0,
      "leftBreakTime": 40
    }
  }
}
```

#### Frontend notes
- If `todayAttendance` is `null`, user has not punched in yet.
- If `isPunchedIn` is `true` and `todayAttendance.status === "break"`, user is currently on break.
- `date` is already normalized to `YYYY-MM-DD`.

### 10.4 POST `/api/attendance/mark`

Marks attendance and punches in the user.

#### Payload

```json
{
  "status": "present",
  "checkInTime": "09:30:00"
}
```

#### Notes
- `status` is optional. Default is `present`.
- `checkInTime` is optional. If omitted, current server time is used.
- In production mode, multiple punch-ins for the same day are blocked.

#### Response

```json
{
  "success": true,
  "message": "Attendance marked successfully",
  "data": {
    "id": "attendance-id",
    "employeeId": "employee-id",
    "date": "2026-03-14",
    "status": "present",
    "checkInTime": "2026-03-14T03:30:00.000Z",
    "checkOutTime": null,
    "breakHistory": [],
    "totalBreakMinutes": 0,
    "employee": {
      "name": "John Doe",
      "department": "Engineering",
      "designation": "Developer"
    }
  }
}
```

### 10.5 POST `/api/attendance/break`

Starts or ends a break.

#### Start break payload

```json
{
  "isStarting": true
}
```

#### Start break response

```json
{
  "success": true,
  "message": "Break Started",
  "status": "break"
}
```

#### End break payload

```json
{
  "isStarting": false
}
```

#### End break response

```json
{
  "success": true,
  "message": "Break Ended. Used: 15 mins. Total: 15/40 mins.",
  "data": {
    "totalBreakTime": 15,
    "leftBreakTime": 25
  }
}
```

#### Break rules
- User must punch in before starting break.
- User cannot start break after checkout.
- User cannot start a second break if already on break.
- Daily break limit is 40 minutes.
- Backend now guards against invalid break-end state.

### 10.6 PATCH `/api/attendance/checkout`

Marks checkout and punches out the user.

#### Payload

```json
{
  "checkOutTime": "18:30:00"
}
```

#### Response

```json
{
  "success": true,
  "message": "Checked out successfully",
  "data": {
    "id": "attendance-id",
    "employeeId": "employee-id",
    "date": "2026-03-14",
    "status": "present",
    "checkInTime": "2026-03-14T03:30:00.000Z",
    "checkOutTime": "2026-03-14T12:30:00.000Z",
    "breakHistory": [
      {
        "start": "2026-03-14T07:30:00.000Z",
        "end": "2026-03-14T07:45:00.000Z"
      }
    ],
    "totalBreakMinutes": 15
  }
}
```

### 10.7 GET `/api/attendance/my-attendance-history`

Returns attendance history for the logged-in employee.

#### Supported queries

Full history:

```http
GET /api/attendance/my-attendance-history
```

Single day:

```http
GET /api/attendance/my-attendance-history?date=2026-03-14
```

Date range:

```http
GET /api/attendance/my-attendance-history?fromDate=2026-03-01&toDate=2026-03-14
```

#### Response

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": "attendance-id",
      "employeeId": "employee-id",
      "date": "2026-03-14",
      "status": "present",
      "checkInTime": "2026-03-14T03:30:00.000Z",
      "checkOutTime": "2026-03-14T12:30:00.000Z",
      "breakHistory": [
        {
          "start": "2026-03-14T07:30:00.000Z",
          "end": "2026-03-14T07:45:00.000Z"
        }
      ],
      "totalBreakMinutes": 15,
      "createdAt": "2026-03-14T03:30:00.000Z",
      "punchedInTime": "2026-03-14T03:30:00.000Z",
      "punchedOutTime": "2026-03-14T12:30:00.000Z",
      "presentStatus": "present",
      "breakStats": {
        "totalBreakTime": 15,
        "leftBreakTime": 25
      }
    }
  ]
}
```

#### Frontend notes
- `punchedInTime` and `punchedOutTime` are convenience fields for UI use.
- `presentStatus` is the display-friendly status field for history tables.
- `breakStats` exists on every history row for direct rendering.
- `breakHistory` can be rendered as a timeline or accordion section.

#### Validation errors

```json
{ "success": false, "message": "Invalid date. Use YYYY-MM-DD format." }
```

```json
{ "success": false, "message": "Invalid fromDate. Use YYYY-MM-DD format." }
```

```json
{ "success": false, "message": "Invalid toDate. Use YYYY-MM-DD format." }
```

```json
{ "success": false, "message": "fromDate must be earlier than or equal to toDate." }
```

### 10.8 GET `/api/attendance/all-employees-attendance`

Admin-only attendance listing.

#### Query example

```http
GET /api/attendance/all-employees-attendance?date=2026-03-14
```

#### Response

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": "attendance-id",
      "employeeId": "employee-id",
      "date": "2026-03-14",
      "status": "present",
      "checkInTime": "2026-03-14T03:30:00.000Z",
      "checkOutTime": "2026-03-14T12:30:00.000Z",
      "breakHistory": [],
      "totalBreakMinutes": 0,
      "employee": {
        "name": "John Doe",
        "department": "Engineering",
        "designation": "Developer"
      }
    }
  ]
}
```

## 11. Daily Logs

### GET `/api/logs`

Returns employee daily logs.

#### Response

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "log-id",
      "date": "2026-03-14T00:00:00.000Z",
      "employeeId": "employee-id",
      "workItems": [],
      "totalHours": 0
    }
  ]
}
```

### POST `/api/logs/add`

Adds one work item into today's log bucket.

#### Payload

```json
{
  "title": "Daily UI Fix",
  "description": "Worked on dashboard cards",
  "status": "done",
  "timeTaken": 1.5
}
```

### PUT `/api/logs/update`

Updates one work item in a daily log.

#### Payload

```json
{
  "logId": "log-id",
  "taskId": "task-id",
  "updates": {
    "title": "Daily UI Fix Updated",
    "timeTaken": 2
  }
}
```

### DELETE `/api/logs/delete`

Deletes one work item from a daily log.

#### Payload

```json
{
  "logId": "log-id",
  "taskId": "task-id"
}
```

#### Frontend note
- Log edit and delete is restricted to the current day only.

## 12. Leave Types

### GET `/api/leave-types`

Returns active leave policies.

#### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "leave-type-id",
      "name": "Casual Leave",
      "defaultDays": 10,
      "description": "Standard casual leave"
    }
  ]
}
```

### POST `/api/leave-types`

Admin-only endpoint to create a leave type.

#### Payload

```json
{
  "name": "Special Leave",
  "defaultDays": 2,
  "description": "Special policy leave"
}
```

## 13. Leaves

### GET `/api/leaves/my-balances`

Returns leave balance cards for the logged-in employee.

#### Response

```json
{
  "success": true,
  "data": [
    {
      "leaveType": "Casual Leave",
      "leaveTypeId": "leave-type-id",
      "allocated": 10,
      "used": 2,
      "remaining": 8
    }
  ]
}
```

### POST `/api/leaves/apply`

Applies for leave.

#### Payload

```json
{
  "leaveTypeId": "leave-type-id",
  "description": "Personal work",
  "startDate": "2026-03-20",
  "endDate": "2026-03-20",
  "isHalfDay": false
}
```

#### Response

```json
{
  "success": true,
  "message": "Leave application submitted successfully.",
  "data": {
    "leaveType": "Casual Leave",
    "description": "Personal work",
    "startDate": "2026-03-20T00:00:00.000Z",
    "endDate": "2026-03-20T00:00:00.000Z",
    "status": "pending",
    "numberOfLeavesTaken": 1,
    "leavesRemaining": 7
  }
}
```

### GET `/api/leaves/my-history`

Returns leave history for the logged-in employee.

### GET `/api/leaves/all`

Admin-only leave inbox.

#### Query example

```http
GET /api/leaves/all?status=pending
```

### PATCH `/api/leaves/:id/status`

Admin-only leave approval or rejection.

#### Payload

```json
{
  "status": "approved"
}
```

#### Allowed values
- `approved`
- `rejected`

## 14. Announcements

### GET `/api/announcements`

Returns paginated announcements.

#### Query example

```http
GET /api/announcements?page=1&limit=10
```

#### Response

```json
{
  "success": true,
  "pagination": {
    "totalRecords": 12,
    "currentPage": 1,
    "totalPages": 2,
    "limit": 10
  },
  "data": [
    {
      "id": "announcement-id",
      "title": "Holiday Notice",
      "content": "Office will remain closed on public holiday.",
      "author": {
        "email": "admin@example.com"
      }
    }
  ]
}
```

### POST `/api/announcements`

Admin-only announcement creation.

#### Payload

```json
{
  "title": "Holiday Notice",
  "content": "Office will remain closed on public holiday."
}
```

## 15. Admin

### GET `/api/admin/employees`

Admin-only employee directory.

### POST `/api/admin/employees`

Admin-only onboarding endpoint.

#### Payload

```json
{
  "name": "New Employee",
  "email": "new.employee@example.com",
  "password": "TempPassword123",
  "department": "Engineering",
  "designation": "Developer"
}
```

#### Response

```json
{
  "success": true,
  "message": "Employee Onboarded!",
  "data": {
    "user": {
      "id": "user-id",
      "email": "new.employee@example.com",
      "role": "employee"
    },
    "employee": {
      "id": "employee-id",
      "name": "New Employee",
      "department": "Engineering",
      "designation": "Developer"
    }
  }
}
```

## 16. Postman Support

An import-ready collection was added for testing:

- `backend/postman/employee-management-backend.postman_collection.json`

This collection already includes the main employee and admin testing flow.

## 17. Recommended Frontend Implementation Notes

### Attendance page
- Call punch status on initial page load.
- Use `todayAttendance.status` to decide whether the break button should say start or end.
- Use `breakStats` directly instead of recalculating break totals on the frontend.
- Prefer `date` from API for attendance row grouping.

### Attendance history page
- Use `my-attendance-history` with:
  - `date` for single-day filtering
  - `fromDate` and `toDate` for range filtering
- Render `presentStatus` directly in the table badge.
- Render `punchedInTime` and `punchedOutTime` directly in columns.
- Use `breakHistory` for detailed expansion view.

### Error handling
- Show backend `message` directly for user-facing errors where appropriate.
- Handle `401` and `403` by redirecting to login or showing access restriction UI.

## 18. Short Testing Script

If frontend wants a quick manual validation sequence, use this exact order:

1. `POST /api/auth/login`
2. `GET /api/employee/me`
3. `GET /api/attendance/punch-status`
4. `POST /api/attendance/mark`
5. `POST /api/attendance/break` with `isStarting: true`
6. `POST /api/attendance/break` with `isStarting: false`
7. `PATCH /api/attendance/checkout`
8. `GET /api/attendance/my-attendance-history`
9. `GET /api/attendance/my-attendance-history?date=YYYY-MM-DD`
10. `GET /api/attendance/my-attendance-history?fromDate=YYYY-MM-DD&toDate=YYYY-MM-DD`

## 19. Source Files Touched Recently

Relevant backend files:
- `backend/src/controllers/attendanceController.js`
- `backend/src/routes/attendanceRoutes.js`
- `backend/src/controllers/logController.js`
- `backend/postman/employee-management-backend.postman_collection.json`
