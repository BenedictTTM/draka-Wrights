"use client";

import React, { useState } from "react";

export default function ChatPage() {
  const [isInternalMode, setIsInternalMode] = useState(false);

  return (
    <div className="h-full flex overflow-hidden">
      {/* Active Chats Sidebar */}
      <div className="w-72 border-r border-borderLight bg-white flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-borderLight">
          <h2 className="font-semibold text-textPrimary mb-3">Support Inbox</h2>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-textSecondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-8 pr-3 py-1.5 bg-bgPrimary border border-borderLight rounded-lg text-sm outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Chat Item */}
          <div className="p-4 border-b border-borderLight cursor-pointer bg-primary/5 border-l-4 border-l-primary">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-sm font-medium text-textPrimary">Anon-8422</h3>
              <span className="text-[10px] text-primary font-medium">Just now</span>
            </div>
            <p className="text-xs text-textSecondary line-clamp-1">Thank you for letting me know. I can provi...</p>
          </div>

          <div className="p-4 border-b border-borderLight cursor-pointer hover:bg-bgPrimary border-l-4 border-l-transparent transition-colors">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-sm font-medium text-textPrimary">Anon-8401</h3>
              <span className="text-[10px] text-textSecondary">Yesterday</span>
            </div>
            <p className="text-xs text-textSecondary line-clamp-1">Has there been any update on this?</p>
          </div>
        </div>
      </div>

      {/* Chat Thread Area */}
      <div className="flex-1 flex flex-col bg-bgPrimary relative min-w-0">
        <div className="h-14 border-b border-borderLight bg-white flex items-center justify-between px-6 flex-shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">
               AN
             </div>
             <div>
                <h2 className="font-semibold text-textPrimary text-sm">Anonymous Submitter</h2>
                <p className="text-[10px] text-textSecondary flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-success rounded-full inline-block"></span> Online now
                </p>
             </div>
          </div>
          <button className="text-xs font-medium text-primary hover:text-primary-dark px-3 py-1.5 bg-primary/10 rounded-lg transition-colors">
            View Report #RPT-8422
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
           {/* Date Divider */}
           <div className="flex justify-center">
             <span className="bg-borderLight/50 text-textSecondary text-[10px] px-3 py-1 rounded-full font-medium">
               Today
             </span>
           </div>

           {/* User Message */}
           <div className="flex gap-4 max-w-2xl">
             <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 text-white flex items-center justify-center font-bold text-xs mt-1">AN</div>
             <div>
               <div className="bg-white border border-borderLight rounded-2xl rounded-tl-sm p-4 text-sm text-textPrimary shadow-sm">
                 I am reporting a severe safety concern that occurred yesterday in Lab 4 during the afternoon shift.
               </div>
               <span className="text-[10px] text-textSecondary mt-1 block">9:41 AM</span>
             </div>
           </div>

           {/* Admin Message */}
           <div className="flex gap-4 max-w-2xl ml-auto flex-row-reverse">
             <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 text-white flex items-center justify-center font-bold text-xs mt-1">AD</div>
             <div className="flex flex-col items-end">
               <div className="bg-primary text-white rounded-2xl rounded-tr-sm p-4 text-sm shadow-sm">
                 Thank you for reporting this. We take safety concerns very seriously. Can you confirm if anyone was injured?
               </div>
               <span className="text-[10px] text-textSecondary mt-1 block">9:45 AM</span>
             </div>
           </div>

           {/* Internal Note in Chat */}
           <div className="flex justify-center my-4">
              <div className="bg-accent/10 border border-accent/30 text-textPrimary text-xs px-4 py-2 rounded-lg max-w-md flex items-center gap-2">
                 <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
                 Internal Action: Maintenance notified to inspect Lab 4 equipment.
              </div>
           </div>

           {/* User Message */}
           <div className="flex gap-4 max-w-2xl">
             <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 text-white flex items-center justify-center font-bold text-xs mt-1">AN</div>
             <div>
               <div className="bg-white border border-borderLight rounded-2xl rounded-tl-sm p-4 text-sm text-textPrimary shadow-sm">
                 No injuries, but it was close. Thank you for letting me know. I can provide photos if needed.
               </div>
               <span className="text-[10px] text-textSecondary mt-1 block">10:02 AM</span>
             </div>
           </div>
        </div>

        {/* Composer */}
        <div className="p-4 bg-white border-t border-borderLight">
          <div className="max-w-4xl mx-auto">
            {/* Context switch tabs */}
            <div className="flex gap-4 mb-2 px-1">
              <button
                onClick={() => setIsInternalMode(false)}
                className={`text-xs font-semibold uppercase tracking-wider transition-colors ${!isInternalMode ? 'text-primary' : 'text-textSecondary hover:text-textPrimary'}`}
              >
                Reply to User
              </button>
              <button
                onClick={() => setIsInternalMode(true)}
                className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors ${isInternalMode ? 'text-accent' : 'text-textSecondary hover:text-textPrimary'}`}
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Add Internal Note
              </button>
            </div>

            <div className={`relative border rounded-xl overflow-hidden transition-colors ${isInternalMode ? 'border-accent bg-accent/5' : 'border-borderLight focus-within:border-primary'}`}>
               <textarea
                 rows={3}
                 className="w-full p-3 outline-none resize-none text-sm bg-transparent placeholder:text-textSecondary"
                 placeholder={isInternalMode ? "Type an internal note (only visible to admins)..." : "Type your reply to the anonymous user..."}
               ></textarea>
               <div className="flex justify-between items-center px-3 py-2 border-t border-borderLight/50 bg-bgPrimary/50">
                  <div className="flex gap-2">
                     <button className="p-1.5 text-textSecondary hover:text-primary rounded transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                     </button>
                  </div>
                  <button className={`px-4 py-1.5 text-sm font-medium text-white rounded-lg transition-colors ${isInternalMode ? 'bg-accent hover:bg-accent-soft' : 'bg-primary hover:bg-primary-dark'}`}>
                     {isInternalMode ? 'Save Note' : 'Send Reply'}
                  </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
