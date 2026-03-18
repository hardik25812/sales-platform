const fetch = require('node-fetch');

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const BASE_URL = 'https://maps.googleapis.com/maps/api/place';

async function findPlace(businessName, city, state) {
  if (!API_KEY) throw new Error('GOOGLE_PLACES_API_KEY not set');
  
  const query = `${businessName} ${city} ${state}`.trim();
  console.log('[Google Places] Searching for:', query);
  
  const textSearchUrl = `${BASE_URL}/textsearch/json?query=${encodeURIComponent(query)}&key=${API_KEY}`;
  const res = await fetch(textSearchUrl);
  const data = await res.json();
  
  console.log('[Google Places] API Status:', data.status);
  
  if (data.status === 'REQUEST_DENIED') {
    console.error('[Google Places] API Error:', data.error_message);
    throw new Error(`Google API Error: ${data.error_message || 'Request denied'}`);
  }
  
  if (data.status === 'ZERO_RESULTS') {
    return null;
  }
  
  if (data.results && data.results.length > 0) {
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

function estimateMarketData(industry) {
  const baseData = {
    roofing: { searchVolume: 2400, competitorCount: 47, estimatedCPC: 35 },
    medspa: { searchVolume: 1800, competitorCount: 32, estimatedCPC: 28 },
    hvac: { searchVolume: 3200, competitorCount: 55, estimatedCPC: 42 },
    dental: { searchVolume: 2800, competitorCount: 48, estimatedCPC: 38 },
  };
  return baseData[industry] || { searchVolume: 2000, competitorCount: 40, estimatedCPC: 30 };
}

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { businessName, city, state, industry } = req.body;

    if (!businessName) {
      return res.status(400).json({ success: false, error: 'Business name is required' });
    }

    const place = await findPlace(businessName, city, state);
    if (!place) {
      return res.status(404).json({ success: false, error: 'Business not found' });
    }

    const details = await getPlaceDetails(place.place_id);
    if (!details) {
      return res.status(404).json({ success: false, error: 'Business details not found' });
    }

    const hours = {};
    if (details.opening_hours && details.opening_hours.weekday_text) {
      details.opening_hours.weekday_text.forEach(day => {
        const [dayName, ...timeParts] = day.split(': ');
        hours[dayName.toLowerCase()] = timeParts.join(': ');
      });
    }

    const business = {
      name: details.name,
      address: details.formatted_address,
      phone: details.formatted_phone_number || null,
      website: details.website || null,
      hours,
      afterHoursGap: calculateAfterHoursGap(details.opening_hours),
      reviews: {
        count: details.user_ratings_total || 0,
        rating: details.rating || 0,
        responseRate: 0,
        recentSentiment: details.rating >= 4.5 ? 'positive' : details.rating >= 3.5 ? 'mixed' : 'negative',
      },
    };

    const marketData = estimateMarketData(industry);

    res.status(200).json({
      success: true,
      business,
      marketData,
    });
  } catch (error) {
    console.error('analyze-business error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
};
