# Sales Experience Platform - PRD

## Original Problem Statement
Build an internal sales enablement platform that runs LIVE on sales calls. Sales rep opens the platform, selects prospect's industry, inputs their metrics, and the entire platform transforms into a personalized experience. Multiple tabs: Industry Selector, Discovery Input, Command Center, Workflow Visualizer, ROI Calculator, Case Studies, Trial CTA.

## Architecture
- **Frontend**: React (CRA) + Tailwind CSS + Shadcn UI + Framer Motion + Recharts
- **Backend**: FastAPI (minimal, not used for data)
- **Data**: All industry data stored in frontend JSON config (no database)
- **State**: React Context (DemoContext) for global state management

## User Personas
- **Sales Reps**: Internal team using tool on live calls to demo AI automation product
- **Prospects**: Local business owners (roofers, medspa owners, etc.) viewing the demo

## Core Requirements
- 10 industry verticals with unique configurations
- Dynamic data transformation on industry selection
- Live ROI calculation engine
- Before/After workflow comparison
- Animated counters and smooth transitions
- Keyboard shortcuts (1-6 tabs, P=presentation, F=fullscreen, I=back)
- Premium dark mode glassmorphism UI

## What's Been Implemented (Feb 2026)
- [x] Industry Selector landing page with 10 cards
- [x] Discovery Panel with 8 metric sliders + live ROI preview
- [x] Command Center dashboard (agents, pipeline funnel, live feed, stats)
- [x] Workflow Visualizer with Before/After toggle
- [x] ROI Calculator with charts (bar + area), loss/gain cards, payback period
- [x] Case Studies with pain points and verified case study cards
- [x] Trial CTA with benefits, FAQ accordion, value summary
- [x] Tab navigation with keyboard shortcuts
- [x] Presentation mode + fullscreen support
- [x] Full data for Roofing & MedSpa (6 agents, 6 workflow steps, 3 case studies, 4 pain points each)
- [x] Partial data for 8 other industries (HVAC, Dental, Auto, Construction, Law, Real Estate, Landscaping, Pools)
- [x] Animated counters on value changes
- [x] Premium dark glassmorphism UI with industry-specific accent colors

## Prioritized Backlog

### P0 - Critical
- None (MVP complete)

### P1 - High Priority
- Phase 2: Competitive intelligence (Google reviews, response time scraping)
- Backend data persistence (save prospect data to MongoDB)
- "Send Trial Proposal Email" functionality
- "Book Follow-Up Call" integration (Cal.com)

### P2 - Medium Priority
- Authentication (password gate for sales team)
- Analytics tracking (which industries/tabs get most engagement)
- PDF export of ROI report for prospects
- Mobile responsive improvements

### P3 - Nice to Have
- Real case studies replacing projected benchmarks
- Custom CRM integration per industry
- A/B testing different pitch sequences
- Multi-language support

## Next Tasks
1. Add remaining partial industry data to full configs (agents, workflow, case studies for all 10)
2. Backend persistence for prospect data
3. Phase 2 competitive intelligence module
4. Email/calendar booking integrations
