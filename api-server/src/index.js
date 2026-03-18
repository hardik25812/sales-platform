require('dotenv').config();
const express = require('express');
const cors = require('cors');
const analyzeBusinessRoute = require('./routes/analyze-business');
const analyzeWebsiteRoute = require('./routes/analyze-website');
const competitorsRoute = require('./routes/competitors');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000')
  .split(',')
  .map(s => s.trim());

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all in dev; tighten in production
    }
  },
}));

app.use(express.json());

// Routes
app.use('/api/analyze-business', analyzeBusinessRoute);
app.use('/api/analyze-website', analyzeWebsiteRoute);
app.use('/api/competitors', competitorsRoute);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
