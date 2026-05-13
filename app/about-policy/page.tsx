'use client';

import { motion } from 'framer-motion';

export default function AboutPolicy() {
  const objectives = [
    "Prevent sexual harassment.",
    "Prohibit sexual harassment.",
    "Provide a framework to investigate complaints.",
    "Administer discipline where the University finds that harassment has occurred.",
    "Ensure complainants are not subjected to retaliation.",
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="paper-texture">
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-24 md:px-10 md:pb-20 md:pt-32">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-20 top-6 h-56 w-56 rounded-full bg-primary/5 blur-[120px]" />
            <div className="absolute right-6 top-20 h-48 w-48 rounded-full bg-accent/8 blur-[120px]" />
            <div className="absolute bottom-8 left-1/3 h-40 w-40 rounded-full bg-bgSecondary blur-[120px]" />
          </div>

          <section className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="flex flex-col gap-6">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                About the Policy
              </span>
              <h1 className="text-4xl font-semibold leading-[1.05] text-textPrimary sm:text-5xl">
                A community grounded in dignity, safety, and care
              </h1>
              <p className="text-base leading-7 text-textSecondary sm:text-lg">
                The University of Ghana is committed to creating and maintaining a community in which all
                persons who participate in University programs and activities do so in an environment free
                from intimidation, exploitation, and abuse.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button className="inline-flex items-center gap-3 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark">
                  Learn the Reporting Path
                  <span className="text-lg">&#8594;</span>
                </button>
                <button className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-sm hover:bg-accent-soft transition">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M8 6.5L18 12L8 17.5V6.5Z" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-[0_4px_24px_-8px_rgba(0,59,122,0.08)] border border-borderLight">
                <div className="relative space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
                    Guiding Principles
                  </p>
                  <div className="space-y-3 text-sm text-textSecondary">
                    <p>Survivor-centered responses that honor consent and confidentiality.</p>
                    <p>Equitable processes that hold the community accountable.</p>
                    <p>Education that builds a culture of respect and care.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-14 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-[0_4px_24px_-8px_rgba(0,59,122,0.08)] border border-borderLight">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Purpose</p>
              <h2 className="mt-3 text-xl font-semibold text-textPrimary">A safe, respectful environment</h2>
              <p className="mt-3 text-sm leading-7 text-textSecondary">
                The policy exists to protect every member of our community from harassment and abuse while
                fostering safety, dignity, and trust.
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 p-6 shadow-[0_4px_24px_-8px_rgba(0,59,122,0.08)] border border-primary/10">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Scope</p>
              <h2 className="mt-3 text-xl font-semibold text-textPrimary">Who it protects</h2>
              <p className="mt-3 text-sm leading-7 text-textSecondary">
                Applicable to students, faculty, staff, administrators, and third parties across all university
                campuses, facilities, and vehicles.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-[0_4px_24px_-8px_rgba(0,59,122,0.08)] border border-borderLight">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Non-Retaliation</p>
              <h2 className="mt-3 text-xl font-semibold text-textPrimary">Protection for every voice</h2>
              <p className="mt-3 text-sm leading-7 text-textSecondary">
                The complainant shall not be reprimanded, retaliated against, or discriminated against for
                initiating a complaint in good faith.
              </p>
            </div>
          </section>

          <section className="mt-14 rounded-2xl bg-white p-8 shadow-[0_4px_24px_-8px_rgba(0,59,122,0.08)] border border-borderLight">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Key Objectives</p>
                <h2 className="mt-3 text-2xl font-semibold text-textPrimary">Building accountability and prevention</h2>
              </div>
              <ul className="grid gap-3 md:grid-cols-2">
                {objectives.map((obj, i) => (
                  <motion.li
                    key={obj}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3 rounded-xl bg-bgPrimary px-4 py-3 text-sm text-textSecondary border border-borderLight"
                  >
                    <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary shrink-0">
                      {i + 1}
                    </span>
                    <span>{obj}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
