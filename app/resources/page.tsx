'use client';
import { motion } from 'framer-motion';

export default function Resources() {
  const notOk = [
    "Unwelcome leering or whistling",
    "Display of pornographic material",
    "Sexual assault or unwanted contact",
    "Sexually exploitative behavior",
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="paper-texture">
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-24 md:px-10 md:pb-20 md:pt-32">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-10 top-12 h-52 w-52 rounded-full bg-bgSecondary blur-[120px]" />
            <div className="absolute right-10 top-20 h-44 w-44 rounded-full bg-primary/5 blur-[120px]" />
          </div>

          <section className="flex flex-col gap-6">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              Training & Resources
            </span>
            <h1 className="text-4xl font-semibold leading-[1.05] text-textPrimary sm:text-5xl">
              Practical support, compassionate guidance
            </h1>
            <p className="max-w-2xl text-base leading-7 text-textSecondary sm:text-lg">
              Explore education resources, crisis support, and tools that empower students and staff to act
              with care and clarity.
            </p>
          </section>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <section className="rounded-2xl bg-white p-7 shadow-[0_4px_24px_-8px_rgba(0,59,122,0.08)] border border-borderLight">
              <h2 className="text-2xl font-semibold text-textPrimary">What is not ok?</h2>
              <p className="mt-3 text-sm text-textSecondary">
                Behaviors that create harm, fear, or coercion are never acceptable.
              </p>
              <div className="mt-5 grid gap-3">
                {notOk.map((item) => (
                  <motion.div
                    whileHover={{ y: -2 }}
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-borderLight bg-bgPrimary p-4 text-sm text-textSecondary transition-shadow hover:shadow-sm"
                  >
                    <div className="h-2 w-2 rounded-full bg-accent shrink-0"></div>
                    {item}
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <div className="rounded-2xl bg-primary/5 p-7 shadow-[0_4px_24px_-8px_rgba(0,59,122,0.08)] border border-primary/10">
                <h2 className="text-xl font-semibold text-textPrimary">Get support</h2>
                <p className="mt-3 text-sm text-textSecondary">
                  The well-equipped sexual harassment crisis and counselling unit via CEGENSA is available to
                  support you.
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  <button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark">
                    Contact CEGENSA
                  </button>
                  <button className="rounded-lg border border-borderLight bg-white px-5 py-2.5 text-sm font-semibold text-textPrimary shadow-sm transition hover:border-primary hover:text-primary">
                    Careers and Counselling Centre
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-borderLight bg-white p-6 shadow-[0_4px_24px_-8px_rgba(0,59,122,0.08)]">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Education & Training</p>
                <p className="mt-3 text-sm text-textSecondary">
                  "All members of the Anti-Sexual Harassment Committee shall receive appropriate training..."
                  (Sec 6.2)
                </p>
                <div className="mt-4 flex h-32 items-center justify-center rounded-xl bg-bgPrimary border border-borderLight text-sm text-textSecondary">
                  Video Placeholder
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
