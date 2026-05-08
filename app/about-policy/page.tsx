'use client';

import { motion } from 'framer-motion';

export default function AboutPolicy() {
  const objectives = [
    "Prevent sexual harassment.",
    "Prohibit sexual harassment.",
    "Provide a framework to investigate complaints.",
    "Administer discipline where the University finds that harassment has occurred.",
    "Ensure complainants are not subjected to retaliation."
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto py-12 px-6 prose prose-red"
    >
      <h1 className="text-4xl font-bold text-[#9B1D2C] mb-6">About the Policy</h1>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Purpose Statement</h2>
        <p className="text-lg text-gray-700">
          The University of Ghana is committed to creating and maintaining a community in which all persons who participate in University programs and activities do so in an environment free from intimidation, exploitation and abuse.
        </p>
      </section>

      <section className="mb-10 p-6 bg-gray-50 border-l-4 border-[#9B1D2C] rounded-r-lg">
        <h2 className="text-xl font-semibold mb-3 text-gray-800 mt-0">Application & Scope</h2>
        <p className="text-gray-700 mb-0">
          Applicable to all members of the University community (students, faculty, staff, administrators) and third parties (contractors, vendors). It applies to conduct on all University campuses, properties, facilities, and vehicles.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Key Objectives</h2>
        <ul className="space-y-3 pl-0">
          {objectives.map((obj, i) => (
            <motion.li 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start"
            >
              <span className="text-[#9B1D2C] font-bold mr-3 mt-1">{i + 1}.</span>
              <span className="text-gray-700">{obj}</span>
            </motion.li>
          ))}
        </ul>
      </section>

      <section className="mb-10 p-6 bg-red-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3 text-[#9B1D2C] mt-0">Non-Retaliation Clause</h2>
        <p className="text-red-900 mb-0">
          The complainant shall not be reprimanded, retaliated against, or discriminated against in any way for initiating a complaint in good faith. 
        </p>
      </section>
    </motion.div>
  );
}
