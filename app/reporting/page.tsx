'use client';
import { motion } from 'framer-motion';

export default function Reporting() {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-[#9B1D2C] mb-8">Reporting & Complaint</h1>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Informal Approach</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Direct resolution between parties.</li>
            <li>Assistance from a trusted intervener.</li>
            <li>Mediation process.</li>
            <li className="text-red-600 font-medium">Note: Excludes severe cases like rape.</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Formal Approach</h2>
          <ol className="list-decimal pl-5 space-y-3 text-gray-700">
            <li>Submit oral complaint or written statement.</li>
            <li>Notification of respondent.</li>
            <li>Investigation by the Anti-Sexual Harassment Committee.</li>
          </ol>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg text-center">
         <h2 className="text-xl font-bold text-blue-900 mb-3">Confidential Support & Counselling</h2>
         <p className="text-blue-800 mb-4">Contact the CEGENSA unit for crisis support and counselling.</p>
         <button className="bg-white text-blue-900 px-6 py-2 rounded font-semibold border border-blue-300">Download Complaint Form</button>
      </div>
    </motion.div>
  );
}
