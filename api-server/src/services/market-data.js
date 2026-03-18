// Estimated market data by industry and city size
// These are reasonable estimates used when real data isn't available

const INDUSTRY_CPC = {
  roofing: { low: 25, mid: 35, high: 55 },
  medspa: { low: 15, mid: 28, high: 45 },
  hvac: { low: 20, mid: 32, high: 48 },
  dental: { low: 18, mid: 30, high: 50 },
  auto_dealership: { low: 12, mid: 22, high: 38 },
  construction: { low: 18, mid: 28, high: 42 },
  law_firm: { low: 40, mid: 65, high: 120 },
  real_estate: { low: 8, mid: 15, high: 28 },
  landscaping: { low: 10, mid: 18, high: 30 },
  pools: { low: 20, mid: 35, high: 55 },
};

const INDUSTRY_SEARCH_VOLUME = {
  roofing: { small: 800, medium: 2400, large: 6000 },
  medspa: { small: 600, medium: 1800, large: 4500 },
  hvac: { small: 1200, medium: 3500, large: 8000 },
  dental: { small: 1500, medium: 4000, large: 10000 },
  auto_dealership: { small: 2000, medium: 5000, large: 12000 },
  construction: { small: 500, medium: 1500, large: 4000 },
  law_firm: { small: 800, medium: 2500, large: 6000 },
  real_estate: { small: 3000, medium: 8000, large: 20000 },
  landscaping: { small: 600, medium: 1800, large: 4500 },
  pools: { small: 400, medium: 1200, large: 3000 },
};

function getMarketData(industry, competitorCount) {
  // Estimate city size from competitor count
  const citySize = competitorCount < 20 ? 'small' : competitorCount < 50 ? 'medium' : 'large';
  const cpcTier = citySize === 'small' ? 'low' : citySize === 'medium' ? 'mid' : 'high';

  const cpc = INDUSTRY_CPC[industry] || INDUSTRY_CPC.roofing;
  const searchVol = INDUSTRY_SEARCH_VOLUME[industry] || INDUSTRY_SEARCH_VOLUME.roofing;

  return {
    searchVolume: searchVol[citySize],
    competitorCount,
    estimatedCPC: cpc[cpcTier],
  };
}

module.exports = { getMarketData };
