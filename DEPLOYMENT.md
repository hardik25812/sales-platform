# Deployment Guide - Sales Platform

## Overview
This guide covers deploying the Sales Platform to Vercel (frontend) and Vercel/Railway (API server).

---

## Part 1: Deploy API Server First

### Option A: Deploy API to Vercel

1. **Create `vercel.json` in api-server folder:**

```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/index.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

2. **Install Vercel CLI:**
```bash
npm i -g vercel
```

3. **Deploy API Server:**
```bash
cd api-server
vercel
```

4. **Set Environment Variables in Vercel Dashboard:**
   - Go to: https://vercel.com/dashboard
   - Select your API project
   - Settings → Environment Variables
   - Add:
     - `GOOGLE_PLACES_API_KEY` = `AIzaSyAjDVE4LPIYGwygm9a1pEN0uinMLR_QQR0`
     - `PORT` = `3001`
     - `ALLOWED_ORIGINS` = `https://your-frontend.vercel.app`

5. **Redeploy after adding env vars:**
```bash
vercel --prod
```

6. **Copy your API URL** (e.g., `https://sales-platform-api.vercel.app`)

---

### Option B: Deploy API to Railway (Recommended for Node.js)

1. **Go to:** https://railway.app
2. **Click "New Project" → "Deploy from GitHub repo"**
3. **Select your repository**
4. **Configure:**
   - Root Directory: `api-server`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. **Add Environment Variables:**
   - `GOOGLE_PLACES_API_KEY` = `AIzaSyAjDVE4LPIYGwygm9a1pEN0uinMLR_QQR0`
   - `PORT` = `3001`
   - `ALLOWED_ORIGINS` = `https://your-frontend.vercel.app`
6. **Deploy and copy the URL** (e.g., `https://sales-platform-api.up.railway.app`)

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Update Environment Variables

1. **Update `frontend/.env.production`:**
```bash
REACT_APP_API_URL=https://your-api-server-url-here
REACT_APP_ENV=production
```

Replace `your-api-server-url-here` with your actual API URL from Part 1.

### Step 2: Commit Changes

```bash
cd sales-platform
git add .
git commit -m "Configure production API URL"
git push origin main
```

### Step 3: Deploy to Vercel

**Option 1: Using Vercel Dashboard (Easiest)**

1. Go to: https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repository
4. Configure:
   - **Framework Preset:** Create React App
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `build` (auto-detected)
5. Click "Deploy"
6. Wait for deployment to complete

**Option 2: Using Vercel CLI**

```bash
cd frontend
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? `sales-platform`
- In which directory is your code located? `./`
- Want to override settings? **N**

Deploy to production:
```bash
vercel --prod
```

### Step 4: Configure Environment Variables in Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - **Key:** `REACT_APP_API_URL`
   - **Value:** `https://your-api-server-url` (from Part 1)
   - **Environment:** Production
3. Click "Save"
4. Redeploy:
   - Go to Deployments tab
   - Click "..." on latest deployment
   - Click "Redeploy"

---

## Part 3: Update CORS in API Server

After deploying frontend, update the API server's CORS settings:

1. **Update `api-server/.env` or Railway/Vercel env vars:**
```
ALLOWED_ORIGINS=https://your-frontend.vercel.app,http://localhost:3000
```

2. **Redeploy API server** to pick up the new CORS settings

---

## Testing Production Deployment

1. Visit your frontend URL: `https://your-app.vercel.app`
2. Select an industry (Roofing/MedSpa)
3. Toggle **Live Mode**
4. Go to "Your Numbers" tab
5. Test Live Business Lookup with a real business
6. Verify data loads from production API

---

## Troubleshooting

### API CORS Errors
- Make sure `ALLOWED_ORIGINS` in API server includes your frontend URL
- Check browser console for exact error
- Verify API server is deployed and running

### Environment Variables Not Working
- Redeploy after adding env vars
- Check Vercel/Railway logs for errors
- Verify env var names match exactly (case-sensitive)

### Build Failures
- Check Vercel build logs
- Ensure `package.json` has correct scripts
- Verify all dependencies are in `package.json`

### API Key Issues
- Verify Google Places API key is set correctly
- Check Google Cloud Console for API restrictions
- Ensure billing is enabled

---

## URLs After Deployment

- **Frontend:** https://your-app.vercel.app
- **API Server:** https://your-api.vercel.app or https://your-api.up.railway.app
- **GitHub Repo:** https://github.com/hardik25812/sales-platform

---

## Local Development

To run locally after deployment:

```bash
# Terminal 1 - API Server
cd api-server
npm start

# Terminal 2 - Frontend
cd frontend
yarn start
```

Frontend will use `http://localhost:3001` for API in development mode.
