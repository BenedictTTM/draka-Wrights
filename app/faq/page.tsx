'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FileText, Users, Scales } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    { q: "Does this apply to me as a student?", a: "Yes, all members of the University community (Sec 3.0)." },
    { q: "What if I am falsely accused?", a: "Malicious accusations lead to disciplinary action (Sec 5.7)." },
    { q: "Can I bring a lawyer?", a: "Yes, you have the right to representation by counsel (Sec 5.5)." },
    { q: "What about a relationship between a lecturer and student?", a: "Prohibited due to power imbalance (Sec 1.1(A))." },
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
              FAQ & Annexes
            </span>
            <h1 className="text-4xl font-semibold leading-[1.05] text-textPrimary sm:text-5xl">
              Answers with clarity and care
            </h1>
            <p className="max-w-2xl text-base leading-7 text-textSecondary sm:text-lg">
              We have gathered the most common questions and references so you can find support quickly.
            </p>
          </section>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-4">
              <h2 className="text-2xl font-semibold text-textPrimary">Frequently Asked Questions</h2>
              {faqs.map((faq, i) => (
                <motion.details
                  key={faq.q}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group rounded-xl border border-borderLight bg-white p-5 shadow-sm"
                >
                  <summary className="cursor-pointer font-semibold text-textPrimary focus:outline-none">
                    {faq.q}
                  </summary>
                  <p className="mt-3 text-sm text-textSecondary">{faq.a}</p>
                </motion.details>
              ))}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-textPrimary">Resources & Downloads</h2>
              <div className="mt-4 rounded-xl border border-borderLight bg-primary/5 p-6 shadow-sm">
                <Link
                  href="/resources"
                  className="block rounded-xl border border-borderLight bg-white p-4 text-sm font-semibold text-textSecondary transition hover:border-primary hover:text-primary"
                >
                  <FileText className="inline-block mr-2 h-4 w-4 align-text-bottom text-primary" />
                  Annex I: Examples of Misconduct
                </Link>
                <Link
                  href="/committee"
                  className="mt-3 block rounded-xl border border-borderLight bg-white p-4 text-sm font-semibold text-textSecondary transition hover:border-primary hover:text-primary"
                >
                  <Users className="inline-block mr-2 h-4 w-4 align-text-bottom text-primary" />
                  Annex II: Committee Composition
                </Link>
                <Link
                  href="/procedures"
                  className="mt-3 block rounded-xl border border-borderLight bg-white p-4 text-sm font-semibold text-primary transition hover:border-primary"
                >
                  <Scales className="inline-block mr-2 h-4 w-4 align-text-bottom text-primary" />
                  Annex III: Grievance Procedures
                </Link>
                <div className="mt-6 border-t border-borderLight pt-4 text-xs text-textSecondary">
                  <p>Original Policy PDF: NO. 873 FRIDAY, MAY 5, 2017</p>
                  <p className="mt-2">Version control: Sec 7.0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
