# Monolithic Vercel Deployment Guide

Deploy the entire Sales Platform (frontend + backend) as a single Vercel project.

---

## Prerequisites

1. GitHub account with the repository pushed
2. Vercel account (sign up at https://vercel.com)
3. Google Places API key

---

## Deployment Steps

### Step 1: Install Dependencies

```bash
cd frontend
npm install
# or
yarn install
```

This will install the required dependencies including `cheerio` and `node-fetch` for the API functions.

---

### Step 2: Deploy to Vercel

**Option A: Using Vercel Dashboard (Recommended)**

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your GitHub repository: `sales-platform`
4. Configure the project:
   - **Framework Preset:** Create React App
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `build` (auto-detected)
   - **Install Command:** `npm install` (auto-detected)
5. Click **"Deploy"**

**Option B: Using Vercel CLI**

```bash
# Install Vercel CLI globally
npm i -g vercel

# Navigate to frontend folder
cd frontend

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? [Select your account]
# - Link to existing project? N
# - Project name? sales-platform
# - In which directory is your code located? ./
# - Want to override settings? N

# Deploy to production
vercel --prod
```

---

### Step 3: Add Environment Variables

After deployment, add your Google Places API key:

1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Add the following:
   - **Key:** `GOOGLE_PLACES_API_KEY`
   - **Value:** `AIzaSyAjDVE4LPIYGwygm9a1pEN0uinMLR_QQR0`
   - **Environment:** Production, Preview, Development (select all)
3. Click **"Save"**

---

### Step 4: Redeploy

After adding environment variables, trigger a redeploy:

1. Go to **Deployments** tab
2. Click **"..."** on the latest deployment
3. Click **"Redeploy"**
4. Check **"Use existing Build Cache"** (optional)
5. Click **"Redeploy"**

---

## How It Works

### Monolithic Architecture

```
sales-platform/
└── frontend/
    ├── api/                          # Vercel Serverless Functions
    │   ├── analyze-business.js       # Business lookup API
    │   └── analyze-website.js        # Website scraper API
    ├── src/                          # React app source
    ├── public/                       # Static assets
    ├── build/                        # Production build (generated)
    ├── vercel.json                   # Vercel configuration
    └── package.json                  # Dependencies
```

### API Routes

When deployed to Vercel:
- Frontend: `https://your-app.vercel.app`
- API: `https://your-app.vercel.app/api/analyze-business`
- API: `https://your-app.vercel.app/api/analyze-website`

The `/api/*` routes are automatically handled by Vercel Serverless Functions.

---

## Testing Production Deployment

1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Select an industry (Roofing or MedSpa)
3. Toggle **Live Mode** in the header (DEMO → LIVE)
4. Go to **"Your Numbers"** tab
5. Fill in the Live Business Lookup form:
   - Business Name: "Starbucks"
   - City: "Austin"
   - State: "TX"
6. Click **"Analyze Business"**
7. Verify live data loads successfully

---

## Troubleshooting

### API Returns 500 Error

**Check Vercel Function Logs:**
1. Vercel Dashboard → Your Project → **Deployments**
2. Click on the latest deployment
3. Click **"Functions"** tab
4. Click on the failing function to see logs

**Common Issues:**
- Missing `GOOGLE_PLACES_API_KEY` environment variable
- Google API billing not enabled
- API key restrictions preventing access

### Environment Variables Not Working

1. Verify the variable name is exactly `GOOGLE_PLACES_API_KEY`
2. Make sure it's set for all environments (Production, Preview, Development)
3. Redeploy after adding variables
4. Check function logs for the actual error

### Build Failures

1. Check build logs in Vercel Dashboard
2. Verify all dependencies are in `package.json`
3. Make sure `cheerio` and `node-fetch` are installed
4. Try running `npm run build` locally first

### CORS Errors

The API functions include CORS headers by default. If you still see CORS errors:
1. Check browser console for the exact error
2. Verify the API route is `/api/analyze-business` (relative path)
3. Clear browser cache and try again

---

## Local Development

To run the monolithic setup locally:

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The React app will run on `http://localhost:3000`.

**Note:** API functions won't work in local development mode without additional setup. For local testing, you can:
1. Use the separate `api-server` folder (run `npm start` in `api-server/`)
2. Update `DiscoveryPanel.js` to use `http://localhost:3001/api/*` in development
3. Or use Vercel CLI: `vercel dev` (runs both frontend and serverless functions locally)

---

## Updating the Deployment

After making code changes:

```bash
# Commit and push to GitHub
git add .
git commit -m "Your commit message"
git push origin main
```

Vercel will automatically redeploy when you push to the `main` branch.

---

## Production URLs

- **Frontend:** https://your-app.vercel.app
- **API Endpoint 1:** https://your-app.vercel.app/api/analyze-business
- **API Endpoint 2:** https://your-app.vercel.app/api/analyze-website
- **GitHub Repo:** https://github.com/hardik25812/sales-platform

---

## Benefits of Monolithic Deployment

✅ **Single deployment** - No need to manage separate frontend and backend  
✅ **Automatic CORS** - No cross-origin issues  
✅ **Simpler configuration** - One Vercel project  
✅ **Faster development** - Deploy both together  
✅ **Cost-effective** - Single Vercel project, serverless functions scale automatically  

---

## Next Steps

1. ✅ Install dependencies: `cd frontend && npm install`
2. ✅ Deploy to Vercel (Dashboard or CLI)
3. ✅ Add `GOOGLE_PLACES_API_KEY` environment variable
4. ✅ Redeploy to apply environment variables
5. ✅ Test Live Business Lookup feature
6. 🎉 Share your production URL!
