// Profile Loader Utility
// Loads saved law firm profiles and applies them to the demo configuration

import { getSavedProfile } from '@/data/saved-profiles';
import { getSystems } from '@/data/departments';

/**
 * Load a saved law firm profile by identifier
 * @param {string} identifier - Website URL or profile ID (e.g., "omranitaub.com" or "omrani-taub")
 * @returns {Object|null} - Profile data or null if not found
 */
export function loadLawFirmProfile(identifier) {
  const profile = getSavedProfile(identifier);
  
  if (!profile) {
    console.warn(`No saved profile found for: ${identifier}`);
    return null;
  }

  return profile;
}

/**
 * Apply a saved profile to the demo configuration
 * @param {Object} profile - The loaded profile object
 * @param {Object} industryConfig - The current industry configuration
 * @returns {Object} - Enhanced configuration with profile data
 */
export function applyProfileToConfig(profile, industryConfig) {
  if (!profile || !industryConfig) return industryConfig;

  // Create enhanced configuration
  const enhancedConfig = {
    ...industryConfig,
    
    // Override with profile-specific data
    firmName: profile.firm.name,
    firmWebsite: profile.firm.website,
    firmPhone: profile.firm.phone,
    firmLocations: profile.firm.locations,
    firmAttorneys: profile.firm.attorneys,
    firmExperience: profile.firm.experience_years,
    firmTopVerdict: profile.firm.notable_verdicts?.[0]?.amount,
    
    // Profile-specific problems (replaces generic pain points)
    profileProblems: profile.problems,
    
    // Profile-specific systems (replaces generic agents)
    profileSystems: profile.systems,
    
    // Personalization
    profilePersonalization: profile.personalization,
    
    // Flag that this is a personalized demo
    isPersonalized: true,
    profileId: profile.firm.website,
  };

  return enhancedConfig;
}

/**
 * Get systems configuration for a law firm profile
 * @param {string} profileId - Profile identifier
 * @returns {Array} - Systems configuration
 */
export function getProfileSystems(profileId) {
  const profile = loadLawFirmProfile(profileId);
  
  if (!profile || !profile.systems) {
    // Fallback to generic law firm systems
    return getSystems('law_firm');
  }

  // Transform profile systems to match the systems format
  return profile.systems.map(system => ({
    id: system.id || system.name.toLowerCase().replace(/\s+/g, '_'),
    name: system.name,
    icon: system.icon || '⚙️',
    tagline: system.problem_it_solves,
    role: system.what_it_does,
    outcomes: Array.isArray(system.what_it_does) ? system.what_it_does : [system.what_it_does],
    sampleOutputs: {
      example: system.example_output
    },
    impact: system.impact,
    kpis: [
      { label: 'Impact', value: system.impact, static: true }
    ],
    loadPercent: Math.floor(Math.random() * 30) + 10,
    color: 'rose',
  }));
}

/**
 * Get all available saved profiles for law firms
 * @returns {Array} - List of available profiles
 */
export function getAvailableLawFirmProfiles() {
  // This would be populated from the savedProfiles array in industries.js
  return [
    {
      id: 'omrani-taub',
      name: 'Omrani & Taub, P.C.',
      website: 'omranitaub.com',
      location: 'NYC Metro',
      specialty: 'Personal Injury & Construction Accidents',
      topVerdict: '$10.5M',
      preview: 'Labor Law 240 specialists with $10.5M top verdict'
    }
  ];
}

/**
 * Check if a profile exists for a given identifier
 * @param {string} identifier - Website URL or profile ID
 * @returns {boolean}
 */
export function hasProfile(identifier) {
  return getSavedProfile(identifier) !== null;
}

/**
 * Format profile data for display in the UI
 * @param {Object} profile - The profile object
 * @returns {Object} - Formatted display data
 */
export function formatProfileForDisplay(profile) {
  if (!profile) return null;

  return {
    firmName: profile.firm.name,
    tagline: `${profile.firm.practice_areas[0]} specialists in ${profile.firm.locations[0]}`,
    topVerdict: profile.firm.notable_verdicts?.[0]?.amount 
      ? `$${(profile.firm.notable_verdicts[0].amount / 1000000).toFixed(1)}M top verdict`
      : null,
    experience: `${profile.firm.experience_years}+ years`,
    attorneys: profile.firm.attorneys?.length || 0,
    problemCount: profile.problems?.length || 0,
    systemCount: profile.systems?.length || 0,
    tone: profile.personalization?.brand_tone,
    demoAngle: profile.personalization?.demo_angle,
  };
}

export default {
  loadLawFirmProfile,
  applyProfileToConfig,
  getProfileSystems,
  getAvailableLawFirmProfiles,
  hasProfile,
  formatProfileForDisplay,
};
