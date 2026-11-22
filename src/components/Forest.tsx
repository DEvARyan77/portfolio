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

/** height of the twig's stick (0–1 of the image height) at 60 points along its length */
const TWIG = [
  0.317, 0.329, 0.347, 0.374, 0.401, 0.434, 0.449, 0.509, 0.551, 0.644, 0.626, 0.647, 0.665, 0.692, 0.719, 0.743, 0.749,
  0.74, 0.704, 0.719, 0.719, 0.698, 0.674, 0.656, 0.632, 0.608, 0.587, 0.569, 0.542, 0.518, 0.494, 0.455, 0.437, 0.434,
  0.404, 0.38, 0.359, 0.332, 0.329, 0.32, 0.305, 0.299, 0.29, 0.287, 0.26, 0.329, 0.362, 0.395, 0.431, 0.491, 0.563,
  0.524, 0.563, 0.59, 0.641, 0.689, 0.737, 0.79, 0.844, 0.886,
];
/** where the hole sits on the tag image (fraction of its height) */
const TAG_HOLE = 0.0786;
/** the board image is three planks; text rows sit in the middle of each */
const PLANKS = "grid-rows-[32.4%_34%_33.6%]";

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

function SectionTitle({ kick, title, center = false }: { kick: string; title: string; center?: boolean }) {
  return (
    <div className={`sec-title ${center ? "text-center" : ""}`}>
      <span className="mask">
        <span className="title-line kick block text-3xl">{kick}</span>
      </span>
      <span className="mask">
        <span className="title-line heading block text-6xl sm:text-8xl">{title}</span>
      </span>
    </div>
  );
}

function ProjectDetails({ p, compact = false }: { p: (typeof projects)[number]; compact?: boolean }) {
  return (
    <>
      <p className="text-[15px] leading-relaxed">{p.summary}</p>
      <ul className={`mt-3 space-y-1.5 text-sm ${compact ? "hidden xl:block [@media(max-height:860px)]:hidden" : ""}`}>
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
      <div className="mt-4 flex gap-5 font-bold text-moss">
        <a href={p.live} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
          Live demo ↗
        </a>
        {p.code && (
          <a href={p.code} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
            GitHub ↗
          </a>
        )}
      </div>
    </>
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
      const cleanups: (() => void)[] = [];

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
          gsap.set(leaf, {
            x: gsap.utils.random(-40, window.innerWidth),
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
        gsap.delayedCall(1.5 + i * 1.7, fall);
      });

      /* ---------- the little film inside the photo: Dev walks in waving, takes a picture, walks out ---------- */
      const steps = (dur: number) => ({
        keyframes: { y: [0, -9, 0, -9, 0, -9, 0, -9, 0], rotation: [0, -2, 0, 2, 0, -2, 0, 2, 0] },
        duration: dur,
        ease: "none",
      });
      gsap.set(".photo-person", { xPercent: -140 });
      gsap.set(".pose-cam", { opacity: 0 });
      gsap
        .timeline({ repeat: -1, delay: 2.4 })
        .set(".photo-person", { xPercent: -140, y: 0, rotation: 0 })
        .set(".pose-wave", { opacity: 1 })
        .set(".pose-cam", { opacity: 0 })
        // walk in, waving
        .to(".photo-person", { xPercent: 0, duration: 1.7, ease: "power1.out" })
        .to(".photo-person", steps(1.7), "<")
        // raise the camera
        .to(".pose-wave", { opacity: 0, duration: 0.15 }, "+=0.35")
        .to(".pose-cam", { opacity: 1, duration: 0.15 }, "<")
        // click
        .to(".photo-person", { scale: 0.98, duration: 0.08, yoyo: true, repeat: 1 }, "+=0.6")
        .fromTo(
          ".lens-flash",
          { scale: 0, opacity: 1 },
          { scale: 2.4, opacity: 0, duration: 0.45, ease: "power2.out", immediateRender: false },
          "<0.05",
        )
        .fromTo(".photo-flash", { opacity: 0.75 }, { opacity: 0, duration: 0.55, ease: "power2.out", immediateRender: false }, "<")
        // lower the camera, wave goodbye
        .to(".pose-cam", { opacity: 0, duration: 0.15 }, "+=0.7")
        .to(".pose-wave", { opacity: 1, duration: 0.15 }, "<")
        // walk out
        .to(".photo-person", { xPercent: 140, duration: 1.7, ease: "power1.in" }, "+=0.45")
        .to(".photo-person", steps(1.7), "<")
        // an empty forest for a moment
        .to({}, { duration: 1.1 });

      /* ---------- hero entrance: photo drops, flash, it develops, then the words arrive ---------- */
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from(".polaroid-drop", { y: -900, rotation: -40, duration: 1.4, ease: "back.out(1.1)" }, 0.2)
        .from(".twig-pin", { x: -60, opacity: 0, rotation: -40, duration: 0.5 }, "-=0.3")
        .fromTo(".screen-flash", { opacity: 0.85 }, { opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.1")
        .fromTo(
          ".photo-dev",
          { filter: "brightness(2.6) saturate(0) contrast(0.55) blur(2px)" },
          { filter: "brightness(1) saturate(1) contrast(1) blur(0px)", duration: 2.2, ease: "power2.out" },
          "<",
        )
        .from(".hero-chip", { y: 24, opacity: 0, duration: 0.7 }, "<0.2")
        .from(".hero-line", { yPercent: 115, duration: 1.2, stagger: 0.14 }, "<0.1")
        .from(".hero-sub", { y: 30, opacity: 0, duration: 0.9 }, "-=0.8")
        .from(".hero-cta > *", { y: 24, opacity: 0, stagger: 0.1, duration: 0.7 }, "-=0.6")
        .from(".psst", { scale: 0, rotation: -30, duration: 0.6, ease: "back.out(2)" }, "-=0.3")
        .from(".scroll-hint", { y: 20, opacity: 0, duration: 0.6 }, "-=0.2");

      // polaroid sways on its twig and leans toward the cursor; the forest drifts a little too
      gsap.to(".polaroid-sway", { rotation: 4, duration: 3, yoyo: true, repeat: -1, ease: "sine.inOut" });
      const tilt = el(".polaroid-tilt");
      const tiltX = gsap.quickTo(tilt, "rotationY", { duration: 0.6, ease: "power3" });
      const tiltY = gsap.quickTo(tilt, "rotationX", { duration: 0.6, ease: "power3" });
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
      cleanups.push(() => window.removeEventListener("pointermove", onMove));

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

      /* ================= DESKTOP ================= */
      mm.add("(min-width: 1024px)", () => {
        /* photo flies to the centre, flips over and becomes the field notes */
        const section = el("#top");
        const wrap = el(".polaroid-wrap");
        gsap.set(".notes", { rotationY: -90, opacity: 0, scale: 0.85 });
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: section, start: "top top", end: "+=220%", pin: true, scrub: 1, invalidateOnRefresh: true },
          })
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

        /* selected work: a focus carousel — the card in the middle grows, its neighbours shrink away */
        const cards = q(".wcard");
        const details = q(".wdetail");
        const n = cards.length;
        const spacing = () => Math.min(430, window.innerWidth * 0.3);
        let active = -1;
        const layout = (f: number) => {
          cards.forEach((c, i) => {
            const d = i - f;
            const ad = Math.min(Math.abs(d), 2);
            gsap.set(c, {
              x: d * spacing(),
              y: ad * 26,
              scale: 1.18 - Math.min(ad, 1) * 0.38,
              rotation: d * -5,
              opacity: 1 - Math.max(0, ad - 1) * 0.6,
              zIndex: 10 - Math.round(ad * 3),
              filter: `brightness(${1 - Math.min(ad, 1) * 0.25})`,
            });
          });
          const a = Math.round(gsap.utils.clamp(0, n - 1, f));
          if (a !== active) {
            active = a;
            details.forEach((dEl, i) => {
              gsap.to(dEl, { autoAlpha: i === a ? 1 : 0, y: i === a ? 0 : 14, duration: 0.45, ease: "power2.out", overwrite: true });
            });
          }
        };
        gsap.set(details, { autoAlpha: 0, y: 14 });
        layout(0);
        const proxy = { f: 0 };
        gsap.to(proxy, {
          f: n - 1,
          ease: "none",
          onUpdate: () => layout(proxy.f),
          scrollTrigger: {
            trigger: "#work",
            start: "top top",
            end: () => `+=${(n - 1) * window.innerHeight * 0.9}`,
            pin: true,
            scrub: 0.8,
            snap: { snapTo: 1 / (n - 1), duration: 0.5, ease: "power2.inOut", delay: 0.1, directional: false },
            invalidateOnRefresh: true,
          },
        });
        gsap.from(".wtrack", {
          y: 220,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: "#work", start: "top 70%", toggleActions: "play none none reverse" },
        });

        /* toolbox: each thread runs from the twig to its tag's hole */
        const tagsBox = el(".tags");
        const twig = el<HTMLImageElement>(".twig");
        const threads = () => {
          const tw = twig.offsetWidth;
          const th = twig.offsetHeight;
          const tx = offsetIn(twig, tagsBox).x;
          q(".tag").forEach((t) => {
            const o = offsetIn(t, tagsBox);
            const cx = o.x + t.offsetWidth / 2 - tx;
            const idx = gsap.utils.clamp(0, TWIG.length - 1, Math.floor((cx / tw) * TWIG.length));
            const stickY = TWIG[idx] * th;
            t.style.setProperty("--th", `${Math.max(12, o.y - stickY)}px`);
          });
        };
        threads();
        ScrollTrigger.addEventListener("refreshInit", threads);
        const ro = new ResizeObserver(threads);
        ro.observe(tagsBox);
        return () => {
          ScrollTrigger.removeEventListener("refreshInit", threads);
          ro.disconnect();
          q(".tag").forEach((t) => t.style.removeProperty("--th"));
        };
      });

      /* ================= PHONE / TABLET ================= */
      mm.add("(max-width: 1023px)", () => {
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
        q(".wcard").forEach((card, i) => {
          gsap.from(card, {
            y: 140,
            rotation: i % 2 ? -10 : 10,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 100%", end: "top 55%", scrub: true },
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
      q(".board-note").forEach((nEl) => {
        gsap.from(nEl, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          delay: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: nEl, start: "top 95%", toggleActions: "play none none reverse" },
        });
      });

      /* ---------- toolbox: twig slides in, tags drop, then hang and follow the cursor ---------- */
      gsap.from(".twig", {
        xPercent: -110,
        rotation: -8,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".tags", start: "top 85%", toggleActions: "play none none reverse" },
      });
      q(".tag").forEach((tag, i) => {
        const t = tag as HTMLElement;
        gsap.from(t, {
          y: -520,
          opacity: 0,
          duration: 1.6,
          delay: 0.3 + i * 0.12,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: { trigger: ".tags", start: "top 80%", toggleActions: "play none none reverse" },
        });
        // a slow breeze
        gsap.to(t.querySelector(".tag-swing"), {
          rotation: gsap.utils.random(1.6, 2.6) * (i % 2 ? 1 : -1),
          duration: gsap.utils.random(2.6, 3.6),
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
        // the tag leans smoothly with the cursor; the hit area (li) never moves, so it can't jitter
        const hover = t.querySelector(".tag-hover") as HTMLElement;
        const lean = gsap.quickTo(hover, "rotation", { duration: 0.7, ease: "power3.out" });
        const onPMove = (e: PointerEvent) => {
          const r = t.getBoundingClientRect();
          const nx = (e.clientX - (r.left + r.width / 2)) / r.width; // -0.5 … 0.5
          lean(gsap.utils.clamp(-12, 12, -nx * 24));
        };
        const onLeave = () => {
          gsap.to(hover, { rotation: 0, duration: 1.8, ease: "elastic.out(1, 0.4)", overwrite: true });
        };
        t.addEventListener("pointermove", onPMove);
        t.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          t.removeEventListener("pointermove", onPMove);
          t.removeEventListener("pointerleave", onLeave);
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

      // triggers were created top-down per feature, not in page order: re-sort so the pins are measured first
      ScrollTrigger.sort();
      ScrollTrigger.refresh();

      // the hero stays hidden until its animations are set up, so nothing flashes in its final state first
      gsap.set("#top", { visibility: "visible" });

      return () => cleanups.forEach((c) => c());
    },
    { scope: root },
  );

  const workItems = [...projects.map((p) => ({ kind: "project" as const, p })), { kind: "more" as const }];

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
      <div aria-hidden className="screen-flash pointer-events-none fixed inset-0 z-[70] bg-white opacity-0" />

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
        <section id="top" className="invisible relative lg:h-screen">
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

            <div className="polaroid-wrap relative z-10 mx-auto w-[min(400px,82vw)]">
              <div className="polaroid-drop" style={{ perspective: 1200 }}>
                <div className="polaroid-sway origin-[50%_-24px]">
                  <div className="polaroid-tilt preserve-3d">
                    <div
                      aria-hidden
                      className="twig-pin absolute -top-5 left-[18%] z-10 h-3.5 w-[40%] -rotate-[14deg] rounded-full bg-[linear-gradient(90deg,#5b3b1e,#8a5d33_40%,#5b3b1e)] shadow-[0_8px_10px_rgba(0,0,0,.45)]"
                    />
                    <div className="polaroid-card paper lift backface-hidden p-4 pb-0">
                      {/* the photo is a tiny film: Dev keeps snapping pictures */}
                      <div
                        className="photo-dev relative aspect-square overflow-hidden"
                        role="img"
                        aria-label="Animated avatar of Dev Aryan walking in, taking a photo with an instant camera, and walking away"
                      >
                        <Image src="/img/photo-bg.webp" alt="" fill sizes="400px" priority className="object-cover" />
                        <div className="photo-person absolute bottom-0 left-1/2 h-[94%] origin-bottom -translate-x-1/2">
                          <div className="relative h-full">
                            <Image src="/img/pose-camera.webp" alt="" width={503} height={700} priority className="pose-cam h-full w-auto max-w-none" />
                            <Image
                              src="/img/pose-wave.webp"
                              alt=""
                              width={523}
                              height={700}
                              priority
                              className="pose-wave absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2"
                            />
                            <span
                              aria-hidden
                              className="lens-flash absolute left-[40.5%] top-[24.7%] -ml-10 -mt-10 h-20 w-20 scale-0 rounded-full bg-[radial-gradient(circle,#fff_0%,rgba(255,255,240,.85)_25%,rgba(255,255,220,0)_70%)]"
                            />
                          </div>
                        </div>
                        <span aria-hidden className="photo-flash absolute inset-0 bg-white opacity-0" />
                        <p className="psst absolute bottom-3 right-3 -rotate-6 rounded-md bg-[rgba(20,30,10,.55)] px-2.5 py-1 font-[family-name:var(--font-hand)] text-2xl font-bold leading-none text-[#f6ff7a] backdrop-blur-sm">
                          psst… scroll to flip me
                        </p>
                      </div>
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
                  src="/img/avatar-head.webp"
                  alt=""
                  width={170}
                  height={170}
                  className="notes-row h-[170px] w-[170px] rounded-full border-[6px] border-white object-cover shadow-lg"
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

        {/* 3. Work: a focus carousel on desktop, a stack of cards on phones */}
        <section id="work" className="relative lg:flex lg:h-screen lg:flex-col lg:items-center lg:overflow-hidden lg:pt-20">
          <div className="px-5 pt-24 lg:px-0 lg:pt-0">
            <SectionTitle kick="found while walking the forest" title="Selected work" center />
          </div>

          <div className="wtrack relative mt-12 flex flex-col items-center gap-12 px-5 pb-24 lg:mt-6 lg:h-[46vh] lg:w-full lg:flex-none lg:gap-0 lg:p-0">
            {workItems.map((w, i) =>
              w.kind === "project" ? (
                <article
                  key={w.p.name}
                  className="wcard paper lift relative w-full max-w-md p-4 pb-5 lg:absolute lg:left-1/2 lg:top-1/2 lg:-ml-[150px] lg:-mt-[clamp(160px,21vh,220px)] lg:w-[300px]"
                  style={{ rotate: `${[-2, 1.5][i] ?? 0}deg` }}
                >
                  <div className="relative h-56 overflow-hidden border border-[#d8ccab] lg:h-[clamp(150px,22vh,230px)]">
                    <Image src={w.p.plate} alt={`Engraved illustration for ${w.p.name}`} fill sizes="320px" className="object-cover object-[50%_35%]" />
                  </div>
                  <Image
                    src={w.p.shot}
                    alt={`Screenshot of the live ${w.p.name} app`}
                    width={640}
                    height={420}
                    className="absolute -right-5 top-36 w-32 rotate-[7deg] border-[5px] border-white shadow-[0_8px_14px_rgba(0,0,0,.35)] lg:top-[clamp(100px,16vh,170px)] lg:w-28"
                  />
                  <p className="mt-3 text-[11px] tracking-[0.3em] text-[#8a7d5a]">SPECIMEN NO. {w.p.no}</p>
                  <h3 className="font-serif text-3xl font-bold leading-tight">{w.p.name}</h3>
                  <p className="font-serif italic text-[#6d644c]">{w.p.latin}</p>
                  {/* on phones the details live inside the card */}
                  <div className="mt-3 lg:hidden">
                    <ProjectDetails p={w.p} />
                  </div>
                </article>
              ) : (
                <div
                  key="more"
                  className="wcard glass flex w-full max-w-md flex-col items-start justify-center gap-4 rounded-3xl p-8 lg:absolute lg:left-1/2 lg:top-1/2 lg:-ml-[150px] lg:-mt-[clamp(140px,19vh,200px)] lg:h-[clamp(280px,38vh,400px)] lg:w-[300px]"
                >
                  <p className="font-[family-name:var(--font-hand)] text-4xl font-bold text-lime">more in the undergrowth…</p>
                  <p className="text-white/85">Simulators, backends and experiments live on my GitHub.</p>
                  <a href={GITHUB} target="_blank" rel="noreferrer" className={btnLight}>
                    Open GitHub ↗
                  </a>
                </div>
              ),
            )}
          </div>

          {/* desktop: details of the card in focus */}
          <div className="relative hidden w-full max-w-3xl flex-1 lg:block">
            {workItems.map((w) =>
              w.kind === "project" ? (
                <div key={w.p.name} className="wdetail paper lift absolute inset-x-0 top-4 mx-auto max-w-3xl rounded-sm px-8 py-5">
                  <ProjectDetails p={w.p} compact />
                </div>
              ) : (
                <div key="more" className="wdetail absolute inset-x-0 top-6 text-center">
                  <p className="font-[family-name:var(--font-hand)] text-3xl text-lime [text-shadow:0_2px_10px_rgba(0,0,0,.6)]">
                    that&apos;s the clearing. keep walking for the trail markers ↓
                  </p>
                </div>
              ),
            )}
          </div>
        </section>

        {/* 4. Experience: boards fall onto the moss; each line sits on its own plank */}
        <section id="experience" className="mx-auto max-w-7xl px-5 py-28 lg:px-12">
          <SectionTitle kick="trail markers so far" title="Experience" />
          <ol className="mt-12 grid gap-16 lg:grid-cols-2">
            {experience.map((e, i) => (
              <li key={e.company}>
                <div
                  className={`board @container grid aspect-[1340/715] ${PLANKS} items-center bg-[url(/img/board.webp)] bg-[length:100%_100%] text-center drop-shadow-[0_22px_18px_rgba(0,0,0,.6)]`}
                  style={{ rotate: `${i ? 2 : -2}deg` }}
                >
                  <h3 className="burn font-serif text-[10cqw] font-extrabold leading-none tracking-tight">{e.company}</h3>
                  <p className="burn font-serif text-[5cqw] font-semibold italic leading-none">{e.role}</p>
                  <p className="burn text-[3.1cqw] font-bold leading-none tracking-[0.15em]">
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
              className="twig absolute left-0 top-0 z-10 hidden w-full drop-shadow-[0_10px_8px_rgba(0,0,0,.6)] lg:block"
            />
            <ul className="grid grid-cols-2 justify-items-center gap-x-4 gap-y-10 pt-6 sm:grid-cols-3 lg:flex lg:justify-between lg:gap-6 lg:pt-40">
              {skills.map((s) => (
                <li key={s.group} className="tag relative w-[160px] sm:w-[200px]">
                  <div className="tag-swing" style={{ transformOrigin: "50% calc(-1 * var(--th, 0px))" }}>
                    <div className="tag-hover" style={{ transformOrigin: "50% calc(-1 * var(--th, 0px))" }}>
                      {/* the thread: from the twig down to the tag, then through the hole */}
                      <span
                        aria-hidden
                        className="absolute left-1/2 hidden w-[2px] -translate-x-1/2 rounded bg-[#e2d3b0] shadow-[0_2px_3px_rgba(0,0,0,.35)] lg:block"
                        style={{ top: "calc(-1 * var(--th, 0px))", height: "var(--th, 0px)" }}
                      />
                      <div className="relative drop-shadow-[0_18px_14px_rgba(0,0,0,.6)]">
                        <span
                          aria-hidden
                          className="absolute left-1/2 top-0 hidden w-[2px] -translate-x-1/2 bg-[#e2d3b0] lg:block"
                          style={{ height: `${TAG_HOLE * 100}%` }}
                        />
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
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 6. Contact: the sign rises out of the moss; each line on its own plank */}
        <section id="contact" className="mx-auto flex min-h-svh max-w-5xl flex-col items-center justify-center px-5 py-24">
          <div className="sign w-full">
            <div
              className={`sign-float @container grid aspect-[1340/715] w-full -rotate-[1.5deg] ${PLANKS} items-center bg-[url(/img/board.webp)] bg-[length:100%_100%] px-[6%] text-center drop-shadow-[0_30px_24px_rgba(0,0,0,.65)]`}
            >
              <h2 className="burn font-serif text-[7.4cqw] font-extrabold leading-none tracking-tight">Let&apos;s build something</h2>
              <p className="burn font-serif text-[8.2cqw] font-semibold italic leading-none">that matters.</p>
              <a href={`mailto:${EMAIL}`} className="burn font-serif text-[4.4cqw] font-extrabold leading-none hover:underline">
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
