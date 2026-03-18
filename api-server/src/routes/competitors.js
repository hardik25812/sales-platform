const express = require('express');
const router = express.Router();
const { findPlace, searchNearbyCompetitors } = require('../services/google-places');
const { getMarketData } = require('../services/market-data');

router.post('/', async (req, res) => {
  try {
    const { businessName, city, state, industry, lat, lng } = req.body;

    let latitude = lat;
    let longitude = lng;

    // If no coordinates, look up the business first
    if (!latitude || !longitude) {
      if (!businessName) {
        return res.status(400).json({ success: false, error: 'businessName or lat/lng required' });
      }
      const place = await findPlace(businessName, city || '', state || '');
      if (!place || !place.geometry) {
        return res.json({ success: false, error: 'Could not locate business' });
      }
      latitude = place.geometry.location.lat;
      longitude = place.geometry.location.lng;
    }

    const nearby = await searchNearbyCompetitors(latitude, longitude, industry || 'roofing');

    const competitors = nearby
      .filter(c => c.name !== businessName)
      .map(c => ({
        name: c.name,
        reviews: c.user_ratings_total || 0,
        rating: c.rating || 0,
        address: c.vicinity || '',
      }))
      .sort((a, b) => b.reviews - a.reviews)
      .slice(0, 5);

    const marketData = getMarketData(industry || 'roofing', nearby.length);

    res.json({
      success: true,
      competitors,
      marketData,
    });
  } catch (err) {
    console.error('competitors error:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
