'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const STEPS = ['Category', 'Details', 'Evidence', 'Review'];
const CATEGORIES = [
  { label: 'Sexual Harassment', icon: '⚠️', desc: 'Unwanted sexual advances, comments, or conduct' },
  { label: 'Safety Concern', icon: '🛡️', desc: 'Physical safety hazards or threats' },
  { label: 'Policy Violation', icon: '📋', desc: 'Breach of institutional rules or code of conduct' },
  { label: 'Stalking / Bullying', icon: '👁️', desc: 'Persistent unwanted contact or intimidation' },
  { label: 'Other', icon: '📝', desc: 'Other concerns not listed above' },
];

export default function Reporting() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [form, setForm] = useState({
    category: '', title: '', description: '', anonymous: true,
    location: '', incident_date: '', incident_time: '', is_online: false, evidence_notes: '',
  });

  const set = (key: string, val: any) => setForm(p => ({ ...p, [key]: val }));
  const next = () => setStep(s => s + 1);
  const back = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    setSubmitting(true);
    const res = await fetch('/api/reports', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
    });
    if (res.ok) setSubmitted(true);
    else alert('Something went wrong.');
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-white rounded-2xl p-10 text-center shadow-xl border border-borderLight">
          <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-textPrimary mb-2">Report Submitted</h2>
          <p className="text-textSecondary text-sm mb-6">Thank you for your courage. Your report has been securely transmitted and will be reviewed with the utmost confidentiality.</p>
          <button onClick={() => window.location.href = '/'} className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors">Return Home</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bgPrimary/30 px-4 pb-10 pt-24 md:pt-32">
      <div className="max-w-2xl mx-auto">

        {/* Stepper */}
        <div className="flex items-center gap-0 mb-8">
          {STEPS.map((s, i) => {
            const num = i + 1;
            const done = step > num;
            const active = step === num;
            return (
              <div key={s} className="flex items-center flex-1 last:flex-initial">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                    done ? 'bg-primary border-primary text-white' : active ? 'border-primary text-primary bg-white' : 'border-borderLight text-textSecondary bg-white'
                  }`}>
                    {done ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg> : num}
                  </div>
                  <span className={`text-[10px] mt-1 font-medium ${active ? 'text-primary' : 'text-textSecondary'}`}>{s}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 mb-4 ${done ? 'bg-primary' : 'bg-borderLight'}`} />
                )}
              </div>
            );
          })}
          <span className="text-xs text-textSecondary ml-auto mb-4">Step {step} of 4</span>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-borderLight overflow-hidden">
          {/* Top accent bar */}
          <div className="h-1 bg-bgPrimary"><motion.div className="h-full bg-primary" animate={{ width: `${(step / 4) * 100}%` }} /></div>

          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">

              {/* STEP 1 — Category */}
              {step === 1 && (
                <motion.div key="s1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
                  <h2 className="text-2xl font-bold text-textPrimary mb-1">Select Category</h2>
                  <p className="text-sm text-textSecondary mb-6">Choose the type of incident you are reporting.</p>
                  <div className="space-y-3">
                    {CATEGORIES.map(c => (
                      <button key={c.label} type="button" onClick={() => { set('category', c.label); next(); }}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                          form.category === c.label ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-borderLight hover:border-primary/40 hover:bg-bgPrimary'
                        }`}>
                        <span className="text-2xl">{c.icon}</span>
                        <div>
                          <p className="font-semibold text-textPrimary text-sm">{c.label}</p>
                          <p className="text-xs text-textSecondary">{c.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 2 — Incident Details */}
              {step === 2 && (
                <motion.div key="s2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
                  <h2 className="text-2xl font-bold text-textPrimary mb-1">Incident Details</h2>
                  <p className="text-sm text-textSecondary mb-6">Please provide as much information as you can remember. All details are kept strictly confidential.</p>

                  <div className="space-y-5">
                    {/* Date & Time row */}
                    <div>
                      <label className="block text-sm font-semibold text-textPrimary mb-2">When did this happen?</label>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                          </span>
                          <input type="date" value={form.incident_date} onChange={e => set('incident_date', e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 border border-borderLight rounded-lg text-sm outline-none focus:border-primary transition-all" />
                        </div>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                          </span>
                          <input type="time" value={form.incident_time} onChange={e => set('incident_time', e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 border border-borderLight rounded-lg text-sm outline-none focus:border-primary transition-all" />
                        </div>
                      </div>
                      <p className="text-xs text-textSecondary mt-1.5">If you are unsure of the exact time, an approximation is fine.</p>
                    </div>

                    <hr className="border-borderLight" />

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-semibold text-textPrimary mb-2">Where did it occur?</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        </span>
                        <input type="text" value={form.location} onChange={e => set('location', e.target.value)} placeholder="e.g., Main Office, 3rd Floor Breakroom"
                          className="w-full pl-9 pr-3 py-2.5 border border-borderLight rounded-lg text-sm outline-none focus:border-primary transition-all placeholder:text-textSecondary/60" />
                      </div>
                    </div>

                    {/* Online toggle */}
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input type="checkbox" checked={form.is_online} onChange={e => set('is_online', e.target.checked)}
                        className="w-4 h-4 rounded border-borderLight text-primary focus:ring-primary" />
                      <span className="text-sm text-textSecondary">This occurred online / digitally</span>
                    </label>

                    <hr className="border-borderLight" />

                    {/* Description */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-semibold text-primary">Tell us what happened</label>
                        <span className="text-xs text-textSecondary">{charCount}/2000</span>
                      </div>
                      <textarea rows={5} maxLength={2000} value={form.description}
                        onChange={e => { set('description', e.target.value); setCharCount(e.target.value.length); }}
                        placeholder="Please describe the event in your own words. Include details about who was involved, what was said or done, and any witnesses if applicable."
                        className="w-full px-4 py-3 border border-borderLight rounded-xl text-sm outline-none focus:border-primary transition-all resize-y placeholder:text-textSecondary/60" />
                      <p className="text-xs text-warning mt-1.5">Avoid including sensitive personal data like SSN or credit card numbers unless absolutely necessary for the report.</p>
                    </div>
                  </div>

                  {/* Footer buttons */}
                  <div className="flex items-center justify-between mt-8 pt-5 border-t border-borderLight">
                    <button type="button" onClick={back} className="flex items-center gap-1.5 text-sm font-medium text-textSecondary hover:text-textPrimary transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg> Back
                    </button>
                    <button type="button" onClick={next} disabled={!form.description}
                      className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2">
                      Continue <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 — Evidence */}
              {step === 3 && (
                <motion.div key="s3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
                  <h2 className="text-2xl font-bold text-textPrimary mb-1">Upload Evidence</h2>
                  <p className="text-sm text-textSecondary mb-6">Provide any supporting documents, photos, or videos that document the incident. All files are securely encrypted.</p>

                  {/* Upload area */}
                  <div className="border-2 border-dashed border-borderLight rounded-xl p-10 text-center hover:border-primary/40 transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
                    </div>
                    <p className="text-sm font-medium text-textPrimary">Click to upload or drag and drop</p>
                    <p className="text-xs text-textSecondary mt-1">Supported formats: PDF, JPG, PNG, MP4</p>
                  </div>

                  {/* Info banner */}
                  <div className="flex items-start gap-3 mt-4 p-3 bg-bgPrimary rounded-lg">
                    <svg className="w-4 h-4 text-textSecondary mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <div>
                      <p className="text-sm font-medium text-textPrimary">No files uploaded yet</p>
                      <p className="text-xs text-textSecondary">Your uploaded documents will appear here for review before submission.</p>
                    </div>
                  </div>

                  {/* Additional notes */}
                  <div className="mt-6">
                    <label className="block text-sm font-semibold text-textPrimary mb-2">Additional Notes (Optional)</label>
                    <textarea rows={3} value={form.evidence_notes} onChange={e => set('evidence_notes', e.target.value)}
                      placeholder="Provide any context or details about the files you are uploading..."
                      className="w-full px-4 py-3 border border-borderLight rounded-xl text-sm outline-none focus:border-primary transition-all resize-none placeholder:text-textSecondary/60" />
                    <p className="text-xs text-textSecondary mt-1">These notes will be attached directly to your evidence package.</p>
                  </div>

                  <div className="flex items-center justify-between mt-8 pt-5 border-t border-borderLight">
                    <button type="button" onClick={back} className="flex items-center gap-1.5 text-sm font-medium text-textSecondary hover:text-textPrimary transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg> Back
                    </button>
                    <button type="button" onClick={next}
                      className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-all flex items-center gap-2">
                      Next <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4 — Review & Submit */}
              {step === 4 && (
                <motion.div key="s4" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
                  <h2 className="text-2xl font-bold text-textPrimary mb-1">Review & Submit</h2>
                  <p className="text-sm text-textSecondary mb-6">Please review the details of your report carefully. You can edit any section before final submission.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Category card */}
                    <div className="border border-borderLight rounded-xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-sm font-semibold text-textPrimary">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg>
                          Category
                        </div>
                        <button type="button" onClick={() => setStep(1)} className="text-primary hover:text-primary-dark transition-colors">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                        </button>
                      </div>
                      <div className="bg-bgPrimary rounded-lg p-3">
                        <p className="text-xs text-textSecondary">Selected Classification</p>
                        <p className="text-sm font-semibold text-primary">{form.category}</p>
                      </div>
                    </div>

                    {/* Details card */}
                    <div className="border border-borderLight rounded-xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-sm font-semibold text-textPrimary">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                          Incident Details
                        </div>
                        <button type="button" onClick={() => setStep(2)} className="text-primary hover:text-primary-dark transition-colors">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                        </button>
                      </div>
                      {form.incident_date && <p className="text-xs text-textSecondary mb-1">📅 {form.incident_date}{form.incident_time && ` • ${form.incident_time}`}</p>}
                      {form.location && <p className="text-xs text-textSecondary mb-2">📍 {form.location}</p>}
                      <p className="text-xs text-textSecondary line-clamp-3 border-l-2 border-borderLight pl-2">{form.description}</p>
                    </div>

                    {/* Evidence card */}
                    <div className="border border-borderLight rounded-xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-sm font-semibold text-textPrimary">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/></svg>
                          Evidence
                        </div>
                        <button type="button" onClick={() => setStep(3)} className="text-primary hover:text-primary-dark transition-colors">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                        </button>
                      </div>
                      <p className="text-xs text-textSecondary">{form.evidence_notes || 'No evidence or notes attached.'}</p>
                    </div>

                    {/* Anonymous toggle card */}
                    <div className="border border-borderLight rounded-xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-semibold text-textPrimary">Anonymous Submission</p>
                        <button type="button" onClick={() => set('anonymous', !form.anonymous)}
                          className={`w-11 h-6 rounded-full transition-colors relative ${form.anonymous ? 'bg-primary' : 'bg-borderLight'}`}>
                          <motion.div animate={{ x: form.anonymous ? 22 : 2 }} className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-sm" />
                        </button>
                      </div>
                      <p className="text-xs text-textSecondary">
                        {form.anonymous
                          ? 'Your identity will be completely detached from this report. Investigators will not be able to contact you for follow-up questions.'
                          : 'Your identity will be shared with the Anti-Sexual Harassment Committee for follow-up.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-8 pt-5 border-t border-borderLight">
                    <button type="button" onClick={back} className="text-sm font-medium text-textSecondary hover:text-textPrimary transition-colors">Save Draft</button>
                    <button type="button" onClick={handleSubmit} disabled={submitting}
                      className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-all disabled:opacity-50 flex items-center gap-2">
                      {submitting ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</> : <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg> Submit Report
                      </>}
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

        {/* Confidentiality banner */}
        <div className="mt-4 flex items-start gap-3 bg-white border border-borderLight rounded-xl p-4">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-textPrimary">Confidentiality Assured</p>
            <p className="text-xs text-textSecondary">Your report is encrypted and confidential. Only authorized personnel can review submissions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
