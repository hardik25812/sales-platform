const express = require('express');
const router = express.Router();
const { findPlace, getPlaceDetails, calculateAfterHoursGap, analyzeReviews } = require('../services/google-places');
const { getMarketData } = require('../services/market-data');

router.post('/', async (req, res) => {
  try {
    const { businessName, city, state, industry, googleMapsUrl } = req.body;

    if (!businessName && !googleMapsUrl) {
      return res.status(400).json({ success: false, error: 'businessName or googleMapsUrl required' });
    }

    // Find the place
    let placeId;
    if (googleMapsUrl) {
      // Extract place ID from Google Maps URL if possible
      const match = googleMapsUrl.match(/place_id[=:]([^&]+)/);
      placeId = match ? match[1] : null;
    }

    if (!placeId && businessName) {
      const place = await findPlace(businessName, city || '', state || '');
      if (!place) {
        return res.json({ success: false, error: 'Business not found' });
      }
      placeId = place.place_id;
    }

    if (!placeId) {
      return res.json({ success: false, error: 'Could not resolve business' });
    }

    // Get place details
    const details = await getPlaceDetails(placeId);
    if (!details) {
      return res.json({ success: false, error: 'Could not fetch business details' });
    }

    // Analyze reviews
    const reviewAnalysis = analyzeReviews(details.reviews);

    // Calculate after-hours gap
    const afterHoursGap = calculateAfterHoursGap(details.opening_hours);

    // Build hours object
    const hours = {};
    if (details.opening_hours && details.opening_hours.weekday_text) {
      const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      details.opening_hours.weekday_text.forEach((text, i) => {
        hours[days[i]] = text.split(': ').slice(1).join(': ') || 'Closed';
      });
    }

    // Get market data (estimate competitor count from nearby search)
    const marketData = getMarketData(industry || 'roofing', 47); // Default estimate

    res.json({
      success: true,
      business: {
        name: details.name,
        address: details.formatted_address,
        phone: details.formatted_phone_number || null,
        website: details.website || null,
        hours,
        afterHoursGap,
        reviews: {
          count: details.user_ratings_total || 0,
          rating: details.rating || 0,
          responseRate: reviewAnalysis.responseRate,
          recentSentiment: reviewAnalysis.recentSentiment,
        },
      },
      marketData,
    });
  } catch (err) {
    console.error('analyze-business error:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
