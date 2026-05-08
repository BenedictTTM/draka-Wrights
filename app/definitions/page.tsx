'use client';
import { motion } from 'framer-motion';

export default function Definitions() {
  const definitions = [
    { term: "Sexual Harassment", desc: "Unwelcome conduct of a sexual nature... including submission made a term of employment/education, submission/rejection used as basis for decisions, or creating a hostile environment (Sec 1.1(A))." },
    { term: "Power Imbalance", desc: "The University prohibits sexual relationships between individuals where there is an imbalance of power (Sec 1.1(A))." },
    { term: "Sexual Assault", desc: "Unwanted sexual contact or coercion (Sec 1.1(B))." },
    { term: "Hostile Environment", desc: "When conduct is sufficiently severe, persistent or pervasive to limit one's ability to participate in university programs." },
    { term: "Complainant", desc: "An individual who is alleged to be the victim of conduct that could constitute sexual harassment." },
    { term: "Respondent", desc: "An individual who has been reported to be the perpetrator of conduct that could constitute sexual harassment." },
  ];

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="max-w-4xl mx-auto py-12 px-6">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h1 className="text-4xl font-bold text-[#9B1D2C]">Definitions</h1>
        <button className="bg-gray-100 text-gray-800 border border-gray-300 px-4 py-2 rounded shadow-sm hover:bg-gray-200 text-sm">Download Full Definitions</button>
      </div>

      <div className="grid gap-4">
        {definitions.map((def, i) => (
          <motion.details 
            key={i}
            initial={{opacity:0, y:10}}
            animate={{opacity:1, y:0}}
            transition={{delay: i * 0.05}}
            className="group border border-gray-200 bg-white rounded-lg [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer items-center justify-between p-4 font-semibold text-gray-900 focus:outline-none">
              <span className="text-lg">{def.term}</span>
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <div className="border-t border-gray-200 p-4 text-gray-700 leading-relaxed">
              {def.desc}
            </div>
          </motion.details>
        ))}
      </div>
    </motion.div>
  );
}
