# Attendance API - Frontend Implementation Guide

## Overview
The attendance API has been updated to support **7-day pagination** and includes **total hours worked** calculations. This guide helps frontend developers implement the attendance history view with proper pagination.

---

## Endpoint: Get My Attendance History

**URL:** `GET /api/attendance/my-attendance-history`

**Authentication:** Required (Bearer token)

---

## Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Pagination page number. Returns 7 days per page. |
| `pageSize` | integer | 7 | Number of days per page (customize 7-day interval if needed) |
| `date` | string (YYYY-MM-DD) | - | Fetch attendance for a single specific date |
| `fromDate` | string (YYYY-MM-DD) | - | Start date for date range query |
| `toDate` | string (YYYY-MM-DD) | - | End date for date range query |

**Note:** If multiple filters provided, priority is: `page` > `date` > `fromDate/toDate` > default

---

## Response Format

### Success Response (With Pagination)
```json
{
  "success": true,
  "count": 7,
  "pagination": {
    "currentPage": 1,
    "pageSize": 7,
    "totalRecords": 45,
    "totalPages": 7
  },
  "data": [
    {
      "id": "uuid",
      "employeeId": "uuid",
      "date": "2026-04-04",
      "status": "present",
      "checkInTime": "2026-04-04T10:05:00.000Z",
      "checkOutTime": "2026-04-04T18:30:00.000Z",
      "punchedInTime": "2026-04-04T10:05:00.000Z",
      "punchedOutTime": "2026-04-04T18:30:00.000Z",
      "presentStatus": "present",
      "totalBreakMinutes": 30,
      "breakHistory": [
        {
          "start": "2026-04-04T12:00:00.000Z",
          "end": "2026-04-04T12:15:00.000Z"
        },
        {
          "start": "2026-04-04T14:30:00.000Z",
          "end": "2026-04-04T14:45:00.000Z"
        }
      ],
      "breakStats": {
        "totalBreakTime": 30,
        "leftBreakTime": 10
      },
      "totalHoursWorked": 7.5,
      "createdAt": "2026-04-04T10:05:00.000Z"
    },
    // ... more records
  ]
}
```

### Success Response (Without Pagination)
When using `date`, `fromDate/toDate` filters (no pagination metadata):
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      // ... attendance record
    }
  ]
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Field Explanations

| Field | Type | Description |
|-------|------|-------------|
| `date` | string | Date in YYYY-MM-DD format |
| `status` | string | `present`, `absent`, `half-day`, or `break` |
| `checkInTime` | datetime | When employee clocked in (ISO 8601 format) |
| `checkOutTime` | datetime | When employee clocked out (null if not checked out) |
| `totalBreakMinutes` | integer | Total break time taken (max 40 mins) |
| `breakHistory` | array | Array of break objects with start/end times |
| `totalHoursWorked` | float | Total hours worked (check-out - check-in - break time) |
| `breakStats.totalBreakTime` | integer | Same as `totalBreakMinutes` |
| `breakStats.leftBreakTime` | integer | Remaining break time (40 - totalBreakMinutes) |

---

## Usage Examples

### Example 1: Fetch Last 7 Days (Default)
```javascript
GET /api/attendance/my-attendance-history
```
Returns: 7 most recent attendance records with pagination info

---

### Example 2: Fetch Page 2 (Previous 7 Days)
```javascript
GET /api/attendance/my-attendance-history?page=2
```
Returns: Attendance records from 7-13 days ago

---

### Example 3: Fetch Page 3 with Custom Page Size
```javascript
GET /api/attendance/my-attendance-history?page=3&pageSize=14
```
Returns: Attendance records from 28-41 days ago (14 days per page)

---

### Example 4: Fetch Single Date
```javascript
GET /api/attendance/my-attendance-history?date=2026-04-01
```
Returns: Attendance for April 1, 2026 (no pagination metadata)

---

### Example 5: Fetch Date Range
```javascript
GET /api/attendance/my-attendance-history?fromDate=2026-04-01&toDate=2026-04-15
```
Returns: All records between April 1-15, 2026 (no pagination metadata)

---

## Frontend Implementation Tips

### Pagination Logic
```javascript
// Page 1 = Last 7 days (today to 6 days ago)
// Page 2 = Previous 7 days (7-13 days ago)
// Page 3 = 14-20 days ago, etc.

const handlePageChange = (newPage) => {
  const params = new URLSearchParams({
    page: newPage,
    pageSize: 7
  });
  
  fetchAttendance(`/api/attendance/my-attendance-history?${params}`);
};
```

### Calculate Hours Worked Display
```javascript
// totalHoursWorked is already calculated by backend
const displayHours = (attendance) => {
  return attendance.totalHoursWorked.toFixed(2) + ' hours';
  // Example: "7.50 hours"
};
```

### Format Timestamps for Display
```javascript
const formatTime = (isoTime) => {
  const date = new Date(isoTime);
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  // Example: "10:05 AM"
};
```

### Display Break Info
```javascript
const breakDisplay = (attendance) => {
  const breakCount = attendance.breakHistory.length;
  const totalBreak = attendance.breakStats.totalBreakTime;
  const remaining = attendance.breakStats.leftBreakTime;
  
  return `${breakCount} break(s) • ${totalBreak}/${40} mins used • ${remaining} mins left`;
};
```

### Status Badge Colors
```javascript
const getStatusColor = (status) => {
  const colors = {
    'present': 'green',
    'half-day': 'orange',
    'absent': 'red',
    'break': 'blue'
  };
  return colors[status] || 'gray';
};
```

---

## Error Handling

| Status Code | Message | Cause |
|-------------|---------|-------|
| 401 | Unauthorized | Missing/invalid auth token |
| 404 | Employee record not found | User not linked to employee |
| 400 | Invalid date. Use YYYY-MM-DD format. | Date parsing failed |
| 400 | fromDate must be earlier than or equal to toDate. | Invalid date range |
| 500 | Server Error | Internal server error |

---

## Pagination UI Pattern

**Suggested Pattern for 7-day view with pagination:**

```
[Previous] Page 1 of 7 [Next]

📅 April 4, 2026 (Friday) - 7.50 hours - Present ✓
📅 April 3, 2026 (Thursday) - 8.25 hours - Present ✓
📅 April 2, 2026 (Wednesday) - 7.80 hours - Half-day ⚠️
📅 April 1, 2026 (Tuesday) - 0 hours - Absent ✗
📅 March 31, 2026 (Monday) - 8.30 hours - Present ✓
📅 March 30, 2026 (Sunday) - Holiday
📅 March 29, 2026 (Saturday) - Weekend

[Previous] Page 1 of 7 [Next]
```

---

## Notes for Frontend Team

1. **Default Load:** When page loads, fetch with no parameters to get last 7 days
2. **Pagination:** Use `pagination.totalPages` to determine if "Next" button should be disabled
3. **Hours Display:** `totalHoursWorked` is already calculated; just format for display
4. **Backward Compatibility:** The `date` and `fromDate/toDate` parameters still work for custom date filters
5. **Performance:** Response includes only records for the requested time period; not all historical data

