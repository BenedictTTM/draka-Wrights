'use client';
import { motion } from 'framer-motion';

export default function Definitions() {
  const definitions = [
    {
      term: "Sexual Harassment",
      desc: "Unwelcome conduct of a sexual nature, including submission made a term of employment or education, submission or rejection used as a basis for decisions, or creating a hostile environment (Sec 1.1(A)).",
    },
    {
      term: "Power Imbalance",
      desc: "The University prohibits sexual relationships between individuals where there is an imbalance of power (Sec 1.1(A)).",
    },
    { term: "Sexual Assault", desc: "Unwanted sexual contact or coercion (Sec 1.1(B))." },
    {
      term: "Hostile Environment",
      desc: "Conduct that is sufficiently severe, persistent, or pervasive to limit one's ability to participate in university programs.",
    },
    {
      term: "Complainant",
      desc: "An individual who is alleged to be the victim of conduct that could constitute sexual harassment.",
    },
    {
      term: "Respondent",
      desc: "An individual who has been reported to be the perpetrator of conduct that could constitute sexual harassment.",
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="paper-texture">
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-24 md:px-10 md:pb-20 md:pt-32">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-6 top-10 h-44 w-44 rounded-full bg-primary/5 blur-[120px]" />
            <div className="absolute right-10 top-16 h-56 w-56 rounded-full bg-bgSecondary blur-[120px]" />
          </div>

          <section className="flex flex-col gap-6">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              Shared Language
            </span>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <h1 className="text-4xl font-semibold leading-[1.05] text-textPrimary sm:text-5xl">Definitions</h1>
                <p className="mt-3 max-w-2xl text-base leading-7 text-textSecondary sm:text-lg">
                  Clear definitions help us speak the same language, recognize harm, and respond with care.
                </p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-lg border border-borderLight bg-white px-5 py-2 text-sm font-semibold text-textPrimary shadow-sm transition hover:border-primary hover:text-primary">
                Download Full Definitions
                <span className="text-lg">&#8595;</span>
              </button>
            </div>
          </section>

          <div className="mt-10 grid gap-4">
            {definitions.map((def, i) => (
              <motion.details
                key={def.term}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-xl border border-borderLight bg-white shadow-sm [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-semibold text-textPrimary focus:outline-none">
                  <span className="text-lg">{def.term}</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="22"
                      shapeRendering="geometricPrecision"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="22"
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </summary>
                <div className="border-t border-borderLight p-5 text-textSecondary leading-relaxed">
                  {def.desc}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
