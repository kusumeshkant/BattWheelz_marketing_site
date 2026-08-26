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
 * replaced before launch. Commercial terms especially — down payments, lease
 * lengths, city lists — are the client's to confirm, and a rider will read them
 * as a commitment.
 */

import { routes } from "@/utils/constants";
import { journeySteps } from "./siteContent";

/* -------------------------------------------------------------------------- */
/*  B2B — fleets and delivery platforms                                       */
/* -------------------------------------------------------------------------- */

export const b2bPage = {
  meta: {
    title: "B2B fleet leasing",
    description:
      "Battwheelz leases electric two-wheelers to delivery fleets and platforms, with servicing, insurance and live telematics included in one fixed rate.", // PLACEHOLDER
    path: routes.b2b,
  },
  hero: {
    eyebrow: "For fleets and platforms",
    headline: [
      { text: "Put your riders on " },
      { text: "bikes you don't have to own", highlight: true },
      { text: "." },
    ],
    subheadline:
      "We own the vehicles, run the hubs and carry the downtime. You get a predictable per-rider cost and a fleet you can see on a map.", // PLACEHOLDER
    primaryCta: { label: "Talk to the fleet team", href: routes.contact },
    secondaryCta: { label: "See how it works", href: routes.b2b + "#b2b-join" },
  },
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
      { icon: "lock", title: "Rates fixed per lease", body: "The rate agreed when a bike is assigned holds for that lease. Budget once, not every quarter." },
      { icon: "support", title: "Rider support", body: "Riders raise tickets in the app and a real person picks them up, so your team is not the first line." },
    ],
  },
  kyc: {
    eyebrow: "Onboarding",
    heading: "What a rider needs to get started",
    subheading: "Three documents, reviewed by a person, usually within a working day.", // PLACEHOLDER
    items: [
      { icon: "support", title: "A selfie", body: "Confirms the person collecting the bike is the person on the application." },
      { icon: "shield", title: "Aadhaar", body: "Identity verification. Stored securely and never shown on the vehicle record." },
      { icon: "check", title: "Driving licence", body: "A valid two-wheeler licence, checked against the rider's details." },
    ],
  },
  cities: {
    eyebrow: "Coverage",
    heading: "Where we operate",
    subheading:
      "PLACEHOLDER city list — replace with the client's actual operating hubs before launch.", // PLACEHOLDER
    // PLACEHOLDER — every one of these is invented. Do not publish an operating
    // footprint the company does not have; a fleet buyer will plan around it.
    items: [
      { icon: "pin", title: "City one", body: "Placeholder hub location." }, // PLACEHOLDER
      { icon: "pin", title: "City two", body: "Placeholder hub location." }, // PLACEHOLDER
      { icon: "pin", title: "City three", body: "Placeholder hub location." }, // PLACEHOLDER
      { icon: "pin", title: "City four", body: "Placeholder hub location." }, // PLACEHOLDER
    ],
  },
  howToJoin: {
    eyebrow: "Getting started",
    heading: "From first call to riders on the road",
    subheading: "The same four steps a single rider goes through, run at fleet scale.", // PLACEHOLDER
    steps: journeySteps,
  },
  faq: {
    eyebrow: "Questions",
    heading: "What fleet operators ask us",
    items: [
      { id: "b2b-minimum", question: "Is there a minimum fleet size?", answer: "No fixed minimum. Talk to us about how many riders you need on the road and where, and we will tell you what we can cover from the nearest hub." }, // PLACEHOLDER
      { id: "b2b-billing", question: "How are we billed?", answer: "Per vehicle, per day, at the rate fixed when each bike is assigned. Part days round up to a full day, which is standard for daily vehicle rentals." }, // PLACEHOLDER
      { id: "b2b-downtime", question: "What happens when a bike is off the road?", answer: "Recovery and repair are ours to carry. Where a fix will take time we aim to move the rider onto another bike from the hub rather than leaving them idle." }, // PLACEHOLDER
      { id: "b2b-data", question: "Can we see the fleet ourselves?", answer: "Yes. Every vehicle reports location, battery and lock state, and your operations team sees the same live data ours does." }, // PLACEHOLDER
    ],
  },
  cta: {
    eyebrow: "Next step",
    heading: "Tell us how many riders you need on the road",
    body: "Where you operate and which platforms you serve is enough for us to come back with hubs, availability and a rate.", // PLACEHOLDER
    primaryCta: { label: "Talk to the fleet team", href: routes.contact },
    secondaryCta: { label: "Rider leasing instead", href: routes.rentToOwn },
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
    heading: "Four steps to owning your bike",
    subheading: "The same onboarding as any lease — the difference is where it ends.", // PLACEHOLDER
    steps: journeySteps,
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
      { id: "rto-stop", question: "What if I need to stop early?", answer: "Talk to us. You can close the lease early and return the bike; what you have paid to that point does not convert to ownership, so it is worth planning the term realistically at the start." }, // PLACEHOLDER
      { id: "rto-service", question: "Do I pay for servicing once I own it?", answer: "Servicing is included for the length of the plan. Once the bike is yours, upkeep is yours too." }, // PLACEHOLDER
      { id: "rto-switch", question: "Can I switch from a weekly plan?", answer: "Yes. Close your current lease and start a rent-to-own term — we will work out the timing so you are not without a bike in between." }, // PLACEHOLDER
    ],
  },
  cta: {
    eyebrow: "Get started",
    heading: "Ready to start owning the bike you ride?",
    body: "Tell us where you ride and which platform you ride for, and we will come back with the nearest hub and the terms available there.", // PLACEHOLDER
    primaryCta: { label: "Apply now", href: routes.contact },
    secondaryCta: { label: "Leasing for fleets", href: routes.b2b },
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
      "Battwheelz supplies the vehicles and the platform they run on, and sets the standards a hub has to meet. Riders lease through Battwheelz, so the rider relationship and the billing stay with us.", // PLACEHOLDER
    ],
    list: [
      "You provide the premises and hire the local team", // PLACEHOLDER
      "We supply vehicles, telematics, and the software the hub runs on", // PLACEHOLDER
      "Riders lease through Battwheelz — billing and support stay with us", // PLACEHOLDER
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
    secondaryCta: { label: "Fleet leasing instead", href: routes.b2b },
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
      { icon: "support", title: "Riders", body: "Verified riders onboarded through the same KYC process as every Battwheelz lease." },
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
      "Battwheelz manufactures, owns and maintains electric two-wheelers, and leases them to the people who ride for a living.", // PLACEHOLDER
    primaryCta: { label: "Get in touch", href: routes.contact },
  },
  approach: {
    eyebrow: "Our approach",
    heading: "Why owning the fleet is the business",
    body: [
      "Most of the value in gig mobility sits in the vehicle — and most of the risk sits with whoever owns it. Battwheelz takes both. We own the asset, carry the maintenance and the downtime, and lease the vehicle on fixed terms.", // PLACEHOLDER
      "That makes the unit of the business a bike rather than a booking. Each vehicle is a durable asset with a known cost to run, a rider attached to it, and telemetry telling us how it is actually being used. It is a slower business to build than a marketplace, and a harder one to displace once built.", // PLACEHOLDER
      "Every bike is registered at manufacture with its telematics unit already fitted, so the fleet is instrumented from day one rather than retrofitted later. That is what lets us price a lease honestly and hold that price for its full term.", // PLACEHOLDER
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
  b2bPage,
  rentToOwnPage,
  focoPage,
  lastMilePage,
  investorsPage,
  careersPage,
};

export default pagesContent;
