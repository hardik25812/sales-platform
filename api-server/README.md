# Sales Platform API Server

Express.js API server for live business intelligence and data lookup.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Add your Google Places API key to `.env`:
```
GOOGLE_PLACES_API_KEY=your_actual_api_key_here
PORT=3001
ALLOWED_ORIGINS=http://localhost:3000
```

## Running

```bash
npm start
```

Server will run on `http://localhost:3001`

## Testing the API

### Health Check
```bash
curl http://localhost:3001/api/health
```

### Analyze Business (without API key - will fail gracefully)
```bash
curl -X POST http://localhost:3001/api/analyze-business \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "Elite Roofing",
    "city": "Austin",
    "state": "TX",
    "industry": "roofing"
  }'
```

### Analyze Website
```bash
curl -X POST http://localhost:3001/api/analyze-website \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com"
  }'
```

## Testing from the UI

1. Make sure both servers are running:
   - Frontend: `http://localhost:3000`
   - API: `http://localhost:3001`

2. In the app:
   - Select an industry (e.g., Roofing)
   - Toggle **Live Mode** in the header (DEMO → LIVE)
   - Go to "Your Numbers" tab
   - You'll see the **Live Business Lookup** panel
   - Fill in:
     - Business Name: "Elite Roofing" (or any business)
     - City: "Austin"
     - State: "TX"
     - Website: "https://example.com" (optional)
   - Click **Analyze Business**

3. What happens:
   - **Without Google API key**: You'll get an error message, but the app gracefully falls back to demo data
   - **With Google API key**: Real business data is fetched and displayed

## Getting a Google Places API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Places API**
4. Go to Credentials → Create Credentials → API Key
5. Copy the key to your `.env` file

**Note**: Google Places API has a free tier with $200/month credit.

## Endpoints

- `GET /api/health` - Health check
- `POST /api/analyze-business` - Fetch business data from Google Places
- `POST /api/analyze-website` - Scrape and analyze website
- `POST /api/competitors` - Find nearby competitors
