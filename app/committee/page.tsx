'use client';
import { motion } from 'framer-motion';
export default function Committee() {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-[#9B1D2C] mb-8">Committee & Governance</h1>
      <div className="space-y-6">
        <div className="border p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Anti-Sexual Harassment Committee</h2>
          <p className="text-gray-700 mb-4">A 14-member committee ensuring gender parity, constituted by the Vice-Chancellor. Members include representatives from the School of Law, UTAG, Psychology Dept, SRC, GRASAG, Legal Counsel, etc.</p>
          <div className="bg-gray-50 p-4 rounded text-sm text-gray-600 border border-gray-200">
            <h3 className="font-semibold mb-2">Responsibilities:</h3>
            <ul className="list-disc pl-5">
              <li>Education and sensitization.</li>
              <li>Receiving and investigating complaints.</li>
              <li>Recommending sanctions.</li>
            </ul>
          </div>
        </div>
        
        <div className="text-center p-6 bg-gray-50 rounded">
          <p className="mb-2">Contact the Committee</p>
          <a href="mailto:ashc@ug.edu.gh" className="text-[#9B1D2C] font-bold text-lg">ashc@ug.edu.gh</a>
        </div>
      </div>
    </motion.div>
  );
}
