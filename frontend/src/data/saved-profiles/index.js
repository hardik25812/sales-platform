// Saved Law Firm Profiles
// These are pre-analyzed firm profiles that can be loaded for personalized demos

import omraniTaub from './omrani-taub.json';

// Map of saved profiles by domain/identifier
export const SAVED_PROFILES = {
  'omranitaub.com': omraniTaub,
  'omranitaub': omraniTaub,
  'omrani-taub': omraniTaub,
};

// Get a saved profile by website URL or identifier
export function getSavedProfile(identifier) {
  // Normalize the identifier
  const normalized = identifier
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '')
    .replace(/\.com$/, '')
    .replace(/\s+/g, '-');
  
  // Try exact match first
  if (SAVED_PROFILES[normalized]) {
    return SAVED_PROFILES[normalized];
  }
  
  // Try with .com suffix
  if (SAVED_PROFILES[`${normalized}.com`]) {
    return SAVED_PROFILES[`${normalized}.com`];
  }
  
  // Try partial match
  for (const key of Object.keys(SAVED_PROFILES)) {
    if (key.includes(normalized) || normalized.includes(key.replace('.com', ''))) {
      return SAVED_PROFILES[key];
    }
  }
  
  return null;
}

// Get all saved profile identifiers
export function getAllSavedProfiles() {
  return Object.entries(SAVED_PROFILES).map(([key, profile]) => ({
    id: key,
    name: profile.firm.name,
    website: profile.firm.website,
    practiceAreas: profile.firm.practice_areas,
    tone: profile.firm.tone,
  }));
}

// Check if a profile exists for a given identifier
export function hasProfile(identifier) {
  return getSavedProfile(identifier) !== null;
}

export default SAVED_PROFILES;
