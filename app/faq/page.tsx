'use client';
import { motion } from 'framer-motion';

export default function FAQ() {
  const faqs = [
    { q: "Does this apply to me as a student?", a: "Yes, all members of the University community (Sec 3.0)." },
    { q: "What if I am falsely accused?", a: "Malicious accusations lead to disciplinary action (Sec 5.7)." },
    { q: "Can I bring a lawyer?", a: "Yes, you have the right to representation by counsel (Sec 5.5)." },
    { q: "What about a relationship between a lecturer and student?", a: "Prohibited due to power imbalance (Sec 1.1(A))." }
  ];

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-[#9B1D2C] mb-8">FAQ & Annexes</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <motion.details 
              key={i}
              initial={{opacity:0, y:10}}
              animate={{opacity:1, y:0}}
              transition={{delay: i * 0.1}}
              className="group border border-gray-200 bg-white rounded-lg p-4"
            >
              <summary className="font-semibold text-gray-900 cursor-pointer focus:outline-none">
                {faq.q}
              </summary>
              <p className="mt-3 text-gray-700">
                {faq.a}
              </p>
            </motion.details>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-800">Resources & Downloads</h2>
          <div className="bg-gray-50 border p-6 rounded-lg space-y-4">
            <a href="#" className="block p-3 bg-white border rounded hover:bg-gray-50 transition text-sm font-medium text-gray-700">📄 Annex I: Examples of Misconduct</a>
            <a href="#" className="block p-3 bg-white border rounded hover:bg-gray-50 transition text-sm font-medium text-gray-700">👥 Annex II: Committee Composition</a>
            <a href="/procedures" className="block p-3 bg-white border rounded hover:bg-gray-50 transition text-sm font-medium text-[#9B1D2C]">⚖️ Annex III: Grievance Procedures</a>
            <div className="pt-4 border-t mt-4 text-xs text-gray-500 space-y-2">
              <p>Original Policy PDF: NO. 873 FRIDAY, MAY 5, 2017</p>
              <p>Version control: Sec 7.0</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
