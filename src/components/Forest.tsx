"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import CopyEmail from "@/components/CopyEmail";
import { EMAIL, GITHUB, LINKEDIN, experience, projects, skills } from "@/data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const btnLight =
  "inline-block rounded-full bg-[#f4efe2] px-6 py-3.5 font-semibold text-[#1f2a17] transition-colors hover:bg-white";
const btnGlass = "glass inline-block rounded-full px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/25";

const TAG_TILT = [-4, 3, -2, 4, -3];

/** offset of el inside ancestor, ignoring transforms */
function offsetIn(el: HTMLElement, ancestor: HTMLElement) {
  let x = 0;
  let y = 0;
  let n: HTMLElement | null = el;
  while (n && n !== ancestor) {
    x += n.offsetLeft;
    y += n.offsetTop;
    n = n.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

function SectionTitle({ kick, title }: { kick: string; title: string }) {
  return (
    <div className="sec-title">
      <span className="mask">
        <span className="title-line kick block text-3xl">{kick}</span>
      </span>
      <span className="mask">
        <span className="title-line heading block text-6xl sm:text-8xl">{title}</span>
      </span>
    </div>
  );
}

export default function Forest() {
  const root = useRef<HTMLDivElement>(null);

  // smooth scrolling, kept in sync with ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({ anchors: true, lerp: 0.09 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const el = <T extends HTMLElement = HTMLElement>(s: string) => q(s)[0] as T;

      /* ---------- whole page: forest turns and zooms as you scroll, progress bar fills ---------- */
      gsap.to(".forest-img", {
        rotation: 24,
        scale: 1.2,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 1.5 },
      });
      gsap.to(".progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.3 },
      });

      /* ---------- falling leaves, forever ---------- */
      q(".leaf").forEach((leaf, i) => {
        const fall = () => {
          const w = window.innerWidth;
          gsap.set(leaf, {
            x: gsap.utils.random(-40, w),
            y: -80,
            rotation: gsap.utils.random(0, 360),
            scale: gsap.utils.random(0.45, 1),
          });
          gsap.to(leaf, {
            y: window.innerHeight + 140,
            x: `+=${gsap.utils.random(-260, 260)}`,
            rotation: `+=${gsap.utils.random(200, 600)}`,
            duration: gsap.utils.random(9, 17),
            ease: "none",
            onComplete: fall,
          });
        };
        gsap.delayedCall(i * 1.7, fall);
      });

      /* ---------- hero entrance ---------- */
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .from(".hero-chip", { y: 24, opacity: 0, duration: 0.7 })
        .from(".hero-line", { yPercent: 115, duration: 1.2, stagger: 0.14 }, "-=0.4")
        .from(".hero-sub", { y: 30, opacity: 0, duration: 0.9 }, "-=0.7")
        .from(".hero-cta > *", { y: 24, opacity: 0, stagger: 0.1, duration: 0.7 }, "-=0.6")
        .from(".polaroid-drop", { y: -900, rotation: -40, duration: 1.6, ease: "back.out(1.1)" }, 0.25)
        .from(".twig-pin", { x: -60, opacity: 0, rotation: -40, duration: 0.6 }, "-=0.35")
        .from(".scroll-hint", { y: 20, opacity: 0, duration: 0.6 }, "-=0.2");

      // polaroid sways on its twig
      gsap.to(".polaroid-sway", { rotation: 4, duration: 3, yoyo: true, repeat: -1, ease: "sine.inOut" });

      // polaroid and forest follow the mouse a little
      const sway = el(".polaroid-tilt");
      const tiltX = gsap.quickTo(sway, "rotationY", { duration: 0.6, ease: "power3" });
      const tiltY = gsap.quickTo(sway, "rotationX", { duration: 0.6, ease: "power3" });
      const bgX = gsap.quickTo(".forest-img", "x", { duration: 1.2, ease: "power3" });
      const bgY = gsap.quickTo(".forest-img", "y", { duration: 1.2, ease: "power3" });
      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        tiltX(nx * 18);
        tiltY(-ny * 14);
        bgX(-nx * 30);
        bgY(-ny * 30);
      };
      window.addEventListener("pointermove", onMove);

      /* ---------- section titles rise in ---------- */
      q(".sec-title").forEach((t) => {
        gsap.from(t.querySelectorAll(".title-line"), {
          yPercent: 115,
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: { trigger: t, start: "top 85%", toggleActions: "play none none reverse" },
        });
      });

      const mm = gsap.matchMedia();

      /* ---------- DESKTOP ---------- */
      mm.add("(min-width: 1024px)", () => {
        const section = el("#top");
        const wrap = el(".polaroid-wrap");

        // the photo flies to the centre, flips over, and becomes the field notes
        gsap.set(".notes", { rotationY: -90, opacity: 0, scale: 0.85 });
        const flip = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=220%",
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        flip
          .to(".hero-copy", { x: -220, opacity: 0, duration: 0.3 }, 0)
          .to(".scroll-hint", { opacity: 0, duration: 0.1 }, 0)
          .to(
            wrap,
            {
              x: () => section.clientWidth / 2 - (offsetIn(wrap, section).x + wrap.offsetWidth / 2),
              y: () => window.innerHeight / 2 - (offsetIn(wrap, section).y + wrap.offsetHeight / 2),
              scale: 1.3,
              duration: 0.4,
              ease: "power2.inOut",
            },
            0.05,
          )
          .to(".polaroid-card", { rotationY: 90, duration: 0.15, ease: "power2.in" }, 0.45)
          .set(".polaroid-card", { opacity: 0 }, 0.6)
          .to(".notes", { rotationY: 0, opacity: 1, scale: 1, duration: 0.18, ease: "power2.out" }, 0.6)
          .from(".notes-row", { y: 24, opacity: 0, stagger: 0.03, duration: 0.12 }, 0.72)
          .from(".notes-stamp", { scale: 2.4, opacity: 0, rotation: 20, duration: 0.1, ease: "back.out(2)" }, 0.88)
          .to({}, { duration: 0.12 });

        // projects slide sideways while the section is pinned
        const track = el(".work-track");
        const dist = () => track.scrollWidth - window.innerWidth;
        const slide = gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: "#work",
            start: "top top",
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        q(".specimen").forEach((card, i) => {
          gsap.from(card, {
            y: 160,
            rotation: i % 2 ? -14 : 14,
            opacity: 0.2,
            ease: "power2.out",
            scrollTrigger: { trigger: card, containerAnimation: slide, start: "left 100%", end: "left 55%", scrub: true },
          });
          const shot = card.querySelector(".shot");
          if (shot)
            gsap.from(shot, {
              scale: 0,
              rotation: -40,
              ease: "back.out(2)",
              scrollTrigger: { trigger: card, containerAnimation: slide, start: "left 70%", end: "left 45%", scrub: true },
            });
        });

        return () => {};
      });

      /* ---------- MOBILE / TABLET ---------- */
      mm.add("(max-width: 1023px)", () => {
        // photo flips away as you scroll past it, field notes flip in
        gsap.to(".polaroid-card", {
          rotationY: 90,
          ease: "power1.in",
          scrollTrigger: { trigger: ".polaroid-wrap", start: "top 15%", end: "bottom 10%", scrub: true },
        });
        gsap.from(".notes", {
          rotationY: -70,
          scale: 0.85,
          opacity: 0,
          ease: "power2.out",
          scrollTrigger: { trigger: ".notes", start: "top 95%", end: "top 45%", scrub: true },
        });
        gsap.from(".notes-row", {
          x: -30,
          opacity: 0,
          stagger: 0.1,
          scrollTrigger: { trigger: ".notes-rows", start: "top 85%", toggleActions: "play none none reverse" },
        });
        gsap.from(".notes-stamp", {
          scale: 2.4,
          opacity: 0,
          rotation: 20,
          ease: "back.out(2)",
          scrollTrigger: { trigger: ".notes-stamp", start: "top 90%", toggleActions: "play none none reverse" },
        });
        q(".specimen").forEach((card, i) => {
          gsap.from(card, {
            y: 140,
            rotation: i % 2 ? -10 : 10,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 100%", end: "top 55%", scrub: true },
          });
          const shot = card.querySelector(".shot");
          if (shot)
            gsap.from(shot, {
              scale: 0,
              rotation: -40,
              ease: "back.out(2)",
              scrollTrigger: { trigger: card, start: "top 60%", toggleActions: "play none none reverse" },
            });
        });
      });

      /* ---------- experience: boards fall onto the moss ---------- */
      q(".board").forEach((b, i) => {
        gsap.from(b, {
          y: -320,
          rotation: i ? 22 : -22,
          opacity: 0,
          duration: 1.3,
          ease: "bounce.out",
          scrollTrigger: { trigger: b, start: "top 85%", toggleActions: "play none none reverse" },
        });
      });
      q(".board-note").forEach((n) => {
        gsap.from(n, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          delay: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: n, start: "top 95%", toggleActions: "play none none reverse" },
        });
      });

      /* ---------- toolbox: twig slides in, tags drop and keep swinging ---------- */
      gsap.from(".twig", {
        xPercent: -110,
        rotation: -8,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".tags", start: "top 85%", toggleActions: "play none none reverse" },
      });
      q(".tag").forEach((t, i) => {
        gsap.fromTo(
          t,
          { y: -520, rotation: gsap.utils.random(-45, 45), opacity: 0 },
          {
            y: 0,
            rotation: TAG_TILT[i % TAG_TILT.length],
            opacity: 1,
            duration: 1.8,
            delay: 0.25 + i * 0.13,
            ease: "elastic.out(1, 0.45)",
            scrollTrigger: { trigger: ".tags", start: "top 80%", toggleActions: "play none none reverse" },
          },
        );
        gsap.to(t.querySelector(".tag-swing"), {
          rotation: gsap.utils.random(2.5, 4.5) * (i % 2 ? 1 : -1),
          duration: gsap.utils.random(2.2, 3.4),
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
        const hover = t.querySelector(".tag-hover");
        t.addEventListener("pointerenter", () => {
          gsap.killTweensOf(hover);
          gsap.fromTo(
            hover,
            { rotation: 0 },
            { keyframes: { rotation: [14, -10, 6, -3, 0] }, duration: 1.4, ease: "sine.out" },
          );
        });
      });

      /* ---------- contact: the sign rises out of the moss ---------- */
      gsap.from(".sign", {
        y: 260,
        rotation: 10,
        scale: 0.8,
        opacity: 0,
        duration: 1.3,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: ".sign", start: "top 90%", toggleActions: "play none none reverse" },
      });
      gsap.from(".contact-btns > *", {
        scale: 0.5,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        delay: 0.5,
        ease: "back.out(2.2)",
        scrollTrigger: { trigger: ".contact-btns", start: "top 95%", toggleActions: "play none none reverse" },
      });
      gsap.to(".sign-float", { y: -10, rotation: 0.6, duration: 2.8, yoyo: true, repeat: -1, ease: "sine.inOut" });

      return () => window.removeEventListener("pointermove", onMove);
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      {/* continuous forest floor */}
      <div aria-hidden className="forest">
        <div className="forest-img" />
        <div className="forest-shade" />
      </div>
      <div aria-hidden>
        {Array.from({ length: 9 }).map((_, i) => (
          <Image key={i} src="/img/leaf.webp" alt="" width={240} height={111} className="leaf" />
        ))}
      </div>

      {/* top bar */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="progress h-[3px] origin-left scale-x-0 bg-lime" />
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-8">
          <a href="#top" className="font-serif text-2xl font-semibold italic text-white [text-shadow:0_2px_10px_rgba(0,0,0,.5)]">
            dev.aryan
          </a>
          <nav aria-label="Sections" className="glass hidden items-center gap-1 rounded-full p-1.5 text-sm md:flex">
            {[
              ["Work", "#work"],
              ["Experience", "#experience"],
              ["Toolbox", "#toolbox"],
              ["Contact", "#contact"],
            ].map(([l, h]) => (
              <a key={h} href={h} className="rounded-full px-4 py-2 transition-colors hover:bg-white/20">
                {l}
              </a>
            ))}
          </nav>
          <a href="/minimal/" className="glass rounded-full px-4 py-2 text-sm font-semibold">
            Minimal version
          </a>
        </div>
      </header>

      <main>
        {/* 1 + 2. Hero, then the photo flips into the field notes */}
        <section id="top" className="relative lg:h-screen">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 pb-10 pt-28 lg:h-full lg:grid-cols-[1.15fr_1fr] lg:px-12 lg:pb-0 lg:pt-16">
            <div className="hero-copy [text-shadow:0_4px_30px_rgba(0,0,0,.55)]">
              <p className="hero-chip glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm [text-shadow:none]">
                <span className="dot" aria-hidden />
                Open to software engineering roles
              </p>
              <h1 className="mt-6 font-serif text-[clamp(4.5rem,13vw,10rem)] font-semibold leading-[0.9] tracking-[-0.03em]">
                <span className="mask">
                  <span className="hero-line block">Dev</span>
                </span>
                <span className="mask">
                  <span className="hero-line block font-normal italic">Aryan</span>
                </span>
              </h1>
              <p className="hero-sub mt-8 max-w-xl text-xl leading-relaxed text-white/90 sm:text-2xl">
                Software developer growing AI-native, full-stack systems for healthcare: claims, clinics and care.
              </p>
              <div className="hero-cta mt-8 flex flex-wrap gap-3 [text-shadow:none]">
                <a href="#work" className={btnLight}>
                  Explore my work
                </a>
                <CopyEmail email={EMAIL} className={btnGlass} />
              </div>
            </div>

            <div className="polaroid-wrap relative z-10 mx-auto w-[min(380px,80vw)]">
              <div className="polaroid-drop" style={{ perspective: 1200 }}>
                <div className="polaroid-sway origin-[50%_-24px]">
                  <div className="polaroid-tilt preserve-3d">
                    <div
                      aria-hidden
                      className="twig-pin absolute -top-5 left-[18%] z-10 h-3.5 w-[40%] -rotate-[14deg] rounded-full bg-[linear-gradient(90deg,#5b3b1e,#8a5d33_40%,#5b3b1e)] shadow-[0_8px_10px_rgba(0,0,0,.45)]"
                    />
                    <div className="polaroid-card paper lift backface-hidden p-4 pb-0">
                      <Image
                        src="/img/avatar.webp"
                        alt="Illustrated avatar of Dev Aryan waving"
                        width={800}
                        height={800}
                        priority
                        className="w-full"
                      />
                      <p className="py-3 text-center font-[family-name:var(--font-hand)] text-4xl font-bold">
                        hi, I&apos;m Dev <span className="wave">👋</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* field notes: in the flow on phones, flips in over the hero on desktop */}
          <div
            id="about"
            className="px-5 pb-24 lg:pointer-events-none lg:absolute lg:inset-0 lg:z-20 lg:flex lg:items-center lg:justify-center lg:p-0"
            style={{ perspective: 1600 }}
          >
            <article className="notes paper lift mx-auto grid w-full max-w-5xl gap-8 p-7 sm:p-12 md:grid-cols-[1fr_210px] lg:pointer-events-auto">
              <div>
                <p className="text-xs tracking-[0.3em] text-[#8a7d5a]">FIELD NOTES · BACK OF THE PHOTO</p>
                <h2 className="mt-1 font-[family-name:var(--font-hand)] text-6xl font-bold text-moss">
                  Hey, I&apos;m Dev <span className="wave">👋</span>
                </h2>
                <p className="notes-row mt-3 text-lg leading-relaxed">
                  I build software where mistakes cost money or health. A claims platform that stays correct when 40
                  requests hit it at once, an OPD that keeps the queue moving, an ambulance that shows up on the right
                  map. I design the services and the data, write the APIs, and build the screens.
                </p>
                <dl className="notes-rows mt-5">
                  {[
                    ["🎓", "Delhi Technological University", "B.Tech, 2022 – 2026 · CGPA 8.16"],
                    ["📍", "Gurugram, India", "Open to on-site, hybrid and remote"],
                    ["☁️", "Currently learning", "AWS and cloud deployment"],
                    ["🧩", "By the numbers", "7 microservices in ClaimFlow · 6 user roles in MediSync"],
                  ].map(([e, t, d]) => (
                    <div key={t} className="notes-row flex items-center gap-4 border-t border-dashed border-[#cbbf9f] py-3">
                      <span aria-hidden className="text-2xl">
                        {e}
                      </span>
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
                  className="notes-row h-[170px] w-[170px] rounded-full border-[6px] border-white object-cover object-[50%_15%] shadow-lg"
                />
                <p className="notes-row text-center font-[family-name:var(--font-hand)] text-3xl leading-tight text-[#5b4a2a]">
                  specimen:
                  <br />
                  <i>developerus curiosus</i>
                </p>
                <p
                  aria-label="Open to SDE roles, 2026"
                  className="notes-stamp mt-auto grid h-36 w-36 -rotate-[14deg] place-items-center rounded-full border-[3px] border-double border-[#9b4a2a] text-center font-serif text-sm font-bold tracking-wider text-[#9b4a2a]"
                >
                  OPEN TO
                  <br />
                  SDE ROLES
                  <br />★ 2026 ★
                </p>
              </div>
            </article>
          </div>

          <p className="scroll-hint glass absolute bottom-6 left-1/2 hidden -translate-x-1/2 rounded-full px-5 py-2 text-sm lg:block">
            Scroll to flip the photo ↓
          </p>
        </section>

        {/* 3. Work: specimen cards slide past sideways */}
        <section id="work" className="relative lg:h-screen lg:overflow-hidden">
          <div className="work-track flex flex-col gap-12 px-5 py-24 lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-16 lg:px-[6vw] lg:py-0">
            <div className="shrink-0 lg:w-[30vw]">
              <SectionTitle kick="found while walking the forest" title="Selected work" />
              <p className="mt-4 max-w-sm text-lg text-white/85">
                Three health-tech products I designed, built and deployed end to end.
              </p>
              <p className="mt-6 hidden font-[family-name:var(--font-hand)] text-3xl text-lime lg:block">keep scrolling →</p>
            </div>

            {projects.map((p, i) => (
              <article
                key={p.name}
                className="specimen paper lift relative w-full max-w-md shrink-0 self-center p-4 pb-6 lg:w-[400px]"
                style={{ rotate: `${[-2.5, 1.5, -1][i]}deg` }}
              >
                <div className="relative h-56 overflow-hidden border border-[#d8ccab] xl:h-64">
                  <Image src={p.plate} alt={`Engraved illustration for ${p.name}`} fill sizes="400px" className="object-cover object-[50%_35%]" />
                </div>
                <Image
                  src={p.shot}
                  alt={`Screenshot of the live ${p.name} app`}
                  width={640}
                  height={420}
                  className="shot absolute -right-4 top-40 w-36 rotate-[7deg] border-[5px] border-white shadow-[0_8px_14px_rgba(0,0,0,.35)] xl:top-48"
                />
                <p className="mt-4 text-[11px] tracking-[0.3em] text-[#8a7d5a]">SPECIMEN NO. {p.no}</p>
                <h3 className="font-serif text-4xl font-bold leading-tight">{p.name}</h3>
                <p className="font-serif italic text-[#6d644c]">{p.latin}</p>
                <p className="mt-3 text-[15px] leading-relaxed">{p.summary}</p>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span aria-hidden className="text-moss">
                        ❧
                      </span>
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

            <div className="specimen glass flex w-full max-w-md shrink-0 flex-col items-start justify-center gap-4 self-center rounded-3xl p-8 lg:h-[420px] lg:w-[320px]">
              <p className="font-[family-name:var(--font-hand)] text-4xl font-bold text-lime">more in the undergrowth…</p>
              <p className="text-white/85">Simulators, backends and experiments live on my GitHub.</p>
              <a href={GITHUB} target="_blank" rel="noreferrer" className={btnLight}>
                Open GitHub ↗
              </a>
            </div>
          </div>
        </section>

        {/* 4. Experience: boards fall onto the moss */}
        <section id="experience" className="mx-auto max-w-7xl px-5 py-28 lg:px-12">
          <SectionTitle kick="trail markers so far" title="Experience" />
          <ol className="mt-12 grid gap-16 lg:grid-cols-2">
            {experience.map((e, i) => (
              <li key={e.company}>
                <div
                  className="board flex aspect-[1340/715] flex-col items-center justify-center bg-[url(/img/board.webp)] bg-[length:100%_100%] text-center drop-shadow-[0_22px_18px_rgba(0,0,0,.6)]"
                  style={{ rotate: `${i ? 2 : -2}deg` }}
                >
                  <h3 className="burn font-serif text-5xl font-extrabold tracking-tight sm:text-6xl">{e.company}</h3>
                  <p className="burn font-serif text-xl font-semibold italic sm:text-2xl">{e.role}</p>
                  <p className="burn mt-2 text-sm font-bold tracking-[0.15em]">
                    {e.when.toUpperCase()} · {e.where.toUpperCase()}
                  </p>
                </div>
                <div className="board-note glass mx-4 mt-5 rounded-2xl bg-[rgba(15,25,10,.45)] px-5 py-4 leading-relaxed">
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
        </section>

        {/* 5. Toolbox: nursery tags hanging from a twig */}
        <section id="toolbox" className="mx-auto max-w-7xl px-5 py-28 lg:px-12">
          <SectionTitle kick="labels from my garden" title="Toolbox" />
          <div className="tags relative mt-10">
            <Image
              src="/img/twig.webp"
              alt=""
              width={1484}
              height={167}
              className="twig absolute left-0 top-0 hidden w-full drop-shadow-[0_10px_8px_rgba(0,0,0,.6)] lg:block"
            />
            <ul className="grid grid-cols-2 justify-items-center gap-x-4 gap-y-10 pt-6 sm:grid-cols-3 lg:flex lg:justify-between lg:gap-6 lg:pt-12">
              {skills.map((s) => (
                <li key={s.group} className="tag relative w-[160px] origin-top sm:w-[200px]">
                  <div className="tag-swing origin-top">
                    <div className="tag-hover origin-top drop-shadow-[0_18px_14px_rgba(0,0,0,.6)]">
                      <span aria-hidden className="absolute -top-12 left-1/2 hidden h-14 w-0.5 bg-[#d9c7a0] lg:block" />
                      <div className="flex aspect-[420/1226] flex-col items-center bg-[url(/img/tag.webp)] bg-[length:100%_100%] px-3 pt-[4.6rem] text-center sm:px-4 sm:pt-24">
                        <p className="text-[11px] tracking-[0.3em] text-[#8a6b3e]">VARIETY</p>
                        <h3 className="mb-3 w-full border-b border-[#50321433] pb-2 font-serif text-xl font-extrabold text-[#2e1f0c] sm:text-2xl">
                          {s.group}
                        </h3>
                        {s.items.map((it) => (
                          <p
                            key={it}
                            className="font-[family-name:var(--font-hand)] text-[21px] leading-tight text-[#3b2a14] sm:text-[27px]"
                          >
                            {it}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 6. Contact: the sign rises out of the moss */}
        <section id="contact" className="mx-auto flex min-h-svh max-w-5xl flex-col items-center justify-center px-5 py-24">
          <div className="sign w-full">
            <div className="sign-float flex aspect-[1340/715] w-full -rotate-[1.5deg] flex-col items-center justify-center bg-[url(/img/board.webp)] bg-[length:100%_100%] px-6 text-center drop-shadow-[0_30px_24px_rgba(0,0,0,.65)]">
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
          </div>
          <div className="contact-btns mt-12 flex flex-wrap justify-center gap-3">
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
        </section>
      </main>
    </div>
  );
}
