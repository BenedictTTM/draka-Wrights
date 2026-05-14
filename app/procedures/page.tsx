'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Lock, ArrowRight } from 'lucide-react';

export default function Procedures() {
  const steps = [
    { title: "Complaint Filed", desc: "Written statement or oral complaint." },
    { title: "Notification", desc: "Respondent notified and presumed innocent." },
    { title: "Investigation", desc: "Written accounts, witness statements, audio-visual, medical evidence used." },
    { title: "Resolution", desc: "Completed within 60 working days (Annex III (g))." },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="paper-texture">
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-24 md:px-10 md:pb-20 md:pt-32">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-10 top-12 h-52 w-52 rounded-full bg-bgSecondary blur-[120px]" />
            <div className="absolute right-10 top-16 h-44 w-44 rounded-full bg-primary/5 blur-[120px]" />
          </div>

          <section className="flex flex-col gap-6">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              Grievance Procedures
            </span>
            <h1 className="text-4xl font-semibold leading-[1.05] text-textPrimary sm:text-5xl">
              A clear, respectful path to resolution
            </h1>
            <p className="max-w-2xl text-base leading-7 text-textSecondary sm:text-lg">
              The process is designed to protect confidentiality, preserve dignity, and ensure timely,
              trauma-informed outcomes.
            </p>
          </section>

          <section className="mt-10 rounded-2xl bg-white p-7 shadow-[0_4px_24px_-8px_rgba(0,59,122,0.08)] border border-borderLight">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold text-textPrimary">Investigation Timeline</h2>
              <p className="text-sm text-textSecondary">Completed within 60 working days (Annex III (g)).</p>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {steps.map((step, i) => (
                <div key={step.title} className="rounded-xl border border-borderLight bg-bgPrimary p-4 text-center">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                    {i + 1}
                  </div>
                  <p className="text-sm font-semibold text-textPrimary">{step.title}</p>
                  <p className="mt-1 text-xs text-textSecondary">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl bg-primary/5 p-7 shadow-[0_4px_24px_-8px_rgba(0,59,122,0.08)] border border-primary/10">
              <h2 className="text-xl font-semibold text-textPrimary">Sanctions</h2>
              <ul className="mt-4 space-y-2 text-sm text-textSecondary">
                <li>Formal apology</li>
                <li>Leave without pay</li>
                <li>Suspension</li>
                <li>Dismissal</li>
              </ul>
            </div>
            <div className="space-y-5">
              <div className="rounded-xl border border-borderLight bg-white p-6 text-center shadow-sm">
                <h3 className="flex items-center justify-center gap-2 text-base font-semibold text-textPrimary">
                  <Lock className="h-5 w-5 text-primary" /> Confidentiality Pledge
                </h3>
                <p className="mt-2 text-sm text-textSecondary">
                  "Committee shall maintain confidentiality" (Annex III (k)).
                </p>
              </div>
              <div className="rounded-xl border border-borderLight bg-white p-6 text-center shadow-sm">
                <h3 className="text-base font-semibold text-textPrimary">Right to Appeal</h3>
                <p className="mt-2 text-sm text-textSecondary">
                  Appeals must go to the University of Ghana Appeals Board.
                </p>
                <Link
                  href="/about-policy"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark hover:underline transition-colors"
                >
                  View Statutes Page <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
