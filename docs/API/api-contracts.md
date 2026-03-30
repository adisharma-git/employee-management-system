# API Contracts

## Attendance

### GET `/api/attendance/my-attendance-history`

Returns attendance history for the authenticated employee.

#### Auth
- Requires bearer token (`Authorization: Bearer <token>`)

#### Query Parameters
- `date` (optional, `YYYY-MM-DD`): returns attendance for a single day.
- `fromDate` (optional, `YYYY-MM-DD`): start date for range filtering.
- `toDate` (optional, `YYYY-MM-DD`): end date for range filtering (inclusive).

#### Filter Rules
- If `date` is provided, single-day filter is applied.
- Else if `fromDate` and/or `toDate` are provided, range filter is applied.
- If no query params are provided, full attendance history is returned.

#### Success Response (`200`)
```json
{
	"success": true,
	"count": 2,
	"data": [
		{
			"id": "f40f8de9-9af2-4df6-a9b5-ae1f68a4b7e9",
			"employeeId": "9c13168b-0332-4872-b272-2d3f729fc5f9",
			"date": "2026-03-14",
			"status": "present",
			"checkInTime": "2026-03-14T03:30:00.000Z",
			"checkOutTime": "2026-03-14T12:15:00.000Z",
			"breakHistory": [
				{
					"start": "2026-03-14T07:30:00.000Z",
					"end": "2026-03-14T07:45:00.000Z"
				}
			],
			"totalBreakMinutes": 15,
			"createdAt": "2026-03-14T03:30:00.000Z",

			"punchedInTime": "2026-03-14T03:30:00.000Z",
			"punchedOutTime": "2026-03-14T12:15:00.000Z",
			"presentStatus": "present",
			"breakStats": {
				"totalBreakTime": 15,
				"leftBreakTime": 25
			}
		}
	]
}
```

#### Validation Errors (`400`)
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

#### Not Found (`404`)
```json
{ "success": false, "message": "Employee record not found" }
```
