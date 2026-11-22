import Image from "next/image";

const EMAIL = "devaryan7766@gmail.com";
const GITHUB = "https://github.com/DEvARyan77";
const LINKEDIN = "https://www.linkedin.com/in/dev-aryan-b11b58433";

type Project = {
  name: string;
  tagline: string;
  summary: string;
  highlights: string[];
  stack: string[];
  links: { label: string; href: string }[];
  bg: string;
  chip: string;
  visual: React.ReactNode;
};

const projects: Project[] = [
  {
    name: "ClaimFlow",
    tagline: "Health-insurance claims, decided in seconds",
    summary:
      "Policyholders and hospitals file claims. ClaimFlow checks the policy, the hospital network and the cover left, scores fraud risk with rules that explain themselves, and sends risky claims to an officer with an AI summary. A policy assistant answers questions about an uploaded policy PDF and cites the page.",
    highlights: [
      "Four sign-in roles, with JWT and role checks at the API gateway",
      "Atomic MongoDB updates, so 40 claims fired at once never overspend a policy",
      "RabbitMQ events for payouts and emails, and a claim is never paid twice",
      "Circuit breakers park a claim when a service is down and retry it later",
      "RAG over policy PDFs with Atlas Vector Search and Gemini",
    ],
    stack: [
      "Java 21",
      "Spring Boot",
      "Spring Cloud",
      "MongoDB",
      "RabbitMQ",
      "React",
      "Docker",
    ],
    links: [{ label: "Code on GitHub", href: `${GITHUB}/claimflow` }],
    bg: "bg-pink",
    chip: "bg-ink text-pink",
    visual: <ClaimFlowShots />,
  },
  {
    name: "MediSync",
    tagline: "A hospital OPD, pharmacy and ambulance in one app",
    summary:
      "Patients book OPD slots and get a token. Reception runs the queue, doctors record vitals and write e-prescriptions, the pharmacy dispenses, and patients can call an ambulance and watch it move on a map.",
    highlights: [
      "Six roles: patient, receptionist, doctor, pharmacist, driver, admin",
      "Nearby ambulances found with MongoDB geo queries",
      "Live driver location on Leaflet and OpenStreetMap",
      "Clinic time zone rules, so past slots can never be booked",
    ],
    stack: [
      "TypeScript",
      "React",
      "Vite",
      "Tailwind",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    links: [{ label: "Code on GitHub", href: `${GITHUB}/medisync` }],
    bg: "bg-mint",
    chip: "bg-ink text-mint",
    visual: <TokenBoard />,
  },
  {
    name: "DocOnGo",
    tagline: "An AI doctor you can talk to",
    summary:
      "Describe what you feel in a chat and DocOnGo walks through an examination, then suggests what it could be and what to do next. Chat requests run on serverless functions for quick replies.",
    highlights: [
      "Real-time AI chat on Next.js API routes",
      "Accounts secured with JWT and bcrypt",
      "Deployed on Vercel's serverless platform",
    ],
    stack: ["React", "Next.js", "Node.js", "MongoDB", "JWT"],
    links: [{ label: "Try it live", href: "https://docongoai.vercel.app/" }],
    bg: "bg-yellow",
    chip: "bg-ink text-yellow",
    visual: <ChatMock />,
  },
];

const experience = [
  {
    company: "Emvoke",
    role: "Full-stack web developer",
    when: "Jun 2025 – Jul 2025",
    what: "Built the FitPlush clinic app website and connected its UI to the APIs and database behind it.",
    href: "https://www.clinicapp.fitplush.com/",
    site: "clinicapp.fitplush.com",
  },
  {
    company: "PocketClass",
    role: "Full-stack web developer",
    when: "Mar 2025 – Jun 2025",
    what: "Built the official PocketClass website from scratch, across the responsive frontend, the server logic and the database.",
    href: "https://pocketclass.ca",
    site: "pocketclass.ca",
  },
];

const skills = [
  { group: "Languages", items: ["Java", "TypeScript", "JavaScript", "Python", "C"] },
  {
    group: "Backend",
    items: ["Spring Boot", "Spring Cloud", "Node.js", "Express", "RabbitMQ", "REST APIs"],
  },
  { group: "Frontend", items: ["React", "Next.js", "Vite", "Tailwind CSS", "HTML", "CSS"] },
  { group: "Data", items: ["MongoDB", "MySQL", "Atlas Vector Search"] },
  { group: "AI", items: ["RAG", "Gemini API", "Embeddings"] },
  { group: "Tools", items: ["Git", "Docker", "Vercel", "Render"] },
];

export default function Home() {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-yellow focus:px-4 focus:py-2"
      >
        Skip to work
      </a>

      {/* Hero */}
      <header className="relative overflow-hidden bg-blue text-paper">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <a href="#" className="font-display text-lg font-bold text-yellow">
            dev.aryan
          </a>
          <ul className="flex gap-6 text-sm font-medium sm:gap-8">
            <li><a className="hover:text-yellow" href="#work">Work</a></li>
            <li><a className="hover:text-yellow" href="#experience">Experience</a></li>
            <li><a className="hover:text-yellow" href="#contact">Contact</a></li>
          </ul>
        </nav>

        <div className="mx-auto max-w-6xl px-6 pb-20 pt-10 sm:pb-28 sm:pt-16">
          <h1 className="font-display font-bold leading-[0.85] tracking-[-0.04em] text-yellow text-[clamp(4.5rem,17vw,13rem)]">
            <span className="block overflow-hidden">
              <span className="rise">Dev</span>
            </span>
            <span className="block overflow-hidden">
              <span className="rise [animation-delay:120ms]">Aryan</span>
            </span>
          </h1>

          <div className="mt-10 grid gap-8 sm:mt-14 md:grid-cols-[1fr_auto] md:items-end">
            <p className="max-w-xl text-xl leading-relaxed sm:text-2xl">
              Full-stack developer. I build health-tech software: insurance
              claims, hospital OPDs, prescriptions and ambulances, from Spring
              Boot microservices to React screens.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#work"
                className="rounded-full bg-yellow px-6 py-3 font-display font-bold text-ink transition hover:bg-paper"
              >
                See my work
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="rounded-full border-2 border-paper px-6 py-3 font-display font-bold transition hover:bg-paper hover:text-blue"
              >
                Email me
              </a>
            </div>
          </div>
        </div>

        {/* colour bar: one stripe per project */}
        <div className="flex h-4" aria-hidden>
          <div className="flex-1 bg-pink" />
          <div className="flex-1 bg-mint" />
          <div className="flex-1 bg-yellow" />
        </div>
      </header>

      <main>
        {/* About */}
        <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[1fr_1.4fr] md:py-28">
          <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
            Software where mistakes cost money or health.
          </h2>
          <div className="space-y-5 text-lg leading-relaxed text-ink/80">
            <p>
              I&apos;m Dev, a 2026 B.Tech graduate of Delhi Technological
              University. Most of what I build lives in healthcare: a claims
              platform that has to stay correct when forty requests hit it at
              once, an OPD that has to keep a queue moving, an ambulance that
              has to show up on the right map.
            </p>
            <p>
              I work end to end. I design the services and the data, write the
              APIs, and build the screens people actually click.
            </p>
          </div>
        </section>

        {/* Projects */}
        <section id="work" aria-labelledby="work-title" className="scroll-mt-4">
          <h2 id="work-title" className="sr-only">
            Projects
          </h2>
          {projects.map((p) => (
            <article key={p.name} className={`${p.bg} text-ink`}>
              <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-24">
                <div>
                  <h3 className="font-display text-6xl font-bold tracking-[-0.03em] sm:text-7xl">
                    {p.name}
                  </h3>
                  <p className="mt-3 font-display text-2xl font-medium">
                    {p.tagline}
                  </p>
                  <p className="mt-6 max-w-[60ch] text-lg leading-relaxed">
                    {p.summary}
                  </p>
                  <ul className="mt-6 space-y-2">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex gap-3 leading-relaxed">
                        <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-ink" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-8 flex flex-wrap gap-2" aria-label="Tech stack">
                    {p.stack.map((s) => (
                      <li
                        key={s}
                        className={`rounded-md px-3 py-1 text-sm font-semibold ${p.chip}`}
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {p.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-ink px-6 py-3 font-display font-bold text-paper transition hover:bg-blue"
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                </div>
                <div>{p.visual}</div>
              </div>
            </article>
          ))}
          <div className="bg-ink py-10 text-center text-paper">
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              className="font-display text-xl font-bold underline decoration-yellow decoration-4 underline-offset-8 hover:text-yellow"
            >
              More projects on GitHub
            </a>
          </div>
        </section>

        {/* Experience + education */}
        <section
          id="experience"
          className="mx-auto max-w-6xl scroll-mt-4 px-6 py-20 md:py-28"
        >
          <h2 className="font-display text-4xl font-bold sm:text-5xl">
            Experience
          </h2>
          <ol className="mt-12 border-l-4 border-blue">
            {experience.map((e) => (
              <li key={e.company} className="relative pb-12 pl-8 last:pb-0">
                <span
                  aria-hidden
                  className="absolute -left-[14px] top-1.5 h-6 w-6 rounded-full border-4 border-paper bg-blue"
                />
                <p className="text-sm font-semibold text-blue">{e.when}</p>
                <h3 className="mt-1 font-display text-3xl font-bold">
                  {e.company}
                </h3>
                <p className="font-medium text-ink/70">{e.role}</p>
                <p className="mt-3 max-w-[65ch] text-lg leading-relaxed">
                  {e.what}{" "}
                  <a
                    href={e.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-blue underline underline-offset-4"
                  >
                    {e.site}
                  </a>
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-20 grid gap-6 rounded-3xl bg-blue p-8 text-paper sm:p-10 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold">Education</h2>
              <p className="mt-3 text-lg">
                B.Tech, Delhi Technological University (formerly DCE), New Delhi
              </p>
            </div>
            <div className="flex gap-8 font-display">
              <p>
                <span className="block text-4xl font-bold text-yellow">2026</span>
                <span className="text-sm">graduated</span>
              </p>
              <p>
                <span className="block text-4xl font-bold text-yellow">8.16</span>
                <span className="text-sm">CGPA out of 10</span>
              </p>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="bg-ink py-20 text-paper md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="font-display text-4xl font-bold sm:text-5xl">
              What I work with
            </h2>
            <dl className="mt-12 divide-y divide-paper/15">
              {skills.map((s) => (
                <div
                  key={s.group}
                  className="grid gap-3 py-5 sm:grid-cols-[10rem_1fr] sm:items-baseline"
                >
                  <dt className="font-display text-lg font-bold text-mint">
                    {s.group}
                  </dt>
                  <dd className="text-xl leading-relaxed">
                    {s.items.join(", ")}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      {/* Contact */}
      <footer id="contact" className="scroll-mt-4 bg-pink text-ink">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-[-0.03em] sm:text-7xl">
            Hiring, or building something?
          </h2>
          <p className="mt-6 max-w-xl text-xl">
            I&apos;m open to software engineering roles. Email is the fastest
            way to reach me.
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-10 inline-block break-all font-display text-2xl font-bold underline decoration-4 underline-offset-8 hover:text-blue sm:text-4xl"
          >
            {EMAIL}
          </a>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-ink px-6 py-3 font-display font-bold text-paper hover:bg-blue"
            >
              GitHub
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-ink px-6 py-3 font-display font-bold text-paper hover:bg-blue"
            >
              LinkedIn
            </a>
          </div>
          <p className="mt-20 text-sm text-ink/70">
            © 2026 Dev Aryan. Built with Next.js.
          </p>
        </div>
      </footer>
    </>
  );
}

function ClaimFlowShots() {
  return (
    <div className="relative pb-16 sm:pb-24">
      <Image
        src="/projects/my-claims.png"
        alt="ClaimFlow: a policyholder's list of claims with their status"
        width={1280}
        height={905}
        className="w-full rounded-2xl border-4 border-ink shadow-[10px_10px_0_0_var(--color-ink)]"
        priority
      />
      <Image
        src="/projects/officer-review.png"
        alt="ClaimFlow: a claims officer reviewing fraud flags and an AI summary"
        width={1366}
        height={1071}
        className="absolute -bottom-2 right-0 w-1/2 rounded-xl border-4 border-ink shadow-[8px_8px_0_0_var(--color-ink)] sm:-right-4"
      />
    </div>
  );
}

function TokenBoard() {
  const queue = [
    { t: "A-5", who: "Checked in", doc: "Dr. Mehra" },
    { t: "A-6", who: "Checked in", doc: "Dr. Mehra" },
    { t: "B-2", who: "Waiting", doc: "Dr. Khan" },
    { t: "A-7", who: "Booked 11:30", doc: "Dr. Mehra" },
  ];
  return (
    <figure
      className="rounded-3xl border-4 border-ink bg-ink p-6 text-paper shadow-[10px_10px_0_0_rgba(21,18,46,0.35)] sm:p-8"
      aria-label="Illustration of the MediSync OPD token queue"
    >
      <p className="text-sm font-semibold text-mint">OPD queue today</p>
      <div className="mt-4 flex items-end justify-between gap-4 rounded-2xl bg-mint p-6 text-ink">
        <div>
          <p className="text-sm font-semibold">Now serving</p>
          <p className="font-display text-7xl font-bold leading-none">A-4</p>
        </div>
        <p className="text-right text-sm font-semibold">
          Room 3
          <br />
          Dr. Mehra
        </p>
      </div>
      <ul className="mt-4 divide-y divide-paper/15">
        {queue.map((q) => (
          <li key={q.t} className="flex items-center justify-between py-3">
            <span className="font-display text-2xl font-bold">{q.t}</span>
            <span className="text-sm text-paper/70">{q.doc}</span>
            <span className="rounded-full bg-paper/10 px-3 py-1 text-xs font-semibold">
              {q.who}
            </span>
          </li>
        ))}
      </ul>
      <figcaption className="mt-4 flex items-center gap-2 text-sm text-paper/70">
        <span className="h-2 w-2 rounded-full bg-pink" aria-hidden />
        Ambulance AMB-2 is 1.8 km away
      </figcaption>
    </figure>
  );
}

function ChatMock() {
  return (
    <figure
      className="space-y-4 rounded-3xl border-4 border-ink bg-paper p-6 shadow-[10px_10px_0_0_var(--color-ink)] sm:p-8"
      aria-label="Illustration of a DocOnGo chat"
    >
      <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-blue px-4 py-3 text-paper">
        I&apos;ve had a headache and a mild fever since yesterday.
      </p>
      <p className="max-w-[85%] rounded-2xl rounded-bl-sm bg-ink px-4 py-3 text-paper">
        I&apos;ll ask a few questions first. Is the headache on one side or
        all over? Any stiff neck or sensitivity to light?
      </p>
      <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-blue px-4 py-3 text-paper">
        All over. No stiff neck.
      </p>
      <p className="max-w-[85%] rounded-2xl rounded-bl-sm bg-ink px-4 py-3 text-paper">
        That sounds most like a common viral fever. Rest, drink fluids, and
        see a doctor if the fever passes 3 days.
      </p>
    </figure>
  );
}
