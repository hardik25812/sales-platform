# Saved Law Firm Profiles — Implementation Guide

## Overview

The saved profiles system allows you to pre-analyze law firms and load their specific operational intelligence into the demo platform. This creates deeply personalized demos that show "holy shit, you know my business" moments.

---

## Current Saved Profiles

### Omrani & Taub, P.C.
- **Location:** `frontend/src/data/saved-profiles/omrani-taub.json`
- **Website:** omranitaub.com
- **Specialty:** Personal Injury & Construction Accidents (Labor Law 240/241)
- **Top Verdict:** $10,580,000
- **Systems:** 7 operational systems (not generic voice AI agents)

---

## How to Access Saved Profiles

### 1. In `industries.js`

The law firm vertical now includes a `savedProfiles` array:

```javascript
law_firm: {
  id: "law_firm",
  name: "Law Firms",
  usesSystemsApproach: true,
  
  savedProfiles: [
    {
      id: "omrani-taub",
      name: "Omrani & Taub, P.C.",
      website: "omranitaub.com",
      location: "NYC Metro",
      specialty: "Personal Injury & Construction Accidents",
      topVerdict: "$10.5M",
      preview: "Labor Law 240 specialists with $10.5M top verdict"
    }
  ],
  // ...
}
```

### 2. Using the Profile Loader Utility

```javascript
import { 
  loadLawFirmProfile, 
  applyProfileToConfig,
  getAvailableLawFirmProfiles 
} from '@/utils/profileLoader';

// Load a profile
const profile = loadLawFirmProfile('omranitaub.com');
// or
const profile = loadLawFirmProfile('omrani-taub');

// Get all available profiles
const profiles = getAvailableLawFirmProfiles();

// Apply profile to configuration
const enhancedConfig = applyProfileToConfig(profile, industryConfig);
```

---

## Profile Structure

Each saved profile contains:

### 1. **Firm Information**
```json
{
  "firm": {
    "name": "Omrani & Taub, P.C.",
    "website": "https://omranitaub.com",
    "phone": "212-714-1515",
    "locations": ["Manhattan", "Queens", "Westchester"],
    "practice_areas": [...],
    "attorneys": [...],
    "experience_years": 25,
    "notable_verdicts": [...]
  }
}
```

### 2. **Identified Problems** (7 specific operational issues)
```json
{
  "problems": [
    {
      "id": "after_hours_intake",
      "title": "High-Value Cases Lost After Hours",
      "description": "Construction accidents happen at 6 AM...",
      "impact": "$500K-$5M+ in lost case value per missed intake",
      "evidence": "Firm handles construction and vehicle accidents"
    }
  ]
}
```

### 3. **Systems** (NOT generic agents)
```json
{
  "systems": [
    {
      "id": "intake_qualification_engine",
      "name": "Case Qualification Engine",
      "icon": "⚖️",
      "problem_it_solves": "Inconsistent case qualification...",
      "what_it_does": [...],
      "example_output": "CASE SCORE: 9/10 — A-CASE...",
      "impact": "$500K+ additional annual revenue"
    }
  ]
}
```

### 4. **Personalization**
```json
{
  "personalization": {
    "brand_tone": "Compassionate but aggressive",
    "messaging_style": "Direct, results-focused",
    "demo_angle": "Show Construction Documentation Tracker first..."
  }
}
```

---

## How to Use in the UI

### Option 1: Profile Selector in Discovery Panel

Add a "Load Saved Profile" button:

```jsx
import { getAvailableLawFirmProfiles, loadLawFirmProfile } from '@/utils/profileLoader';

function DiscoveryPanel() {
  const profiles = getAvailableLawFirmProfiles();
  
  const handleLoadProfile = (profileId) => {
    const profile = loadLawFirmProfile(profileId);
    // Apply profile data to form
    setFirmName(profile.firm.name);
    setWebsite(profile.firm.website);
    // ... etc
  };

  return (
    <div>
      <h3>Or load a saved profile:</h3>
      {profiles.map(p => (
        <button key={p.id} onClick={() => handleLoadProfile(p.id)}>
          {p.name} - {p.preview}
        </button>
      ))}
    </div>
  );
}
```

### Option 2: URL Parameter

```javascript
// In your router or main component
const urlParams = new URLSearchParams(window.location.search);
const profileId = urlParams.get('profile');

if (profileId) {
  const profile = loadLawFirmProfile(profileId);
  // Auto-load the profile
}

// Usage: https://yourplatform.com/demo?industry=law_firm&profile=omrani-taub
```

### Option 3: Website URL Input

```jsx
function WebsiteInput() {
  const [website, setWebsite] = useState('');
  
  const handleWebsiteChange = (e) => {
    const url = e.target.value;
    setWebsite(url);
    
    // Check if we have a saved profile for this website
    const profile = loadLawFirmProfile(url);
    if (profile) {
      // Show "We have a saved profile for this firm!" message
      // Offer to load it
    }
  };

  return (
    <input 
      type="text" 
      placeholder="Enter firm website (e.g., omranitaub.com)"
      value={website}
      onChange={handleWebsiteChange}
    />
  );
}
```

---

## Display Profile Data in the Demo

### Show Firm-Specific Systems

Instead of showing generic agents, show the profile's systems:

```jsx
import { getProfileSystems } from '@/utils/profileLoader';

function CommandCenter({ profileId }) {
  const systems = profileId 
    ? getProfileSystems(profileId)
    : getSystems('law_firm'); // fallback to generic

  return (
    <div>
      {systems.map(system => (
        <SystemCard key={system.id} system={system} />
      ))}
    </div>
  );
}
```

### Show Firm-Specific Problems

```jsx
function PainReveal({ profile }) {
  const problems = profile?.problems || industryConfig.painPoints;

  return (
    <div>
      {problems.map(problem => (
        <ProblemCard 
          key={problem.id}
          title={problem.title}
          description={problem.description}
          impact={problem.impact}
        />
      ))}
    </div>
  );
}
```

### Show Personalized Demo Angle

```jsx
function DemoIntro({ profile }) {
  if (profile?.personalization) {
    return (
      <div className="demo-angle">
        <h2>Demo Strategy for {profile.firm.name}</h2>
        <p><strong>Tone:</strong> {profile.personalization.brand_tone}</p>
        <p><strong>Hook:</strong> {profile.personalization.demo_angle}</p>
      </div>
    );
  }
  
  return <DefaultIntro />;
}
```

---

## Adding New Profiles

### Step 1: Analyze the Firm

Use the prompt from `OMRANI_TAUB_ANALYSIS.md` to analyze a new firm's website.

### Step 2: Create the Profile JSON

```bash
# Create new profile file
touch frontend/src/data/saved-profiles/[firm-name].json
```

Follow the structure in `omrani-taub.json`:
- `firm` object with all firm details
- `problems` array (7 specific operational issues)
- `systems` array (7 operational systems, NOT generic agents)
- `personalization` object

### Step 3: Register the Profile

In `frontend/src/data/saved-profiles/index.js`:

```javascript
import newFirm from './new-firm.json';

export const SAVED_PROFILES = {
  'omranitaub.com': omraniTaub,
  'newfirm.com': newFirm,  // Add here
};
```

### Step 4: Add to Industry Config

In `frontend/src/data/industries.js`:

```javascript
law_firm: {
  savedProfiles: [
    {
      id: "omrani-taub",
      name: "Omrani & Taub, P.C.",
      // ...
    },
    {
      id: "new-firm",  // Add here
      name: "New Firm Name",
      website: "newfirm.com",
      location: "City, State",
      specialty: "Practice Area",
      topVerdict: "$X.XM",
      preview: "Brief description"
    }
  ]
}
```

---

## Example: Full Integration

```jsx
import { useState, useEffect } from 'react';
import { loadLawFirmProfile, applyProfileToConfig, formatProfileForDisplay } from '@/utils/profileLoader';

function LawFirmDemo() {
  const [profile, setProfile] = useState(null);
  const [config, setConfig] = useState(industryConfig);

  // Load profile from URL parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const profileId = params.get('profile');
    
    if (profileId) {
      const loadedProfile = loadLawFirmProfile(profileId);
      if (loadedProfile) {
        setProfile(loadedProfile);
        const enhancedConfig = applyProfileToConfig(loadedProfile, industryConfig);
        setConfig(enhancedConfig);
      }
    }
  }, []);

  const displayData = formatProfileForDisplay(profile);

  return (
    <div>
      {profile ? (
        <>
          <h1>Demo for {displayData.firmName}</h1>
          <p>{displayData.tagline}</p>
          <p>{displayData.topVerdict} | {displayData.experience}</p>
          
          <PainReveal problems={profile.problems} />
          <SystemsView systems={profile.systems} />
          <DemoAngle angle={profile.personalization.demo_angle} />
        </>
      ) : (
        <GenericLawFirmDemo />
      )}
    </div>
  );
}
```

---

## Benefits of This Approach

### 1. **Deeply Personalized Demos**
Instead of: "We offer AI agents for lead capture and scheduling"
You show: "Your Case Qualification Engine identifies Labor Law 240 cases — the difference between a $200K general negligence case and a $5M scaffold collapse case"

### 2. **Instant Credibility**
When you show Omrani & Taub their $10.5M verdict and say "We analyzed your construction accident expertise," they know you did your homework.

### 3. **Scalable**
Add new profiles as you analyze more firms. Each profile is a reusable asset.

### 4. **Systems, Not Agents**
Profiles use operational systems (Case Qualification Engine, Settlement Pipeline Dashboard) instead of generic voice AI agents.

---

## Next Steps

1. **Wire profiles into the UI** — Add profile selector to Discovery Panel
2. **Create more profiles** — Analyze 5-10 top firms per practice area
3. **Add profile analytics** — Track which profiles convert best
4. **Build profile generator** — Automate the analysis process

---

*Last updated: March 23, 2026*
