# Deploy SmartFarmAI Now (5 minutes)

Your repo is ready: https://github.com/arun-19-n/smart-farming-platform

## Option 1: Deploy Backend (Render) — 2 minutes

1. Go to https://render.com and sign in (create account if needed).
2. Click "New" → "Web Service".
3. Click "Connect repository" and select `smart-farming-platform`.
4. Fill in:
   - **Name:** `smartfarmai-backend`
   - **Branch:** `main`
   - **Build Command:** `npm install --prefix server`
   - **Start Command:** `node server/server.js`
   - **Plan:** Free
5. Click "Create Web Service".
6. Wait 2-3 minutes for Render to build and deploy.
7. Your backend URL will be: `https://smartfarmai-backend.onrender.com`
8. Test it: Visit `https://smartfarmai-backend.onrender.com/api/health` → should return `{"status":"ok"}`

## Option 2: Deploy Frontend (Vercel) — 2 minutes

1. Go to https://vercel.com and sign in (create account if needed).
2. Click "Add New" → "Project" → "Import Git Repository".
3. Select `smart-farming-platform` repo.
4. Fill in:
   - **Project Name:** `smartfarmai` (this sets your domain to `smartfarmai.vercel.app`)
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add Environment Variable:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://smartfarmai-backend.onrender.com/api`
6. Click "Deploy".
7. Wait 2-3 minutes for Vercel to build and deploy.
8. Your frontend URL will be: `https://smartfarmai.vercel.app`

## Test Everything

Once both are live:

```bash
# Test backend health
curl https://smartfarmai-backend.onrender.com/api/health

# Visit frontend
open https://smartfarmai.vercel.app
```

In browser DevTools → Network tab, confirm API calls go to `https://smartfarmai-backend.onrender.com/api`.

---

**Expected Live URLs:**
- Frontend: https://smartfarmai.vercel.app
- Backend: https://smartfarmai-backend.onrender.com
- Health Check: https://smartfarmai-backend.onrender.com/api/health
