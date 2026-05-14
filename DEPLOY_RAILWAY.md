# Deploy SmartFarmAI to Railway (Easiest)

Railway is the simplest free option — no secrets, one click, auto-generated URLs.

## Deploy Backend to Railway

1. Go to https://railway.app and sign in with GitHub.
2. Click "New Project" → "Deploy from GitHub repo".
3. Select `smart-farming-platform` repo.
4. In the Railway dashboard, click "New" → "Dockerfile" service.
5. Upload or paste `Dockerfile.backend`.
6. Railway will auto-detect and deploy.
7. Get your backend URL from Railway dashboard (e.g., `https://smartfarmai-backend.railway.app`).

## Deploy Frontend to Railway

1. In the same Railway project, click "New" → "Dockerfile" service.
2. Upload or paste `Dockerfile.frontend`.
3. Add environment variable in Railway dashboard:
   - `VITE_API_URL` = `https://smartfarmai-backend.railway.app/api` (use the backend URL from step 7 above)
4. Deploy.
5. Get your frontend URL from Railway dashboard (e.g., `https://smartfarmai-frontend.railway.app`).

## Test

```bash
curl https://smartfarmai-backend.railway.app/api/health
# → {"status":"ok"}

open https://smartfarmai-frontend.railway.app
```

---

## Alternative: Docker Compose (Local Testing)

Test everything locally before deploying:

```bash
docker-compose up
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
```

---

## Notes

- Railway provides free tier with generous limits.
- No credit card required for initial deployment.
- Environment variables and secrets can be managed in Railway dashboard.
- Automatic redeploys on git push if connected.
