'use client';
import { motion } from 'framer-motion';

export default function Committee() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="paper-texture">
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-24 md:px-10 md:pb-20 md:pt-32">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-8 top-10 h-48 w-48 rounded-full bg-bgSecondary blur-[120px]" />
            <div className="absolute right-6 top-16 h-44 w-44 rounded-full bg-primary/5 blur-[120px]" />
          </div>

          <section className="grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
            <div className="flex flex-col gap-6">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                Committee & Governance
              </span>
              <h1 className="text-4xl font-semibold leading-[1.05] text-textPrimary sm:text-5xl">
                A caring, accountable leadership structure
              </h1>
              <p className="text-base leading-7 text-textSecondary sm:text-lg">
                The Anti-Sexual Harassment Committee safeguards policy implementation, survivor-centered
                responses, and education across the University community.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-7 shadow-[0_4px_24px_-8px_rgba(0,59,122,0.08)] border border-borderLight">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Key Roles</p>
              <div className="mt-4 space-y-3 text-sm text-textSecondary">
                <p>14-member committee with gender parity and multi-campus representation.</p>
                <p>Constituted by the Vice-Chancellor and supported by specialized advisors.</p>
                <p>Partners with student, staff, and faculty leadership to ensure accountability.</p>
              </div>
            </div>
          </section>

          <section className="mt-12 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl bg-primary/5 p-8 shadow-[0_4px_24px_-8px_rgba(0,59,122,0.08)] border border-primary/10">
              <h2 className="text-2xl font-semibold text-textPrimary">Anti-Sexual Harassment Committee</h2>
              <p className="mt-3 text-sm leading-7 text-textSecondary">
                A 14-member committee ensuring gender parity, constituted by the Vice-Chancellor. Members
                include representatives from the School of Law, UTAG, Psychology Department, SRC, GRASAG,
                Legal Counsel, and more.
              </p>
              <div className="mt-6 rounded-xl border border-borderLight bg-white p-5 text-sm text-textSecondary">
                <p className="font-semibold text-textPrimary">Responsibilities</p>
                <ul className="mt-3 space-y-2">
                  <li>Education and sensitization.</li>
                  <li>Receiving and investigating complaints.</li>
                  <li>Recommending sanctions.</li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-[0_4px_24px_-8px_rgba(0,59,122,0.08)] border border-borderLight">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Contact
              </p>
              <h3 className="mt-3 text-xl font-semibold text-textPrimary">Connect with the committee</h3>
              <p className="mt-3 text-sm text-textSecondary">
                Reach out with questions, concerns, or to request educational sessions.
              </p>
              <a
                href="mailto:ashc@ug.edu.gh"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark"
              >
                ashc@ug.edu.gh
              </a>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
