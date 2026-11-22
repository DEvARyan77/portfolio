import Image from "next/image";
import CopyEmail from "@/components/CopyEmail";
import Polaroid from "@/components/Polaroid";
import { EMAIL, GITHUB, LINKEDIN, experience, projects, skills } from "@/data";

const btnLight = "inline-block rounded-full bg-[#f4efe2] px-6 py-3.5 font-semibold text-[#1f2a17] transition hover:bg-white";
const btnGlass = "glass inline-block rounded-full px-6 py-3.5 font-semibold text-white transition hover:bg-white/25";

function Scene({
  id,
  bg = "none",
  shade = "rgba(0,0,0,.45)",
  children,
  className = "",
}: {
  id?: string;
  bg?: string;
  shade?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scene scroll-mt-0 ${className}`}>
      <div aria-hidden className="scene-bg" style={{ transform: bg }} />
      <div aria-hidden className="scene-shade" style={{ background: shade }} />
      {children}
    </section>
  );
}

function SectionTitle({ kick, title }: { kick: string; title: string }) {
  return (
    <div>
      <p className="kick text-3xl">{kick}</p>
      <h2 className="heading text-6xl sm:text-8xl">{title}</h2>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* top bar */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-3 px-4 py-4 sm:px-8">
        <a href="#top" className="font-serif text-2xl font-semibold italic text-white [text-shadow:0_2px_10px_rgba(0,0,0,.5)]">
          dev.aryan
        </a>
        <nav aria-label="Sections" className="glass hidden items-center gap-1 rounded-full p-1.5 text-sm md:flex">
          {[["Work", "#work"], ["About", "#about"], ["Experience", "#experience"], ["Contact", "#contact"]].map(([l, h]) => (
            <a key={h} href={h} className="rounded-full px-4 py-2 transition hover:bg-white/20">
              {l}
            </a>
          ))}
        </nav>
        <a href="/minimal/" className="glass rounded-full px-4 py-2 text-sm font-semibold">
          Minimal version
        </a>
      </header>

      <main>
        {/* 1. Hero: the photo on the moss */}
        <Scene id="top" shade="radial-gradient(ellipse at 38% 50%,rgba(0,0,0,.05),rgba(0,0,0,.5) 85%)">
          <div className="mx-auto grid min-h-svh max-w-7xl items-center gap-12 px-6 pb-24 pt-28 lg:grid-cols-[1.15fr_1fr] lg:px-12">
            <div className="[text-shadow:0_4px_30px_rgba(0,0,0,.55)]">
              <p className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm [text-shadow:none]">
                <span className="dot" aria-hidden />
                Open to software engineering roles
              </p>
              <h1 className="mt-6 font-serif text-[clamp(4.5rem,13vw,10rem)] font-semibold leading-[0.9] tracking-[-0.03em]">
                Dev
                <br />
                <span className="font-normal italic">Aryan</span>
              </h1>
              <p className="mt-10 max-w-xl text-xl leading-relaxed text-white/90 sm:text-2xl">
                Software developer growing AI-native, full-stack systems for healthcare: claims, clinics and care.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 [text-shadow:none]">
                <a href="#work" className={btnLight}>
                  Explore my work
                </a>
                <CopyEmail email={EMAIL} className={btnGlass} />
              </div>
            </div>
            <Polaroid />
          </div>
          <a
            href="#about"
            className="glass absolute bottom-6 left-1/2 hidden -translate-x-1/2 rounded-full px-5 py-2 text-sm lg:block"
          >
            Scroll to walk through the forest ↓
          </a>
        </Scene>

        {/* 2. About: field notes on the back of the photo */}
        <Scene id="about" bg="scaleX(-1)" shade="radial-gradient(ellipse at 50% 50%,rgba(0,0,0,.35),rgba(0,0,0,.6))">
          <div className="mx-auto flex min-h-svh max-w-5xl items-center px-5 py-24">
            <article className="paper lift grid w-full gap-8 p-7 sm:p-12 md:-rotate-2 md:grid-cols-[1fr_210px]">
              <div>
                <p className="text-xs tracking-[0.3em] text-[#8a7d5a]">FIELD NOTES · BACK OF THE PHOTO</p>
                <h2 className="mt-1 font-[family-name:var(--font-hand)] text-6xl font-bold text-moss">
                  Hey, I&apos;m Dev <span className="wave">👋</span>
                </h2>
                <p className="mt-3 text-lg leading-relaxed">
                  I build software where mistakes cost money or health. A claims platform that stays correct when 40
                  requests hit it at once, an OPD that keeps the queue moving, an ambulance that shows up on the right
                  map. I design the services and the data, write the APIs, and build the screens.
                </p>
                <dl className="mt-5">
                  {[
                    ["🎓", "Delhi Technological University", "B.Tech, 2022 – 2026 · CGPA 8.16"],
                    ["📍", "Gurugram, India", "Open to on-site, hybrid and remote"],
                    ["☁️", "Currently learning", "AWS and cloud deployment"],
                    ["🧩", "By the numbers", "7 microservices in ClaimFlow · 6 user roles in MediSync"],
                  ].map(([e, t, d]) => (
                    <div key={t} className="flex items-center gap-4 border-t border-dashed border-[#cbbf9f] py-3">
                      <span aria-hidden className="text-2xl">{e}</span>
                      <div>
                        <dt className="font-bold">{t}</dt>
                        <dd className="text-sm text-[#6d644c]">{d}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="flex flex-col items-center gap-5 border-[#cbbf9f] md:border-l md:border-dashed md:pl-7">
                <Image
                  src="/img/avatar.webp"
                  alt=""
                  width={170}
                  height={170}
                  className="h-[170px] w-[170px] rounded-full border-[6px] border-white object-cover object-[50%_15%] shadow-lg"
                />
                <p className="text-center font-[family-name:var(--font-hand)] text-3xl leading-tight text-[#5b4a2a]">
                  specimen:
                  <br />
                  <i>developerus curiosus</i>
                </p>
                <p
                  aria-label="Open to SDE roles, 2026"
                  className="mt-auto grid h-36 w-36 -rotate-[14deg] place-items-center rounded-full border-[3px] border-double border-[#9b4a2a] text-center font-serif text-sm font-bold tracking-wider text-[#9b4a2a] opacity-80"
                >
                  OPEN TO
                  <br />
                  SDE ROLES
                  <br />★ 2026 ★
                </p>
              </div>
            </article>
          </div>
        </Scene>

        {/* 3. Work: field-guide specimen cards */}
        <Scene
          id="work"
          bg="scale(1.25) rotate(4deg)"
          shade="linear-gradient(180deg,rgba(0,0,0,.55),rgba(0,0,0,.35) 40%,rgba(0,0,0,.5))"
        >
          <div className="mx-auto max-w-7xl px-5 py-28 lg:px-12">
            <SectionTitle kick="found while walking the forest" title="Selected work" />
            <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((p, i) => (
                <article
                  key={p.name}
                  className="specimen paper lift relative p-4 pb-6"
                  style={{ transform: `rotate(${[-2.5, 1.5, -1][i]}deg)` }}
                >
                  <div className="relative h-72 overflow-hidden border border-[#d8ccab]">
                    <Image src={p.plate} alt={`Engraved illustration for ${p.name}`} fill sizes="380px" className="object-cover object-[50%_35%]" />
                  </div>
                  <Image
                    src={p.shot}
                    alt={`Screenshot of the live ${p.name} app`}
                    width={640}
                    height={420}
                    className="absolute -right-4 top-52 w-36 rotate-[7deg] border-[5px] border-white shadow-[0_8px_14px_rgba(0,0,0,.35)]"
                  />
                  <p className="mt-4 text-[11px] tracking-[0.3em] text-[#8a7d5a]">SPECIMEN NO. {p.no}</p>
                  <h3 className="font-serif text-4xl font-bold leading-tight">{p.name}</h3>
                  <p className="font-serif italic text-[#6d644c]">{p.latin}</p>
                  <p className="mt-3 text-[15px] leading-relaxed">{p.summary}</p>
                  <ul className="mt-3 space-y-1.5 text-sm">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span aria-hidden className="text-moss">❧</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
                    {p.stack.map((s) => (
                      <li key={s} className="rounded-full border border-[#b9ac88] px-2.5 py-0.5 text-xs">
                        {s}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex gap-5 font-bold text-moss">
                    <a href={p.live} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                      Live demo ↗
                    </a>
                    {p.code && (
                      <a href={p.code} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                        GitHub ↗
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-14 text-center">
              <a href={GITHUB} target="_blank" rel="noreferrer" className={btnGlass}>
                More projects on GitHub
              </a>
            </p>
          </div>
        </Scene>

        {/* 4. Experience: burned into wooden boards */}
        <Scene id="experience" bg="scaleY(-1)" shade="linear-gradient(180deg,rgba(0,0,0,.55),rgba(0,0,0,.35))">
          <div className="mx-auto max-w-7xl px-5 py-28 lg:px-12">
            <SectionTitle kick="trail markers so far" title="Experience" />
            <ol className="mt-12 grid gap-14 lg:grid-cols-2">
              {experience.map((e, i) => (
                <li key={e.company} style={{ transform: `rotate(${i ? 2 : -2}deg)` }}>
                  <div className="flex aspect-[1340/715] flex-col items-center justify-center bg-[url(/img/board.webp)] bg-[length:100%_100%] text-center drop-shadow-[0_22px_18px_rgba(0,0,0,.6)]">
                    <h3 className="burn font-serif text-5xl font-extrabold tracking-tight sm:text-6xl">{e.company}</h3>
                    <p className="burn font-serif text-xl font-semibold italic sm:text-2xl">{e.role}</p>
                    <p className="burn mt-2 text-sm font-bold tracking-[0.15em]">
                      {e.when.toUpperCase()} · {e.where.toUpperCase()}
                    </p>
                  </div>
                  <div className="glass mx-4 mt-5 rounded-2xl bg-[rgba(15,25,10,.45)] px-5 py-4 leading-relaxed">
                    {e.what}
                    <a
                      href={e.site.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 block font-bold text-lime underline-offset-4 hover:underline"
                    >
                      {e.site.label} ↗
                    </a>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Scene>

        {/* 5. Toolbox: nursery tags hanging from a twig */}
        <Scene bg="rotate(180deg)" shade="rgba(0,0,0,.45)">
          <div className="mx-auto max-w-7xl px-5 py-28 lg:px-12">
            <SectionTitle kick="labels from my garden" title="Toolbox" />
            <div className="relative mt-10">
              <Image
                src="/img/twig.webp"
                alt=""
                width={1484}
                height={167}
                className="absolute left-0 top-0 hidden w-full drop-shadow-[0_10px_8px_rgba(0,0,0,.6)] lg:block"
              />
              <ul className="flex flex-wrap justify-center gap-x-4 gap-y-8 pt-6 lg:flex-nowrap lg:justify-between lg:gap-6 lg:pt-12">
                {skills.map((s, i) => (
                  <li
                    key={s.group}
                    className="tag relative w-[160px] sm:w-[200px] drop-shadow-[0_18px_14px_rgba(0,0,0,.6)]"
                    style={{ transform: `rotate(${[-4, 3, -2, 4, -3][i]}deg)` }}
                  >
                    <span aria-hidden className="absolute -top-12 left-1/2 hidden h-14 w-0.5 bg-[#d9c7a0] lg:block" />
                    <div className="flex aspect-[420/1226] flex-col items-center bg-[url(/img/tag.webp)] bg-[length:100%_100%] px-3 pt-[4.6rem] text-center sm:px-4 sm:pt-24">
                      <p className="text-[11px] tracking-[0.3em] text-[#8a6b3e]">VARIETY</p>
                      <h3 className="mb-3 w-full border-b border-[#50321433] pb-2 font-serif text-xl font-extrabold text-[#2e1f0c] sm:text-2xl">
                        {s.group}
                      </h3>
                      {s.items.map((it) => (
                        <p key={it} className="font-[family-name:var(--font-hand)] text-[21px] leading-tight text-[#3b2a14] sm:text-[27px]">
                          {it}
                        </p>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Scene>

        {/* 6. Contact: the big sign */}
        <Scene id="contact" shade="radial-gradient(ellipse at 50% 45%,rgba(0,0,0,.2),rgba(0,0,0,.6))">
          <div className="mx-auto flex min-h-svh max-w-5xl flex-col items-center justify-center px-5 py-24">
            <div className="flex aspect-[1340/715] w-full -rotate-[1.5deg] flex-col items-center justify-center bg-[url(/img/board.webp)] bg-[length:100%_100%] px-6 text-center drop-shadow-[0_30px_24px_rgba(0,0,0,.65)]">
              <h2 className="burn font-serif text-[clamp(1.9rem,6.4vw,4.75rem)] font-extrabold leading-none tracking-tight">
                Let&apos;s build something
                <br />
                <i className="font-semibold">that matters.</i>
              </h2>
              <a
                href={`mailto:${EMAIL}`}
                className="burn mt-4 font-serif text-[clamp(1rem,2.6vw,1.9rem)] font-extrabold hover:underline sm:mt-6"
              >
                {EMAIL}
              </a>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <a href={`mailto:${EMAIL}`} className={btnLight}>
                Email me
              </a>
              <CopyEmail email={EMAIL} className={btnGlass} />
              <a href={GITHUB} target="_blank" rel="noreferrer" className={btnGlass}>
                GitHub
              </a>
              <a href={LINKEDIN} target="_blank" rel="noreferrer" className={btnGlass}>
                LinkedIn
              </a>
            </div>
            <p className="mt-8 text-sm text-white/75">© 2026 Dev Aryan · grown with Next.js</p>
          </div>
        </Scene>
      </main>
    </>
  );
}
