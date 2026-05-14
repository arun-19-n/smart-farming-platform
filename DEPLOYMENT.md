Deployment Guide — Free hosting on Vercel (frontend) + Render (backend)

Goal
- Deploy frontend to Vercel with project name `smartfarmai` so the site is available at `https://smartfarmai.vercel.app` (Vercel subdomain).
- Deploy backend to Render (free web service) with a name like `smartfarmai-backend` and obtain a stable HTTPS API URL.
- Wire the frontend environment `VITE_API_URL` to point at the backend URL.

Assumptions
- You have a GitHub account and can push this repository to GitHub.
- You can create free accounts on Vercel and Render and connect them to GitHub.

Why this approach
- Vercel provides a simple static-hosting workflow for Vite apps and will serve `smartfarmai.vercel.app` when you choose that project name.
- Render provides a free web service that can host the Express server and serve the SQLite file for demo purposes.
- This keeps the frontend and backend separate and straightforward to configure.

Checklist (high level)
1. Push repo to GitHub (new remote `origin`).
2. Create a Vercel project from GitHub for the frontend; set project name to `smartfarmai`.
3. Create a Render web service from GitHub for the backend; name it `smartfarmai-backend`.
4. Set environment variables on both services (see details below).
5. Verify live URLs and update `VITE_API_URL` on Vercel if needed.

Detailed Steps

1) Prepare repository
- Commit and push all changes to GitHub. Example:

```bash
git add -A
git commit -m "Prepare for deployment: improved README and assets"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2) Frontend: Vercel (static)
- Sign in to Vercel and choose "Import Project" → connect to the GitHub repo.
- During import, set:
  - Project Name: `smartfarmai` (this determines the vercel.app subdomain)
  - Root Directory: leave blank (repo root) or `.`
  - Framework Preset: `Vite`
  - Build Command: `npm run build`
  - Output Directory: `dist`
- Add Environment Variable (Production):
  - `VITE_API_URL` = `https://smartfarmai-backend.onrender.com/api` (placeholder until backend is deployed)
- Deploy. After deployment, the site will be reachable at `https://smartfarmai.vercel.app`.

3) Backend: Render (free)
- Sign in to Render and click "New" → "Web Service" → connect GitHub repo and select the backend folder.
- Service settings:
  - Name: `smartfarmai-backend`
  - Environment: `Node`
  - Build Command: `cd server && npm install` (Render may auto-install)
  - Start Command: `node server/server.js` OR set `Start Command` to `npm start` inside `server` if `server/package.json` is configured.
  - Instance Type: `Free` (if available)
- Environment Variables on Render (Service settings):
  - `PORT` — leave unset (Render will set)
  - Any other secrets (none required by default for demo).
- Deploy. Render will provide a URL like `https://smartfarmai-backend.onrender.com`.

4) Final wiring
- On Vercel project settings → Environment Variables (Production), set `VITE_API_URL` to:
  `https://smartfarmai-backend.onrender.com/api`
- Redeploy the Vercel project to pick up the new env.

5) Verification
- Visit `https://smartfarmai.vercel.app` and confirm the frontend loads.
- Use the browser console or network tab to confirm API calls go to `https://smartfarmai-backend.onrender.com/api` and the backend returns `{"status":"ok"}` for `/api/health`.

Notes & Caveats
- SQLite is a file-based DB saved under `server/farm.db`. On free hosts the filesystem may be ephemeral after redeploys; for a persistent production database consider replacing SQLite with Postgres (Render or Supabase) or Supabase free tier.
- For a custom top-level domain like `smartfarmai.com` you must purchase the domain and configure DNS records on Vercel/Render.
- For a free demo domain, using `smartfarmai.vercel.app` (frontend) and `smartfarmai-backend.onrender.com` (backend) is the simplest approach.

Optional improvements
- Add a small `vercel.json` if you want API proxying through Vercel to avoid CORS (not necessary since backend allows all origins).
- Replace SQLite with a managed DB for persistent data.

If you want, I can:
- Push a small `DEPLOY.md` summary to the repo (done),
- Create a `vercel.json` and example Render `service.yaml` to simplify automated deploys,
- Or (if you grant me access) attempt the deployment steps and report back with the live URLs.
