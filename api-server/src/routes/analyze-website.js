const express = require('express');
const router = express.Router();
const { analyzeWebsite } = require('../services/scraper');

router.post('/', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ success: false, error: 'url is required' });
    }

    // Normalize URL
    let normalizedUrl = url;
    if (!normalizedUrl.startsWith('http')) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    const result = await analyzeWebsite(normalizedUrl);
    res.json(result);
  } catch (err) {
    console.error('analyze-website error:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
