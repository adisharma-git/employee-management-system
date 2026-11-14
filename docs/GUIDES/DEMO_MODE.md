# Demo mode

A public demo where anyone can try WorkAlignr without signing up. A visitor opens `/demo`, types a name (optional) and lands on the dashboard of a sample company with 17 people. The session lasts 15 minutes. Afterwards the visitor's account and everything they created are deleted.

The demo runs as a **separate deployment with its own database**. It never touches production data.

## How it works

| Part | What it does |
|---|---|
| `POST /api/auth/demo` | Creates a temporary account (Demo role, 15-minute token) and returns a login. Limited to 5 starts per IP per hour and 100 active demos at a time. |
| Demo role | Admin-style access for exploring, with no deletes and no role, permission, leave-type or notification changes. Reset to its defined list on every boot. |
| Sample company | 17 employees, about two months of attendance, leave requests (5 pending, ready to approve), two months of payslips, 4 projects with 18 tasks, announcements, meetings and holidays. Dates are relative to the reset day, so the data always looks current. |
| Maintenance (every 5 minutes) | 1. Deletes expired demo accounts and their data.<br>2. Rebuilds the sample company once a day.<br>3. Otherwise tops up today's attendance, so people check in and out as the day goes on. |
| Emails | Never sent in demo mode. They're logged as `[demo] Email suppressed: ...`. |

Code: `backend/src/constants/demo.js` (limits), `backend/src/constants/demoCompany.js` (sample data), `backend/src/utils/demo*.js`, `frontend/src/demo/`, `frontend/src/pages/Demo*.jsx`.

### The daily reset

Visitors share one company, so their changes (approved leave, payroll runs, new holidays, moved tasks) stay visible to the next visitors. Once a day the reset empties every table except `roles` and rebuilds the sample company.

- It's due when the company wasn't built today (UTC; the day changes at 05:30 IST).
- It runs at the first maintenance run when **nobody is in a demo**, so it never ends anyone's session.
- It runs in one transaction. A failure leaves the old data in place.
- On a brand-new database it runs at server start, so you don't need a separate seed step.

To rebuild immediately (for example, after someone posts something unpleasant), run this from `backend/` with the **demo** database in `DATABASE_URL`:

```bash
DEMO_MODE=true npm run demo:reset
```

This also removes visitors who are in the middle of a demo.

**Safety guard:** the reset (automatic or manual) refuses to run, and changes nothing, if the database contains any account that is neither a demo visitor nor a sample-company account (`@demo-company.test`). If a `DEMO_MODE` server is ever pointed at the real database by mistake, it logs `Refusing to reset the demo data...` once and leaves the data alone. It doesn't stop demo visitors being created there, though, so still keep the databases separate.

## Deploying

You need three things: a demo database, a demo backend and a demo frontend. Your main site then links to the demo.

1. **Create a new Postgres database** (for example, a new Supabase project). Don't reuse the production one.
2. **Apply the migrations** to it from `backend/`:
   ```bash
   DATABASE_URL="<demo db url>" DIRECT_URL="<demo db direct url>" npx prisma migrate deploy
   ```
3. **Deploy the backend a second time** (for example, a second Render web service from the same repo, root `backend`, start command `npm start`) with the variables below. On first start it logs `[demo] Sample company rebuilt: ...`.
4. **Deploy the frontend a second time** (a second Vercel project, root `frontend`) with the variables below.
5. **Link the demo from the main site:** set `VITE_DEMO_URL` on the main frontend and redeploy. The "Live demo" links on the landing page, navbar and login page appear only when this is set.
6. **Check it:** open `<demo frontend>/demo`, start a demo and confirm the Employees tab lists the sample staff.

### Environment variables

**Demo backend**

| Variable | Value |
|---|---|
| `DEMO_MODE` | `true` |
| `DATABASE_URL`, `DIRECT_URL` | The demo database |
| `JWT_SECRET` | A new secret, different from production |
| `FRONTEND_URL` | The demo frontend's origin, e.g. `https://demo.workalignr.in` (CORS) |
| `PORT` | As your host requires |
| `ENABLE_SELF_REGISTRATION` | Leave unset. A registered account isn't a demo account, so the reset would refuse to run. |
| `EMAIL_USER`, `EMAIL_PASS` | Not needed (emails are off) |

**Demo frontend**

| Variable | Value |
|---|---|
| `VITE_API_URL` | The demo backend, e.g. `https://<demo-backend>/api` |
| `VITE_DEMO_MODE` | `true` |

**Main (production) frontend**

| Variable | Value |
|---|---|
| `VITE_DEMO_URL` | `https://<demo frontend>/demo` |

### Hosting notes

- **A long-running host (such as Render) is best.** Maintenance runs every 5 minutes. On serverless hosts it runs only when someone starts a demo, so expired accounts wait for the next visitor, and that day's first visitor waits a few seconds while the company is rebuilt.
- **Free tiers that sleep:** the first request after a sleep is slow. On waking, the server runs maintenance before taking requests.
- **The per-IP limit is kept in memory.** It resets when the server restarts and isn't shared between instances.
- `backend/vercel.json`'s crons aren't needed for the demo.

## Running it locally

Use a local database, never the one in `backend/.env`:

```bash
# backend/
DATABASE_URL=<local demo db> DIRECT_URL=<local demo db> DEMO_MODE=true FRONTEND_URL=http://localhost:5173 npm run dev
# frontend/
VITE_DEMO_MODE=true VITE_API_URL=http://localhost:5000/api npm run dev
```

Then open http://localhost:5173/demo.

## Limits

All in `backend/src/constants/demo.js`:

| Constant | Default |
|---|---|
| `DEMO_SESSION_MINUTES` | 15 |
| `DEMO_RATE_LIMIT_MAX_SESSIONS` per `DEMO_RATE_LIMIT_WINDOW_MINUTES` | 5 per 60 minutes, per IP |
| `DEMO_MAX_ACTIVE_USERS` | 100 |
| `DEMO_MAINTENANCE_INTERVAL_MINUTES` | 5 |

`frontend/src/demo/demoConfig.js` also has `DEMO_SESSION_MINUTES` for the text on the demo pages. Keep the two in step.
