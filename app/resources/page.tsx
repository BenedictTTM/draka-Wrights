'use client';
import { motion } from 'framer-motion';

export default function Resources() {
  const notOk = [
    "Unwelcome leering or whistling",
    "Display of pornographic material",
    "Sexual assault or unwanted contact",
    "Sexually exploitative behavior"
  ];

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-[#9B1D2C] mb-8">Training & Resources</h1>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">What is Not OK?</h2>
          <div className="grid grid-cols-1 gap-3">
            {notOk.map((item, i) => (
              <motion.div 
                whileHover={{ y: -5 }}
                key={i} 
                className="bg-red-50 text-red-900 border border-red-200 p-4 rounded shadow-sm flex items-center gap-3 cursor-pointer"
              >
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                {item}
              </motion.div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="border p-6 rounded shadow-sm">
            <h2 className="text-xl font-bold mb-2">Get Support</h2>
            <p className="text-gray-700 mb-4 text-sm">The well-equipped sexual harassment crisis and counselling unit via CEGENSA is available to support you.</p>
            <div className="flex flex-col gap-2">
              <button className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700">Contact CEGENSA</button>
              <button className="bg-gray-100 border text-gray-700 rounded px-4 py-2 hover:bg-gray-200">Careers and Counselling Centre</button>
            </div>
          </div>

          <div className="border-t pt-6">
            <p className="font-semibold text-gray-800 mb-2">Education & Training</p>
            <p className="text-sm text-gray-600 mb-4">"All members of the Anti-Sexual Harassment Committee shall receive appropriate training..." (Sec 6.2)</p>
            <div className="bg-gray-200 h-32 rounded flex items-center justify-center text-gray-500">
              [Video Placeholder]
            </div>
          </div>
        </section>
      </div>

    </motion.div>
  );
}
