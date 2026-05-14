# Railway Deployment: Steps 4 & 5 (Visual Guide)

## Step 4: Create Two Services in Railway

### 4a. Deploy Backend Service

```
Railway Dashboard
├── Your Project (smart-farming-platform)
│
└── Click "New" button (top-right corner)
    │
    └── Select "Dockerfile"
        │
        └── Dockerfile path: Dockerfile.backend
            │
            └── Click "Deploy"
                │
                └── ✅ Service: smartfarmai-backend
                    └── URL: https://smartfarmai-backend.railway.app
```

**What happens:**
1. Railway reads `Dockerfile.backend` from your repo
2. Builds the Express server image
3. Deploys it and assigns a public URL
4. Your backend API is now live at the generated URL

**Expected output in Railway:**
```
Service Name: smartfarmai-backend
Status: ✅ Deployed
URL: https://smartfarmai-backend.railway.app
```

**Test it works:**
```bash
curl https://smartfarmai-backend.railway.app/api/health
# Response: {"status":"ok"}
```

---

### 4b. Deploy Frontend Service

**In the SAME Railway project**, repeat:

```
Railway Dashboard
├── Your Project (smart-farming-platform)
├── smartfarmai-backend ✅ (already deployed)
│
└── Click "New" button again
    │
    └── Select "Dockerfile"
        │
        └── Dockerfile path: Dockerfile.frontend
            │
            └── Click "Deploy"
                │
                └── ⏳ Service: smartfarmai-frontend
                    └── URL: https://smartfarmai-frontend.railway.app
                    └── ⚠️ Will FAIL without env var (see Step 5)
```

**What happens:**
1. Railway builds the React app with Vite
2. Creates a production build in `dist/`
3. Serves it via a Node server using `serve`
4. Frontend is now live, but needs env var to work

---

## Step 5: Set Environment Variable on Frontend

### Why This Step is Critical

The frontend needs to know where the backend API lives. Without this:
- ❌ Frontend can't call `/api/` endpoints
- ❌ Sign-up, login, and all data operations fail
- ❌ You see "Failed to fetch" errors

### How to Set It

**In Railway Dashboard:**

```
Your Project
│
├── smartfarmai-backend ✅
│
└── smartfarmai-frontend (select this service)
    │
    └── Click "Settings" tab (or gear icon)
        │
        └── Scroll to "Environment Variables" section
            │
            └── Click "Add Variable" or "New Variable" button
                │
                ├── Key:   VITE_API_URL
                │
                └── Value: https://smartfarmai-backend.railway.app/api
                    │
                    └── Click "Save" or "Add"
                        │
                        └── Railway auto-redeploys frontend
                            │
                            └── ✅ Frontend now knows where backend is
```

### The Environment Variable Details

**Key:** `VITE_API_URL`
- This is the exact name your React app expects (defined in `.env.example`)
- Vite will inject this at build time

**Value:** `https://smartfarmai-backend.railway.app/api`
- Replace `smartfarmai-backend.railway.app` with YOUR actual backend URL from Step 4a
- Keep `/api` at the end (that's where your Express routes are)

**Example (actual values):**
```
VITE_API_URL = https://smartfarmai-backend.railway.app/api
```

---

## Verification Checklist

After Steps 4 & 5, verify everything works:

### 1. Backend Health Check
```bash
curl https://smartfarmai-backend.railway.app/api/health
```
Expected: `{"status":"ok"}`

### 2. Frontend Loads
- Open: https://smartfarmai-frontend.railway.app
- Page should load (no blank/error page)

### 3. API Calls Work
- Open DevTools (F12) → Network tab
- Click "Get Started" or any button
- You should see API calls to `https://smartfarmai-backend.railway.app/api/...`
- Calls should return data (status 200)

### 4. Sign-Up Test
- Try creating an account
- If it works → ✅ Frontend ↔ Backend communication is working

---

## Common Issues & Fixes

### Issue: Frontend page loads but shows errors
**Cause:** `VITE_API_URL` not set  
**Fix:** Go back to Step 5, add the environment variable, wait for redeploy (2-3 min)

### Issue: API calls fail (Network tab shows 404 or 500)
**Cause:** Wrong URL in `VITE_API_URL`  
**Fix:** Verify the backend URL is correct from Step 4a, re-set the env var

### Issue: Backend returns 404
**Cause:** Backend not deployed properly  
**Fix:** In Step 4a, check Railway build logs for errors, redeploy

### Issue: Takes too long to deploy
**Cause:** Normal—first builds are slower  
**Fix:** Wait 3-5 minutes, then refresh browser

---

## Summary

| Step | What | Result |
|------|------|--------|
| 4a | Deploy `Dockerfile.backend` | Backend API live at `https://smartfarmai-backend.railway.app` |
| 4b | Deploy `Dockerfile.frontend` | Frontend app live at `https://smartfarmai-frontend.railway.app` |
| 5 | Set `VITE_API_URL` env var | Frontend knows where backend is; full app works |

---

## Need Help?

- Check Railway build logs if deployment fails
- Check browser DevTools → Console for frontend errors
- Verify URLs are correct (copy-paste from Railway dashboard)
- Make sure env var is saved and redeploy is complete

**You're ready to deploy!** 🚀
