/**
 * ============================================================================
 *  ALL SITE COPY LIVES HERE.  <<< PLACEHOLDER CONTENT — AWAITING CLIENT COPY >>>
 * ============================================================================
 *
 * Every string a visitor can read — headings, body, CTA labels, stat figures,
 * alt text, meta tags — is defined in this file. No component contains a copy
 * string. When the client's final copy deck arrives, this is the only file that
 * changes, and nothing needs re-testing except the words themselves.
 *
 * Conventions:
 *  - Anything marked PLACEHOLDER is invented for layout purposes and MUST be
 *    replaced before launch. Stat figures and testimonials especially: do not
 *    ship invented numbers.
 *  - Images are referenced through the registry in assets/images, which carries
 *    a default alt string, so swapping an image also swaps its alt text.
 *  - Route paths come from utils/constants, never typed as raw strings here, so
 *    a URL change stays a one-file change too.
 */

import { siteUrl } from "@/config/env";
import { routes } from "@/utils/constants";
import {
  placeholderHero,
  placeholderRider,
  placeholderFleet,
  placeholderHub,
  teamPortraits,
  placeholderRiderAvatars,
} from "@/assets/images";

/* -------------------------------------------------------------------------- */
/*  Brand + global                                                            */
/* -------------------------------------------------------------------------- */

export const brand = {
  name: "Battwheelz",
  legalName: "Battwheelz Mobility Private Limited", // PLACEHOLDER
  tagline: "Electric bikes, leased to the people who ride for a living.",
  foundedYear: 2024, // PLACEHOLDER
  contact: {
    email: "hello@battwheelz.com", // PLACEHOLDER
    phoneDisplay: "+91 00000 00000", // PLACEHOLDER
    phoneHref: "tel:+910000000000", // PLACEHOLDER
    address: {
      street: "Placeholder Address Line 1", // PLACEHOLDER
      locality: "Bengaluru", // PLACEHOLDER
      region: "Karnataka", // PLACEHOLDER
      postalCode: "560001", // PLACEHOLDER
      country: "IN",
    },
  },
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" }, // PLACEHOLDER
    { label: "Instagram", href: "https://www.instagram.com/" }, // PLACEHOLDER
    { label: "YouTube", href: "https://www.youtube.com/" }, // PLACEHOLDER
  ],
};

export const navigation = {
  /**
   * Primary nav, mirroring the footer's grouping.
   *
   * An entry is either a LINK (has `href`) or a GROUP (has `items`). The header
   * renders groups as disclosure dropdowns on desktop and as accordions inside
   * the mobile drawer.
   *
   * Investor relations is deliberately absent: it is a low-traffic page people
   * reach by being sent the link, and putting it here would cost every other
   * visitor a wider menu to scan.
   */
  primary: [
    { label: "Home", href: routes.home },
    { label: "About us", href: routes.about },
    {
      label: "For Riders",
      items: [
        { label: "B2B", href: routes.b2b },
        { label: "Rent to Own", href: routes.rentToOwn },
      ],
    },
    {
      label: "For Partners",
      items: [
        { label: "FoCO", href: routes.foco },
        { label: "Last Mile Delivery (3PL)", href: routes.lastMile },
      ],
    },
    {
      label: "Resources",
      items: [
        { label: "Contact us", href: routes.contact },
        { label: "Careers", href: routes.careers },
      ],
    },
  ],
  /** The header's single conversion action. */
  cta: { label: "Subscribe & Ride", href: routes.contact },
  skipToContent: "Skip to main content",
  homeLinkLabel: "Battwheelz home",
  menuOpenLabel: "Open navigation menu",
  menuCloseLabel: "Close navigation menu",
};

export const footer = {
  blurb:
    "Battwheelz builds, owns and maintains electric two-wheelers, and leases them to gig delivery riders on fixed plans. One rider, one bike, one rate, for as long as the lease runs.", // PLACEHOLDER
  /**
   * Four columns, matching the agreed structure. Every href resolves to a real
   * route — a footer link that 404s is worse than no link, because the footer is
   * where people go when the nav has failed them.
   */
  columns: [
    {
      title: "Get Started",
      links: [
        { label: "Home", href: routes.home },
        { label: "About us", href: routes.about },
        { label: "Investor relations", href: routes.investors },
      ],
    },
    {
      title: "For Riders",
      links: [
        { label: "B2B", href: routes.b2b },
        { label: "Rent to own", href: routes.rentToOwn },
      ],
    },
    {
      title: "For Partners",
      links: [
        { label: "FoCO", href: routes.foco },
        { label: "Last mile delivery (3PL)", href: routes.lastMile },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Contact us", href: routes.contact },
        { label: "Careers", href: routes.careers },
      ],
    },
  ],
  legalLinks: [
    { label: "Privacy policy", href: routes.privacy }, // PLACEHOLDER — page not built
    { label: "Terms of service", href: routes.terms }, // PLACEHOLDER — page not built
  ],
  /** Year is passed in rather than read here, so the build stays deterministic. */
  copyright: (year) => "© " + year + " " + brand.name + ". All rights reserved.",
  builtNote: "Made in India, for India's delivery workforce.", // PLACEHOLDER
};

/* -------------------------------------------------------------------------- */
/*  SEO defaults                                                              */
/* -------------------------------------------------------------------------- */

export const seo = {
  /**
   * NOT edited here — comes from NEXT_PUBLIC_SITE_URL at build time, because it
   * describes the deployment rather than the content, and the same content is
   * built for the preview subdomain and for production.
   */
  siteUrl,
  titleTemplate: "%s | " + brand.name,
  defaultTitle: "Battwheelz — EV bike leasing for gig delivery riders",
  defaultDescription:
    "Battwheelz leases electric two-wheelers to gig delivery riders on fixed daily, weekly and monthly plans. Servicing, insurance and roadside support included, and no mid-lease repricing.", // PLACEHOLDER
  keywords: [
    "EV bike leasing",
    "electric two-wheeler rental",
    "gig delivery rider vehicle",
    "delivery bike lease India",
    "electric scooter for delivery",
    "EV fleet leasing",
  ],
  locale: "en_IN",
  twitterHandle: "@battwheelz", // PLACEHOLDER
  openGraphImage: {
    // PLACEHOLDER — replace public/og-image.png with a 1200x630 branded card.
    url: "/og-image.png",
    width: 1200,
    height: 630,
    alt: "Battwheelz — electric bikes leased to gig delivery riders",
  },
};

/* -------------------------------------------------------------------------- */
/*  The rider journey — defined ONCE, consumed twice                          */
/* -------------------------------------------------------------------------- */

/**
 * The four steps from application to first delivery.
 *
 * The home page preview renders `summary`; the How It Works page renders
 * `detail` and `note`. One array rather than two means the teaser and the full
 * page can never end up describing different processes — the failure mode when
 * a condensed version is copy-pasted and then only one copy gets updated.
 */
export const journeySteps = [
  {
    id: "apply",
    title: "Apply",
    summary: "Tell us where you ride and which platform you ride for.",
    detail:
      "A short application: your name, phone number, city, and the delivery platform you ride for. No credit check, no deposit at this stage.", // PLACEHOLDER
    note: "Takes about five minutes on a phone.", // PLACEHOLDER
  },
  {
    id: "verify",
    title: "Get verified",
    summary: "Upload your ID and licence. Our ops team reviews each one.",
    detail:
      "Upload a selfie, your Aadhaar and your driving licence. A person on our operations team reviews every document — you can see the status of each one while it is being checked.", // PLACEHOLDER
    note: "Usually reviewed within one working day.", // PLACEHOLDER
  },
  {
    id: "assign",
    title: "Get your bike",
    summary: "Pick a plan, collect the bike from your nearest hub.",
    detail:
      "Choose a daily, weekly, monthly or rent-to-own plan. We assign a specific bike to you from your nearest hub, and your daily rate is locked to that plan from the moment it is assigned.", // PLACEHOLDER
    note: "Your rate never changes mid-lease.", // PLACEHOLDER
  },
  {
    id: "ride",
    title: "Start earning",
    summary: "Ride. We handle servicing, insurance and support.",
    detail:
      "The bike is yours for the length of the lease. Servicing, wear parts, insurance and roadside recovery are ours to carry, and support is a ticket away in the rider app.", // PLACEHOLDER
    note: "A bike off the road is our cost, not yours.", // PLACEHOLDER
  },
];

/* -------------------------------------------------------------------------- */
/*  Home                                                                      */
/* -------------------------------------------------------------------------- */

export const home = {
  meta: {
    title: "EV bike leasing for gig delivery riders",
    description: seo.defaultDescription,
    path: routes.home,
  },

  hero: {
    eyebrow: "EMAAS",
    /**
     * Split into parts so which words carry the brand highlight is content,
     * not markup. The Hero renders these in order inside a single h1.
     */
    headline: [
      { text: "Powering the Future of " },
      { text: "Everyday Mobility", highlight: true },
      { text: "." },
    ],
    /**
     * Replaces the old subheading paragraph: a short heading plus a four-item
     * feature row. `subheadline` is gone deliberately — the Hero renders
     * `pitch` instead.
     */
    pitch: {
      heading: "Built for gig riders. Backed by Battwheelz.",
      items: [
        { icon: "shield", title: "We own it.", body: "Zero ownership burden." },
        { icon: "wrench", title: "We run it.", body: "Servicing, repairs and support." },
        { icon: "refresh", title: "We keep it moving.", body: "We cover downtime so you never stop." },
        { icon: "wallet", title: "You ride. You earn.", body: "Simple fixed plans. Zero surprises." },
      ],
    },
    /** Same label as the header button — one string, referenced twice. */
    primaryCta: navigation.cta,
    secondaryCta: { label: "See how it works", href: routes.home + "#how-to-start" },
    /** Short proof points under the CTAs. Three max — more than that wraps badly. */
    assurances: [
      "No mid-lease price changes",
      "Servicing and insurance included",
      "Live tracking and support",
    ],
    image: placeholderHero,
    /** Floating stat card overlaid on the hero image. */
    badge: {
      value: "₹0",
      label: "fuel spend",
      caption: "per delivery run", // PLACEHOLDER
    },
    scrollHint: "Scroll to explore",
  },

  /**
   * SECTION 2 — what the lease contains.
   *
   * Deliberately the TANGIBLE list: the things a rider receives. Kept distinct
   * from `whyChoose` below, which is about how we operate. If you find yourself
   * writing the same sentence in both, it belongs here and the other one needs
   * rewriting — this section answers "what do I get", that one answers "why is
   * yours better".
   */
  whatsIncluded: {
    eyebrow: "What you get",
    heading: "Everything you need to ride, in one fixed rate",
    subheading:
      "One payment covers the bike and everything that keeps it on the road. No separate service bills, no surprise parts invoice.", // PLACEHOLDER
    items: [
      {
        icon: "bolt",
        title: "Vehicle and battery",
        href: routes.b2b + "#plan",
        body: "A road-ready electric two-wheeler with its battery pack, assigned to you for the length of the lease.", // PLACEHOLDER
      },
      {
        icon: "wrench",
        title: "Servicing and maintenance",
        href: routes.b2b + "#plan",
        body: "Scheduled servicing, wear parts and repairs. A bike off the road is our cost to carry, not yours.", // PLACEHOLDER
      },
      {
        icon: "shield",
        title: "Insurance and recovery",
        href: routes.b2b + "#plan",
        body: "Vehicle insurance and roadside recovery are inside the lease from day one.", // PLACEHOLDER
      },
      {
        icon: "pin",
        title: "Live GPS tracking",
        href: routes.b2b + "#plan",
        body: "See your bike on a live map in the rider app. It is also how a stolen bike gets found.", // PLACEHOLDER
      },
      {
        icon: "lock",
        title: "A rate that cannot move",
        href: routes.rentToOwn,
        body: "Your daily rate is fixed to your plan when the bike is assigned, and stays fixed for the whole lease.", // PLACEHOLDER
      },
      {
        icon: "support",
        title: "Rider support",
        href: routes.contact,
        body: "Raise a ticket from the app and a real person picks it up. No call-centre maze.", // PLACEHOLDER
      },
    ],
  },

  /**
   * SECTION 3 — the live stats bar.
   *
   * PLACEHOLDER FIGURES, all four. These are illustrative and MUST be replaced
   * with audited numbers before launch. Unverifiable operational claims on a
   * public site are both a trust problem and a compliance one.
   */
  liveStats: {
    srLabel: "Battwheelz fleet at a glance",
    /**
     * Note the semantic FLIP at positions 1 and 4: the 2,400 figure now reads as
     * "Fleet" and the 3,200 figure as "Rider Count" — the numbers held their
     * positions while the labels swapped meaning, so this is not a relabel in
     * place. Position 3's figure also changed, 14 -> 3+.
     *
     * Sub-captions dropped — see the note in the change report. Restore them by
     * adding `caption` back; StatBand renders it only when present.
     */
    items: [
      { icon: "bolt", value: 2400, suffix: "+", label: "Fleet" },
      { icon: "check", value: 12, suffix: "M+", label: "Deliveries Supported" },
      { icon: "pin", value: 3, suffix: "+", label: "Cities Present" },
      { icon: "support", value: 3200, suffix: "+", label: "Rider Count" },
    ],
  },

  /**
   * SECTION 4 — why choose us.
   *
   * The OPERATING advantages, not the contents of the lease. See the note on
   * `whatsIncluded` above for the split.
   */
  whyChoose: {
    eyebrow: "Why Battwheelz",
    heading: "EMAAS — Electric Mobility as a Service",
    subheading:
      "BattWheelz brings vehicles, technology, infrastructure and operations together into one intelligent mobility ecosystem — built to make electric mobility smarter, connected and scalable.",
    items: [
      {
        icon: "shield",
        title: "Every bike is connected",
        body: "Each vehicle reports its location, battery and lock state continuously — so we can catch a fault before it strands you mid-shift.", // PLACEHOLDER
      },
      {
        icon: "pin",
        title: "Hubs built for uptime",
        body: "Charging and service hubs sit close to the areas riders actually work in, so a swap or a repair does not cost you a day of earnings.", // PLACEHOLDER
      },
      {
        icon: "lock",
        title: "We do not reprice mid-Subscription",
        body: "Your rate is captured when your bike is assigned. If the plan price changes later, running subscriptions are untouched. This is enforced in our billing system, not just promised.",
      },
      {
        icon: "support",
        title: "Support that closes the loop",
        body: "Tickets are tracked to resolution against your specific bike, and our operations team can see the same live data you can.", // PLACEHOLDER
      },
    ],
  },

  /** SECTION 5 — the onboarding sequence. Steps come from `journeySteps`. */
  howToStart: {
    eyebrow: "Getting started",
    heading: "Four steps from application to first delivery",
    subheading:
      "No showroom, no down payment, no haggling. The whole thing runs from your phone and your nearest hub.", // PLACEHOLDER
    steps: journeySteps,
    cta: { label: "See leasing options", href: routes.rentToOwn },
    image: placeholderRider,
  },

  /**
   * SECTION 6 — the savings calculator.
   *
   * ============================ READ BEFORE LAUNCH ============================
   * Every number in `assumptions` is a PLACEHOLDER estimate. The calculator
   * shows a rider a rupee figure and they will believe it, so these must be
   * replaced with figures the client can defend before this goes live.
   *
   * The comparison is deliberately like-for-like: a Battwheelz lease includes
   * the vehicle, so the petrol side has to include the cost of ACQUIRING a
   * petrol bike (EMI) and insuring it. Comparing a lease against someone's
   * already-paid-for bike would flatter us and would not survive scrutiny.
   *
   * The same assumptions are shown to the visitor in the UI. They are not
   * buried in code — a savings claim a reader cannot inspect is a claim they
   * are right not to trust.
   * ===========================================================================
   */
  savings: {
    eyebrow: "Run the numbers",
    heading: "What a switch could be worth to you",
    subheading:
      "Drag the slider to roughly how far you ride on a working day, and compare a Battwheelz lease against running a petrol bike you bought on finance.", // PLACEHOLDER
    sliderLabel: "Distance you ride on a working day",
    sliderUnit: "km",
    sliderMin: 30,
    sliderMax: 220,
    sliderStep: 5,
    sliderDefault: 100,
    resultLabel: "Estimated monthly saving",
    resultCaption: "compared with running your own petrol bike",
    breakdownLabels: {
      petrol: "Petrol bike, per month",
      battwheelz: "Battwheelz lease, per month",
      fuel: "Fuel",
      charging: "Charging",
      maintenance: "Servicing and repairs",
      emi: "Vehicle EMI",
      insurance: "Insurance",
      lease: "Lease rate",
      included: "Included",
      total: "Total",
    },
    negativeResult:
      "At this distance a lease costs more than running your own bike. Talk to us about a lower-tier plan.", // PLACEHOLDER
    assumptionsTitle: "What this assumes",
    disclaimer:
      "Indicative estimate only, not a quote. Actual costs vary by city, plan and riding pattern.", // PLACEHOLDER
    cta: { label: "Get an exact quote", href: routes.contact },

    /** ALL PLACEHOLDER — one object, no magic numbers in the component. */
    assumptions: {
      workingDaysPerMonth: 26,
      petrolPricePerLitre: 105,
      petrolBikeKmPerLitre: 40,
      petrolMaintenancePerMonth: 1200,
      petrolBikeEmiPerMonth: 3500,
      petrolInsurancePerMonth: 700,
      evChargingCostPerKm: 0.3,
      battwheelzDailyRate: 199,
    },
    /** Rendered as a visible list so the reader can audit the maths. */
    assumptionsList: [
      "26 working days a month", // PLACEHOLDER
      "Petrol at ₹105/litre and 40 km/litre", // PLACEHOLDER
      "₹1,200/month servicing on a petrol bike", // PLACEHOLDER
      "₹3,500/month EMI and ₹700/month insurance on a petrol bike bought on finance", // PLACEHOLDER
      "Battwheelz lease at ₹199/day, with charging at about ₹0.30/km", // PLACEHOLDER
    ],
  },

  /**
   * SECTION 7 — fleet impact.
   *
   * PLACEHOLDER FIGURES. Environmental claims are the most heavily scrutinised
   * numbers a mobility company publishes — several jurisdictions treat an
   * unsubstantiated CO2 claim as actionable greenwashing. Do not publish these
   * until the client can show the calculation behind each one.
   */
  fleetImpact: {
    eyebrow: "Fleet impact",
    heading: "What the fleet has done so far",
    subheading:
      "Every kilometre ridden electric is a kilometre not ridden on petrol. Across the fleet it adds up.", // PLACEHOLDER
    items: [
      { icon: "bolt", value: 48, suffix: "M", prefix: "", label: "Kilometres ridden electric", caption: "across the fleet" },
      { icon: "rupee", value: 9.2, suffix: "Cr", prefix: "₹", label: "Fuel cost avoided", caption: "estimated, fleet-wide", decimals: 1 },
      { icon: "shield", value: 7400, suffix: "t", label: "CO₂ emissions avoided", caption: "versus equivalent petrol two-wheelers" },
    ],
    disclaimer:
      "Estimated figures pending independent verification.", // PLACEHOLDER
  },

  /**
   * SECTION 8 — rider testimonials.
   *
   * ===================== EVERY ONE OF THESE IS INVENTED =====================
   * There are no real Battwheelz riders to quote yet. These are written to
   * show the layout and MUST be replaced with real, consented rider stories
   * before launch. Publishing a fabricated testimonial as genuine is a
   * consumer-protection issue, not a copy issue.
   *
   * The UI labels them as illustrative for the same reason.
   * ==========================================================================
   */
  testimonials: {
    eyebrow: "From our riders",
    heading: "What riding with Battwheelz looks like",
    /** Shown in the UI, not just here. Remove when the quotes become real. */
    placeholderNotice: "Illustrative examples — real rider stories coming soon.",
    items: [
      {
        id: "t1",
        quote:
          "I used to lose two days a month to the service centre. Now if something goes wrong I raise a ticket and they sort it at the hub.", // PLACEHOLDER
        name: "Rider name", // PLACEHOLDER
        role: "Food delivery, Bengaluru", // PLACEHOLDER
        metric: "₹6,200 saved a month", // PLACEHOLDER
        rating: 5, // PLACEHOLDER
        avatar: placeholderRiderAvatars[0],
      },
      {
        id: "t2",
        quote:
          "The rate has not changed since the day I got the bike. I know exactly what I owe every week, and I can plan around it.", // PLACEHOLDER
        name: "Rider name", // PLACEHOLDER
        role: "Quick commerce, Hyderabad", // PLACEHOLDER
        metric: "14 months on lease", // PLACEHOLDER
        rating: 4.5, // PLACEHOLDER
        avatar: placeholderRiderAvatars[1],
      },
      {
        id: "t3",
        quote:
          "No petrol queue at six in the morning any more. I charge overnight and start the shift with a full battery.", // PLACEHOLDER
        name: "Rider name", // PLACEHOLDER
        role: "Last-mile logistics, Pune", // PLACEHOLDER
        metric: "120 km on a working day", // PLACEHOLDER
        rating: 5, // PLACEHOLDER
        avatar: placeholderRiderAvatars[2],
      },
    ],
  },

  /** SECTION 9 — FAQ. */
  faq: {
    eyebrow: "Questions",
    heading: "Things riders ask us first",
    items: [
      {
        id: "included",
        question: "What is included in the subscription?",
        answer:
          "The bike and its battery, servicing and wear parts, vehicle insurance, roadside recovery, live tracking in the rider app, and rider support. You pay for charging and for your own riding gear.", // PLACEHOLDER
      },
      {
        id: "breakdown",
        question: "What happens if the vehicle breaks down?",
        answer:
          "Raise a ticket in the app against your bike. Roadside recovery is included, and where a repair will take time we aim to get you onto another bike from the hub rather than leaving you off the road.", // PLACEHOLDER
      },
      {
        id: "billing",
        question: "How is billing calculated?",
        answer:
          "Your plan has a daily rate, which is fixed to your lease at the moment your bike is assigned. Your bill is that rate multiplied by the days of the rental. Part days round up to a full day, which is standard for daily vehicle rentals.", // PLACEHOLDER
      },
      {
        id: "repricing",
        question: "Can my rate go up during the subscription?",
        answer:
          "No. If we change what a plan costs for new riders, running subscriptions keep the rate they started on. That is built into how billing works rather than being a policy we remember to apply.",
      },
      {
        id: "switch",
        question: "Can I switch vehicles or plans?",
        answer:
          "Yes. Close your current lease and start a new one — talk to us and we will work out the timing so you are not without a bike between the two.", // PLACEHOLDER
      },
      {
        id: "eligibility",
        question: "What do I need to qualify?",
        answer:
          "A valid driving licence, an Aadhaar for identity verification, a phone number, and a delivery platform you ride for. No credit check and no security deposit at application.", // PLACEHOLDER
      },
    ],
  },

  closingCta: {
    eyebrow: "Get started",
    heading: "Ready to put a Battwheelz bike under you?",
    body: "Tell us where you ride and which platform you ride for. We will come back with the nearest hub and the plans available there.", // PLACEHOLDER
    primaryCta: { label: "Start your application", href: routes.contact },
    secondaryCta: { label: "Talk to the fleet team", href: routes.contact + "#partners" },
    image: placeholderFleet,
  },
};

/* -------------------------------------------------------------------------- */
/*  About                                                                     */
/* -------------------------------------------------------------------------- */

export const about = {
  meta: {
    title: "About us",
    description:
      "Battwheelz builds, owns and maintains electric two-wheelers, and leases them to India's gig delivery riders. Our mission, our team, and where we are headed.", // PLACEHOLDER
    path: routes.about,
  },

  hero: {
    headline: [
      { text: "Building the fleet that " },
      { text: "moves India", highlight: true },
      { text: " forward." },
    ],
    /**
     * Replaces the prose subheadline. Wording avoids "lease" per the ongoing
     * move to subscription language — scoped to this section only; lease
     * wording elsewhere on the site is unchanged and deliberate.
     */
    features: [
      {
        icon: "bolt",
        title: "We build electric",
        body: "Purpose-built two-wheelers for real-world India.",
      },
      {
        icon: "shield",
        title: "We own the fleet",
        body: "End-to-end ownership for reliability you can count on.",
      },
      {
        icon: "wrench",
        title: "We keep it running",
        body: "Servicing, maintenance and support — always ride-ready.",
      },
      {
        icon: "rupee",
        title: "We make it simple",
        body: "One plan. One rate. Total clarity.",
      },
    ],
    primaryCta: { label: "Partner with us", href: routes.contact },
    secondaryCta: { label: "Meet the team", href: routes.about + "#team" },
  },

  /**
   * PLACEHOLDER FIGURES — same standing caveat as every other stat on this
   * site. Counted with the shared count-up treatment, not a second one.
   */
  stats: {
    heading: "Where we are today",
    subheading:
      "A young company, deliberately built around owning the asset rather than brokering it.", // PLACEHOLDER
    items: [
      { icon: "bolt", value: 2400, suffix: "+", label: "Bikes owned", caption: "built and maintained by us" },
      { icon: "support", value: 3200, suffix: "+", label: "Riders on lease", caption: "across active hubs" },
      { icon: "pin", value: 3, suffix: "", label: "Cities and hubs", caption: "and growing" },
      { icon: "chart", value: 97, suffix: "%", label: "Fleet uptime", caption: "rolling 30-day average" },
    ],
  },

  story: {
    eyebrow: "Our story",
    heading: "Building the ecosystem that moves the future",
    body: [
      "BattWheelz was founded with a clear ambition: to accelerate the transition to smarter, cleaner and more connected electric mobility. Founded in 2019, BattWheelz began by addressing a critical gap in last-mile mobility—making electric vehicles more accessible, reliable and operationally efficient for businesses and riders.",
      "What started with electric two-wheelers and delivery operations has evolved into a broader EV + AI ecosystem. BattWheelz brings together smart electric vehicles, fleet operations, technology, servicing, energy infrastructure and data-driven intelligence into one connected mobility platform.",
      "Today, BattWheelz operates as an Electric Mobility as a Service (EMAAS) player, enabling businesses to access and operate electric mobility without having to build the entire ecosystem themselves. Our solutions span EV fleet deployment, trained delivery networks, technology-enabled fleet management and operational support across key Indian market."
    ],
    image: placeholderHub,
  },

  missionVision: {
    heading: "Mission and vision",
    subheading: "What we are for, and where it is meant to lead.",
    items: [
      {
        icon: "bolt",
        title: "Our mission",
        body: "To take the cost and the risk of the vehicle off the rider, so that earning a living on two wheels does not start with taking on debt.", // PLACEHOLDER
      },
      {
        icon: "chart",
        title: "Our vision",
        body: "A gig economy where the vehicle is infrastructure — maintained, connected and accountable — rather than a liability each worker carries alone.", // PLACEHOLDER
      },
    ],
  },

  /**
   * Replaces the reference's historical timeline.
   *
   * Written deliberately as FORWARD-LOOKING GOALS, not as things that have
   * happened — Battwheelz has no multi-year history to recount, and inventing
   * one would be fabricating the company's past. Every target below is a
   * PLACEHOLDER pending real company goals from the client.
   */
  roadmap: {
    eyebrow: "What's next",
    heading: "Where we are going",
    subheading:
      "Goals, not history. These are the things we are building towards — they are targets, and we will say so until they are not.", // PLACEHOLDER
    steps: [
      {
        id: "cities",
        title: "More cities",
        body: "Open hubs in the delivery corridors riders actually work, rather than the ones easiest to reach.", // PLACEHOLDER
      },
      {
        id: "fleet",
        title: "A bigger fleet",
        body: "Grow the owned fleet so a rider who needs a bike today is not waiting on a queue.", // PLACEHOLDER
      },
      {
        id: "swap",
        title: "A swap network",
        body: "Battery swapping close to the hubs, so a flat pack costs minutes rather than the rest of a shift.", // PLACEHOLDER
      },
      {
        id: "ownership",
        title: "More routes to ownership",
        body: "Widen rent-to-own so more riders finish a lease owning the bike outright.", // PLACEHOLDER
      },
    ],
  },

  /**
   * ============== EVERY PERSON BELOW IS INVENTED. NOT REAL STAFF. ==============
   * Names, roles, bios and portraits are all placeholders written to demonstrate
   * the layout. The portraits are flat ILLUSTRATIONS, deliberately faceless, so
   * they cannot be mistaken for photographs of real people.
   *
   * The section renders a visible notice saying so. Do not remove it until real
   * team members, with their consent, replace this array. Publishing invented
   * people as a company's leadership is a straightforward misrepresentation.
   *
   * `socials` hrefs are null on purpose: the icons render as inert placeholders
   * rather than links to nowhere. Fill in a real URL and it becomes a link.
   * ===========================================================================
   */
  team: {
    eyebrow: "Our people",
    heading: "Meet the team",
    subheading: "The people building and running the fleet.",
    /**
     * Two groups under one section, not two sections — the eyebrow, notice,
     * quote and group image above and below are shared, and splitting the
     * section would duplicate all of them.
     */
    foundersHeading: "Meet our founders",
    membersHeading: "Meet our team",
    mentorHeading: "Meet our mentors",
    founders: [
      {
        id: "tm1",
        name: "Chetan Chaturvedi", // PLACEHOLDER
        role: "Founder & MD", // PLACEHOLDER
        bio: "A  visionary entrepreneur in renewable energy and electric vehicles, Chetan brings over 20 years of senior leadership experience from industry titans like Bharti, Amdocs, and Usha. After successfully founding Greequity to accelerate renewable energy adoption, he now spearheads Battwheelz, driving the transformation of last-mile logistics through innovative sustainable solutions.", // PLACEHOLDER
        avatar: teamPortraits.chetanChaturvedi,
        socials: [
          // { network: "linkedin", href: null },
          // { network: "instagram", href: null },
          { network: "email", href: 'Chetan1@battwheelz.com' },
        ],
      },
      {
        id: "tm2",
        name: "Sonika Chaturvedi", // PLACEHOLDER
        role: "Co-founder & COO", // PLACEHOLDER
        bio: "With 18 years of high-impact strategic experience at IBM, Accenture, and Wipro, Sonika is a seasoned expert in large-scale IT solutions, partnerships, and operations. She applies her deep technical expertise and track record of operational excellence to champion a technology-first approach within the EMAAS domain, ensuring the company scales with precision and efficiency.", // PLACEHOLDER
        avatar: teamPortraits.sonikaChaturvedi,
        socials: [
          // { network: "linkedin", href: null },
          // { network: "instagram", href: null },
          { network: "email", href: 'Sonika@battwheelz.com' },
        ],
      },
    ],
    members: [
      {
        id: "tm3",
        name: "Deepak Patil", // PLACEHOLDER
        role: "Head of Fleet Management", // PLACEHOLDER
        // PLACEHOLDER BIO — one-liner written by us, awaiting the client's own copy.
        bio: "Keeps the fleet on the road — servicing, spares and uptime.",
        avatar: teamPortraits.deepakPatil,
        socials: [
          // { network: "linkedin", href: null },
          // { network: "instagram", href: null },
          { network: "email", href: "Deepak.patil@battwheelz.com" },
        ],
      },
      {
        id: "tm4",
        name: "Tejasvi Khedekar", // PLACEHOLDER
        role: "Head of MIS", // PLACEHOLDER
        // PLACEHOLDER BIO — one-liner written by us, awaiting the client's own copy.
        bio: "Turns fleet and rider data into the numbers the team runs on.",
        avatar: teamPortraits.tejasviKhedekar,
        socials: [
          // { network: "linkedin", href: null },
          // { network: "instagram", href: null },
          { network: "email", href: "Tejasvi@battwheelz.com" },
        ],
      },
      {
        id: "tm5",
        name: "Naveen Kumar", // PLACEHOLDER
        role: "Head of Operations", // PLACEHOLDER
        // PLACEHOLDER BIO — one-liner written by us, awaiting the client's own copy.
        bio: "Runs day-to-day hub operations across every active city.",
        avatar: teamPortraits.naveenKumar,
        socials: [
          // { network: "linkedin", href: null },
          // { network: "instagram", href: null },
          { network: "email", href: "Naveenblr@battwheelz.com" },
        ],
      },
      {
        id: "tm6",
        name: "Srijan Sarkar", // PLACEHOLDER
        role: "Head of Alliances & Strategy", // PLACEHOLDER
        // PLACEHOLDER BIO — one-liner written by us, awaiting the client's own copy.
        bio: "Builds the partnerships that put more riders on Battwheelz bikes.",
        avatar: teamPortraits.srijanSarkar,
        socials: [
          // { network: "linkedin", href: null },
          // { network: "instagram", href: null },
          { network: "email", href: "Srijan@battwheelz.com" },
        ],
      },
    ],
    mentor: [
      {
        id: "mn1",
        name: "Ashish Bhatia",
        role: "Co-Founder & CEO, India Accelerator | Co-Founder, Finvolve",
        bio: "Ashish Bhatia is a technologist-turned-venture builder with over 25 years of experience. In 2017, he co-founded India Accelerator with the conviction that India's early-stage founders needed more than capital. Today, IA is one of India's most active founder platforms, with 250+ portfolio companies including Battwheelz, Indrajaal, STAGE, Dozee, Matter EV, Recur Club, Lawyered, IG Defence, etc. Under Ashish's able mentorship, Battwheelz has been able to show tremendous potential and has successfully raised funding from both Finvolve and IA. This continued engagement with BattWheelz is a testament to the company's potential and strategic direction.",
        avatar: teamPortraits.ashishBhatia,
      },
      {
        id: "mn2",
        name: "Sanjiv Mital",
        bio: "An IT industry stalwart, Sanjiv Mital leads an angel investing and mentoring organization. His extensive experience in corporate IT and e-governance includes roles as CEO of NISG and Bharti Telesoft. He has provided BattWheelz with strategic guidance and direction, helping us become one of the fastest growing EV startups in India. He is one of the first angels who invested and has further helped in fundraising efforts.",
        avatar: teamPortraits.sanjivMital,
      },
      {
        id: "mn3",
        name: "Digbijaya Mahapatra",
        bio: "With over 30 years of experience, Digbijaya Mahapatra has held leadership roles in companies like Bharti Telesoft, Mahindra-Comviva, and DishTV. As an angel investor and mentor, he plays a pivotal role in shaping BattWheelz's strategic initiatives.",
        avatar: teamPortraits.digbijayaMahapatra,
      },
    ],
  },

  ecosystem: {
    eyebrow: "How it fits together",
    heading: "The parts that make a lease work",
    subheading:
      "Leasing a bike is the visible half. These are the pieces behind it.", // PLACEHOLDER
    items: [
      {
        icon: "bolt",
        title: "Manufacturing",
        body: "Vehicles are registered at production, VIN and telematics unit together, before they ever reach a hub.", // PLACEHOLDER
        cta: { label: "Fleet leasing", href: routes.b2b },
      },
      {
        icon: "wrench",
        title: "Fleet operations",
        body: "Hubs handle assignment, servicing and returns, with ops staff who can see each bike's live state.", // PLACEHOLDER
        cta: { label: "Last mile delivery", href: routes.lastMile },
      },
      {
        icon: "pin",
        title: "Charging and swap network",
        body: "Charging at the hubs today, with battery swapping being built out alongside it.", // PLACEHOLDER
        cta: { label: "What's next", href: routes.about + "#roadmap" },
      },
      {
        icon: "support",
        title: "Delivery platforms",
        body: "Our riders work across food, grocery, pharmacy and parcel platforms. We supply the vehicle, not the work.", // PLACEHOLDER
        cta: { label: "Partner with us", href: routes.contact },
      },
    ],
  },

  cta: {
    eyebrow: "Work with us",
    heading: "Ready to put riders on better bikes?",
    body: "Whether you ride for a living or run a fleet that needs one, the conversation starts the same way.", // PLACEHOLDER
    primaryCta: { label: "Partner with us", href: routes.contact },
    secondaryCta: { label: "Lease a bike", href: routes.contact },
  },
};

/* -------------------------------------------------------------------------- */
/*  Contact page                                                              */
/* -------------------------------------------------------------------------- */

/**
 * The Contact page is the enquiry form and nothing else, so its copy lives in
 * `enquiryForm` below and only the page metadata is defined here.
 */
export const contactPage = {
  meta: {
    title: "Contact",
    description:
      "Talk to Battwheelz about leasing an electric bike as a gig delivery rider, or about a fleet partnership. One form, routed to the right team.", // PLACEHOLDER
    path: routes.contact,
  },
};

/* -------------------------------------------------------------------------- */
/*  Enquiry form — shared by the home section and the Contact page            */
/* -------------------------------------------------------------------------- */

/**
 * SECTION 11 — the enquiry form.
 *
 * Defined once here because the home page renders a condensed version and the
 * Contact page will render the full one. The `reason` selector exists because
 * a rider wanting a bike and a delivery platform wanting a fleet are two very
 * different conversations, and routing them at the point of enquiry is cheaper
 * than triaging later.
 *
 * NOT WIRED TO ANYTHING YET — see the submit handler in the form component.
 */
export const enquiryForm = {
  eyebrow: "Talk to us",
  heading: "Tell us what you need",
  subheading:
    "One form for riders and for fleet partners. Pick what brings you here and we will route it to the right team.", // PLACEHOLDER
  reasonLabel: "What brings you here?",
  /**
   * One option per thing the site actually offers, so an enquiry lands with the
   * right team. Deliberately five and not more: every extra option is a
   * decision the visitor has to make before they can type anything.
   *
   * NOTE: there is no "office visit" option because Battwheelz publishes no
   * office address — see the note on the Contact page.
   */
  reasons: [
    { id: "lease", label: "I want to lease a bike", hint: "For gig delivery riders" },
    { id: "rent-to-own", label: "I want to rent to own", hint: "Ride now, own it at the end" },
    { id: "fleet", label: "I run a fleet or platform", hint: "B2B and last-mile enquiries" },
    { id: "franchise", label: "Franchise enquiry", hint: "Running a Battwheelz hub" },
    { id: "investor", label: "Investor enquiry", hint: "For prospective investors" },
  ],
  fields: {
    name: { label: "Full name", placeholder: "Your name", autoComplete: "name" },
    phone: { label: "Phone number", placeholder: "10-digit mobile number", autoComplete: "tel" },
    email: { label: "Email", placeholder: "you@example.com", autoComplete: "email" },
    message: { label: "Message", placeholder: "Where do you ride, and which platform for?" },
  },
  optionalSuffix: "(optional)",
  submitLabel: "Send enquiry",
  /** Shown in place of a fake success state. See the component's TODO. */
  notWiredNotice:
    "This form is not connected to a backend yet — nothing is sent. Reach us on the details below in the meantime.",
  errors: {
    nameRequired: "Please tell us your name.",
    phoneRequired: "We need a phone number to reach you.",
    phoneInvalid: "That does not look like a 10-digit Indian mobile number.",
    emailInvalid: "That does not look like a valid email address.",
    messageRequired: "Tell us a little about what you need.",
    reasonRequired: "Pick what brings you here.",
  },
};

/* -------------------------------------------------------------------------- */
/*  Coming-soon stubs                                                         */
/* -------------------------------------------------------------------------- */

/**
 * TEMPORARY. The four routes the nav links to that are not built yet.
 *
 * These exist so nothing 404s in the client preview — the header, footer and
 * sitemap all already point at them. Each is replaced wholesale by the real
 * page; when that happens, delete its entry here and the corresponding
 * `app/<route>/page.jsx` stub.
 *
 * The meta descriptions are written per page rather than shared: they are what
 * a search result or a link preview shows, and four identical descriptions is
 * the duplicate-content signal we would rather not teach a crawler even on a
 * noindexed build.
 */
export const comingSoon = {
  eyebrow: "Coming soon",
  backCta: { label: "Back to home", href: routes.home },
  pages: {
    privacy: {
      meta: {
        title: "Privacy policy",
        description:
          "The Battwheelz privacy policy. This document is being prepared.",
        path: routes.privacy,
      },
      heading: "Privacy policy",
      body: "Our privacy policy is being prepared with legal review. It will be published here before the site goes live.",
    },
    terms: {
      meta: {
        title: "Terms of service",
        description:
          "The Battwheelz terms of service. This document is being prepared.",
        path: routes.terms,
      },
      heading: "Terms of service",
      body: "Our terms of service are being prepared with legal review. They will be published here before the site goes live.",
    },
  },
};

/* -------------------------------------------------------------------------- */
/*  Imagery shared by more than one page                                      */
/* -------------------------------------------------------------------------- */

export const sharedImages = { placeholderHub };

const siteContent = {
  brand,
  navigation,
  footer,
  seo,
  journeySteps,
  home,
  contactPage,
  enquiryForm,
  comingSoon,
  sharedImages,
};

export default siteContent;
