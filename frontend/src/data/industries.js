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
      { title: "Emergency Calls Go to Voicemail", stat: "45%", description: "of after-hours emergency calls are missed", icon: "PhoneMissed" },
      { title: "Slow Response Loses Jobs", stat: "82%", description: "of homeowners call 3+ companies — first responder wins", icon: "Clock" },
      { title: "Techs Waste Time Driving", stat: "2.5hrs", description: "average daily drive time per tech with unoptimized routes", icon: "Car" }
    ],
    liveFeedExamples: [
      { type: "lead", text: "Emergency AC repair call captured and triaged", time: "3 min ago" },
      { type: "schedule", text: "Furnace maintenance booked for 456 Elm St", time: "8 min ago" },
      { type: "dispatch", text: "Tech rerouted — 18 min drive time saved", time: "15 min ago" }
    ]
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
      { title: "Empty Chairs Cost Thousands", stat: "$800+", description: "lost per empty hygiene hour", icon: "DollarSign" },
      { title: "Patients Ghost After Treatment Plans", stat: "40%", description: "of treatment plans never get accepted without follow-up", icon: "FileX" },
      { title: "Recall Patients Disappear", stat: "35%", description: "of patients don't return for their 6-month recall", icon: "UserMinus" }
    ],
    liveFeedExamples: [
      { type: "lead", text: "New patient inquiry for teeth whitening captured", time: "2 min ago" },
      { type: "schedule", text: "Cancellation slot filled from waitlist", time: "6 min ago" },
      { type: "recall", text: "Recall appointment booked for Garcia family", time: "14 min ago" }
    ]
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
      { title: "Internet Leads Go Cold", stat: "78%", description: "of internet leads never get proper follow-up", icon: "Globe" },
      { title: "BDC Can't Keep Up", stat: "2.5hrs", description: "average response time to online leads", icon: "Clock" },
      { title: "No-Shows Kill Showroom Traffic", stat: "30%", description: "of scheduled appointments are no-shows", icon: "UserX" }
    ],
    liveFeedExamples: [
      { type: "lead", text: "New truck inquiry from AutoTrader captured", time: "1 min ago" },
      { type: "schedule", text: "Test drive booked for 2024 Camry", time: "5 min ago" },
      { type: "followup", text: "Day-3 follow-up sent to Williams lead", time: "12 min ago" }
    ]
  },

  construction: {
    id: "construction",
    name: "General Construction",
    icon: "HardHat",
    color: "#F97316",
    colorSecondary: "#EA580C",
    gradient: "from-orange-500 to-amber-500",
    glow: "rgba(249,115,22,0.3)",
    tagline: "Win more bids, finish more projects",
    subtitle: "6 AI agents available",
    agents: [
      { name: "Lead Capture Agent", icon: "PhoneIncoming", dept: "Sales", description: "Captures every remodeling inquiry instantly", status: "active", tasks: ["Answers calls and forms 24/7", "Qualifies project scope and budget", "Collects project photos", "Schedules consultations"], kpis: { primary: "Leads Captured", secondary: "Qualification Rate" }, metric: { value: 96, unit: "%", label: "Capture Rate" } },
      { name: "Bid Follow-Up Agent", icon: "FileText", dept: "Sales", description: "Follows up on every bid until decision", status: "active", tasks: ["Sends bids same-day", "Multi-touch follow-up", "Handles objections", "Alerts on hot opportunities"], kpis: { primary: "Follow-Up Rate", secondary: "Win Rate" }, metric: { value: 100, unit: "%", label: "Follow-Up" } },
      { name: "Project Scheduling Agent", icon: "CalendarCheck", dept: "Operations", description: "Manages project timelines and crew scheduling", status: "active", tasks: ["Schedules crew assignments", "Sends client updates", "Manages material deliveries", "Tracks milestones"], kpis: { primary: "On-Time Rate", secondary: "Client Satisfaction" }, metric: { value: 91, unit: "%", label: "On-Time" } },
      { name: "Client Update Agent", icon: "MessageSquare", dept: "Operations", description: "Keeps clients informed throughout the project", status: "active", tasks: ["Sends weekly progress updates", "Shares progress photos", "Handles change orders", "Manages expectations"], kpis: { primary: "Update Frequency", secondary: "Satisfaction" }, metric: { value: 4.8, unit: "stars", label: "Satisfaction" } },
      { name: "Review Agent", icon: "Star", dept: "Marketing", description: "Collects reviews post-project", status: "active", tasks: ["Sends review requests at project completion", "Follows up on non-responses", "Manages online reputation"], kpis: { primary: "Reviews", secondary: "Rating" }, metric: { value: 4.7, unit: "stars", label: "Avg Rating" } },
      { name: "Subcontractor Agent", icon: "Users", dept: "Operations", description: "Manages subcontractor communication", status: "active", tasks: ["Coordinates sub schedules", "Sends scope and requirements", "Tracks sub completion", "Manages payments"], kpis: { primary: "Coordination Rate", secondary: "Sub Reliability" }, metric: { value: 88, unit: "%", label: "Reliability" } }
    ],
    workflow: [
      { step: "Inquiry", agent: "Lead Agent", icon: "PhoneIncoming", before: "Missed calls during jobs", after: "Instant capture 24/7", beforeTime: "5+ hours", afterTime: "60 seconds", dropoff: { before: 60, after: 5 } },
      { step: "Consultation", agent: "Scheduling Agent", icon: "CalendarCheck", before: "Phone tag for weeks", after: "Auto-booked", beforeTime: "1-2 weeks", afterTime: "Same day", dropoff: { before: 30, after: 7 } },
      { step: "Bid", agent: "Bid Agent", icon: "FileText", before: "Bids take 1-2 weeks", after: "Same-week bids + follow-up", beforeTime: "1-2 weeks", afterTime: "2-3 days", dropoff: { before: 45, after: 12 } },
      { step: "Build", agent: "Project Agent", icon: "HardHat", before: "Radio silence for clients", after: "Weekly auto-updates", beforeTime: "Sporadic", afterTime: "Weekly", dropoff: { before: 10, after: 2 } },
      { step: "Complete", agent: "Client Agent", icon: "CheckCircle", before: "Punch list delays", after: "Structured completion process", beforeTime: "Delayed", afterTime: "Systematic", dropoff: { before: 5, after: 1 } },
      { step: "Review", agent: "Review Agent", icon: "Star", before: "Rarely asked", after: "Every project", beforeTime: "Rarely", afterTime: "Automated", dropoff: { before: 0, after: 0 } }
    ],
    roi: { leadResponseImprovement: 0.78, conversionLift: 0.09, missedLeadRecovery: 0.20, avgResponseTimeBefore: "5 hours", avgResponseTimeAfter: "60 seconds", reviewIncreasePercent: 200 },
    defaults: { monthlyLeads: 80, avgJobValue: 45000, employees: 18, currentCloseRate: 0.12, currentResponseTime: 5.0, monthlyAdSpend: 3500, noShowRate: 15, missedCallsEstimate: 50 },
    caseStudies: [
      { company: "Cornerstone Builders", location: "Nashville, TN", employees: 20, result: "12% to 22% bid win rate in 90 days", savings: "$65,000/month in additional revenue", detail: "AI follow-up on every bid transformed their close rate. Client update automation eliminated 90% of project management headaches.", metrics: { closeBefore: 12, closeAfter: 22, days: 90, monthlySavings: 65000 } }
    ],
    integrations: ["Buildertrend", "CoConstruct", "Jobber", "CompanyCam", "Google Business"],
    painPoints: [
      { title: "Bids Sent Into the Void", stat: "55%", description: "of construction bids get zero follow-up", icon: "FileX" },
      { title: "Leads Lost on Job Sites", stat: "5+ hrs", description: "average response time when crews are working", icon: "Clock" },
      { title: "Client Communication Gaps", stat: "41%", description: "of negative reviews mention poor communication", icon: "MessageSquareX" }
    ],
    liveFeedExamples: [
      { type: "lead", text: "Kitchen remodel inquiry captured from Houzz", time: "4 min ago" },
      { type: "followup", text: "Bid follow-up #2 sent for bathroom renovation", time: "11 min ago" },
      { type: "update", text: "Weekly progress update sent to Thompson project", time: "20 min ago" }
    ]
  },

  law_firm: {
    id: "law_firm",
    name: "Law Firms",
    icon: "Scale",
    color: "#E11D48",
    colorSecondary: "#BE123C",
    gradient: "from-rose-600 to-red-500",
    glow: "rgba(225,29,72,0.3)",
    tagline: "Convert more consultations, retain more clients",
    subtitle: "6 AI agents available",
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
      { title: "Potential Clients Call Competitors", stat: "72%", description: "of legal prospects hire the first attorney who responds", icon: "PhoneMissed" },
      { title: "Consultations Don't Convert", stat: "55%", description: "of free consultations never become retained clients", icon: "UserMinus" },
      { title: "Client Communication Complaints", stat: "#1", description: "reason for bar complaints is poor client communication", icon: "MessageSquareX" }
    ],
    liveFeedExamples: [
      { type: "lead", text: "Personal injury inquiry qualified and booked", time: "3 min ago" },
      { type: "followup", text: "Post-consultation retainer follow-up sent", time: "8 min ago" },
      { type: "update", text: "Case status update sent to 12 active clients", time: "18 min ago" }
    ]
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
    tagline: "Grow your book of business on autopilot",
    subtitle: "6 AI agents available",
    agents: [
      { name: "Lead Capture Agent", icon: "PhoneIncoming", dept: "Sales", description: "Captures every landscaping inquiry instantly", status: "active", tasks: ["Answers calls and forms 24/7", "Qualifies project type and scope", "Collects property details", "Schedules on-site estimates"], kpis: { primary: "Leads Captured", secondary: "Qualification Rate" }, metric: { value: 96, unit: "%", label: "Capture Rate" } },
      { name: "Estimate Agent", icon: "Calculator", dept: "Sales", description: "Generates and follows up on estimates", status: "active", tasks: ["Creates estimates from site visits", "Multi-touch follow-up", "Seasonal promotion offers", "Handles objections"], kpis: { primary: "Estimates Sent", secondary: "Close Rate" }, metric: { value: 100, unit: "%", label: "Follow-Up" } },
      { name: "Scheduling Agent", icon: "CalendarCheck", dept: "Operations", description: "Manages crew scheduling and routing", status: "active", tasks: ["Optimizes daily crew routes", "Manages recurring service schedules", "Handles weather rescheduling", "Sends customer arrival alerts"], kpis: { primary: "Jobs/Day", secondary: "Route Efficiency" }, metric: { value: 28, unit: "%", label: "Efficiency" } },
      { name: "Recurring Service Agent", icon: "RefreshCw", dept: "Revenue", description: "Manages and grows recurring contracts", status: "active", tasks: ["Books seasonal services", "Manages contract renewals", "Upsells additional services", "Sends seasonal reminders"], kpis: { primary: "Contract Value", secondary: "Retention" }, metric: { value: 85, unit: "%", label: "Retention" } },
      { name: "Review Agent", icon: "Star", dept: "Marketing", description: "Generates reviews from completed projects", status: "active", tasks: ["Review requests post-project", "Shares before/after photos", "Manages online reputation"], kpis: { primary: "Reviews", secondary: "Rating" }, metric: { value: 4.7, unit: "stars", label: "Avg Rating" } },
      { name: "Weather Alert Agent", icon: "CloudRain", dept: "Operations", description: "Manages weather-related communication", status: "active", tasks: ["Sends weather delay notifications", "Auto-reschedules affected jobs", "Promotes weather-related services", "Manages emergency storm cleanup"], kpis: { primary: "Reschedule Speed", secondary: "Client Satisfaction" }, metric: { value: 95, unit: "%", label: "Notification" } }
    ],
    workflow: [
      { step: "Inquiry", agent: "Lead Agent", icon: "PhoneIncoming", before: "Missed while mowing", after: "Instant capture 24/7", beforeTime: "6+ hours", afterTime: "60 seconds", dropoff: { before: 65, after: 5 } },
      { step: "Estimate", agent: "Estimate Agent", icon: "Calculator", before: "1-2 week wait", after: "Same-week estimate + follow-up", beforeTime: "1-2 weeks", afterTime: "2-3 days", dropoff: { before: 40, after: 10 } },
      { step: "Schedule", agent: "Scheduling Agent", icon: "CalendarCheck", before: "Manual crew dispatch", after: "Route-optimized scheduling", beforeTime: "Manual", afterTime: "Automated", dropoff: { before: 10, after: 2 } },
      { step: "Service", agent: "Crew Agent", icon: "TreePine", before: "Inconsistent communication", after: "Customer alerts and updates", beforeTime: "Sporadic", afterTime: "Every visit", dropoff: { before: 5, after: 1 } },
      { step: "Retain", agent: "Recurring Agent", icon: "RefreshCw", before: "Seasonal churn", after: "Auto-renewal + upsells", beforeTime: "High churn", afterTime: "Auto-renewed", dropoff: { before: 25, after: 5 } },
      { step: "Review", agent: "Review Agent", icon: "Star", before: "Rarely asked", after: "Every project", beforeTime: "Rarely", afterTime: "Automated", dropoff: { before: 0, after: 0 } }
    ],
    roi: { leadResponseImprovement: 0.80, conversionLift: 0.10, missedLeadRecovery: 0.22, avgResponseTimeBefore: "6 hours", avgResponseTimeAfter: "60 seconds", reviewIncreasePercent: 220 },
    defaults: { monthlyLeads: 100, avgJobValue: 3500, employees: 10, currentCloseRate: 0.15, currentResponseTime: 6.0, monthlyAdSpend: 2500, noShowRate: 10, missedCallsEstimate: 65 },
    caseStudies: [
      { company: "Green Valley Landscaping", location: "Charlotte, NC", employees: 14, result: "15% to 28% close rate, 40% more recurring contracts", savings: "$24,000/month in additional revenue", detail: "AI captured all calls while crews were on properties. Route optimization saved 2hrs of drive time per crew per day.", metrics: { closeBefore: 15, closeAfter: 28, days: 60, monthlySavings: 24000 } }
    ],
    integrations: ["Jobber", "LMN", "Service Autopilot", "Aspire", "Google Business"],
    painPoints: [
      { title: "Calls Missed in the Field", stat: "70%", description: "of calls missed while crews are on properties", icon: "PhoneMissed" },
      { title: "Seasonal Revenue Swings", stat: "40%", description: "revenue drop in off-season without proactive sales", icon: "TrendingDown" },
      { title: "Estimate Follow-Up Falls Off", stat: "52%", description: "of landscaping estimates never get followed up", icon: "FileX" }
    ],
    liveFeedExamples: [
      { type: "lead", text: "Patio installation inquiry captured", time: "3 min ago" },
      { type: "schedule", text: "Lawn maintenance route optimized for Crew B", time: "10 min ago" },
      { type: "renewal", text: "Annual contract renewed for 456 Oak Lane", time: "22 min ago" }
    ]
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
    agentCount: ind.agents?.length || 6
  }));
};

export const getIndustry = (id) => INDUSTRIES[id] || null;
