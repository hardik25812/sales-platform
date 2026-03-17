// Currency formatter
export const formatCurrency = (value, decimals = 0) => {
  if (value === null || value === undefined || isNaN(value)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

// Percentage formatter
export const formatPercent = (value, decimals = 0) => {
  if (value === null || value === undefined || isNaN(value)) return '0%';
  return `${(value * 100).toFixed(decimals)}%`;
};

// Number formatter with commas
export const formatNumber = (value, decimals = 0) => {
  if (value === null || value === undefined || isNaN(value)) return '0';
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

// Time formatter (hours to readable)
export const formatTime = (hours) => {
  if (hours < 1) {
    return `${Math.round(hours * 60)} minutes`;
  }
  if (hours < 24) {
    return `${hours.toFixed(1)} hours`;
  }
  return `${Math.round(hours / 24)} days`;
};

// Compact number formatter (1000 -> 1K)
export const formatCompact = (value) => {
  if (value === null || value === undefined || isNaN(value)) return '0';
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
};
