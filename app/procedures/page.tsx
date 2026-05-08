'use client';
import { motion } from 'framer-motion';

export default function Procedures() {
  const steps = [
    { title: "Complaint Filed", desc: "Written statement or oral complaint." },
    { title: "Notification", desc: "Respondent notified and presumed innocent." },
    { title: "Investigation", desc: "Written accounts, witness statements, audio-visual, medical evidence used." },
    { title: "Resolution", desc: "Completed within 60 working days (Annex III (g))." }
  ];

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-[#9B1D2C] mb-8">Grievance Procedures</h1>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Investigation Timeline</h2>
        <div className="flex justify-between items-center relative before:absolute before:border-t-2 before:border-gray-200 before:top-1/2 before:-translate-y-1/2 before:w-full before:z-[-1]">
          {steps.map((step, i) => (
            <div key={i} className="bg-white px-2 text-center max-w-[120px]">
              <div className="w-8 h-8 rounded-full bg-[#9B1D2C] text-white flex items-center justify-center mx-auto mb-2 font-bold z-10">{i+1}</div>
              <p className="font-medium text-sm text-gray-800">{step.title}</p>
              <p className="text-xs text-gray-500 hidden md:block mt-1">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="border rounded p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Sanctions</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Formal apology</li>
            <li>Leave without pay</li>
            <li>Suspension</li>
            <li>Dismissal</li>
          </ul>
        </div>
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded text-center border">
            <h3 className="font-bold flex justify-center items-center gap-2"><span className="text-xl">🔒</span> Confidentiality Pledge</h3>
            <p className="text-sm text-gray-600 mt-2">"Committee shall maintain confidentiality" (Annex III (k))</p>
          </div>
          <div className="border p-4 rounded text-center">
             <h3 className="font-bold mb-2">Right to Appeal</h3>
             <p className="text-sm text-gray-600 mb-3">Appeals must go to the University of Ghana Appeals Board.</p>
             <a href="#" className="text-blue-600 text-sm hover:underline">View Statutes Page &rarr;</a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
