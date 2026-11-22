export const EMAIL = "devaryan7766@gmail.com";
export const GITHUB = "https://github.com/DEvARyan77";
export const LINKEDIN = "https://www.linkedin.com/in/dev-aryan-836885189";

export const projects = [
  {
    no: "01",
    name: "ClaimFlow",
    latin: "Claimus rapidus",
    plate: "/img/plate-claimflow.webp",
    shot: "/img/shot-claimflow.webp",
    summary:
      "Health-insurance claims decided in seconds. Policyholders and hospitals file claims; ClaimFlow checks policy, network and cover, scores fraud risk with explainable rules, and sends risky claims to an officer with an AI summary.",
    highlights: [
      "7 Spring Boot microservices behind an API gateway with JWT role checks",
      "Atomic coverage reservation, idempotent payments, RabbitMQ events",
      "RAG policy assistant that cites the page it answers from",
    ],
    stack: ["Java 21", "Spring Boot", "Spring Cloud", "MongoDB", "RabbitMQ", "React", "Docker"],
    live: "https://claimflow-demo-gefy.onrender.com/welcome",
    code: `${GITHUB}/claimflow`,
  },
  {
    no: "02",
    name: "MediSync",
    latin: "Medisync vitalis",
    plate: "/img/plate-medisync.webp",
    shot: "/img/shot-medisync.webp",
    summary:
      "A hospital OPD, pharmacy and ambulance in one app. Patients book slots and get a token, doctors write e-prescriptions, the pharmacy dispenses, and patients can call an ambulance and watch it on a map.",
    highlights: [
      "Portals for 6 roles: patient, receptionist, doctor, pharmacist, driver, admin",
      "Nearby ambulances with live GPS, found by MongoDB geo queries",
      "Email notifications through Brevo; deployed on Render, Vercel and Atlas",
    ],
    stack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Tailwind", "Leaflet"],
    live: "https://medisync-xwzq.onrender.com/",
    code: `${GITHUB}/medisync` as string | undefined,
  },
];

export const experience = [
  {
    company: "Emvoke",
    role: "Full-stack web developer",
    when: "May 2025 – Jul 2025",
    where: "Remote",
    what: "Designed and built the FitPlush clinic web app and connected its UI to server logic, databases and APIs.",
    site: { href: "https://www.clinicapp.fitplush.com/", label: "clinicapp.fitplush.com" },
  },
  {
    company: "PocketClass",
    role: "Full-stack web developer",
    when: "Jan 2025 – Apr 2025",
    where: "Remote",
    what: "Built the PocketClass website from scratch with Next.js and Tailwind CSS, connected it to Firebase, and set up SEO sitemaps and Vercel deployment.",
    site: { href: "https://pocketclass.ca", label: "pocketclass.ca" },
  },
];

export const skills = [
  { group: "Languages", items: ["Java", "TypeScript", "JavaScript", "Python", "C++", "SQL"] },
  { group: "Backend", items: ["Spring Boot", "Spring Cloud", "Node.js", "Express", "REST APIs", "JWT"] },
  { group: "Frontend", items: ["React", "Next.js", "Vite", "Tailwind", "HTML", "CSS"] },
  { group: "Data + AI", items: ["MongoDB", "Vector Search", "PostgreSQL", "RabbitMQ", "RAG", "Gemini"] },
  { group: "DevOps", items: ["Docker", "GitHub Actions", "nginx", "Render", "Vercel", "Git"] },
];
