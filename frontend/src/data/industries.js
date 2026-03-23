// Complete industry configurations for the Sales Experience Platform
// Full data: Roofing, MedSpa
// Partial data: HVAC, Dental, Auto Dealerships, Construction, Law Firms, Real Estate, Landscaping, Pools

export const INDUSTRIES = {
  roofing: {
    id: "roofing",
    name: "Roofing",
    icon: "Home",
    color: "#F59E0B",
    colorSecondary: "#D97706",
    gradient: "from-amber-500 to-orange-600",
    glow: "rgba(245,158,11,0.3)",
    tagline: "Never miss a roofing lead again",
    subtitle: "6 AI agents available",

    agents: [
      {
        name: "Inbound Lead Agent",
        icon: "PhoneIncoming",
        dept: "Sales",
        description: "Captures and qualifies every roofing inquiry 24/7",
        status: "active",
        tasks: [
          "Answers calls and web forms instantly",
          "Qualifies: storm damage vs repair vs replacement",
          "Collects property info and damage photos",
          "Auto-schedules inspection appointments"
        ],
        kpis: { primary: "Leads Captured", secondary: "Qualification Rate" },
        metric: { value: 98, unit: "%", label: "Capture Rate" }
      },
      {
        name: "Scheduling Agent",
        icon: "CalendarCheck",
        dept: "Operations",
        description: "Eliminates phone tag and fills your inspection calendar",
        status: "active",
        tasks: [
          "Auto-books inspections based on crew availability",
          "Sends confirmation texts and reminders",
          "Handles rescheduling without staff involvement",
          "Optimizes routes for same-area inspections"
        ],
        kpis: { primary: "Appointments Set", secondary: "No-Show Rate" },
        metric: { value: 94, unit: "%", label: "Show Rate" }
      },
      {
        name: "Estimate Follow-Up Agent",
        icon: "FileText",
        dept: "Sales",
        description: "Follows up on every estimate until they close or say no",
        status: "active",
        tasks: [
          "Sends estimate within hours of inspection",
          "5-touch follow-up sequence over 14 days",
          "Handles objections with pre-built responses",
          "Alerts sales manager for hot leads"
        ],
        kpis: { primary: "Follow-Up Rate", secondary: "Close Rate Lift" },
        metric: { value: 100, unit: "%", label: "Follow-Up" }
      },
      {
        name: "Review Request Agent",
        icon: "Star",
        dept: "Marketing",
        description: "Turns every completed job into a 5-star review",
        status: "active",
        tasks: [
          "Sends review request 24hrs after job completion",
          "Multi-channel: text, email, and direct link",
          "Follows up if no review after 48 hours",
          "Flags negative feedback for immediate attention"
        ],
        kpis: { primary: "Reviews Generated", secondary: "Avg Rating" },
        metric: { value: 4.8, unit: "stars", label: "Avg Rating" }
      },
      {
        name: "Dispatch & Crew Agent",
        icon: "Truck",
        dept: "Operations",
        description: "Route-optimized crew scheduling and job management",
        status: "active",
        tasks: [
          "Auto-assigns crews based on skills and location",
          "Optimizes daily routes to reduce drive time",
          "Sends homeowner arrival notifications",
          "Tracks job progress and completion"
        ],
        kpis: { primary: "Jobs/Day", secondary: "Drive Time Saved" },
        metric: { value: 31, unit: "%", label: "Efficiency Gain" }
      },
      {
        name: "Insurance Coordinator",
        icon: "Shield",
        dept: "Admin",
        description: "Streamlines insurance claims and documentation",
        status: "active",
        tasks: [
          "Generates Xactimate-ready documentation",
          "Tracks claim status and follows up with adjusters",
          "Sends homeowner updates on claim progress",
          "Organizes photos and damage assessments"
        ],
        kpis: { primary: "Claims Processed", secondary: "Approval Rate" },
        metric: { value: 87, unit: "%", label: "Approval Rate" }
      }
    ],

    workflow: [
      {
        step: "Inquiry",
        agent: "Lead Agent",
        icon: "PhoneIncoming",
        before: "Missed calls, 4hr+ response time",
        after: "<60s response, zero missed leads",
        beforeTime: "4.2 hours",
        afterTime: "47 seconds",
        dropoff: { before: 65, after: 5 }
      },
      {
        step: "Inspection",
        agent: "Scheduling Agent",
        icon: "CalendarCheck",
        before: "Manual phone tag, 3-5 day booking",
        after: "Auto-booked instantly",
        beforeTime: "3-5 days",
        afterTime: "Instant",
        dropoff: { before: 30, after: 6 }
      },
      {
        step: "Estimate",
        agent: "Estimate Agent",
        icon: "FileText",
        before: "Sits in truck for days",
        after: "Sent same-day with follow-up",
        beforeTime: "3-7 days",
        afterTime: "Same day",
        dropoff: { before: 40, after: 10 }
      },
      {
        step: "Close",
        agent: "Follow-Up Agent",
        icon: "Target",
        before: "1-2 follow-up attempts max",
        after: "5-touch automated sequence",
        beforeTime: "1-2 attempts",
        afterTime: "5 touches",
        dropoff: { before: 50, after: 15 }
      },
      {
        step: "Complete",
        agent: "Dispatch Agent",
        icon: "Truck",
        before: "Manual crew scheduling",
        after: "Route-optimized dispatch",
        beforeTime: "Manual",
        afterTime: "Automated",
        dropoff: { before: 10, after: 2 }
      },
      {
        step: "Review",
        agent: "Review Agent",
        icon: "Star",
        before: "Rarely asked for reviews",
        after: "Automated request every job",
        beforeTime: "Rarely",
        afterTime: "Every job",
        dropoff: { before: 0, after: 0 }
      }
    ],

    roi: {
      leadResponseImprovement: 0.85,
      conversionLift: 0.12,
      missedLeadRecovery: 0.25,
      avgResponseTimeBefore: "4.2 hours",
      avgResponseTimeAfter: "47 seconds",
      reviewIncreasePercent: 300
    },

    defaults: {
      monthlyLeads: 150,
      avgJobValue: 12000,
      employees: 12,
      currentCloseRate: 0.15,
      currentResponseTime: 4.2,
      monthlyAdSpend: 5000,
      noShowRate: 18,
      missedCallsEstimate: 95
    },

    caseStudies: [
      {
        company: "Pacific Roofing Co.",
        location: "Portland, OR",
        employees: 18,
        result: "Went from 14% to 31% close rate in 45 days",
        savings: "$34,000/month in equivalent headcount",
        detail: "AI agent handled 100% of after-hours leads. Storm season lead overflow managed without hiring.",
        metrics: { closeBefore: 14, closeAfter: 31, days: 45, monthlySavings: 34000 }
      },
      {
        company: "Summit Roofing & Restoration",
        location: "Denver, CO",
        employees: 24,
        result: "Recovered $127K in first quarter from previously lost leads",
        savings: "$42,000/month in new revenue",
        detail: "Night and weekend leads that were going to competitors now captured instantly. 94% inspection show rate.",
        metrics: { closeBefore: 11, closeAfter: 26, days: 60, monthlySavings: 42000 }
      },
      {
        company: "Lone Star Roofing",
        location: "Dallas, TX",
        employees: 32,
        result: "3x Google reviews in 90 days, dominating local search",
        savings: "$28,000/month in equivalent headcount",
        detail: "Automated review requests post-job. Went from 47 to 189 reviews. Now #1 rated roofer in their service area.",
        metrics: { closeBefore: 18, closeAfter: 29, days: 90, monthlySavings: 28000 }
      }
    ],

    integrations: ["JobNimbus", "AccuLynx", "ServiceTitan", "CompanyCam", "Google Business"],

    painPoints: [
      {
        title: "Missed Calls = Missed Revenue",
        stat: "60-80%",
        description: "of new lead calls go unanswered when crews are on roofs",
        icon: "PhoneMissed"
      },
      {
        title: "Slow Response Kills Deals",
        stat: "78%",
        description: "of customers hire the first roofer who responds",
        icon: "Clock"
      },
      {
        title: "Estimates Die Without Follow-Up",
        stat: "48%",
        description: "of roofing estimates never get a single follow-up",
        icon: "FileX"
      },
      {
        title: "No-Shows Waste Your Day",
        stat: "15-25%",
        description: "of scheduled inspections are no-shows without reminders",
        icon: "UserX"
      }
    ],

    liveFeedExamples: [
      { type: "lead", text: "New storm damage inquiry captured from Google Ads", time: "2 min ago" },
      { type: "schedule", text: "Inspection auto-booked for 742 Oak Street", time: "5 min ago" },
      { type: "followup", text: "Estimate follow-up #3 sent to Johnson residence", time: "12 min ago" },
      { type: "review", text: "5-star review collected from completed re-roof", time: "18 min ago" },
      { type: "lead", text: "After-hours lead qualified: full replacement needed", time: "23 min ago" },
      { type: "dispatch", text: "Crew A rerouted — 22 min drive time saved", time: "31 min ago" }
    ],

    heroImage: "https://images.unsplash.com/photo-1632759145351-1d592919f522?w=1200&q=80",
    
    dayStory: {
      before: [
        { time: '7:02 AM', event: 'Homeowner finds roof leak after weekend storm', detail: 'Searches "roof repair near me" on Google', icon: '🔍' },
        { time: '7:03 AM', event: 'Fills out your website form', detail: '', icon: '📝' },
        { time: '7:03 AM', event: 'Form sits in your inbox', detail: "Nobody's in the office yet.", icon: '⚠️', status: 'warning' },
        { time: '8:15 AM', event: 'Office manager arrives', detail: '14 voicemails, 23 emails. Your form is #19 in the queue.', icon: '😫', status: 'warning' },
        { time: '10:30 AM', event: 'Finally sees the form. Calls back.', detail: 'No answer. Leaves voicemail.', icon: '📞', status: 'danger' },
        { time: '10:32 AM', event: 'Homeowner already booked competitor', detail: 'They responded in 3 minutes.', icon: '❌', status: 'lost' },
        { time: 'RESULT', event: '$14,000 job — LOST', detail: 'This happens 3-4 times per week.', icon: '💸', status: 'lost' },
      ],
      after: [
        { time: '7:02 AM', event: 'Homeowner finds roof leak after weekend storm', detail: 'Searches "roof repair near me" on Google', icon: '🔍' },
        { time: '7:03 AM', event: 'Fills out your website form', detail: '', icon: '📝' },
        { time: '7:03 AM', event: 'AI Lead Agent activates instantly', detail: 'Reads submission: storm damage, residential, urgent', icon: '⚡', status: 'active' },
        { time: '7:04 AM', event: 'Homeowner gets personalized text', detail: '"Hi John, we received your request about storm damage at 142 Oak St..."', icon: '📱', status: 'success' },
        { time: '7:04 AM', event: 'Detailed email sent', detail: 'What to expect, insurance guide, credentials', icon: '📧', status: 'success' },
        { time: '7:04 AM', event: 'Inspection auto-booked', detail: 'Tomorrow 9 AM, confirmed', icon: '📅', status: 'success' },
        { time: '7:05 AM', event: 'You get a notification', detail: 'New qualified lead: John Smith, storm damage, $14K est. Booked.', icon: '🔔', status: 'success' },
        { time: 'RESULT', event: '$14,000 job — SECURED', detail: 'In 2 minutes. While you were still in bed.', icon: '✅', status: 'won' },
      ],
    }
  },

  medspa: {
    id: "medspa",
    name: "MedSpa / Aesthetics",
    icon: "Sparkles",
    color: "#EC4899",
    colorSecondary: "#8B5CF6",
    gradient: "from-pink-500 to-violet-600",
    glow: "rgba(236,72,153,0.3)",
    tagline: "Fill every appointment slot, automatically",
    subtitle: "6 AI agents available",

    agents: [
      {
        name: "Patient Inquiry Agent",
        icon: "MessageCircle",
        dept: "Front Desk",
        description: "Responds to every inquiry instantly across all channels",
        status: "active",
        tasks: [
          "Answers DMs, texts, calls, and web forms 24/7",
          "Pre-qualifies patients for treatments",
          "Shares pricing and treatment info",
          "Captures contact for booking"
        ],
        kpis: { primary: "Inquiries Handled", secondary: "Response Time" },
        metric: { value: 100, unit: "%", label: "Response Rate" }
      },
      {
        name: "Appointment Booking Agent",
        icon: "CalendarPlus",
        dept: "Front Desk",
        description: "Books consultations instantly with zero back-and-forth",
        status: "active",
        tasks: [
          "Shows real-time provider availability",
          "Books directly into your scheduling system",
          "Sends confirmation and pre-visit instructions",
          "Handles deposits and payment holds"
        ],
        kpis: { primary: "Bookings Made", secondary: "Fill Rate" },
        metric: { value: 96, unit: "%", label: "Fill Rate" }
      },
      {
        name: "Treatment Coordinator Agent",
        icon: "Stethoscope",
        dept: "Clinical",
        description: "Educates patients on treatment plans and packages",
        status: "active",
        tasks: [
          "Sends treatment plan details and pricing",
          "Recommends packages based on patient goals",
          "Answers FAQs about recovery, results, costs",
          "Upsells complementary treatments"
        ],
        kpis: { primary: "Plan Acceptance", secondary: "Avg Ticket Value" },
        metric: { value: 73, unit: "%", label: "Acceptance" }
      },
      {
        name: "Post-Treatment Follow-Up Agent",
        icon: "HeartPulse",
        dept: "Clinical",
        description: "Ensures patient satisfaction and drives rebooking",
        status: "active",
        tasks: [
          "Sends post-treatment care instructions",
          "Checks in at 24hr, 7-day, and 30-day marks",
          "Captures before/after photos for results tracking",
          "Prompts rebooking at optimal intervals"
        ],
        kpis: { primary: "Rebook Rate", secondary: "Patient Satisfaction" },
        metric: { value: 68, unit: "%", label: "Rebook Rate" }
      },
      {
        name: "Review & Referral Agent",
        icon: "Award",
        dept: "Marketing",
        description: "Turns happy patients into 5-star reviews and referrals",
        status: "active",
        tasks: [
          "Sends review requests post-treatment",
          "Manages referral program tracking",
          "Responds to online reviews automatically",
          "Identifies brand ambassadors"
        ],
        kpis: { primary: "Reviews Generated", secondary: "Referral Rate" },
        metric: { value: 4.9, unit: "stars", label: "Avg Rating" }
      },
      {
        name: "Membership & Retention Agent",
        icon: "Crown",
        dept: "Revenue",
        description: "Drives recurring revenue through membership programs",
        status: "active",
        tasks: [
          "Presents membership options post-consultation",
          "Sends renewal reminders and special offers",
          "Tracks member usage and engagement",
          "Wins back lapsed patients with targeted offers"
        ],
        kpis: { primary: "Active Members", secondary: "Retention Rate" },
        metric: { value: 89, unit: "%", label: "Retention" }
      }
    ],

    workflow: [
      {
        step: "Inquiry",
        agent: "Patient Inquiry Agent",
        icon: "MessageCircle",
        before: "Missed DMs, slow email replies, lost leads",
        after: "<60s response on every channel, 24/7",
        beforeTime: "3.1 hours",
        afterTime: "47 seconds",
        dropoff: { before: 55, after: 4 }
      },
      {
        step: "Consultation",
        agent: "Booking Agent",
        icon: "CalendarPlus",
        before: "Phone tag, manual calendar checks",
        after: "Instant self-booking with deposit",
        beforeTime: "2-4 days",
        afterTime: "Instant",
        dropoff: { before: 35, after: 8 }
      },
      {
        step: "Treatment Plan",
        agent: "Treatment Coordinator",
        icon: "Stethoscope",
        before: "Verbal-only, no follow-up on plans",
        after: "Digital plan sent, auto follow-up",
        beforeTime: "Often forgotten",
        afterTime: "Same day",
        dropoff: { before: 45, after: 12 }
      },
      {
        step: "Treatment",
        agent: "Reminder Agent",
        icon: "Bell",
        before: "15-25% no-show rate",
        after: "Smart reminders reduce no-shows 70%",
        beforeTime: "15-25% no-show",
        afterTime: "5% no-show",
        dropoff: { before: 20, after: 5 }
      },
      {
        step: "Follow-Up",
        agent: "Post-Treatment Agent",
        icon: "HeartPulse",
        before: "No structured follow-up",
        after: "Automated care sequence + rebook prompt",
        beforeTime: "Rarely",
        afterTime: "24hr, 7d, 30d",
        dropoff: { before: 60, after: 15 }
      },
      {
        step: "Retain",
        agent: "Membership Agent",
        icon: "Crown",
        before: "One-time patients, no retention program",
        after: "Membership offers, win-back campaigns",
        beforeTime: "One-time",
        afterTime: "Recurring",
        dropoff: { before: 0, after: 0 }
      }
    ],

    roi: {
      leadResponseImprovement: 0.90,
      conversionLift: 0.15,
      missedLeadRecovery: 0.30,
      avgResponseTimeBefore: "3.1 hours",
      avgResponseTimeAfter: "47 seconds",
      reviewIncreasePercent: 400
    },

    defaults: {
      monthlyLeads: 200,
      avgJobValue: 2500,
      employees: 8,
      currentCloseRate: 0.20,
      currentResponseTime: 3.1,
      monthlyAdSpend: 8000,
      noShowRate: 22,
      missedCallsEstimate: 110
    },

    caseStudies: [
      {
        company: "Glow Aesthetics Studio",
        location: "Scottsdale, AZ",
        employees: 6,
        result: "Went from 20% to 41% consultation-to-treatment rate in 30 days",
        savings: "$22,000/month in equivalent headcount",
        detail: "AI handled all Instagram DMs and after-hours inquiries. Booking rate increased 3x without adding front desk staff.",
        metrics: { closeBefore: 20, closeAfter: 41, days: 30, monthlySavings: 22000 }
      },
      {
        company: "Rejuvenate MedSpa",
        location: "Miami, FL",
        employees: 12,
        result: "Reduced no-shows from 24% to 6%, recovering $18K/month",
        savings: "$31,000/month total revenue impact",
        detail: "Smart reminder sequences and deposit collection. Membership program launched via AI agent drives 40% of revenue.",
        metrics: { closeBefore: 18, closeAfter: 35, days: 45, monthlySavings: 31000 }
      },
      {
        company: "Elite Skin & Laser",
        location: "Beverly Hills, CA",
        employees: 15,
        result: "4.9 star rating with 312 reviews in 6 months",
        savings: "$45,000/month in new patient acquisition",
        detail: "Automated review collection post-treatment. Referral program managed by AI drives 30% of new patients.",
        metrics: { closeBefore: 22, closeAfter: 38, days: 60, monthlySavings: 45000 }
      }
    ],

    integrations: ["Boulevard", "Zenoti", "PatientNow", "GlossGenius", "Google Business"],

    painPoints: [
      {
        title: "Instagram DMs Go Unanswered",
        stat: "70%+",
        description: "of MedSpa inquiries come via social and go unanswered after hours",
        icon: "MessageSquare"
      },
      {
        title: "No-Shows Crush Revenue",
        stat: "$2,500",
        description: "average revenue lost per no-show appointment slot",
        icon: "CalendarX"
      },
      {
        title: "One-Time Patients Don't Return",
        stat: "62%",
        description: "of first-time patients never rebook without follow-up",
        icon: "UserMinus"
      },
      {
        title: "Front Desk Bottleneck",
        stat: "3.1hrs",
        description: "average response time when staff is with patients",
        icon: "Clock"
      }
    ],

    liveFeedExamples: [
      { type: "lead", text: "New Botox inquiry captured from Instagram DM", time: "1 min ago" },
      { type: "schedule", text: "Consultation auto-booked for laser treatment", time: "4 min ago" },
      { type: "followup", text: "Post-filler check-in sent to Sarah M.", time: "9 min ago" },
      { type: "review", text: "5-star review collected from CoolSculpting patient", time: "15 min ago" },
      { type: "membership", text: "VIP membership renewal processed automatically", time: "22 min ago" },
      { type: "lead", text: "After-hours lip filler inquiry qualified and booked", time: "28 min ago" }
    ],

    heroImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80",
    
    dayStory: {
      before: [
        { time: '9:14 PM', event: 'Jessica sees your Instagram ad for lip fillers', detail: 'Impulse decision after seeing results photos', icon: '🔍' },
        { time: '9:15 PM', event: 'Sends you a DM asking about pricing', detail: '"How much for lip filler? Do you have availability this week?"', icon: '📝' },
        { time: '9:15 PM', event: 'DM sits unread', detail: 'Your front desk left at 6pm.', icon: '⚠️', status: 'warning' },
        { time: '9:47 PM', event: 'Jessica DMs two other medspas', detail: 'Looking for someone who responds.', icon: '😫', status: 'warning' },
        { time: '10:02 PM', event: 'Competitor responds instantly', detail: '"Hi Jessica! We have openings Thursday. Want me to book you?"', icon: '📞', status: 'danger' },
        { time: '10:05 PM', event: 'Jessica books with competitor', detail: '$650 appointment gone.', icon: '❌', status: 'lost' },
        { time: 'NEXT DAY', event: 'You respond to her DM at 9am', detail: '"Hi! Thanks for reaching out..." — Too late.', icon: '💸', status: 'lost' },
      ],
      after: [
        { time: '9:14 PM', event: 'Jessica sees your Instagram ad for lip fillers', detail: 'Impulse decision after seeing results photos', icon: '🔍' },
        { time: '9:15 PM', event: 'Sends you a DM asking about pricing', detail: '"How much for lip filler? Do you have availability this week?"', icon: '📝' },
        { time: '9:15 PM', event: 'AI Booking Agent responds instantly', detail: '"Hi Jessica! Lip filler starts at $550. I have Thursday 2pm or Friday 11am open..."', icon: '⚡', status: 'active' },
        { time: '9:16 PM', event: 'Jessica picks Thursday 2pm', detail: 'AI confirms and collects $100 deposit', icon: '📱', status: 'success' },
        { time: '9:17 PM', event: 'Confirmation + prep instructions sent', detail: 'What to avoid before treatment, what to expect', icon: '📧', status: 'success' },
        { time: '9:17 PM', event: 'Appointment in your calendar', detail: 'With deposit secured and notes attached', icon: '📅', status: 'success' },
        { time: 'RESULT', event: '$650 appointment — BOOKED', detail: 'In 2 minutes. While you were at dinner.', icon: '✅', status: 'won' },
      ],
    }
  },

  hvac: {
    id: "hvac",
    name: "HVAC / Plumbing",
    icon: "Thermometer",
    color: "#10B981",
    colorSecondary: "#059669",
    gradient: "from-emerald-500 to-teal-400",
    glow: "rgba(16,185,129,0.3)",
    tagline: "Capture every emergency call, day or night",
    subtitle: "6 AI agents available",
    agents: [
      { name: "Emergency Dispatch Agent", icon: "AlertTriangle", dept: "Operations", description: "Captures and triages emergency service calls 24/7", status: "active", tasks: ["Answers emergency calls instantly", "Triages urgency level", "Dispatches nearest available tech"], kpis: { primary: "Calls Answered", secondary: "Dispatch Time" }, metric: { value: 99, unit: "%", label: "Answer Rate" } },
      { name: "Service Booking Agent", icon: "CalendarCheck", dept: "Sales", description: "Books maintenance and installation appointments", status: "active", tasks: ["Books service appointments", "Sends reminders", "Manages recurring maintenance schedules"], kpis: { primary: "Bookings", secondary: "Fill Rate" }, metric: { value: 92, unit: "%", label: "Fill Rate" } },
      { name: "Estimate Follow-Up Agent", icon: "FileText", dept: "Sales", description: "Follows up on every quote until closed", status: "active", tasks: ["Sends estimates same-day", "Automated follow-up sequence", "Handles common objections"], kpis: { primary: "Follow-Up Rate", secondary: "Close Rate" }, metric: { value: 100, unit: "%", label: "Follow-Up" } },
      { name: "Maintenance Plan Agent", icon: "Wrench", dept: "Revenue", description: "Sells and manages recurring maintenance contracts", status: "active", tasks: ["Presents maintenance plans post-service", "Manages renewal scheduling", "Sends seasonal reminders"], kpis: { primary: "Plans Sold", secondary: "Retention" }, metric: { value: 78, unit: "%", label: "Retention" } },
      { name: "Review Agent", icon: "Star", dept: "Marketing", description: "Generates reviews from completed service calls", status: "active", tasks: ["Sends review requests post-service", "Follows up on non-responses", "Flags negative feedback"], kpis: { primary: "Reviews", secondary: "Rating" }, metric: { value: 4.7, unit: "stars", label: "Avg Rating" } },
      { name: "Tech Routing Agent", icon: "MapPin", dept: "Operations", description: "Optimizes technician routes and schedules", status: "active", tasks: ["Route-optimizes daily schedules", "Sends customer ETA updates", "Tracks job completion"], kpis: { primary: "Jobs/Day", secondary: "Drive Time" }, metric: { value: 27, unit: "%", label: "Efficiency" } }
    ],
    workflow: [
      { step: "Service Call", agent: "Dispatch Agent", icon: "Phone", before: "Missed calls, voicemail", after: "Instant answer, auto-triage", beforeTime: "3.5 hours", afterTime: "30 seconds", dropoff: { before: 55, after: 3 } },
      { step: "Booking", agent: "Booking Agent", icon: "CalendarCheck", before: "Manual scheduling", after: "Auto-booked", beforeTime: "1-2 days", afterTime: "Instant", dropoff: { before: 25, after: 5 } },
      { step: "Service", agent: "Routing Agent", icon: "MapPin", before: "Inefficient routes", after: "Optimized dispatch", beforeTime: "Manual", afterTime: "AI-optimized", dropoff: { before: 8, after: 2 } },
      { step: "Estimate", agent: "Estimate Agent", icon: "FileText", before: "Delayed quotes", after: "Same-day estimates", beforeTime: "2-5 days", afterTime: "Same day", dropoff: { before: 35, after: 8 } },
      { step: "Close", agent: "Follow-Up Agent", icon: "Target", before: "Minimal follow-up", after: "Automated sequence", beforeTime: "1 attempt", afterTime: "5 touches", dropoff: { before: 45, after: 12 } },
      { step: "Review", agent: "Review Agent", icon: "Star", before: "Rarely requested", after: "Every job", beforeTime: "Rarely", afterTime: "Automated", dropoff: { before: 0, after: 0 } }
    ],
    roi: { leadResponseImprovement: 0.82, conversionLift: 0.10, missedLeadRecovery: 0.22, avgResponseTimeBefore: "3.5 hours", avgResponseTimeAfter: "30 seconds", reviewIncreasePercent: 250 },
    defaults: { monthlyLeads: 180, avgJobValue: 4500, employees: 15, currentCloseRate: 0.18, currentResponseTime: 3.5, monthlyAdSpend: 4000, noShowRate: 12, missedCallsEstimate: 100 },
    caseStudies: [
      { company: "All Season HVAC", location: "Chicago, IL", employees: 22, result: "18% to 32% close rate in 60 days", savings: "$28,000/month in recovered revenue", detail: "AI captured all after-hours emergency calls. Technician routing reduced drive time by 27%.", metrics: { closeBefore: 18, closeAfter: 32, days: 60, monthlySavings: 28000 } }
    ],
    integrations: ["ServiceTitan", "Housecall Pro", "Jobber", "FieldEdge", "Google Business"],
    painPoints: [
      { title: "Emergency Calls Go to Voicemail", stat: "45%", description: "of after-hours emergency calls go unanswered — straight to competitors", icon: "PhoneMissed" },
      { title: "First Responder Wins the Job", stat: "82%", description: "of homeowners call 3+ companies and hire whoever picks up first", icon: "Clock" },
      { title: "Techs Waste 2.5 Hours Driving", stat: "2.5hrs", description: "average daily drive time per tech with unoptimized routes — that's $150/day burned", icon: "Car" },
      { title: "Maintenance Agreements Lapse", stat: "38%", description: "of maintenance agreements don't renew because nobody follows up", icon: "FileX" }
    ],
    liveFeedExamples: [
      { type: "lead", text: "Emergency no-heat call captured — 14°F outside, elderly resident", time: "2 min ago" },
      { type: "dispatch", text: "Tech Mike dispatched to 847 Pine St — ETA 22 min", time: "4 min ago" },
      { type: "schedule", text: "AC tune-up booked from seasonal campaign text", time: "9 min ago" },
      { type: "agreement", text: "Comfort Club agreement renewed — $189/yr, auto-billed", time: "14 min ago" },
      { type: "review", text: "5-star review: 'Mike fixed our furnace at 10pm. Lifesavers!'", time: "19 min ago" },
      { type: "estimate", text: "Replacement follow-up #3 sent — customer asked about financing", time: "25 min ago" }
    ],

    heroImage: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1200&q=80",

    dayStory: {
      before: [
        { time: '2:14 AM', event: 'Furnace dies in the middle of January', detail: 'Homeowner wakes up — house is 52°F and dropping. Kids are cold.', icon: '🥶' },
        { time: '2:15 AM', event: 'Calls your company', detail: '"Thank you for calling Comfort Air. Our office hours are 8 AM to 5 PM..."', icon: '📞' },
        { time: '2:16 AM', event: 'Gets your voicemail', detail: 'Leaves a message. Panic setting in — it\'s 14°F outside.', icon: '⚠️', status: 'warning' },
        { time: '2:18 AM', event: 'Calls your competitor', detail: 'They answer on the second ring. "We can have someone there by 3 AM."', icon: '😫', status: 'warning' },
        { time: '2:20 AM', event: 'Competitor dispatches a tech', detail: '$347 emergency repair + new maintenance agreement customer', icon: '📞', status: 'danger' },
        { time: '8:02 AM', event: 'Your office opens, sees the voicemail', detail: 'Calls back. "Oh, we already got it fixed. Thanks anyway."', icon: '❌', status: 'lost' },
        { time: 'RESULT', event: '$347 repair + $189/yr agreement — LOST', detail: 'Plus they\'ll call the competitor for the $12,000 replacement next year too.', icon: '💸', status: 'lost' },
      ],
      after: [
        { time: '2:14 AM', event: 'Furnace dies in the middle of January', detail: 'Homeowner wakes up — house is 52°F and dropping. Kids are cold.', icon: '🥶' },
        { time: '2:15 AM', event: 'Calls your company', detail: 'AI answers instantly: "I\'m sorry about the emergency. Let me help."', icon: '📞' },
        { time: '2:16 AM', event: 'AI triages the situation', detail: '"Is your thermostat blank? Do you smell gas?" — No gas, blank thermostat.', icon: '⚡', status: 'active' },
        { time: '2:17 AM', event: 'Emergency tech dispatched', detail: 'Mike is on call tonight, 15 minutes away. Carrier ignitor in his truck.', icon: '🚗', status: 'success' },
        { time: '2:18 AM', event: 'Homeowner gets a text', detail: '"Mike is on his way — ETA 15 min. Here\'s his photo. He has your part in stock."', icon: '📱', status: 'success' },
        { time: '2:35 AM', event: 'Furnace running again', detail: '$347 repair done. Mike recommends a maintenance agreement.', icon: '🔧', status: 'success' },
        { time: '2:40 AM', event: 'You get a notification', detail: '"Emergency job complete: $347 repair + Comfort Club signup ($189/yr). 5-star review incoming."', icon: '🔔', status: 'success' },
        { time: 'RESULT', event: '$347 + $189/yr recurring — CAPTURED', detail: 'While you were sleeping. And they\'ll call you for the replacement too.', icon: '✅', status: 'won' },
      ],
    }
  },

  dental: {
    id: "dental",
    name: "Dental Practices",
    icon: "Smile",
    color: "#06B6D4",
    colorSecondary: "#0891B2",
    gradient: "from-cyan-500 to-blue-400",
    glow: "rgba(6,182,212,0.3)",
    tagline: "Keep every chair filled, every day",
    subtitle: "6 AI agents available",
    agents: [
      { name: "Patient Inquiry Agent", icon: "MessageCircle", dept: "Front Desk", description: "Responds to new patient inquiries instantly", status: "active", tasks: ["Answers calls and web inquiries 24/7", "Shares insurance and pricing info", "Pre-qualifies new patients", "Books first appointments"], kpis: { primary: "Inquiries Handled", secondary: "Conversion Rate" }, metric: { value: 97, unit: "%", label: "Response Rate" } },
      { name: "Appointment Agent", icon: "CalendarCheck", dept: "Front Desk", description: "Fills schedule gaps and manages bookings", status: "active", tasks: ["Auto-fills cancellation slots", "Sends confirmations and reminders", "Manages waitlists", "Handles rescheduling"], kpis: { primary: "Fill Rate", secondary: "No-Show Rate" }, metric: { value: 95, unit: "%", label: "Fill Rate" } },
      { name: "Treatment Coordinator Agent", icon: "ClipboardList", dept: "Clinical", description: "Presents and follows up on treatment plans", status: "active", tasks: ["Sends treatment plan summaries", "Explains financing options", "Follows up on pending plans", "Schedules multi-visit treatments"], kpis: { primary: "Plan Acceptance", secondary: "Revenue/Patient" }, metric: { value: 71, unit: "%", label: "Acceptance" } },
      { name: "Recall Agent", icon: "RotateCcw", dept: "Hygiene", description: "Fills hygiene schedule with recall patients", status: "active", tasks: ["Sends recall reminders at 6-month marks", "Re-engages lapsed patients", "Books hygiene appointments", "Manages family scheduling"], kpis: { primary: "Recall Rate", secondary: "Reactivations" }, metric: { value: 82, unit: "%", label: "Recall Rate" } },
      { name: "Review Agent", icon: "Star", dept: "Marketing", description: "Builds online reputation with consistent reviews", status: "active", tasks: ["Sends review requests post-visit", "Responds to online reviews", "Flags negative feedback", "Tracks review velocity"], kpis: { primary: "Reviews/Month", secondary: "Avg Rating" }, metric: { value: 4.8, unit: "stars", label: "Avg Rating" } },
      { name: "Insurance Verification Agent", icon: "ShieldCheck", dept: "Admin", description: "Verifies insurance before appointments", status: "active", tasks: ["Auto-verifies insurance eligibility", "Calculates patient portions", "Sends pre-visit cost estimates", "Flags coverage issues"], kpis: { primary: "Verifications", secondary: "Accuracy" }, metric: { value: 99, unit: "%", label: "Accuracy" } }
    ],
    workflow: [
      { step: "Inquiry", agent: "Patient Agent", icon: "MessageCircle", before: "Hold music, missed calls", after: "Instant response 24/7", beforeTime: "2.8 hours", afterTime: "45 seconds", dropoff: { before: 50, after: 4 } },
      { step: "Booking", agent: "Appointment Agent", icon: "CalendarCheck", before: "Manual scheduling, gaps", after: "Auto-filled schedule", beforeTime: "Manual", afterTime: "Instant", dropoff: { before: 28, after: 6 } },
      { step: "Visit", agent: "Insurance Agent", icon: "ShieldCheck", before: "Surprise costs, no pre-verify", after: "Pre-verified, cost estimate sent", beforeTime: "At visit", afterTime: "Pre-visit", dropoff: { before: 15, after: 3 } },
      { step: "Treatment Plan", agent: "Coordinator Agent", icon: "ClipboardList", before: "Verbal only, no follow-up", after: "Digital plan + auto follow-up", beforeTime: "Often lost", afterTime: "Same day", dropoff: { before: 42, after: 10 } },
      { step: "Recall", agent: "Recall Agent", icon: "RotateCcw", before: "Postcards, low reactivation", after: "Multi-channel smart recall", beforeTime: "6-month gap", afterTime: "Proactive outreach", dropoff: { before: 35, after: 8 } },
      { step: "Review", agent: "Review Agent", icon: "Star", before: "Rarely asked", after: "Every visit", beforeTime: "Rarely", afterTime: "Automated", dropoff: { before: 0, after: 0 } }
    ],
    roi: { leadResponseImprovement: 0.88, conversionLift: 0.14, missedLeadRecovery: 0.28, avgResponseTimeBefore: "2.8 hours", avgResponseTimeAfter: "45 seconds", reviewIncreasePercent: 350 },
    defaults: { monthlyLeads: 120, avgJobValue: 1800, employees: 10, currentCloseRate: 0.22, currentResponseTime: 2.8, monthlyAdSpend: 6000, noShowRate: 20, missedCallsEstimate: 65 },
    caseStudies: [
      { company: "Bright Smile Dental", location: "Austin, TX", employees: 8, result: "Filled 94% of hygiene schedule vs 72% before", savings: "$19,000/month in additional production", detail: "AI recall system reactivated 180 lapsed patients in first 60 days. No-shows dropped from 22% to 7%.", metrics: { closeBefore: 22, closeAfter: 38, days: 60, monthlySavings: 19000 } }
    ],
    integrations: ["Dentrix", "Open Dental", "Eaglesoft", "CareStack", "Google Business"],
    painPoints: [
      { title: "Empty Chairs Cost $800/Hour", stat: "$800+", description: "in lost production every hour a hygiene or operatory chair sits empty", icon: "DollarSign" },
      { title: "Treatment Plans Die on the Vine", stat: "40%", description: "of treatment plans never get accepted — patients walk out and never come back", icon: "FileX" },
      { title: "Recall Patients Vanish", stat: "35%", description: "of patients don't return for their 6-month cleaning — and take their family with them", icon: "UserMinus" },
      { title: "Benefits Expire Unused", stat: "$1,200", description: "average unused dental benefits per patient per year — money left on the table", icon: "CalendarX" }
    ],
    liveFeedExamples: [
      { type: "lead", text: "New patient booked — Delta Dental PPO, $1,500 remaining benefits", time: "2 min ago" },
      { type: "schedule", text: "Cancellation slot filled from waitlist in 4 minutes", time: "6 min ago" },
      { type: "recall", text: "Garcia family — all 4 members booked back-to-back Tuesday", time: "11 min ago" },
      { type: "treatment", text: "Crown treatment plan accepted — CareCredit $47/mo approved", time: "16 min ago" },
      { type: "review", text: "5-star review: 'Best dental experience ever. No waiting!'", time: "22 min ago" },
      { type: "insurance", text: "Year-end benefits alert sent to 89 patients with $500+ remaining", time: "28 min ago" }
    ],

    heroImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80",

    dayStory: {
      before: [
        { time: '5:47 PM', event: 'Sarah searches "dentist near me accepting new patients"', detail: 'Hasn\'t been to a dentist in 3 years. Has Delta Dental through work.', icon: '🔍' },
        { time: '5:48 PM', event: 'Finds your practice, calls the number', detail: '"Thank you for calling Bright Smile Dental. Our office hours are 8 to 5..."', icon: '📞' },
        { time: '5:48 PM', event: 'Gets voicemail', detail: 'Your front desk left at 5. Sarah doesn\'t leave a message.', icon: '⚠️', status: 'warning' },
        { time: '5:49 PM', event: 'Calls the next practice on Google', detail: 'They answer. "We accept Delta Dental! We have Tuesday at 2 PM."', icon: '😫', status: 'warning' },
        { time: '5:50 PM', event: 'Books with your competitor', detail: 'New patient exam + cleaning + X-rays. Plus her husband and 2 kids.', icon: '📞', status: 'danger' },
        { time: 'NEXT DAY', event: 'Your front desk sees a missed call', detail: 'No voicemail. No way to call back. Sarah is gone forever.', icon: '❌', status: 'lost' },
        { time: 'RESULT', event: '4-person family worth $8,000+/year — LOST', detail: 'One missed call = one family = $40K+ in lifetime value. Gone.', icon: '💸', status: 'lost' },
      ],
      after: [
        { time: '5:47 PM', event: 'Sarah searches "dentist near me accepting new patients"', detail: 'Hasn\'t been to a dentist in 3 years. Has Delta Dental through work.', icon: '🔍' },
        { time: '5:48 PM', event: 'Finds your practice, calls the number', detail: 'AI answers: "Thanks for calling Bright Smile Dental! I can help you."', icon: '📞' },
        { time: '5:49 PM', event: 'AI qualifies and verifies insurance', detail: '"Delta Dental PPO — great, we\'re in-network. Your cleaning is 100% covered."', icon: '⚡', status: 'active' },
        { time: '5:50 PM', event: 'Appointment booked', detail: 'Tuesday 2 PM with Dr. Park. Digital paperwork texted to Sarah.', icon: '📅', status: 'success' },
        { time: '5:51 PM', event: 'Family scheduling offered', detail: '"Would your husband and kids like back-to-back appointments?"', icon: '👨‍👩‍👧‍👦', status: 'success' },
        { time: '5:52 PM', event: 'You get a notification', detail: '"New patient family: 4 Mitchells — Delta Dental PPO — $1,500 each in benefits — Tue 2-5 PM"', icon: '🔔', status: 'success' },
        { time: 'RESULT', event: '4-person family worth $8,000+/year — BOOKED', detail: 'At 5:48 PM. While your front desk was at home. $40K+ lifetime value secured.', icon: '✅', status: 'won' },
      ],
    }
  },

  auto_dealership: {
    id: "auto_dealership",
    name: "Auto Dealerships",
    icon: "Car",
    color: "#EF4444",
    colorSecondary: "#DC2626",
    gradient: "from-red-500 to-orange-500",
    glow: "rgba(239,68,68,0.3)",
    tagline: "Turn every lead into a test drive",
    subtitle: "6 AI agents available",
    agents: [
      { name: "Lead Response Agent", icon: "Zap", dept: "Sales", description: "Responds to every online lead in under 60 seconds", status: "active", tasks: ["Instant response to website/3rd-party leads", "Qualifies buyer intent and budget", "Schedules test drives", "Sends vehicle matches"], kpis: { primary: "Response Time", secondary: "Appointment Set Rate" }, metric: { value: 95, unit: "%", label: "Contact Rate" } },
      { name: "BDC Agent", icon: "Phone", dept: "Sales", description: "Handles inbound calls and internet leads", status: "active", tasks: ["Answers all inbound calls", "Follows up on internet leads", "Books showroom appointments", "Manages lead distribution"], kpis: { primary: "Leads Worked", secondary: "Show Rate" }, metric: { value: 88, unit: "%", label: "Show Rate" } },
      { name: "Follow-Up Agent", icon: "RefreshCw", dept: "Sales", description: "Never lets a lead go cold", status: "active", tasks: ["Multi-touch follow-up sequences", "Re-engages cold leads", "Sends inventory alerts", "Triggers manager involvement on hot leads"], kpis: { primary: "Follow-Up Rate", secondary: "Reactivation Rate" }, metric: { value: 100, unit: "%", label: "Follow-Up" } },
      { name: "Service Reminder Agent", icon: "Wrench", dept: "Service", description: "Drives service department revenue", status: "active", tasks: ["Sends service reminders", "Books service appointments", "Promotes service specials", "Manages recall notifications"], kpis: { primary: "Service Bookings", secondary: "Revenue/RO" }, metric: { value: 34, unit: "%", label: "Booking Lift" } },
      { name: "Review Agent", icon: "Star", dept: "Marketing", description: "Builds dealership reputation online", status: "active", tasks: ["Sends review requests post-purchase/service", "Manages online reputation", "Responds to reviews", "Tracks CSI scores"], kpis: { primary: "Reviews/Month", secondary: "Rating" }, metric: { value: 4.6, unit: "stars", label: "Avg Rating" } },
      { name: "Equity Mining Agent", icon: "TrendingUp", dept: "Sales", description: "Identifies upgrade opportunities in your database", status: "active", tasks: ["Analyzes customer equity positions", "Sends personalized upgrade offers", "Targets lease expiration customers", "Books upgrade appointments"], kpis: { primary: "Opportunities Found", secondary: "Conversion Rate" }, metric: { value: 12, unit: "%", label: "Conversion" } }
    ],
    workflow: [
      { step: "Lead", agent: "Lead Response Agent", icon: "Zap", before: "2-4 hour response time", after: "<60s response", beforeTime: "2.5 hours", afterTime: "47 seconds", dropoff: { before: 60, after: 5 } },
      { step: "Qualify", agent: "BDC Agent", icon: "Phone", before: "Cherry-picked leads only", after: "Every lead worked", beforeTime: "Selective", afterTime: "100% coverage", dropoff: { before: 40, after: 8 } },
      { step: "Appointment", agent: "Follow-Up Agent", icon: "CalendarCheck", before: "1-2 attempts", after: "7-touch sequence", beforeTime: "1-2 calls", afterTime: "7 touches", dropoff: { before: 50, after: 15 } },
      { step: "Show", agent: "Reminder Agent", icon: "Bell", before: "30% no-show rate", after: "Smart reminders, 90% show", beforeTime: "30% no-show", afterTime: "10% no-show", dropoff: { before: 30, after: 10 } },
      { step: "Close", agent: "Sales Agent", icon: "Target", before: "Standard process", after: "Data-driven close assist", beforeTime: "Standard", afterTime: "AI-assisted", dropoff: { before: 35, after: 18 } },
      { step: "Retain", agent: "Service Agent", icon: "Wrench", before: "Service reminders ignored", after: "Proactive lifecycle management", beforeTime: "Passive", afterTime: "Proactive", dropoff: { before: 0, after: 0 } }
    ],
    roi: { leadResponseImprovement: 0.80, conversionLift: 0.08, missedLeadRecovery: 0.20, avgResponseTimeBefore: "2.5 hours", avgResponseTimeAfter: "47 seconds", reviewIncreasePercent: 200 },
    defaults: { monthlyLeads: 300, avgJobValue: 35000, employees: 25, currentCloseRate: 0.12, currentResponseTime: 2.5, monthlyAdSpend: 15000, noShowRate: 30, missedCallsEstimate: 180 },
    caseStudies: [
      { company: "Metro Auto Group", location: "Atlanta, GA", employees: 45, result: "12% to 19% close rate, +47 units/month", savings: "$82,000/month in additional gross profit", detail: "AI BDC handled 100% of internet leads. Response time dropped from 2.5hrs to 47 seconds.", metrics: { closeBefore: 12, closeAfter: 19, days: 60, monthlySavings: 82000 } }
    ],
    integrations: ["DealerSocket", "VinSolutions", "CDK", "Reynolds & Reynolds", "Google Business"],
    painPoints: [
      { title: "1 Hour 38 Minutes to Respond", stat: "1hr 38m", description: "average dealership response time to internet leads — by then they've contacted 3 other dealers", icon: "Clock" },
      { title: "74% Don't Include a Price", stat: "74%", description: "of dealer responses don't include pricing — the #1 thing the customer asked about", icon: "Globe" },
      { title: "No-Shows Kill Your Saturday", stat: "30%", description: "of showroom appointments are no-shows — that's 6 wasted ups every weekend", icon: "UserX" },
      { title: "BDC Turnover Bleeds Money", stat: "67%", description: "annual BDC turnover rate — you're constantly training people who leave in 8 months", icon: "UserMinus" }
    ],
    liveFeedExamples: [
      { type: "lead", text: "AutoTrader lead responded in 47 sec — VIN-specific pricing sent", time: "1 min ago" },
      { type: "schedule", text: "Test drive booked: 2024 Camry LE, Saturday 11 AM with Brian", time: "4 min ago" },
      { type: "trade", text: "Trade-in valued: 2020 Civic EX — $18,500 est. equity $7,200", time: "8 min ago" },
      { type: "followup", text: "Be-back text sent: 'Toyota just announced 2.9% APR this month'", time: "13 min ago" },
      { type: "equity", text: "Service-to-sales alert: customer in bay has $8K equity, same payment upgrade possible", time: "18 min ago" },
      { type: "review", text: "5-star DealerRater review: 'Brian made it so easy. No pressure.'", time: "24 min ago" }
    ],

    heroImage: "https://images.unsplash.com/photo-1568844293986-8d0400f4745b?w=1200&q=80",

    dayStory: {
      before: [
        { time: '8:47 PM', event: 'Mike submits a lead on AutoTrader for a 2024 Camry', detail: '"Interested in the Camry LE, stock #T4892. What\'s your best price?"', icon: '🔍' },
        { time: '8:47 PM', event: 'Lead lands in your CRM', detail: 'Your BDC went home at 7. The lead sits.', icon: '📥' },
        { time: '9:12 PM', event: 'Mike submits leads at 2 other dealers', detail: 'He\'s comparing. Whoever responds first with a real number wins.', icon: '⚠️', status: 'warning' },
        { time: '9:15 PM', event: 'Competitor responds with price and payment', detail: '"Hi Mike, $27,485 out the door. $389/mo. When can you come in?"', icon: '😫', status: 'warning' },
        { time: '9:20 PM', event: 'Mike books with the competitor', detail: 'Test drive Saturday at 11. He liked that they actually answered his question.', icon: '📞', status: 'danger' },
        { time: '9:14 AM', event: 'Your BDC calls Mike the next morning', detail: '"Hi, thanks for your interest in..." — "Already bought one. Thanks."', icon: '❌', status: 'lost' },
        { time: 'RESULT', event: '$3,500 front + back gross — LOST', detail: 'Because nobody responded for 12 hours. This happens 5-10 times per day.', icon: '💸', status: 'lost' },
      ],
      after: [
        { time: '8:47 PM', event: 'Mike submits a lead on AutoTrader for a 2024 Camry', detail: '"Interested in the Camry LE, stock #T4892. What\'s your best price?"', icon: '🔍' },
        { time: '8:47 PM', event: 'AI responds in 47 seconds', detail: 'VIN-specific: "$27,485 internet price. $389/mo. In stock, Celestial Silver."', icon: '⚡', status: 'active' },
        { time: '8:48 PM', event: 'Mike engages — asks about trade', detail: 'AI: "What are you driving now? I can get you a preliminary value in 2 minutes."', icon: '💬', status: 'success' },
        { time: '8:50 PM', event: 'Trade valued, payment adjusted', detail: '"Your 2020 Civic is worth ~$18,500. Net payment on the Camry: $267/mo."', icon: '💰', status: 'success' },
        { time: '8:52 PM', event: 'Appointment booked', detail: 'Saturday 11 AM with Brian. Camry will be pulled up front, washed and gassed.', icon: '📅', status: 'success' },
        { time: '8:53 PM', event: 'Brian gets a text', detail: '"New appointment: Mike Torres, Camry LE #T4892, has a trade, pre-qualified. Saturday 11 AM."', icon: '🔔', status: 'success' },
        { time: 'RESULT', event: '$3,500 front + back gross — SOLD', detail: 'Responded in 47 seconds. With actual pricing. While your BDC was at home.', icon: '✅', status: 'won' },
      ],
    }
  },

  construction: {
    id: "construction",
    name: "General Construction",
    icon: "HardHat",
    color: "#F97316",
    colorSecondary: "#EA580C",
    gradient: "from-orange-500 to-amber-500",
    glow: "rgba(249,115,22,0.3)",
    tagline: "Turn sent estimates into signed contracts",
    subtitle: "7 operational systems",
    usesSystemsApproach: true,

    // New construction-specific metrics (replaces leads/employees)
    constructionMetrics: {
      monthly_estimates_sent: 60,
      avg_job_value: 12000,
      estimate_to_job_rate: 25,
      projects_active: 8,
      avg_project_delay_days: 5,
      margin_loss_from_changes: 15
    },

    // Real construction workflow
    workflow: [
      { step: "Lead", system: "Rapid Response System", icon: "PhoneIncoming", before: "Missed calls while on job sites", after: "Instant capture 24/7, qualified in 3 min", beforeTime: "5+ hours", afterTime: "47 seconds", dropoff: { before: 60, after: 5 } },
      { step: "Estimate", system: "Fast Estimate System", icon: "Calculator", before: "Estimates take 5-7 days", after: "Same-day professional estimates", beforeTime: "5-7 days", afterTime: "Same day", dropoff: { before: 35, after: 8 } },
      { step: "Follow-Up", system: "Bid Follow-Up System", icon: "RefreshCw", before: "Maybe 1 follow-up, then forgotten", after: "Automated 5-touch sequence", beforeTime: "1 attempt", afterTime: "5 touches", dropoff: { before: 50, after: 12 } },
      { step: "Job Won", system: "Change Order System", icon: "FileCheck", before: "Handshake deal, scope unclear", after: "Documented scope, change tracking ready", beforeTime: "Verbal", afterTime: "Documented", dropoff: { before: 10, after: 2 } },
      { step: "Build", system: "Client Update System", icon: "HardHat", before: "Radio silence, clients anxious", after: "Daily updates, weekly summaries", beforeTime: "Sporadic", afterTime: "Daily", dropoff: { before: 8, after: 1 } },
      { step: "Change Orders", system: "Change Order System", icon: "FileText", before: "Scope creep kills margins", after: "Every change logged and approved", beforeTime: "Undocumented", afterTime: "100% tracked", dropoff: { before: 15, after: 0 } },
      { step: "Completion", system: "Project Timeline System", icon: "CheckCircle", before: "Punch list drags on", after: "Structured completion process", beforeTime: "Weeks", afterTime: "Days", dropoff: { before: 5, after: 1 } },
      { step: "Review", system: "Review Collection System", icon: "Star", before: "Rarely asked for reviews", after: "Systematic collection every project", beforeTime: "Rarely", afterTime: "Every job", dropoff: { before: 0, after: 0 } }
    ],

    roi: { leadResponseImprovement: 0.78, conversionLift: 0.15, missedLeadRecovery: 0.25, avgResponseTimeBefore: "5 hours", avgResponseTimeAfter: "47 seconds", reviewIncreasePercent: 200 },
    
    defaults: { 
      monthlyLeads: 60,
      avgJobValue: 12000,
      employees: 18,
      currentCloseRate: 0.25,
      currentResponseTime: 5.0,
      monthlyAdSpend: 3500,
      noShowRate: 15,
      missedCallsEstimate: 50
    },

    caseStudies: [
      { company: "Cornerstone Builders", location: "Nashville, TN", employees: 20, result: "12% to 28% bid win rate in 90 days", savings: "$78,000/month in additional revenue", detail: "Automated follow-up on every estimate transformed their close rate. Change order tracking protected $4,200/month in margins.", metrics: { closeBefore: 12, closeAfter: 28, days: 90, monthlySavings: 78000 } },
      { company: "Summit Remodeling", location: "Austin, TX", employees: 14, result: "Cut estimate turnaround from 7 days to same-day", savings: "$52,000/month in captured jobs", detail: "Fast estimates + systematic follow-up meant they won jobs competitors never even quoted.", metrics: { closeBefore: 15, closeAfter: 31, days: 60, monthlySavings: 52000 } }
    ],

    integrations: ["Buildertrend", "CoConstruct", "Jobber", "CompanyCam", "Google Business"],

    // Personalized pain points based on metrics
    painPoints: [
      { title: "Bids Sent But Never Followed Up", stat: "50%", description: "of your estimates never get a single follow-up — that's $360K in quotes sitting in inboxes", icon: "FileX" },
      { title: "Slow Estimate Turnaround", stat: "5+ days", description: "average time to send an estimate — homeowners have already called 3 other contractors", icon: "Clock" },
      { title: "Scope Creep Without Tracking", stat: "15%", description: "of your margin disappears to undocumented changes — 'while you're here, can you also...'", icon: "TrendingDown" },
      { title: "Subcontractor Coordination Issues", stat: "2-3 days", description: "average delay per project from sub no-shows and miscommunication", icon: "Users" },
      { title: "Project Delays from Miscommunication", stat: "5 days", description: "average delay per project — costing you $2,500+ in overhead and reputation", icon: "Calendar" },
      { title: "Clients Constantly Asking for Updates", stat: "8+ calls", description: "per project asking 'what's happening?' — 4 hours/week of your time gone", icon: "Phone" },
      { title: "Lost Jobs Due to Slow Response", stat: "30%", description: "of leads go to whoever responds first — you're on a job site, not checking your phone", icon: "PhoneMissed" },
      { title: "Admin Overload", stat: "15+ hrs/week", description: "spent on quotes, updates, scheduling, and paperwork instead of building", icon: "FileText" }
    ],

    liveFeedExamples: [
      { type: "estimate", text: "Kitchen remodel estimate sent — $47,000 — tracking started", time: "2 min ago" },
      { type: "followup", text: "Day 3 follow-up sent: 'We have an opening next week...'", time: "8 min ago" },
      { type: "change_order", text: "Change order approved: +$1,680 for recessed lighting", time: "15 min ago" },
      { type: "update", text: "Daily progress update sent to Johnson project with photos", time: "22 min ago" },
      { type: "hot_lead", text: "🔥 HOT LEAD: Client replied 'Can we start next week?'", time: "31 min ago" },
      { type: "review", text: "5-star review collected: 'Best contractor we've ever worked with'", time: "45 min ago" }
    ],

    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",

    // Personalization for sales approach
    personalization: {
      tone: "reliable",
      toneDescription: "Straightforward, no-BS, gets the job done",
      demoAngle: "Show them how many estimates are sitting unfollowed in their inbox right now",
      hookQuestion: "How many estimates did you send last month that you never heard back from?",
      painPoint: "You're losing half your potential revenue because you're too busy working to follow up",
      valueProposition: "Turn your sent estimates into signed contracts — automatically"
    },

    dayStory: {
      before: [
        { time: '10:15 AM', event: 'Homeowner submits kitchen remodel inquiry', detail: 'Found you on Google, wants a quote for full kitchen renovation', icon: '🔍' },
        { time: '10:15 AM', event: 'Form sits in your inbox', detail: 'You\'re on a job site running a crew. Phone is in the truck.', icon: '⚠️', status: 'warning' },
        { time: '2:30 PM', event: 'You finally see the inquiry', detail: 'Between jobs, checking email. 4 hours have passed.', icon: '📱' },
        { time: '2:35 PM', event: 'You call back — no answer', detail: 'Leave a voicemail. They\'re at work now.', icon: '📞', status: 'warning' },
        { time: 'NEXT DAY', event: 'Homeowner already got 3 quotes', detail: 'Other contractors responded within an hour. You\'re too late.', icon: '❌', status: 'lost' },
        { time: 'RESULT', event: '$45,000 kitchen remodel — LOST', detail: 'Because you were busy doing your job.', icon: '💸', status: 'lost' }
      ],
      after: [
        { time: '10:15 AM', event: 'Homeowner submits kitchen remodel inquiry', detail: 'Found you on Google, wants a quote for full kitchen renovation', icon: '🔍' },
        { time: '10:15 AM', event: 'Rapid Response System activates', detail: 'Instant text: "Thanks for reaching out! I\'d love to help with your kitchen..."', icon: '⚡', status: 'active' },
        { time: '10:18 AM', event: 'Lead qualified automatically', detail: 'Project type, timeline, budget range collected. Site visit offered.', icon: '📋', status: 'success' },
        { time: '10:20 AM', event: 'Site visit booked', detail: 'Tomorrow 4 PM — calendar confirmed, reminder scheduled', icon: '📅', status: 'success' },
        { time: '10:21 AM', event: 'You get a notification', detail: '"New qualified lead: Kitchen remodel, $40-50K budget, site visit tomorrow 4 PM"', icon: '🔔', status: 'success' },
        { time: 'RESULT', event: '$45,000 kitchen remodel — CAPTURED', detail: 'In 6 minutes. While you were running your crew.', icon: '✅', status: 'won' }
      ]
    }
  },

  law_firm: {
    id: "law_firm",
    name: "Law Firms",
    icon: "Scale",
    color: "#E11D48",
    colorSecondary: "#BE123C",
    gradient: "from-rose-600 to-red-500",
    glow: "rgba(225,29,72,0.3)",
    tagline: "Never miss a high-value case again",
    subtitle: "7 operational systems",
    usesSystemsApproach: true,

    // Saved Profiles - Pre-analyzed law firms
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

    agents: [
      { name: "Intake Agent", icon: "PhoneIncoming", dept: "Intake", description: "Captures and qualifies every legal inquiry 24/7", status: "active", tasks: ["Answers calls and web forms", "Qualifies case type and urgency", "Collects initial case details", "Schedules consultations"], kpis: { primary: "Intakes Completed", secondary: "Qualification Rate" }, metric: { value: 98, unit: "%", label: "Capture Rate" } },
      { name: "Consultation Booking Agent", icon: "CalendarCheck", dept: "Intake", description: "Books and confirms consultation appointments", status: "active", tasks: ["Books consultations instantly", "Sends preparation checklists", "Manages attorney calendars", "Reduces no-shows"], kpis: { primary: "Consultations Booked", secondary: "Show Rate" }, metric: { value: 91, unit: "%", label: "Show Rate" } },
      { name: "Client Communication Agent", icon: "MessageSquare", dept: "Client Services", description: "Keeps clients updated on case progress", status: "active", tasks: ["Sends case status updates", "Answers common case questions", "Manages document requests", "Sends court date reminders"], kpis: { primary: "Response Time", secondary: "Satisfaction" }, metric: { value: 4.9, unit: "stars", label: "Satisfaction" } },
      { name: "Follow-Up Agent", icon: "RefreshCw", dept: "Sales", description: "Converts consultations into retained clients", status: "active", tasks: ["Follows up post-consultation", "Sends retainer agreements", "Handles fee structure questions", "Re-engages undecided prospects"], kpis: { primary: "Retention Rate", secondary: "Revenue/Client" }, metric: { value: 67, unit: "%", label: "Retention" } },
      { name: "Review Agent", icon: "Star", dept: "Marketing", description: "Builds firm reputation with client reviews", status: "active", tasks: ["Sends review requests post-resolution", "Manages online reputation", "Generates testimonials"], kpis: { primary: "Reviews", secondary: "Rating" }, metric: { value: 4.8, unit: "stars", label: "Avg Rating" } },
      { name: "Referral Agent", icon: "Users", dept: "Marketing", description: "Manages referral network and past client relationships", status: "active", tasks: ["Tracks referral sources", "Sends referral thank-yous", "Nurtures past client relationships", "Manages co-counsel communications"], kpis: { primary: "Referrals", secondary: "Referral Revenue" }, metric: { value: 28, unit: "%", label: "Referral Rate" } }
    ],
    workflow: [
      { step: "Inquiry", agent: "Intake Agent", icon: "PhoneIncoming", before: "Missed calls, slow callbacks", after: "Instant qualification 24/7", beforeTime: "4+ hours", afterTime: "45 seconds", dropoff: { before: 58, after: 4 } },
      { step: "Consultation", agent: "Booking Agent", icon: "CalendarCheck", before: "Days to schedule", after: "Instant booking", beforeTime: "2-3 days", afterTime: "Instant", dropoff: { before: 30, after: 7 } },
      { step: "Retain", agent: "Follow-Up Agent", icon: "RefreshCw", before: "No post-consult follow-up", after: "Automated retention sequence", beforeTime: "Rarely", afterTime: "Automated", dropoff: { before: 45, after: 12 } },
      { step: "Case Work", agent: "Communication Agent", icon: "MessageSquare", before: "Clients call for updates constantly", after: "Proactive status updates", beforeTime: "Reactive", afterTime: "Proactive", dropoff: { before: 10, after: 2 } },
      { step: "Resolution", agent: "Review Agent", icon: "Star", before: "No review process", after: "Automated collection", beforeTime: "Never", afterTime: "Every case", dropoff: { before: 0, after: 0 } },
      { step: "Referral", agent: "Referral Agent", icon: "Users", before: "Passive referrals", after: "Active referral program", beforeTime: "Passive", afterTime: "Systematic", dropoff: { before: 0, after: 0 } }
    ],
    roi: { leadResponseImprovement: 0.85, conversionLift: 0.11, missedLeadRecovery: 0.25, avgResponseTimeBefore: "4 hours", avgResponseTimeAfter: "45 seconds", reviewIncreasePercent: 280 },
    defaults: { monthlyLeads: 100, avgJobValue: 8000, employees: 10, currentCloseRate: 0.18, currentResponseTime: 4.0, monthlyAdSpend: 7000, noShowRate: 25, missedCallsEstimate: 60 },
    caseStudies: [
      { company: "Sterling & Associates", location: "Phoenix, AZ", employees: 12, result: "18% to 31% retention rate in 45 days", savings: "$38,000/month in additional revenue", detail: "AI intake captured 100% of after-hours inquiries. Automated follow-up converted 42% more consultations to retained clients.", metrics: { closeBefore: 18, closeAfter: 31, days: 45, monthlySavings: 38000 } }
    ],
    integrations: ["Clio", "MyCase", "PracticePanther", "Lawmatics", "Google Business"],
    painPoints: [
      { title: "35% of Calls Go Unanswered", stat: "35%", description: "of law firm calls go unanswered — that's 195 million missed calls industry-wide per year", icon: "PhoneMissed" },
      { title: "First Attorney to Respond Wins", stat: "72%", description: "of legal prospects hire the first attorney who actually picks up the phone", icon: "Clock" },
      { title: "#1 Bar Complaint: Communication", stat: "#1", description: "reason for bar complaints and malpractice claims is poor client communication", icon: "MessageSquareX" },
      { title: "Consultations Don't Convert", stat: "55%", description: "of free consultations never become retained clients — no follow-up, no retainer", icon: "UserMinus" }
    ],
    liveFeedExamples: [
      { type: "lead", text: "Auto PI intake at 11:47 PM — rear-end collision, clear liability, ER visit", time: "2 min ago" },
      { type: "schedule", text: "Consultation booked: Martinez, tomorrow 10 AM — case score 9/10", time: "5 min ago" },
      { type: "retainer", text: "Retainer e-signed 2 hours after consultation — Santos case, est. $65K", time: "11 min ago" },
      { type: "update", text: "Bi-weekly case updates sent to 47 active clients automatically", time: "16 min ago" },
      { type: "deadline", text: "SOL alert: Johnson v. AllState — 30 days remaining, file NOW", time: "22 min ago" },
      { type: "review", text: "5-star Google review: 'They answered at 11 PM when no one else would.'", time: "28 min ago" }
    ],

    heroImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80",

    dayStory: {
      before: [
        { time: '11:34 PM', event: 'Maria is rear-ended on I-10 driving home', detail: 'Other driver ran a red light. Police report filed. Maria has back and neck pain.', icon: '🚗' },
        { time: '11:52 PM', event: 'Maria searches "car accident lawyer near me"', detail: 'In pain, scared, doesn\'t know what to do. Found your firm on Google.', icon: '🔍' },
        { time: '11:53 PM', event: 'Calls your firm', detail: '"Thank you for calling Sterling & Associates. Our office hours are..."', icon: '📞' },
        { time: '11:53 PM', event: 'Voicemail. Maria hangs up.', detail: 'She\'s not leaving a voicemail. She\'s calling the next lawyer on Google.', icon: '⚠️', status: 'warning' },
        { time: '11:55 PM', event: 'Calls another firm — they answer', detail: '"I\'m so sorry about your accident. Let me get some details..."', icon: '😫', status: 'warning' },
        { time: '11:58 PM', event: 'Maria retains the other firm', detail: 'They collected her info, explained the process, and emailed a retainer.', icon: '📞', status: 'danger' },
        { time: '9:00 AM', event: 'Your office opens. You see the missed call.', detail: 'No voicemail. No way to call back. The case is gone.', icon: '❌', status: 'lost' },
        { time: 'RESULT', event: '$65,000 case — LOST to a competitor', detail: 'You spent $400 on the Google ad that generated that click. Total waste.', icon: '💸', status: 'lost' },
      ],
      after: [
        { time: '11:34 PM', event: 'Maria is rear-ended on I-10 driving home', detail: 'Other driver ran a red light. Police report filed. Maria has back and neck pain.', icon: '🚗' },
        { time: '11:52 PM', event: 'Maria searches "car accident lawyer near me"', detail: 'In pain, scared, doesn\'t know what to do. Found your firm on Google.', icon: '🔍' },
        { time: '11:53 PM', event: 'Calls your firm — AI answers instantly', detail: '"I\'m sorry about your accident, Maria. I\'m here to help. Are you safe right now?"', icon: '📞' },
        { time: '11:55 PM', event: 'AI captures all case details', detail: 'Accident date, injuries, police report #, insurance info, photos requested via text', icon: '⚡', status: 'active' },
        { time: '11:58 PM', event: 'Consultation booked', detail: 'Tomorrow 10 AM with Attorney Martinez. Prep checklist texted to Maria.', icon: '📅', status: 'success' },
        { time: '11:59 PM', event: 'Attorney Martinez gets a full brief', detail: '"Auto PI, clear liability, ER visit, documented injuries. Score: 9/10. Est: $45-85K."', icon: '📱', status: 'success' },
        { time: '12:01 AM', event: 'Maria feels heard and helped', detail: '"Don\'t give a statement to insurance. Keep all receipts. We\'re on your side."', icon: '🤝', status: 'success' },
        { time: 'RESULT', event: '$65,000 case — SIGNED', detail: 'At 11:53 PM. Because you answered when the other 20 firms didn\'t.', icon: '✅', status: 'won' },
      ],
    }
  },

  real_estate: {
    id: "real_estate",
    name: "Real Estate",
    icon: "Building2",
    color: "#6366F1",
    colorSecondary: "#4F46E5",
    gradient: "from-indigo-500 to-purple-400",
    glow: "rgba(99,102,241,0.3)",
    tagline: "Never lose a lead to a faster agent",
    subtitle: "6 AI agents available",
    agents: [
      { name: "Lead Response Agent", icon: "Zap", dept: "Sales", description: "Responds to every property inquiry instantly", status: "active", tasks: ["Instant response to Zillow/Realtor leads", "Qualifies buyer/seller intent", "Sends property info and comparables", "Schedules showings"], kpis: { primary: "Response Time", secondary: "Appointment Rate" }, metric: { value: 97, unit: "%", label: "Contact Rate" } },
      { name: "Showing Agent", icon: "MapPin", dept: "Sales", description: "Manages showing schedules and confirmations", status: "active", tasks: ["Books showings from inquiries", "Sends listing prep instructions", "Manages showing feedback", "Handles cancellations"], kpis: { primary: "Showings Booked", secondary: "Show Rate" }, metric: { value: 89, unit: "%", label: "Show Rate" } },
      { name: "Nurture Agent", icon: "Heart", dept: "Sales", description: "Long-term lead nurturing for future buyers/sellers", status: "active", tasks: ["Drip campaigns with market updates", "Anniversary/milestone check-ins", "Re-engages cold leads", "Sends home value alerts"], kpis: { primary: "Nurture Conversions", secondary: "Database Growth" }, metric: { value: 18, unit: "%", label: "Conversion" } },
      { name: "Transaction Agent", icon: "FileCheck", dept: "Operations", description: "Manages transaction milestones and deadlines", status: "active", tasks: ["Tracks inspection/appraisal deadlines", "Sends milestone reminders", "Coordinates with lenders and title", "Updates all parties"], kpis: { primary: "On-Time Close", secondary: "Satisfaction" }, metric: { value: 96, unit: "%", label: "On-Time" } },
      { name: "Review Agent", icon: "Star", dept: "Marketing", description: "Builds agent reputation online", status: "active", tasks: ["Review requests post-closing", "Manages Zillow/Google reviews", "Generates testimonials"], kpis: { primary: "Reviews", secondary: "Rating" }, metric: { value: 4.9, unit: "stars", label: "Avg Rating" } },
      { name: "Open House Agent", icon: "DoorOpen", dept: "Marketing", description: "Captures and follows up on open house visitors", status: "active", tasks: ["Digital sign-in capture", "Instant follow-up post-visit", "Sends similar listings", "Books private showings"], kpis: { primary: "Leads Captured", secondary: "Follow-Up Rate" }, metric: { value: 100, unit: "%", label: "Follow-Up" } }
    ],
    workflow: [
      { step: "Lead", agent: "Lead Agent", icon: "Zap", before: "Hours to respond to portal leads", after: "Instant response 24/7", beforeTime: "3+ hours", afterTime: "45 seconds", dropoff: { before: 62, after: 5 } },
      { step: "Qualify", agent: "Lead Agent", icon: "Filter", before: "Time wasted on unqualified leads", after: "AI pre-qualification", beforeTime: "Manual", afterTime: "Instant", dropoff: { before: 35, after: 8 } },
      { step: "Show", agent: "Showing Agent", icon: "MapPin", before: "Phone tag to schedule", after: "Auto-booked showings", beforeTime: "Days", afterTime: "Same day", dropoff: { before: 28, after: 6 } },
      { step: "Offer", agent: "Transaction Agent", icon: "FileCheck", before: "Paper-heavy, manual tracking", after: "Digital, automated milestones", beforeTime: "Manual", afterTime: "Automated", dropoff: { before: 15, after: 4 } },
      { step: "Close", agent: "Transaction Agent", icon: "Key", before: "Missed deadlines, stress", after: "On-time, every time", beforeTime: "Stressful", afterTime: "Smooth", dropoff: { before: 8, after: 2 } },
      { step: "Retain", agent: "Nurture Agent", icon: "Heart", before: "Lost contact after close", after: "Lifetime nurture", beforeTime: "Gone", afterTime: "Forever", dropoff: { before: 0, after: 0 } }
    ],
    roi: { leadResponseImprovement: 0.82, conversionLift: 0.06, missedLeadRecovery: 0.18, avgResponseTimeBefore: "3 hours", avgResponseTimeAfter: "45 seconds", reviewIncreasePercent: 250 },
    defaults: { monthlyLeads: 250, avgJobValue: 12000, employees: 6, currentCloseRate: 0.08, currentResponseTime: 3.0, monthlyAdSpend: 4000, noShowRate: 22, missedCallsEstimate: 155 },
    caseStudies: [
      { company: "Pinnacle Realty Group", location: "Raleigh, NC", employees: 8, result: "8% to 14% lead conversion in 45 days", savings: "$52,000/month in additional commissions", detail: "AI captured and nurtured 100% of Zillow leads. Response time dropped from 3hrs to under 1 minute.", metrics: { closeBefore: 8, closeAfter: 14, days: 45, monthlySavings: 52000 } }
    ],
    integrations: ["Follow Up Boss", "KvCORE", "Sierra Interactive", "BoomTown", "Google Business"],
    painPoints: [
      { title: "Portal Leads Die Instantly", stat: "5 min", description: "is the max response window before a lead moves on", icon: "Clock" },
      { title: "Agents Can't Follow Up Enough", stat: "80%", description: "of sales happen after 5+ contacts, most agents stop at 2", icon: "TrendingDown" },
      { title: "Past Clients Forgotten", stat: "67%", description: "of past clients would use their agent again, but only 12% do", icon: "UserMinus" }
    ],
    liveFeedExamples: [
      { type: "lead", text: "Zillow lead captured for 123 Main Street", time: "1 min ago" },
      { type: "schedule", text: "Private showing booked for Saturday 2pm", time: "7 min ago" },
      { type: "nurture", text: "Market update sent to 340 contacts", time: "20 min ago" }
    ]
  },

  landscaping: {
    id: "landscaping",
    name: "Landscaping",
    icon: "TreePine",
    color: "#22C55E",
    colorSecondary: "#16A34A",
    gradient: "from-green-500 to-emerald-400",
    glow: "rgba(34,197,94,0.3)",
    tagline: "Capture every lead, close every estimate, renew every contract",
    subtitle: "7 operational systems",
    usesSystemsApproach: true,

    // New landscaping-specific metrics (replaces leads/employees)
    landscapingMetrics: {
      monthly_estimates_sent: 45,
      avg_job_value: 3500,
      estimate_to_job_rate: 22,
      recurring_contracts: 85,
      avg_contract_value: 2400,
      crews: 3,
      monthly_services: 340,
      seasonal_revenue_drop: 40
    },

    // Real landscaping workflow
    workflow: [
      { step: "Lead", system: "Rapid Response System", icon: "PhoneIncoming", before: "Missed calls while on properties", after: "Instant capture 24/7, qualified in 3 min", beforeTime: "6+ hours", afterTime: "52 seconds", dropoff: { before: 65, after: 5 } },
      { step: "Estimate", system: "Estimate Follow-Up System", icon: "Calculator", before: "Estimates take 1-2 weeks", after: "Same-week estimates with tracking", beforeTime: "1-2 weeks", afterTime: "2-3 days", dropoff: { before: 40, after: 10 } },
      { step: "Follow-Up", system: "Estimate Follow-Up System", icon: "RefreshCw", before: "Maybe 1 follow-up, then forgotten", after: "Automated 5-touch sequence", beforeTime: "1 attempt", afterTime: "5 touches", dropoff: { before: 52, after: 15 } },
      { step: "Schedule", system: "Route Optimization System", icon: "CalendarCheck", before: "Manual scheduling, inefficient routes", after: "Optimized routes, 1.5 hrs saved/day", beforeTime: "Manual", afterTime: "Automated", dropoff: { before: 10, after: 2 } },
      { step: "Service", system: "Service Update System", icon: "TreePine", before: "Clients wondering when you're coming", after: "On-the-way alerts, completion photos", beforeTime: "No updates", afterTime: "Every visit", dropoff: { before: 5, after: 1 } },
      { step: "Retain", system: "Contract Renewal System", icon: "RefreshCw", before: "38% of contracts lapse", after: "Automated renewal, 89% retention", beforeTime: "62% retention", afterTime: "89% retention", dropoff: { before: 38, after: 11 } },
      { step: "Seasonal", system: "Seasonal Revenue System", icon: "Leaf", before: "40% revenue drop in off-season", after: "Year-round service promotion", beforeTime: "Reactive", afterTime: "Proactive", dropoff: { before: 40, after: 15 } },
      { step: "Review", system: "Review Collection System", icon: "Star", before: "Rarely asked for reviews", after: "Systematic collection, 6+/month", beforeTime: "2/month", afterTime: "6+/month", dropoff: { before: 0, after: 0 } }
    ],

    roi: { leadResponseImprovement: 0.80, conversionLift: 0.18, missedLeadRecovery: 0.26, avgResponseTimeBefore: "6 hours", avgResponseTimeAfter: "52 seconds", reviewIncreasePercent: 220 },
    
    defaults: { 
      monthlyLeads: 100,
      avgJobValue: 3500,
      employees: 10,
      currentCloseRate: 0.15,
      currentResponseTime: 6.0,
      monthlyAdSpend: 2500,
      noShowRate: 10,
      missedCallsEstimate: 65
    },

    caseStudies: [
      { company: "Green Valley Landscaping", location: "Charlotte, NC", employees: 14, result: "15% to 32% close rate, 89% contract retention", savings: "$34,000/month in additional revenue", detail: "Automated follow-up on every estimate + contract renewal system transformed their business. Route optimization saved 1.5 hrs/day per crew.", metrics: { closeBefore: 15, closeAfter: 32, days: 60, monthlySavings: 34000 } },
      { company: "Evergreen Landscapes", location: "Denver, CO", employees: 18, result: "Eliminated 40% seasonal revenue drop", savings: "$28,000/month in off-season revenue", detail: "Seasonal campaigns + proactive service promotion kept revenue steady year-round.", metrics: { closeBefore: 18, closeAfter: 29, days: 90, monthlySavings: 28000 } }
    ],

    integrations: ["Jobber", "LMN", "Service Autopilot", "Aspire", "Google Business"],

    // Personalized pain points based on metrics
    painPoints: [
      { title: "Calls Missed While You're on Properties", stat: "70%", description: "of calls go unanswered when your crews are working — leads calling your competitors instead", icon: "PhoneMissed" },
      { title: "Estimates Never Followed Up", stat: "52%", description: "of your estimates sit in inboxes with zero follow-up — that's $82K in quotes going cold", icon: "FileX" },
      { title: "Seasonal Revenue Swings", stat: "40%", description: "revenue drop in off-season because you're not proactively selling year-round services", icon: "TrendingDown" },
      { title: "Maintenance Contracts Lapsing", stat: "38%", description: "of contracts don't renew because nobody follows up — that's $78K walking away", icon: "UserMinus" },
      { title: "Weather Delays Cause Chaos", stat: "4+ hrs", description: "spent rescheduling and calling clients every time it rains", icon: "CloudRain" },
      { title: "Crews Wasting Time Driving", stat: "2+ hrs/day", description: "per crew in unnecessary drive time from unoptimized routes", icon: "Car" },
      { title: "Slow Estimate Turnaround", stat: "1-2 weeks", description: "to send an estimate — homeowners have already hired someone else", icon: "Clock" },
      { title: "Not Collecting Reviews", stat: "2/month", description: "reviews collected when you should be getting 8+ — losing to competitors with better ratings", icon: "Star" }
    ],

    liveFeedExamples: [
      { type: "estimate", text: "Patio installation estimate sent — $8,500 — tracking started", time: "2 min ago" },
      { type: "followup", text: "Day 3 follow-up: 'Spring is filling up fast...' sent to Mike J.", time: "7 min ago" },
      { type: "renewal", text: "Contract renewal approved: Johnson residence — $2,400/year", time: "14 min ago" },
      { type: "weather", text: "Rain delay notifications sent to 12 clients — auto-rescheduled", time: "21 min ago" },
      { type: "route", text: "Crew B route optimized — 47 min drive time saved today", time: "28 min ago" },
      { type: "hot_lead", text: "🔥 HOT LEAD: 'Can you do it before Memorial Day?'", time: "35 min ago" },
      { type: "review", text: "5-star review: 'Best landscapers we've ever hired'", time: "42 min ago" }
    ],

    heroImage: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1200&q=80",

    // Personalization for sales approach
    personalization: {
      tone: "fast",
      toneDescription: "Quick, efficient, gets it done — like a well-run crew",
      demoAngle: "Show them how much revenue is walking away from unfollowed estimates and lapsed contracts",
      hookQuestion: "How many estimates did you send last month that you never heard back from?",
      painPoint: "You're losing jobs because you're too busy mowing to answer the phone",
      valueProposition: "Capture every lead, follow up on every estimate, renew every contract — automatically"
    },

    dayStory: {
      before: [
        { time: '2:15 PM', event: 'Homeowner submits patio inquiry', detail: 'Found you on Google, wants a quote for backyard patio', icon: '🔍' },
        { time: '2:15 PM', event: 'Form sits in your inbox', detail: 'You\'re on a property with Crew A. Phone is in the truck.', icon: '⚠️', status: 'warning' },
        { time: '5:30 PM', event: 'You finally see the inquiry', detail: 'End of day, checking email. 3 hours have passed.', icon: '📱' },
        { time: '5:35 PM', event: 'You call back — no answer', detail: 'Leave a voicemail. They\'re making dinner.', icon: '📞', status: 'warning' },
        { time: 'NEXT DAY', event: 'Homeowner already got 2 quotes', detail: 'Other landscapers responded within an hour. You\'re playing catch-up.', icon: '❌', status: 'lost' },
        { time: 'RESULT', event: '$8,500 patio job — LOST', detail: 'Because you were busy doing your job.', icon: '💸', status: 'lost' }
      ],
      after: [
        { time: '2:15 PM', event: 'Homeowner submits patio inquiry', detail: 'Found you on Google, wants a quote for backyard patio', icon: '🔍' },
        { time: '2:15 PM', event: 'Rapid Response System activates', detail: 'Instant text: "Thanks for reaching out! I\'d love to help with your patio..."', icon: '⚡', status: 'active' },
        { time: '2:18 PM', event: 'Lead qualified automatically', detail: 'Project type, size, timeline collected. Site visit offered.', icon: '📋', status: 'success' },
        { time: '2:20 PM', event: 'Site visit booked', detail: 'Tomorrow 4 PM — calendar confirmed, reminder scheduled', icon: '📅', status: 'success' },
        { time: '2:21 PM', event: 'You get a notification', detail: '"New qualified lead: Patio, 400 sq ft, $8-12K budget, site visit tomorrow 4 PM"', icon: '🔔', status: 'success' },
        { time: 'RESULT', event: '$8,500 patio job — CAPTURED', detail: 'In 6 minutes. While you were running your crew.', icon: '✅', status: 'won' }
      ]
    }
  },

  pools: {
    id: "pools",
    name: "Pools & Spas",
    icon: "Waves",
    color: "#0EA5E9",
    colorSecondary: "#0284C7",
    gradient: "from-sky-500 to-blue-500",
    glow: "rgba(14,165,233,0.3)",
    tagline: "Dive into more closed deals",
    subtitle: "6 AI agents available",
    agents: [
      { name: "Pool Inquiry Agent", icon: "PhoneIncoming", dept: "Sales", description: "Captures every pool/spa inquiry instantly", status: "active", tasks: ["Answers calls and forms 24/7", "Qualifies project: new build vs renovation vs service", "Collects yard dimensions and preferences", "Schedules design consultations"], kpis: { primary: "Inquiries Captured", secondary: "Qualification Rate" }, metric: { value: 97, unit: "%", label: "Capture Rate" } },
      { name: "Design Consultation Agent", icon: "Palette", dept: "Sales", description: "Manages the design consultation pipeline", status: "active", tasks: ["Books design consultations", "Sends design inspiration packages", "Follows up on proposals", "Handles financing questions"], kpis: { primary: "Consultations Booked", secondary: "Close Rate" }, metric: { value: 86, unit: "%", label: "Show Rate" } },
      { name: "Construction Update Agent", icon: "HardHat", dept: "Operations", description: "Keeps clients informed during pool construction", status: "active", tasks: ["Sends weekly build progress updates", "Shares construction photos", "Manages timeline expectations", "Coordinates subcontractors"], kpis: { primary: "Update Frequency", secondary: "Satisfaction" }, metric: { value: 4.9, unit: "stars", label: "Satisfaction" } },
      { name: "Service Scheduling Agent", icon: "CalendarCheck", dept: "Service", description: "Manages pool maintenance and service calls", status: "active", tasks: ["Books weekly maintenance routes", "Handles emergency service requests", "Manages seasonal open/close", "Sends maintenance reminders"], kpis: { primary: "Service Bookings", secondary: "Retention" }, metric: { value: 92, unit: "%", label: "Retention" } },
      { name: "Review Agent", icon: "Star", dept: "Marketing", description: "Collects reviews from build and service clients", status: "active", tasks: ["Review requests post-completion", "Shares pool showcase photos", "Manages online reputation"], kpis: { primary: "Reviews", secondary: "Rating" }, metric: { value: 4.8, unit: "stars", label: "Avg Rating" } },
      { name: "Seasonal Sales Agent", icon: "Sun", dept: "Sales", description: "Drives seasonal promotions and upsells", status: "active", tasks: ["Early-bird spring booking campaigns", "Promotes upgrades and accessories", "Re-engages past clients", "Holiday and seasonal promotions"], kpis: { primary: "Seasonal Bookings", secondary: "Upsell Rate" }, metric: { value: 24, unit: "%", label: "Upsell Rate" } }
    ],
    workflow: [
      { step: "Inquiry", agent: "Pool Agent", icon: "PhoneIncoming", before: "Missed calls during builds", after: "Instant capture 24/7", beforeTime: "5+ hours", afterTime: "50 seconds", dropoff: { before: 58, after: 4 } },
      { step: "Design", agent: "Design Agent", icon: "Palette", before: "Weeks to schedule consultation", after: "Auto-booked with inspiration package", beforeTime: "1-2 weeks", afterTime: "Same week", dropoff: { before: 35, after: 8 } },
      { step: "Proposal", agent: "Follow-Up Agent", icon: "FileText", before: "Sent and forgotten", after: "5-touch automated sequence", beforeTime: "1 attempt", afterTime: "5 touches", dropoff: { before: 48, after: 15 } },
      { step: "Build", agent: "Update Agent", icon: "HardHat", before: "Clients call for updates", after: "Proactive weekly updates", beforeTime: "Reactive", afterTime: "Proactive", dropoff: { before: 5, after: 1 } },
      { step: "Service", agent: "Service Agent", icon: "CalendarCheck", before: "Manual scheduling chaos", after: "Automated maintenance routes", beforeTime: "Manual", afterTime: "Automated", dropoff: { before: 20, after: 5 } },
      { step: "Retain", agent: "Seasonal Agent", icon: "Sun", before: "Lost after build", after: "Lifetime service relationship", beforeTime: "One-time", afterTime: "Recurring", dropoff: { before: 0, after: 0 } }
    ],
    roi: { leadResponseImprovement: 0.82, conversionLift: 0.08, missedLeadRecovery: 0.20, avgResponseTimeBefore: "5 hours", avgResponseTimeAfter: "50 seconds", reviewIncreasePercent: 230 },
    defaults: { monthlyLeads: 60, avgJobValue: 55000, employees: 12, currentCloseRate: 0.10, currentResponseTime: 5.0, monthlyAdSpend: 4000, noShowRate: 18, missedCallsEstimate: 35 },
    caseStudies: [
      { company: "Crystal Clear Pools", location: "Tampa, FL", employees: 16, result: "10% to 18% close rate on pool builds", savings: "$78,000/month in additional revenue", detail: "AI captured all leads during build season. Follow-up sequences converted 40% more proposals into signed contracts.", metrics: { closeBefore: 10, closeAfter: 18, days: 60, monthlySavings: 78000 } }
    ],
    integrations: ["ServiceTitan", "Skimmer", "Pool Office Manager", "Jobber", "Google Business"],
    painPoints: [
      { title: "High-Value Leads Lost", stat: "$55K+", description: "average pool build value — each missed lead is massive", icon: "DollarSign" },
      { title: "Proposals Die Without Follow-Up", stat: "48%", description: "of pool proposals never get a follow-up", icon: "FileX" },
      { title: "Seasonal Booking Rush", stat: "Spring",description: "60% of annual inquiries in a 3-month window, overwhelming staff", icon: "TrendingUp" }
    ],
    liveFeedExamples: [
      { type: "lead", text: "New pool build inquiry captured from Google", time: "2 min ago" },
      { type: "design", text: "Design consultation booked with inspiration package sent", time: "8 min ago" },
      { type: "update", text: "Week 4 construction update sent to Miller family", time: "18 min ago" }
    ]
  }
};

// Helper to get industry list for the selector
export const getIndustryList = () => {
  return Object.values(INDUSTRIES).map(ind => ({
    id: ind.id,
    name: ind.name,
    icon: ind.icon,
    color: ind.color,
    gradient: ind.gradient,
    tagline: ind.tagline,
    subtitle: ind.subtitle,
    agentCount: ind.agents?.length || 6,
    usesSystemsApproach: ind.usesSystemsApproach || false,
    heroImage: ind.heroImage
  }));
};

export const getIndustry = (id) => INDUSTRIES[id] || null;
