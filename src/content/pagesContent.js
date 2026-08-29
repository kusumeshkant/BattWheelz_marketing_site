/**
 * ============================================================================
 *  COPY FOR THE OFFERING AND COMPANY PAGES.
 *  <<< PLACEHOLDER CONTENT — AWAITING CLIENT COPY >>>
 * ============================================================================
 *
 * Split out of siteContent.js purely for file size — same rules apply. No
 * component contains a copy string; everything a visitor can read is here.
 *
 * Anything marked PLACEHOLDER is invented for layout purposes and must be
 * replaced before launch. Commercial terms especially — down payments, subscription
 * lengths, city lists — are the client's to confirm, and a rider will read them
 * as a commitment.
 */

import { routes } from "@/utils/constants";
import { journeySteps } from "./siteContent";
import { teamPortraits, placeholderHub } from "@/assets/images";

/* -------------------------------------------------------------------------- */
/*  B2B — fleets and delivery platforms                                       */
/* -------------------------------------------------------------------------- */

export const b2bPage = {
  /**
   * The 3PL page. RIDER-FACING: it speaks to a gig rider who wants a vehicle to
   * work on a delivery platform, not to a fleet buyer purchasing capacity.
   *
   * The route stays /b2b — only the nav label changed to "3PL". Renaming the URL
   * would break every existing link to it, including the ones already deployed.
   */
  meta: {
    title: "3PL for riders",
    description:
      "Get a Battwheelz electric vehicle and ride for the delivery platforms you choose. Vehicle, servicing, insurance and support included in one plan.", // PLACEHOLDER
    path: routes.b2b,
  },
  hero: {
    eyebrow: "For riders",
    headline: [
      { text: "Get a " },
      { text: "Battwheelz", highlight: true },
    ],
    tagline: "Earn more. Ride smarter. Stay on the road.",
    subheadline:
      "Get access to a reliable electric vehicle without the burden of owning and maintaining one. Battwheelz provides the vehicle, support and technology you need to keep moving and earning.",
    // PLACEHOLDER CTAs — the fleet-team wording that used to sit here does not
    // belong on a rider page. Confirm the real rider entry point with the client.
    primaryCta: { label: "Get started", href: routes.contact },
    secondaryCta: { label: "See how it works", href: routes.b2b + "#onboarding" },
  },
  /**
   * PLACEHOLDER — this block still speaks to a FLEET OPERATOR ("your ops team",
   * "your delivery SLA"). It was not part of the rider-centric rewrite brief and
   * no replacement copy was supplied, so it is left as-is and flagged rather
   * than reworded on a guess. It reads oddly under the rider hero above.
   */
  plan: {
    eyebrow: "What's in the plan",
    heading: "One rate, everything included",
    subheading:
      "No separate service contracts, no parts invoices, no insurance renewals to chase.", // PLACEHOLDER
    items: [
      { icon: "bolt", title: "Vehicles and batteries", body: "Road-ready electric two-wheelers, assigned per rider and swapped out when one needs work." },
      { icon: "wrench", title: "Servicing included", body: "Scheduled maintenance and wear parts sit inside the rate. Downtime is our cost, not your delivery SLA." },
      { icon: "shield", title: "Insurance and recovery", body: "Vehicle insurance and roadside recovery from day one, on every bike in your fleet." },
      { icon: "pin", title: "Live fleet visibility", body: "Every vehicle reports location, battery and lock state, visible to your ops team and ours." },
      { icon: "lock", title: "Rates fixed per subscription", body: "The rate agreed when a bike is assigned holds for that subscription. Budget once, not every quarter." },
      { icon: "support", title: "Rider support", body: "Riders raise tickets in the app and a real person picks them up, so your team is not the first line." },
    ],
  },
  onboarding: {
    eyebrow: "Onboarding",
    heading: "3 Steps. That's It.",
    // Emoji are literal text, deliberately — they carry the tone, and swapping
    // them for line icons would flatten it. They sit inside the heading text and
    // are announced by a screen reader as their Unicode names, which is correct
    // here: they are content, not decoration.
    items: [
      { icon: "person", label: "Selfie", title: "Snap It 📸", body: "Quick selfie. Quick check. You're good to go." },
      { icon: "shield", label: "Aadhaar", title: "Verify It 🔐", body: "Your ID, verified securely. No unnecessary hassle." },
      { icon: "check", label: "Driving Licence", title: "Ride It 🛵", body: "Valid two-wheeler licence? You're ready to hit the road." },
    ],
    footnote: "3 docs. 1 quick review. Then it's ride time. ⚡",
  },
  /**
   * Coverage. India is LIVE; UAE and KSA are PLACEHOLDER EXPANSION TARGETS
   * taken from the pitch deck and are NOT operating today.
   *
   * The section is titled and styled to say so — the pins carry two states and
   * the legend names them. Publishing Dubai and Riyadh as live coverage would
   * have riders and partners planning around cities that do not exist yet, which
   * is the same failure the old invented city list was flagged for.
   */
  coverage: {
    eyebrow: "Coverage",
    heading: "Where we are, and where we're headed",
    subheading:
      "Live in three Indian cities today, with the Gulf next on the map.", // PLACEHOLDER
    liveLabel: "Live now",
    upcomingLabel: "Coming soon",
    /**
     * `lon`/`lat` are real coordinates, projected by the map's own projection.
     *
     * `labelDx`/`labelDy` offset the LABEL, with a leader line back to the pin.
     *
     * `nudgeX`/`nudgeY` move the PIN itself by a few map units. Bengaluru and
     * Chennai are 2.7 degrees apart — about 8 units at world scale — so their
     * markers merged into a single blob at true position. The nudges are small
     * and deliberate: this is a stylised locator, and three legible pins say
     * more than three overlapping ones placed to the degree.
     */
    markers: [
      { id: "pune", name: "Pune", country: "India", status: "live", lon: 73.9, lat: 18.5, nudgeX: -3, nudgeY: -4, labelDx: 12, labelDy: -10, anchor: "start" },
      { id: "bengaluru", name: "Bengaluru", country: "India", status: "live", lon: 77.6, lat: 13.0, nudgeX: -5, nudgeY: 5, labelDx: -18, labelDy: 14, anchor: "end" },
      { id: "chennai", name: "Chennai", country: "India", status: "live", lon: 80.3, lat: 13.1, nudgeX: 6, nudgeY: 2, labelDx: 18, labelDy: 8, anchor: "start" },
      // PLACEHOLDER — expansion target, NOT live today.
      { id: "dubai", name: "Dubai", country: "UAE", status: "upcoming", lon: 55.3, lat: 25.3, labelDx: 12, labelDy: -14, anchor: "start" },
      // PLACEHOLDER — expansion target, NOT live today.
      { id: "riyadh", name: "Riyadh", country: "KSA", status: "upcoming", lon: 46.7, lat: 24.7, labelDx: -12, labelDy: -14, anchor: "end" },
    ],
  },
  howToJoin: {
    eyebrow: "Getting started",
    heading: "From application to riding",
    subheading: "Four steps between here and your first shift.", // PLACEHOLDER
    steps: journeySteps,
  },
  /**
   * PLACEHOLDER — questions supplied by the client as a draft, answers written
   * by us and NOT signed off. Every one of these makes a commitment to a rider
   * about platform choice, breakdown cover and billing; confirm each before launch.
   */
  faq: {
    eyebrow: "Questions",
    heading: "What riders ask us",
    items: [
      { id: "b2b-platform", question: "Can I choose which platform I ride for — Bigbasket, Blinkit, or others?", answer: "Yes. The vehicle is yours to ride on whichever platform you work for. We supply the bike and the support; the work you take is your own." }, // PLACEHOLDER ANSWER
      { id: "b2b-account", question: "Do I need my own account with the delivery platform, or does Battwheelz set that up?", answer: "You ride on your own account. We can point you at the platforms hiring near your hub, but the account and the onboarding with them stays yours." }, // PLACEHOLDER ANSWER
      { id: "b2b-switch", question: "Can I switch platforms if I want to?", answer: "Yes, and you do not need to tell us first. Your plan is for the vehicle, not for a particular platform, so switching does not change your rate or your bike." }, // PLACEHOLDER ANSWER
      { id: "b2b-breakdown", question: "What happens if my bike breaks down mid-shift?", answer: "Raise a ticket in the app and roadside recovery comes to you. Where a repair will take time we aim to move you onto another bike from the nearest hub rather than leave you off the road." }, // PLACEHOLDER ANSWER
      { id: "b2b-billing", question: "How does billing work?", answer: "A daily rate, fixed when your bike is assigned and unchanged for the length of your plan. Part days round up to a full day, which is standard for daily vehicle rentals." }, // PLACEHOLDER ANSWER
    ],
  },
  cta: {
    eyebrow: "Next step",
    heading: "Ready to get on a Battwheelz?",
    body: "Tell us where you ride and which platform you ride for, and we will come back with the nearest hub and what is available there.", // PLACEHOLDER
    primaryCta: { label: "Get started", href: routes.contact },
    secondaryCta: { label: "Rent to own instead", href: routes.rentToOwn },
  },
};

/* -------------------------------------------------------------------------- */
/*  Rent to own                                                               */
/* -------------------------------------------------------------------------- */

export const rentToOwnPage = {
  meta: {
    title: "Rent to own",
    description:
      "Ride a Battwheelz electric bike on a rent-to-own plan and finish the term owning it outright. Servicing and insurance included throughout.", // PLACEHOLDER
    path: routes.rentToOwn,
  },
  hero: {
    eyebrow: "Rent to own",
    headline: [
      { text: "Ride it now. " },
      { text: "Own it", highlight: true },
      { text: " at the end." },
    ],
    subheadline:
      "Every payment goes toward the bike. Finish the term and it is yours — with servicing, insurance and support included the whole way through.", // PLACEHOLDER
    primaryCta: { label: "Apply now", href: routes.contact },
    secondaryCta: { label: "See how it works", href: routes.rentToOwn + "#how-rto-works" },
  },
  whyChoose: {
    eyebrow: "Why rent to own",
    heading: "A route to owning the bike you already ride",
    subheading:
      "Built for riders who want the asset at the end, not just the use of it.", // PLACEHOLDER
    items: [
      { icon: "chart", title: "Every payment counts", body: "Payments build toward ownership rather than disappearing into rent." },
      { icon: "bolt", title: "Own the bike outright", body: "Complete the term and the vehicle transfers to you, free of any further payment." },
      { icon: "wrench", title: "Servicing stays included", body: "Maintenance and wear parts are covered for the whole term, not just the first months." },
      { icon: "shield", title: "Insured throughout", body: "Vehicle insurance and roadside recovery run for the length of the plan." },
      { icon: "lock", title: "A rate that cannot move", body: "The rate fixed at assignment holds for the full term. No mid-term repricing." },
      { icon: "support", title: "Support all the way", body: "Same in-app ticketing and hub support as every other Battwheelz plan." },
    ],
  },
  howItWorks: {
    eyebrow: "How it works",
    heading: "Four steps. One bike. Your ownership.",
    // PLACEHOLDER WORDING — reworded off the old lease phrasing; no replacement
    // copy was supplied for this line, so confirm it with the client.
    subheading: "The same onboarding as any plan — the difference is where it ends.",
    /**
     * Its own steps rather than the shared `journeySteps`: the fourth step here
     * ends in ownership, which is the whole point of the page and is not what
     * the shared flow says.
     */
    steps: [
      { id: "rto-apply", title: "Apply", body: "Tell us where you ride. We'll take it from there." },
      { id: "rto-verify", title: "Get verified", body: "Drop your ID + licence. Quick check, no drama." },
      { id: "rto-collect", title: "Get your bike", body: "Pick your Battwheelz bike, collect it, and hit the road." },
      { id: "rto-own", title: "Ride → Own", body: "Keep riding, keep paying your plan. Finish the term and the bike is yours." },
    ],
  },
  eligibility: {
    eyebrow: "Eligibility",
    heading: "What you need to apply",
    body: [
      "Rent-to-own is a longer commitment than a daily or weekly plan, so there are a few more things we check up front.", // PLACEHOLDER
    ],
    /**
     * PLACEHOLDER COMMERCIAL TERMS. The down payment and term length below are
     * invented round numbers standing in for the client's real terms. A rider
     * will read these as a commitment — confirm both before launch.
     */
    list: [
      "18 or older, with a valid two-wheeler driving licence", // PLACEHOLDER
      "Aadhaar and PAN for identity and verification", // PLACEHOLDER
      "An upfront payment of ₹10,000 — PLACEHOLDER FIGURE, to be confirmed", // PLACEHOLDER
      "A commitment to a 12-month term — PLACEHOLDER TERM, to be confirmed", // PLACEHOLDER
      "Active work on a delivery platform, so the bike earns while you pay for it", // PLACEHOLDER
    ],
    cta: { label: "Start your application", href: routes.contact },
  },
  faq: {
    eyebrow: "Questions",
    heading: "Rent-to-own, answered",
    items: [
      { id: "rto-end", question: "What happens at the end of the term?", answer: "The bike becomes yours. There is no balloon payment and no separate buyout — completing the term is the purchase." }, // PLACEHOLDER
      { id: "rto-stop", question: "What if I need to stop early?", answer: "Talk to us. You can close the subscription early and return the bike; what you have paid to that point does not convert to ownership, so it is worth planning the term realistically at the start." }, // PLACEHOLDER
      { id: "rto-service", question: "Do I pay for servicing once I own it?", answer: "Servicing is included for the length of the plan. Once the bike is yours, upkeep is yours too." }, // PLACEHOLDER
      { id: "rto-switch", question: "Can I switch from a weekly plan?", answer: "Yes. Close your current subscription and start a rent-to-own term — we will work out the timing so you are not without a bike in between." }, // PLACEHOLDER
    ],
  },
  cta: {
    eyebrow: "Get started",
    heading: "Ready to start owning the bike you ride?",
    body: "Tell us where you ride and which platform you ride for, and we will come back with the nearest hub and the terms available there.", // PLACEHOLDER
    primaryCta: { label: "Apply now", href: routes.contact },
    secondaryCta: { label: "Subscriptions for fleets", href: routes.b2b },
  },
};

/* -------------------------------------------------------------------------- */

export const about = {
  meta: {
    title: "About us",
    description:
      "Battwheelz builds, owns and maintains electric two-wheelers, and puts them under India's gig delivery riders on subscription. Our mission, our team, and where we are headed.", // PLACEHOLDER
    path: routes.about,
  },

  hero: {
    headline: [
      { text: "Building the fleet that " },
      { text: "moves India", highlight: true },
      { text: " forward." },
    ],
    /**
     * Replaces the prose subheadline. Subscription wording throughout — this
     * section led the terminology change that has since been applied site-wide.
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
      { icon: "support", value: 3200, suffix: "+", label: "Riders on subscription", caption: "across active hubs" },
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
    eyebrow: "Mission and vision",
    heading: "Driving the future of electric mobility",
    subheading:
      "Our mission guides what we do today. Our vision defines the future we're building.",
    /**
     * `heading` is an array of `{ text, highlight }` parts, the same shape the
     * heroes use — which words carry the brand gradient is content, not markup.
     */
    items: [
      {
        icon: "bolt",
        label: "Our mission",
        heading: [
          { text: "Powering livelihoods with " },
          { text: "smart electric mobility", highlight: true },
          { text: "." },
        ],
        body: "We build and operate electric vehicle fleets and technology platforms that remove the cost, complexity and risk from mobility. By owning the asset and taking care of everything around it, we enable riders and businesses to focus on what matters most — moving, delivering and earning more, every day.",
        features: [
          { icon: "shield", label: "We own the asset" },
          { icon: "wrench", label: "We maintain and support" },
          { icon: "clock", label: "We absorb the downtime" },
          { icon: "person", label: "Riders stay earning" },
        ],
      },
      {
        icon: "chart",
        label: "Our vision",
        heading: [
          { text: "To build India's most trusted " },
          { text: "electric mobility ecosystem", highlight: true },
          { text: "." },
        ],
        body: "A future where electric vehicles are the backbone of urban mobility — smarter, cleaner and more inclusive. We envision a connected ecosystem of vehicles, technology, infrastructure and services that powers millions of livelihoods and accelerates India's transition to sustainable mobility.",
        features: [
          { icon: "truck", label: "Smart electric fleet" },
          { icon: "signal", label: "Intelligent technology" },
          { icon: "plug", label: "Reliable infrastructure" },
          { icon: "people", label: "Stronger communities" },
        ],
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
  /**
   * Forward-looking GOALS, not history. Battwheelz has no multi-year past to
   * recount and inventing one would fabricate the company's record.
   *
   * PLACEHOLDER FIGURES — every FY27 target below came with the copy brief and
   * has NOT been cross-checked against the pitch deck's own GTM numbers. A
   * stated target is read as a commitment by partners and investors alike;
   * confirm each one before this goes anywhere public.
   */
  roadmap: {
    eyebrow: "What's next",
    heading: [
      { text: "Where " },
      { text: "Battwheelz", highlight: true },
      { text: " is headed" },
    ],
    subheading:
      "We're building the infrastructure behind India's electric mobility transition. Here's what we're focused on next.",
    steps: [
      {
        id: "cities",
        icon: "pin",
        title: "More cities. Stronger presence.",
        body: "Expand Battwheelz hubs across high-demand delivery corridors to be closer to every rider and partner we serve.",
        stat: { icon: "target", value: "25+ cities", caption: "by FY27" }, // PLACEHOLDER
      },
      {
        id: "fleet",
        icon: "scooter",
        title: "Bigger fleet. Always road-ready.",
        body: "Scale our owned electric fleet with best-in-class reliability, predictive maintenance and 24/7 support.",
        stat: { icon: "trendingUp", value: "25,000+ EVs", caption: "on our roads by FY27" }, // PLACEHOLDER
      },
      {
        id: "technology",
        icon: "chip",
        title: "Smarter technology, stronger operations.",
        body: "Use AI, IoT and data to optimize utilization, predict downtime, improve rider experience and run operations at scale.",
        stat: { icon: "brain", value: "AI-powered platform", caption: "for real-time decisions" },
      },
      {
        id: "partnerships",
        icon: "handshake",
        title: "Deeper partnerships. Bigger impact.",
        body: "Work with more platforms, enterprises and OEMs to build integrated solutions that accelerate electric mobility.",
        stat: { icon: "people", value: "100+ partners", caption: "building with us by FY27" }, // PLACEHOLDER
      },
    ],
    banner: {
      icon: "bolt",
      text: [
        { text: "We don't just move people. We move India forward — " },
        { text: "smarter, cleaner, and together", highlight: true },
        { text: "." },
      ],
    },
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
    heading: "The Battwheelz EMAAS Ecosystem",
    subheading:
      "One integrated platform connecting electric vehicles, technology, operations and mobility services.",
    items: [
      {
        icon: "bolt",
        title: "Smart EV Fleet",
        body: "Battwheelz provides connected electric 2W, 3W and 4W vehicles designed for efficient, reliable mobility.",
        // Label retired in the site-wide move to subscription wording.
        cta: { label: "Fleet solutions", href: routes.b2b },
      },
      {
        icon: "wrench",
        title: "AI-Powered Operations",
        body: "AI, telematics and data help Battwheelz monitor fleet performance, utilization, maintenance and uptime.",
        cta: { label: "Last mile delivery", href: routes.lastMile },
      },
      {
        icon: "pin",
        title: "Mobility Infrastructure",
        body: "Charging, battery management and service infrastructure keep vehicles operational and road-ready.",
        cta: { label: "What's next", href: routes.about + "#roadmap" },
      },
      {
        icon: "support",
        title: "Delivery & Mobility Partners",
        body: "Battwheelz connects its EV ecosystem with e-commerce, Q-commerce, food, grocery and logistics partners.",
        cta: { label: "Partner with us", href: routes.contact },
      },
    ],
  },

  cta: {
    eyebrow: "Work with us",
    heading: "Ready to put riders on better bikes?",
    body: "Whether you ride for a living or run a fleet that needs one, the conversation starts the same way.", // PLACEHOLDER
    primaryCta: { label: "Partner with us", href: routes.contact },
    secondaryCta: { label: "Start a subscription", href: routes.contact },
  },
};

/* -------------------------------------------------------------------------- */
/*  Contact page                                                              */

/* -------------------------------------------------------------------------- */
/*  Impact page                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Moved out of the About page, unchanged. Same two bands, same copy, same
 * PLACEHOLDER markers — this was a structural move, not a rewrite.
 */
export const impactPage = {
  meta: {
    title: "Impact",
    description:
      "How Battwheelz electric fleets cut emissions from last-mile delivery, and how riders build livelihoods on the platform.", // PLACEHOLDER
    path: routes.impact,
  },
  /**
   * A. ENVIRONMENTAL — qualitative copy, plus the live tracker.
   *
   * This band DOES now carry a Battwheelz CO2 figure, which it previously did
   * not. What makes that defensible is that it is derived and labelled: the
   * tonnage is computed from the stated fleet assumptions in
   * `utils/sustainability.js`, and the row says on its face that it is a
   * projection from fleet averages. An unsubstantiated environmental claim is
   * treated as actionable greenwashing in several markets — so if the label
   * ever comes off, or the arithmetic ever stops being traceable to published
   * assumptions, the figure has to go with it.
   *
   * The 40% figure below is an INDUSTRY-WIDE statistic about last-mile
   * delivery generally, phrased as such. It says nothing about Battwheelz's
   * own emissions and must not be reworded into something that does.
   */
  environmental: {
    eyebrow: "Environment",
    heading: "Cleaner deliveries, kilometre by kilometre",
    body: "Last-mile delivery is one of the largest sources of urban logistics emissions industry-wide — by some estimates up to 40% of the total. Every kilometre ridden electric is a kilometre that does not burn petrol.",
    /**
     * LIVE TRACKER. Copy only — every figure it shows is computed in
     * `utils/sustainability.js` from one frozen set of fleet assumptions, and
     * ticks up against the clock. There are no numbers in this object on
     * purpose, the same way `savings.js` keeps none.
     *
     * WHAT THIS REPLACED. The static three-up row that used to sit here (48M
     * km, ₹9.2Cr, 7,400t) was supplied and confirmed by the client. Those
     * values are gone deliberately, at the client's request, in favour of the
     * live projection — this is NOT the earlier "PLACEHOLDER" marking being
     * reapplied, and they should not be reinstated alongside the tracker.
     *
     * WHAT THE FIGURES ARE. An extrapolation from fleet averages over elapsed
     * time. The site has no backend and reads no vehicle data. That is exactly
     * what `caption` says, and it is the reason it says it — the row must never
     * be presented as metered telemetry, and the caption must not be reworded
     * into a claim of measured data.
     *
     * The industry-wide framing in `body` above still applies: nothing here is
     * a claim about anyone else's emissions.
     */
    tracker: {
      caption: "Live estimate, projected from fleet averages since 1 April 2026",
      /**
       * Keyed by metric, not an array: the display order, the per-second rate
       * and the precision belong to `LiveTracker`, and the keys are the join
       * between the two. Adding a metric means adding it in both places.
       */
      metrics: {
        distance: { label: "Kilometres ridden electric", caption: "across the fleet" },
        petrol: { label: "Petrol avoided", caption: "litres not burned" },
        co2: { label: "CO₂ emissions avoided", caption: "versus equivalent petrol two-wheelers" },
        cost: { label: "Fuel cost avoided", caption: "fleet-wide" },
      },
    },
  },
  /**
   * B. MICRO ENTREPRENEURS. Labels supplied by the client; no supporting
   * imagery is wired in.
   *
   * The reference photographs show REAL, IDENTIFIABLE RIDERS in client-platform
   * uniforms. Publishing those raises two problems at once: consent from the
   * people pictured, and an implied partnership with the platform whose branding
   * they wear. If a supporting image is wanted here, it must be a flat-vector
   * ILLUSTRATION in the site's existing placeholder style, or a real photograph
   * with documented consent and no third-party branding visible.
   */
  riders: {
    eyebrow: "Micro entrepreneurs",
    heading: "More than a job — a path forward",
    subheading:
      "Riders build steady, formal livelihoods on the platform — with the vehicle, the support and the earnings history that come with it.", // PLACEHOLDER
    items: [
      { icon: "pin", label: "Rural Mobilization" },
      { icon: "wallet", label: "Financial Inclusion" },
      { icon: "trendingUp", label: "Aspirational Growth" },
      { icon: "shield", label: "Organized Sector" },
      { icon: "people", label: "Socio-Economic Upliftment" },
      { icon: "graduation", label: "Skill Improvement" },
      { icon: "chip", label: "Digital India" },
      { icon: "heart", label: "Health Quotient" },
    ],
  },
};

/* -------------------------------------------------------------------------- */
/*  Greequity                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * SOURCED FROM THE PITCH DECK, page 8 ("GREEQuity - Unified Logistics
 * Platform"). Rewritten for a web page rather than transcribed: the deck's
 * sentences are slide copy, written to be spoken over.
 *
 * The five features below are exactly the five the deck names, and each says
 * only what the deck supports. NOTHING has been added — no integrations,
 * partners, coverage, uptime or volume claims appear here, because the source
 * does not establish any. If a capability is not in this list, the deck did not
 * claim it.
 *
 * No figures anywhere on this page, deliberately: the deck's page 8 carries no
 * numbers, and inventing one to fill a stat row is exactly what we are avoiding.
 */
export const greequityPage = {
  meta: {
    title: "Greequity",
    description:
      "Greequity is the Battwheelz logistics platform — rider onboarding, fleet monitoring, settlements, charging and support in one system.", // PLACEHOLDER
    path: routes.greequity,
  },
  hero: {
    eyebrow: "Platform",
    headline: [
      { text: "Greequity: one platform behind " },
      { text: "every ride", highlight: true },
    ],
    tagline: "Riders, fleets and clients on the same system.",
    subheadline:
      "Greequity is the software layer underneath the Battwheelz fleet. It handles a rider from sign-up through to settlement, gives fleet teams live visibility of every vehicle, and keeps the people using it, running it and depending on it looking at the same information.",
    primaryCta: { label: "Talk to us", href: routes.contact },
    secondaryCta: { label: "See the fleet", href: routes.b2b },
  },
  features: {
    eyebrow: "What it does",
    heading: "Five parts, one system",
    subheading:
      "Each piece exists because a rider, a fleet team or a client needed it — not because a platform ought to have it.",
    items: [
      {
        icon: "mobile",
        title: "Rider app",
        body: "Sign-up and identity checks happen in the app, so a rider gets from first download to verified without paperwork. It is also the line to our operations team once they are riding.",
      },
      {
        icon: "chart",
        title: "Monitoring and analytics",
        body: "Our own analytics engine turns live fleet data into decisions — where vehicles are, how they are being used, and which routes and assignments actually work.",
      },
      {
        icon: "wallet",
        title: "Payment settlements",
        body: "Automated, secure settlement across multiple gateways. Riders see what they have earned as they earn it, and finance reconciles against the same numbers.",
      },
      {
        icon: "plug",
        title: "Charging and swapping",
        body: "Battery swapping and flexible charging, so a depleted pack is a short stop rather than the end of a shift.",
      },
      {
        icon: "support",
        title: "Dedicated support",
        body: "An in-house team handles rider escalations, roadside assistance and preventative maintenance — the work that keeps vehicles available rather than merely owned.",
      },
    ],
  },
  cta: {
    eyebrow: "Next step",
    heading: "Want to see Greequity running?",
    body: "Tell us how your riders work today and we will show you the parts of the platform that apply.", // PLACEHOLDER
    primaryCta: { label: "Talk to us", href: routes.contact },
    secondaryCta: { label: "For riders", href: routes.b2b },
  },
};

/* -------------------------------------------------------------------------- */
/*  FOCO — franchise                                                          */
/* -------------------------------------------------------------------------- */

/**
 * ===================== NO RETURN PROJECTIONS ON THIS PAGE =====================
 * The reference this page's structure came from leads with a headline ROI
 * percentage and a payback period, driven by an investment calculator.
 *
 * None of that is reproduced here, and it should not be added later. A stated
 * return on an investment is a financial promotion — a regulated statement —
 * regardless of whether the figure is real or a placeholder. This page explains
 * how the model works and asks for a conversation. Numbers belong in that
 * conversation, with the client's own compliance sign-off.
 * ============================================================================
 */
export const focoPage = {
  meta: {
    title: "Run a Battwheelz hub",
    description:
      "Partner with Battwheelz to operate a hub in your city. You run local operations; we supply the vehicles, the platform and the playbook.", // PLACEHOLDER
    path: routes.foco,
  },
  hero: {
    eyebrow: "Franchise partnerships",
    headline: [
      { text: "Run a " },
      { text: "Battwheelz hub", highlight: true },
      { text: " in your city." },
    ],
    subheadline:
      "You know your city and its riders. We bring the vehicles, the technology and the operating playbook. Together that is a hub.", // PLACEHOLDER
    primaryCta: { label: "Enquire about a franchise", href: routes.contact },
  },
  whyChoose: {
    eyebrow: "Why partner with us",
    heading: "What you get from the partnership",
    subheading:
      "A hub is a local business running on national infrastructure.", // PLACEHOLDER
    items: [
      { icon: "bolt", title: "The fleet", body: "Vehicles are manufactured, registered and telematics-fitted before they reach you." },
      { icon: "chart", title: "The platform", body: "Assignment, billing, ticketing and live tracking all run on the systems we already operate." },
      { icon: "wrench", title: "The playbook", body: "Servicing schedules, hub layout and rider onboarding, documented from how our own hubs run." },
      { icon: "support", title: "Ongoing support", body: "A named contact on our side, plus training for the people you hire locally." },
    ],
  },
  model: {
    eyebrow: "The model",
    heading: "How a franchise hub works",
    body: [
      "A Battwheelz hub is where vehicles are stored, charged, serviced and handed to riders. The franchise partner runs that operation locally — the premises, the people and the day-to-day.", // PLACEHOLDER
      "Battwheelz supplies the vehicles and the platform they run on, and sets the standards a hub has to meet. Riders subscribe through Battwheelz, so the rider relationship and the billing stay with us.", // PLACEHOLDER
    ],
    list: [
      "You provide the premises and hire the local team", // PLACEHOLDER
      "We supply vehicles, telematics, and the software the hub runs on", // PLACEHOLDER
      "Riders subscribe through Battwheelz — billing and support stay with us", // PLACEHOLDER
      "Commercial terms are agreed per hub, based on the city and the size of the operation", // PLACEHOLDER
    ],
    /**
     * Deliberately NOT a figure. Commercial terms are a conversation, and
     * publishing an indicative return would be a financial promotion.
     */
    cta: { label: "Talk to us about terms", href: routes.contact },
  },
  journey: {
    eyebrow: "Getting started",
    heading: "Four steps to opening a hub",
    subheading: "From first conversation to the first rider collecting a bike.", // PLACEHOLDER
    steps: [
      { id: "enquire", title: "Enquire", body: "Tell us the city you want to operate in and what you already run there." }, // PLACEHOLDER
      { id: "assess", title: "Assess together", body: "We look at rider demand in the area, and you look at whether the model fits your business." }, // PLACEHOLDER
      { id: "setup", title: "Set up the hub", body: "Premises, equipment and the local team, against our documented hub standard." }, // PLACEHOLDER
      { id: "launch", title: "Launch", body: "Vehicles arrive, your team is trained, and riders start collecting bikes." }, // PLACEHOLDER
    ],
  },
  faq: {
    eyebrow: "Questions",
    heading: "Franchise questions",
    items: [
      { id: "foco-what", question: "What does a franchise partner actually run?", answer: "The local operation — the hub premises, the people who work there, and the day-to-day of preparing and handing over vehicles. The rider relationship, billing and support stay with Battwheelz." }, // PLACEHOLDER
      { id: "foco-terms", question: "What are the commercial terms?", answer: "They are agreed per hub, based on the city and the scale of the operation. We do not publish indicative figures, because the right answer differs by location — it is a conversation." }, // PLACEHOLDER
      { id: "foco-experience", question: "Do I need experience in mobility?", answer: "Not specifically. Experience running a local operation with staff and premises matters more. We supply the vehicle and platform knowledge." }, // PLACEHOLDER
      { id: "foco-where", question: "Which cities are you looking at?", answer: "We are open to conversations in cities with real gig-delivery demand. Tell us where you are and we will tell you honestly whether it fits." }, // PLACEHOLDER
    ],
  },
  cta: {
    eyebrow: "Next step",
    heading: "Interested in running a hub?",
    body: "Tell us which city you are in and what you already operate there. We will come back with whether it fits and what the next step looks like.", // PLACEHOLDER
    primaryCta: { label: "Enquire about a franchise", href: routes.contact },
  },
};

/* -------------------------------------------------------------------------- */
/*  Last mile delivery (3PL)                                                  */
/* -------------------------------------------------------------------------- */

export const lastMilePage = {
  meta: {
    title: "Last mile delivery",
    description:
      "Battwheelz supplies the electric fleet behind last-mile delivery — vehicles, riders, servicing and live tracking, as one managed service.", // PLACEHOLDER
    path: routes.lastMile,
  },
  hero: {
    eyebrow: "Last mile delivery",
    headline: [
      { text: "The fleet behind " },
      { text: "your last mile", highlight: true },
      { text: "." },
    ],
    subheadline:
      "Electric vehicles, riders who know the routes, and the systems to keep both running. You focus on the orders.", // PLACEHOLDER
    primaryCta: { label: "Talk to us", href: routes.contact },
    secondaryCta: { label: "Fleet subscriptions instead", href: routes.b2b },
  },
  intro: {
    eyebrow: "Managed, not rented",
    heading: "Fleet management without the fleet",
    body: [
      "Running a delivery fleet means owning vehicles, employing mechanics, chasing insurance renewals and absorbing every day a bike spends off the road. Most businesses would rather not.", // PLACEHOLDER
      "Battwheelz carries that. We own the vehicles, maintain them, insure them and keep them tracked — and you get delivery capacity as a service rather than a garage full of depreciating assets.", // PLACEHOLDER
    ],
  },
  toolkit: {
    eyebrow: "What's included",
    heading: "Your end-to-end delivery toolkit",
    subheading: "Everything needed to move an order the last few kilometres.", // PLACEHOLDER
    items: [
      { icon: "bolt", title: "Electric vehicles", body: "A fleet sized to your volume, charged and ready at the start of each shift." },
      { icon: "support", title: "Riders", body: "Verified riders onboarded through the same KYC process as every Battwheelz subscription." },
      { icon: "wrench", title: "Maintenance", body: "Servicing, wear parts and repairs handled at the hub, so a fault does not become your problem." },
      { icon: "pin", title: "Live tracking", body: "Every vehicle on a live map, with battery and lock state alongside location." },
      { icon: "shield", title: "Insurance and recovery", body: "Vehicles insured and recoverable, with no separate policy for you to manage." },
      { icon: "chart", title: "Operational reporting", body: "Utilisation and uptime you can actually see, rather than inferred from complaints." },
    ],
  },
  faq: {
    eyebrow: "Questions",
    heading: "Last-mile questions",
    items: [
      { id: "3pl-scope", question: "Do you deliver the orders, or supply the fleet?", answer: "We supply and run the fleet, and the riders who use it. The delivery work itself comes from your platform or your customers." }, // PLACEHOLDER
      { id: "3pl-scale", question: "Can capacity move with demand?", answer: "Within reason, yes. Tell us your peak and baseline volumes and we will size the fleet and the rider pool around them." }, // PLACEHOLDER
      { id: "3pl-uptime", question: "What happens when a vehicle fails mid-shift?", answer: "Recovery is included, and where the repair will take time we aim to swap the rider onto another bike from the hub the same day." }, // PLACEHOLDER
      { id: "3pl-cities", question: "Where can you operate?", answer: "Wherever we have a hub within reach of your delivery area. Tell us the areas you need covered and we will be straight with you about what we can serve." }, // PLACEHOLDER
    ],
  },
  cta: {
    eyebrow: "Next step",
    heading: "Tell us what you need moved",
    body: "Volumes, areas and hours are enough for us to come back with what we can cover and what it would cost.", // PLACEHOLDER
    primaryCta: { label: "Talk to us", href: routes.contact },
  },
};

/* -------------------------------------------------------------------------- */
/*  Investor relations — deliberately minimal                                 */
/* -------------------------------------------------------------------------- */

/**
 * ================= NO FINANCIAL DISCLOSURES ON THIS PAGE =================
 * This page carries NO revenue, funding, EBITDA, PAT, valuation, ROI or growth
 * figures — real or placeholder — and no charts, milestones or case studies.
 *
 * That is a deliberate reduction from the reference structure, which was almost
 * entirely financial disclosure. Publishing invented financials would be far
 * worse than an invented testimonial, and publishing real ones is the client's
 * decision with their own legal advice. The page states the thesis
 * qualitatively and asks interested parties to get in touch.
 *
 * If the client later wants figures here, that is a conversation with their
 * counsel, not a content edit.
 * ========================================================================
 */
export const investorsPage = {
  meta: {
    title: "Investor relations",
    description:
      "Battwheelz owns and operates the electric fleet behind India's gig delivery work. For investor enquiries, get in touch.", // PLACEHOLDER
    path: routes.investors,
  },
  hero: {
    eyebrow: "Investor relations",
    headline: [
      { text: "We own the asset " },
      { text: "the gig economy runs on", highlight: true },
      { text: "." },
    ],
    subheadline:
      "Battwheelz manufactures, owns and maintains electric two-wheelers, and puts them under the people who ride for a living on subscription.", // PLACEHOLDER
    primaryCta: { label: "Get in touch", href: routes.contact },
  },
  approach: {
    eyebrow: "Our approach",
    heading: "Why owning the fleet is the business",
    body: [
      "Most of the value in gig mobility sits in the vehicle — and most of the risk sits with whoever owns it. Battwheelz takes both. We own the asset, carry the maintenance and the downtime, and supply the vehicle on fixed subscription terms.", // PLACEHOLDER
      "That makes the unit of the business a bike rather than a booking. Each vehicle is a durable asset with a known cost to run, a rider attached to it, and telemetry telling us how it is actually being used. It is a slower business to build than a marketplace, and a harder one to displace once built.", // PLACEHOLDER
      "Every bike is registered at manufacture with its telematics unit already fitted, so the fleet is instrumented from day one rather than retrofitted later. That is what lets us price a subscription honestly and hold that price for its full term.", // PLACEHOLDER
    ],
  },
  cta: {
    eyebrow: "Investor enquiries",
    heading: "Interested in investing?",
    body: "We are glad to talk. Get in touch and we will follow up directly.", // PLACEHOLDER
    primaryCta: { label: "Get in touch", href: routes.contact },
  },
};

/* -------------------------------------------------------------------------- */
/*  Careers                                                                   */
/* -------------------------------------------------------------------------- */

export const careersPage = {
  meta: {
    title: "Careers",
    description:
      "Work at Battwheelz — building and running the electric fleet behind India's gig delivery workforce.", // PLACEHOLDER
    path: routes.careers,
  },
  hero: {
    eyebrow: "Careers",
    headline: [
      { text: "Build the fleet " },
      { text: "India's riders", highlight: true },
      { text: " depend on." },
    ],
    subheadline:
      "Small team, real vehicles, real riders. The work shows up on the road rather than in a slide deck.", // PLACEHOLDER
  },
  mission: {
    eyebrow: "Our mission",
    heading: "Take the cost of the vehicle off the rider",
    body: [
      "Earning a living on two wheels should not start with taking on debt. We own the asset so the rider does not have to, and we carry the downtime that used to come out of their day.", // PLACEHOLDER
    ],
  },
  vision: {
    eyebrow: "Our vision",
    heading: "The vehicle as infrastructure",
    body: [
      "A gig economy where the bike is maintained, connected and accountable — infrastructure that works, rather than a liability each worker carries alone.", // PLACEHOLDER
    ],
  },
  values: {
    eyebrow: "Our values",
    heading: "How we work",
    subheading: "Four things we actually hold each other to.", // PLACEHOLDER
    items: [
      { icon: "shield", title: "The rider comes first", body: "When a decision is close, we take the one that keeps someone earning." }, // PLACEHOLDER
      { icon: "check", title: "Say the real number", body: "Uptime, costs, delays — internally and to riders. Optimistic numbers cost more later." }, // PLACEHOLDER
      { icon: "wrench", title: "Go to the hub", body: "Problems are understood where the bikes are, not from a dashboard." }, // PLACEHOLDER
      { icon: "chart", title: "Build it to last", body: "We are building an asset business. Shortcuts show up as maintenance bills." }, // PLACEHOLDER
    ],
  },
  people: {
    eyebrow: "Who we hire",
    heading: "The kind of people we look for",
    body: [
      "People who are comfortable with the unglamorous half of the job — the hub visit, the spreadsheet that has to reconcile, the rider call that takes twenty minutes.", // PLACEHOLDER
    ],
    list: [
      "You would rather fix the cause than the symptom", // PLACEHOLDER
      "You can hold a standard without needing a process to enforce it", // PLACEHOLDER
      "You are straight with people, including when the answer is no", // PLACEHOLDER
      "You want the thing you build to still be working in three years", // PLACEHOLDER
    ],
  },
  /**
   * HONEST EMPTY STATE — deliberately not a job board.
   *
   * There are no open roles, so there is no listing. Inventing departments,
   * headcounts or vacancies would waste real people's time applying for jobs
   * that do not exist, which is a worse failure than an invented statistic.
   * When roles open, replace this block with a real listing.
   */
  openRoles: {
    eyebrow: "Open roles",
    heading: "We are not actively hiring right now",
    body: [
      "There are no open positions at the moment. We would still rather hear from good people early than miss them — if the work sounds like yours, send us a note and we will keep it on file.", // PLACEHOLDER
    ],
    cta: { label: "Send us a note", href: routes.contact },
  },
};

const pagesContent = {
  about,
  impactPage,
  greequityPage,
  b2bPage,
  rentToOwnPage,
  focoPage,
  lastMilePage,
  investorsPage,
  careersPage,
};

export default pagesContent;
