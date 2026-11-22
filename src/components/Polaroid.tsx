"use client";

import Image from "next/image";
import { useState } from "react";

/** The hero photo: tap or click to flip it and read the note on the back. */
export default function Polaroid() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="swing relative mx-auto w-[min(380px,82vw)]">
      {/* the twig pinning the photo down */}
      <div
        aria-hidden
        className="absolute -top-5 left-[18%] z-10 h-3.5 w-[40%] -rotate-[14deg] rounded-full bg-[linear-gradient(90deg,#5b3b1e,#8a5d33_40%,#5b3b1e)] shadow-[0_8px_10px_rgba(0,0,0,.45)]"
      />
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        aria-label={flipped ? "Flip the photo back" : "Flip the photo to read the note on the back"}
        className="flip block w-full text-left"
      >
        <div className={`flip-inner ${flipped ? "is-flipped" : ""}`}>
          <div className="flip-face paper lift p-4 pb-0">
            <div className="overflow-hidden">
              <Image
                src="/img/avatar.webp"
                alt="Illustrated avatar of Dev Aryan waving"
                width={800}
                height={800}
                priority
                className="breathe w-full"
              />
            </div>
            <p className="py-3 text-center font-[family-name:var(--font-hand)] text-4xl font-bold">
              hi, I&apos;m Dev <span className="wave">👋</span>
            </p>
          </div>
          <div className="flip-face flip-back paper lift flex flex-col justify-center p-8">
            <p className="text-xs tracking-[0.3em] text-[#8a7d5a]">ON THE BACK</p>
            <p className="mt-3 font-[family-name:var(--font-hand)] text-4xl font-bold text-moss">
              Delhi Technological University, class of 2026.
            </p>
            <p className="mt-4 leading-relaxed">
              I build software for healthcare: insurance claims, hospital OPDs and AI health tools. Scroll down for the
              full field notes.
            </p>
            <p className="mt-6 font-[family-name:var(--font-hand)] text-2xl text-[#8a7d5a]">tap to flip back ↺</p>
          </div>
        </div>
      </button>
    </div>
  );
}
