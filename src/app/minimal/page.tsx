import type { Metadata } from "next";
import CopyEmail from "@/components/CopyEmail";
import { EMAIL, GITHUB, LINKEDIN, experience, projects, skills } from "@/data";

export const metadata: Metadata = {
  title: "Dev Aryan | Minimal portfolio",
};

export default function Minimal() {
  return (
    <div className="min-h-screen bg-[#f7f2e4] text-[#2b2a20]">
      <main className="mx-auto max-w-3xl px-6 py-14">
        <a href="/" className="text-sm font-semibold text-[#3d5a1e] underline-offset-4 hover:underline">
          ← Back to the forest
        </a>
        <h1 className="mt-6 font-serif text-5xl font-semibold">Dev Aryan</h1>
        <p className="mt-2 text-lg text-[#6d644c]">
          Software developer · AI-native, full-stack systems for healthcare · Gurugram, India
        </p>
        <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-semibold text-[#3d5a1e]">
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
          <CopyEmail email={EMAIL} className="underline-offset-4 hover:underline" />
        </p>

        <h2 className="mt-12 border-b border-[#cbbf9f] pb-2 font-serif text-2xl font-semibold">Projects</h2>
        {projects.map((p) => (
          <section key={p.name} className="mt-6">
            <h3 className="text-xl font-bold">
              {p.name}{" "}
              <span className="text-sm font-semibold text-[#3d5a1e]">
                <a href={p.live} target="_blank" rel="noreferrer">Live demo</a>
                {p.code && (
                  <>
                    {" · "}
                    <a href={p.code} target="_blank" rel="noreferrer">GitHub</a>
                  </>
                )}
              </span>
            </h3>
            <p className="mt-1 leading-relaxed">{p.summary}</p>
            <ul className="mt-2 list-disc pl-5 text-[15px] leading-relaxed">
              {p.highlights.map((h) => <li key={h}>{h}</li>)}
            </ul>
            <p className="mt-1 text-sm text-[#6d644c]">{p.stack.join(", ")}</p>
          </section>
        ))}

        <h2 className="mt-12 border-b border-[#cbbf9f] pb-2 font-serif text-2xl font-semibold">Experience</h2>
        {experience.map((e) => (
          <section key={e.company} className="mt-6">
            <h3 className="text-xl font-bold">
              {e.company} <span className="font-normal text-[#6d644c]">· {e.role}</span>
            </h3>
            <p className="text-sm text-[#6d644c]">{e.when} · {e.where}</p>
            <p className="mt-1 leading-relaxed">
              {e.what}{" "}
              <a href={e.site.href} target="_blank" rel="noreferrer" className="font-semibold text-[#3d5a1e]">
                {e.site.label}
              </a>
            </p>
          </section>
        ))}

        <h2 className="mt-12 border-b border-[#cbbf9f] pb-2 font-serif text-2xl font-semibold">Skills</h2>
        <dl className="mt-4 space-y-2">
          {skills.map((s) => (
            <div key={s.group} className="grid gap-1 sm:grid-cols-[8rem_1fr]">
              <dt className="font-bold">{s.group}</dt>
              <dd>{s.items.join(", ")}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-12 border-b border-[#cbbf9f] pb-2 font-serif text-2xl font-semibold">Education</h2>
        <p className="mt-4">
          <b>Delhi Technological University</b> · B.Tech, 2022 – 2026 · CGPA 8.16
        </p>
      </main>
    </div>
  );
}
