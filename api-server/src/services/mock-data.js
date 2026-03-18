// Mock data generator for when Google API is unavailable

function generateMockBusinessData(businessName, city, state, industry) {
  const industries = {
    roofing: { type: 'Roofing Contractor', avgRating: 4.6 },
    medspa: { type: 'Medical Spa', avgRating: 4.8 },
    hvac: { type: 'HVAC Service', avgRating: 4.5 },
    dental: { type: 'Dental Office', avgRating: 4.7 },
  };

  const industryData = industries[industry] || { type: 'Business', avgRating: 4.5 };
  const reviewCount = Math.floor(Math.random() * 200) + 50;

  return {
    success: true,
    business: {
      name: businessName || 'Sample Business',
      address: `${Math.floor(Math.random() * 9000) + 1000} Main St, ${city || 'Austin'}, ${state || 'TX'} ${Math.floor(Math.random() * 90000) + 10000}`,
      phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      website: `https://www.${(businessName || 'sample').toLowerCase().replace(/\s+/g, '')}.com`,
      hours: {
        monday: '8:00 AM – 6:00 PM',
        tuesday: '8:00 AM – 6:00 PM',
        wednesday: '8:00 AM – 6:00 PM',
        thursday: '8:00 AM – 6:00 PM',
        friday: '8:00 AM – 6:00 PM',
        saturday: '9:00 AM – 2:00 PM',
        sunday: 'Closed',
      },
      afterHoursGap: '62% of the week you\'re unreachable',
      reviews: {
        count: reviewCount,
        rating: industryData.avgRating + (Math.random() * 0.4 - 0.2),
        responseRate: Math.floor(Math.random() * 30),
        recentSentiment: reviewCount > 100 ? 'positive' : 'mixed',
      },
    },
    marketData: {
      searchVolume: Math.floor(Math.random() * 3000) + 1500,
      competitorCount: Math.floor(Math.random() * 40) + 30,
      estimatedCPC: Math.floor(Math.random() * 30) + 25,
    },
    _isMockData: true,
  };
}

module.exports = { generateMockBusinessData };
