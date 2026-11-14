# Demo mode

A public demo where anyone can try WorkAlignr without signing up. On the landing page or login page, a visitor clicks **"Live demo"**, types a name (optional) and lands on the dashboard of a sample company with 17 people. The session lasts 15 minutes. Afterwards the visitor's account and everything they created are deleted.

The demo runs **inside the normal deployment** (same frontend, same backend, same database). Demo data lives in a separate Postgres schema, `demo`, so visitors never see or change real data.

## Turning it on and off

It's **on by default**. No setup is needed.

| To turn off | Set |
|---|---|
| The demo itself (backend) | `DEMO_MODE=false` |
| The "Live demo" links (frontend) | `VITE_DEMO_MODE=false` |

## How it works

| Part | What it does |
|---|---|
| Startup | The server starts serving right away. In the background it creates or updates the `demo` schema (`prisma migrate deploy` with `?schema=demo` added to `DATABASE_URL`/`DIRECT_URL`), then builds the sample company if needed. Until that's done (about a minute the first time), starting a demo returns "The demo is starting up". |
| `POST /api/auth/demo` | Creates a temporary account in the demo schema (Demo role, 15-minute token marked `demo: true`). Limited to 5 starts per IP per hour and 100 active demos at a time. |
| Demo requests | A request whose token has `demo: true` runs entirely against the demo schema. The shared Prisma client (`utils/prisma.js`) switches for the duration of that request (`utils/demoDatabase.js`). All other requests use the real data. |
| Emails | Never sent for demo requests; logged as `[demo] Email suppressed: ...`. Real users' emails are unaffected. |
| Demo role | Admin-style access for exploring, with no deletes and no role, permission, leave-type or notification changes. |
| Sample company | 17 employees, about two months of attendance, leave requests (5 pending), two months of payslips, 4 projects with 18 tasks, announcements, meetings and holidays. Dates are relative to the reset day. |
| Maintenance (every 5 minutes) | 1. Deletes expired demo accounts and their data.<br>2. Rebuilds the sample company once a day.<br>3. Otherwise tops up today's attendance, so people check in and out as the day goes on. |

Code: `backend/src/constants/demo.js` (limits), `backend/src/constants/demoCompany.js` (sample data), `backend/src/utils/demo*.js`, `backend/src/middleware/demoMiddleware.js`, `frontend/src/demo/`, `frontend/src/pages/Demo*.jsx`.

### The daily reset

Visitors share one sample company, so their changes (approved leave, payroll runs, new holidays, moved tasks) stay visible to later visitors until the reset. Once a day the reset empties every demo table except `roles` and rebuilds the company.

- It's due when the company wasn't built today (UTC; the day changes at 05:30 IST).
- It runs at the first maintenance run when **nobody is in a demo**, so it never ends anyone's session.
- It runs in one transaction. A failure leaves the old data in place.

To rebuild immediately (for example, after someone posts something unpleasant), run this from `backend/`:

```bash
npm run demo:reset
```

This also removes visitors who are in the middle of a demo.

**Safety:**
- The reset only uses the demo schema's client.
- Its raw SQL names the `demo` schema explicitly, so it can't touch the real (public) tables.
- It refuses to run if the demo schema contains any account that is neither a demo visitor nor a sample-company account (`@demo-company.test`).

## Notes

- **A long-running host (such as Render) is best.** Maintenance runs every 5 minutes. On serverless hosts it runs only when someone starts a demo.
- **The database user must be able to create a schema.** Supabase's default user can. If setup fails, the log shows `[demo] Setup failed, so the demo is off`, and the rest of the app keeps working.
- **New migrations** are applied to the demo schema automatically on the next start.
- **A demo visitor can add employees, but those employees can't log in** (they exist only in the demo schema).
- **The per-IP limit is kept in memory.** It resets when the server restarts.

## Running it locally

`npm run dev` in `backend/` and `frontend/` is enough: the demo is on by default and uses a `demo` schema in whatever database `DATABASE_URL` points to. Open http://localhost:5173/demo.

**Watch out:** Prisma also reads `backend/.env` and fills in any variable you didn't set yourself, including the real `EMAIL_USER`/`EMAIL_PASS`. When testing against a scratch database, set those two explicitly (for example to dummy values). Otherwise real users' actions in your test will send real emails.

## Limits

All in `backend/src/constants/demo.js`:

| Constant | Default |
|---|---|
| `DEMO_SESSION_MINUTES` | 15 |
| `DEMO_RATE_LIMIT_MAX_SESSIONS` per `DEMO_RATE_LIMIT_WINDOW_MINUTES` | 5 per 60 minutes, per IP |
| `DEMO_MAX_ACTIVE_USERS` | 100 |
| `DEMO_MAINTENANCE_INTERVAL_MINUTES` | 5 |

`frontend/src/demo/demoConfig.js` also has `DEMO_SESSION_MINUTES` for the text on the demo pages. Keep the two in step.
