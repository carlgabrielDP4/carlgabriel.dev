export type Project = {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  role: string;
  year: string;
  tags: string[];
  cover: { hue: string; from: string; to: string };
  problem: string;
  process: string[];
  outcome: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    slug: "linux-user-group",
    index: "001",
    title: "Linux User Group",
    tagline: "Lead product UI for our club app, best work right now, still shipping with a ~10-person crew.",
    role: "Lead product UI",
    year: "2026",
    tags: ["Figma", "Product", "Stakeholders"],
    cover: { hue: "violet", from: "#a855f7", to: "#3b0764" },
    problem:
      "A cross-functional team of about ten needs one visual direction, otherwise engineering, content, and stakeholders all improvise. I own how the product looks and reads, stay in lockstep with our clients (committee + members), and pressure-test every frame: does this communicate the decision we need someone to make?",
    process: [
      "Single source of truth in Figma: naming, spacing, and repeatable patterns so devs mirror intent instead of guessing.",
      "Weekly alignment with stakeholders; trade-offs surface early, not the week before handoff.",
      "Flows and IA before polish, because motion and UI never lie about what's actually built.",
      "Handoff includes empty, error, and loading, not just the hero path marketing asked for.",
    ],
    outcome: [
      { label: "Team", value: "~10" },
      { label: "Role", value: "Lead UI" },
      { label: "Members", value: "120+" },
      { label: "Status", value: "Shipping" },
    ],
  },
  {
    slug: "fsae",
    index: "002",
    title: "Formula SAE47",
    tagline: "Maintaining the public face of a 10,000+ follower motorsport club.",
    role: "Frontend Developer",
    year: "2025",
    tags: ["React", "Frontend", "Auth", "RBAC"],
    cover: { hue: "indigo", from: "#6366f1", to: "#1e1b4b" },
    problem:
      "The University of Auckland's Formula SAE team has a real public surface: alumni, sponsors, prospective students, recruiters. Layouts had drifted, the auth area exposed views it shouldn't, and the site was leaking trust at exactly the moments it needed to earn it. The work was making maintenance feel calm again.",
    process: [
      "Refreshed layouts, navigation hierarchy, and spacing so busy visitors could scan sponsorships, events, and the club story without hunting.",
      "Contributed to auth area work, including MFA guidance, so extra security steps read clearly for students juggling multiple logins.",
      "Patched a role-based access bug so sponsor, alumni, and student views landed on the right screens without exposing internal-only tools.",
      "Tightened UI specs into clear deliverables: states, variants, labels, so peer review stopped looping on clarification.",
      "Coordinated with teammates on forms, media tables, and feature hooks so the UI matched backend behaviour as endpoints changed.",
    ],
    outcome: [
      { label: "Followers", value: "10k+" },
      { label: "Team size", value: "10" },
      { label: "Tenure", value: "9 months" },
      { label: "RBAC bug", value: "Fixed" },
    ],
  },
  {
    slug: "podbay",
    index: "003",
    title: "PodBay",
    tagline: "A full-stack podcast library, built in a team of three.",
    role: "Full-Stack Developer",
    year: "2025",
    tags: ["Flask", "SQLAlchemy", "Python", "PyTest"],
    cover: { hue: "cyan", from: "#22d3ee", to: "#0c4a6e" },
    problem:
      "A university brief asked for an end-to-end web app, not a toy demo. The team needed real persistence, real navigation, and a UX that justified itself, not a Bootstrap dashboard with five tabs. Three people, Flask, SQLAlchemy, and a deadline.",
    process: [
      "Co-architected the scope: browse, organise, and surface podcast metadata with flows that survived a real critique, not just course rubrics.",
      "Built explicit user personas so IA and interaction choices had a reason that wasn't 'it looked nice in Figma'.",
      "Owned a blend of design, frontend, and backend persistence work, with the same person making the decision and writing the migration.",
      "Validated critical routes with PyTest so regressions during late-week iteration stayed loud and findable.",
      "Pushed back on feature creep in the team, because every new screen had to earn its place against the personas we'd written.",
    ],
    outcome: [
      { label: "Team size", value: "3" },
      { label: "Stack", value: "Flask + SQLA" },
      { label: "Tests", value: "PyTest" },
      { label: "Role", value: "Full-stack" },
    ],
  },
  {
    slug: "sap-pwc",
    index: "004",
    title: "SAP × PwC",
    tagline: "UX lead on a public transport concept, 1 of 30 selected.",
    role: "UI/UX Designer",
    year: "2024",
    tags: ["SAP Fiori", "UX", "Personas", "Presentation"],
    cover: { hue: "amber", from: "#f59e0b", to: "#7c2d12" },
    problem:
      "A competitive, invitation-only event (1 of ~30 candidates) bridging enterprise UX tooling with consultancy-style problem framing. The brief: make public transport usefully better, using SAP Fiori's design language, and defend it to a panel of PwC and SAP directors. Five days. One shot.",
    process: [
      "Framed commuter problems crisply enough that solution directions were testable, not ornamental.",
      "Led UX artefacts that married SAP Fiori familiarity with a differentiated team concept the panel hadn't seen six times that morning.",
      "Worked inside a cross-functional team with designers, devs, and analysts under the time pressure typical of facilitated innovation sessions.",
      "Presented to senior practitioners including directors from sponsoring orgs. Learned to condense rationale, trade-offs, and next steps under scrutiny.",
    ],
    outcome: [
      { label: "Selection", value: "1 of 30" },
      { label: "Tooling", value: "SAP Fiori" },
      { label: "Audience", value: "Directors" },
      { label: "Format", value: "Competition" },
    ],
  },
  {
    slug: "student-video-chat",
    index: "005",
    title: "Student Video Chat",
    tagline: "Hackathon build: a randomised video pairing tool for students.",
    role: "Frontend & Designer",
    year: "2024",
    tags: ["React", "WebRTC", "Hackathon", "Realtime"],
    cover: { hue: "rose", from: "#f43f5e", to: "#4c0519" },
    problem:
      "Random video pairing for studying sounds great until you actually use one. It's either chaotic or empty. The challenge in a 6-person hackathon team was making spontaneous connection feel comprehensible, not chaotic, on real campus-grade networks.",
    process: [
      "Anchored every decision to a specific student persona so feature scope stayed purposeful instead of drifting into generic video-call mimicry.",
      "Shaped the UX so randomised matching had clear affordances, because trust and safety matter more when novelty is doing the work.",
      "Integrated React with WebRTC signalling alongside peers handling media permissions and session flows.",
      "Handled plausible error states like denied mic, dropped peer, and slow handshake so real users wouldn't think the app was broken.",
    ],
    outcome: [
      { label: "Team size", value: "6" },
      { label: "Stack", value: "React + WebRTC" },
      { label: "Format", value: "Hackathon" },
      { label: "Persona", value: "Student" },
    ],
  },
  {
    slug: "crypto-research",
    index: "006",
    title: "Crypto Research",
    tagline: "A data storytelling site marrying narrative with Tableau dashboards.",
    role: "Designer & Analyst",
    year: "2024",
    tags: ["Tableau", "Wix", "Data Viz", "Performance"],
    cover: { hue: "lime", from: "#84cc16", to: "#1a2e05" },
    problem:
      "Crypto data is enormous and confusing, and most attempts to explain it are either too academic or pure hype. The brief was a public-facing research site that let unfamiliar readers actually learn quickly, with readable and calm visuals.",
    process: [
      "Curated dashboards emphasising interpretability and interaction rather than visual noise drowning the insight.",
      "Trimmed redundant and unused imported columns so the site carried less needless data and felt faster during interaction.",
      "Designed dynamic visualisations as a scaffolding device so readers could explore without needing the domain vocabulary upfront.",
      "Balanced narrative copy with embedded charts so the page rewarded both skimmers and depth readers.",
    ],
    outcome: [
      { label: "Stack", value: "Wix + Tableau" },
      { label: "Focus", value: "Performance" },
      { label: "Audience", value: "Non-expert" },
      { label: "Role", value: "Design + Data" },
    ],
  },
  {
    slug: "edp-consulting",
    index: "007",
    title: "EdP Consulting",
    tagline: "Engineering consultancy portfolio with credibility for a skeptical reader.",
    role: "Web Designer",
    year: "2023",
    tags: ["Wix", "Client Work", "Brand"],
    cover: { hue: "slate", from: "#475569", to: "#0f172a" },
    problem:
      "An engineering consultancy needed a web presence that communicated competence to procurement-adjacent decision makers without drowning them in jargon. First real client work: a Wix build that had to look credible, not arty.",
    process: [
      "Tuned the information architecture to skeptical external readers, emphasising the legitimacy signifiers that matter in contracting decisions.",
      "Built a visual language that conveyed technical authenticity without jargon walls, putting readability before flourish.",
      "Iterated with the client on alignment, learning fast that 'design feedback' is usually a stakeholder asking for clearer hierarchy.",
      "Picked a publishing stack (Wix) suited to the client's timeline and ability to update content themselves after handoff.",
    ],
    outcome: [
      { label: "LinkedIn clicks", value: "+50" },
      { label: "Client", value: "1st freelance" },
      { label: "Stack", value: "Wix" },
      { label: "Audience", value: "Procurement" },
    ],
  },
  {
    slug: "this-portfolio",
    index: "008",
    title: "This Portfolio",
    tagline: "The site you're on, written and shipped by the person it's about.",
    role: "Design & Engineering",
    year: "2026",
    tags: ["Next.js", "Motion", "Three.js", "Tailwind"],
    cover: { hue: "royal-blue", from: "#3b82f6", to: "#1e1b4b" },
    problem:
      "Most portfolios fall into one of two failure modes: a template with someone else's voice, or a custom build that takes six months and never ships. The goal here was a site that felt unmistakably mine, used motion as communication not decoration, and was actually live within a week.",
    process: [
      "Started from a motion-led Next.js template I liked aesthetically, then rewrote every section, stat, and case study against my real story.",
      "Kept the dark + violet palette because it already matched my stated taste, with royal blue and indigo quietly accent-coded in case studies too.",
      "Wired a custom cursor, Lenis smooth scroll, R3F shader hero, and Framer-Motion-powered reveals, with motion only where it carries information.",
      "Built each case study as a real route at /work/[slug], statically generated, no client-side waterfall, fast on first paint.",
      "Deployed on Vercel free tier: push to main, site updates, no CI dance.",
    ],
    outcome: [
      { label: "Framework", value: "Next 16" },
      { label: "Tailwind", value: "v4" },
      { label: "Motion", value: "Motion + R3F" },
      { label: "Host", value: "Vercel" },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
