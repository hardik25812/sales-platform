const fetch = require('node-fetch');

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const BASE_URL = 'https://maps.googleapis.com/maps/api/place';

async function findPlace(businessName, city, state) {
  if (!API_KEY) throw new Error('GOOGLE_PLACES_API_KEY not set');
  
  const query = `${businessName} ${city} ${state}`.trim();
  console.log('[Google Places] Searching for:', query);
  
  // Try Text Search API first (more reliable)
  const textSearchUrl = `${BASE_URL}/textsearch/json?query=${encodeURIComponent(query)}&key=${API_KEY}`;
  const res = await fetch(textSearchUrl);
  const data = await res.json();
  
  console.log('[Google Places] API Status:', data.status);
  
  if (data.status === 'REQUEST_DENIED') {
    console.error('[Google Places] API Error:', data.error_message);
    throw new Error(`Google API Error: ${data.error_message || 'Request denied. Check API key and enabled APIs.'}`);
  }
  
  if (data.status === 'ZERO_RESULTS') {
    console.log('[Google Places] No results found');
    return null;
  }
  
  if (data.results && data.results.length > 0) {
    console.log('[Google Places] Found:', data.results[0].name);
    return {
      place_id: data.results[0].place_id,
      name: data.results[0].name,
      formatted_address: data.results[0].formatted_address,
      geometry: data.results[0].geometry,
    };
  }
  
  return null;
}

async function getPlaceDetails(placeId) {
  if (!API_KEY) throw new Error('GOOGLE_PLACES_API_KEY not set');
  const fields = 'name,formatted_address,formatted_phone_number,website,opening_hours,rating,user_ratings_total,reviews,url';
  const url = `${BASE_URL}/details/json?place_id=${placeId}&fields=${fields}&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.result || null;
}

async function searchNearbyCompetitors(lat, lng, industry, radius = 8000) {
  if (!API_KEY) throw new Error('GOOGLE_PLACES_API_KEY not set');
  const keywordMap = {
    roofing: 'roofing contractor',
    medspa: 'medspa aesthetics',
    hvac: 'hvac plumbing',
    dental: 'dentist',
    auto_dealership: 'car dealership',
    construction: 'general contractor',
    law_firm: 'law firm attorney',
    real_estate: 'real estate agent',
    landscaping: 'landscaping',
    pools: 'pool builder',
  };
  const keyword = keywordMap[industry] || industry;
  const url = `${BASE_URL}/nearbysearch/json?location=${lat},${lng}&radius=${radius}&keyword=${encodeURIComponent(keyword)}&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return (data.results || []).slice(0, 10);
}

function calculateAfterHoursGap(openingHours) {
  if (!openingHours || !openingHours.periods) return 'Unknown';
  const totalWeekHours = 168;
  let openHours = 0;
  for (const period of openingHours.periods) {
    if (period.open && period.close) {
      const openTime = period.open.time;
      const closeTime = period.close.time;
      const hours = (parseInt(closeTime.slice(0, 2)) * 60 + parseInt(closeTime.slice(2))) -
                    (parseInt(openTime.slice(0, 2)) * 60 + parseInt(openTime.slice(2)));
      openHours += hours / 60;
    }
  }
  const closedPercent = Math.round(((totalWeekHours - openHours) / totalWeekHours) * 100);
  return `${closedPercent}% of the week you're unreachable`;
}

function analyzeReviews(reviews) {
  if (!reviews || reviews.length === 0) {
    return { recentSentiment: 'unknown', respondedCount: 0, responseRate: 0 };
  }
  const recent = reviews.slice(0, 5);
  const avgRating = recent.reduce((sum, r) => sum + r.rating, 0) / recent.length;
  const sentiment = avgRating >= 4.5 ? 'positive' : avgRating >= 3.5 ? 'mixed' : 'negative';
  // Google doesn't show owner responses in the API easily, estimate 0
  return { recentSentiment: sentiment, respondedCount: 0, responseRate: 0 };
}

module.exports = { findPlace, getPlaceDetails, searchNearbyCompetitors, calculateAfterHoursGap, analyzeReviews };
