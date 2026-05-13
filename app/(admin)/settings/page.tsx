"use client";

import React, { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General" },
    { id: "roles", label: "Roles & Permissions" },
    { id: "notifications", label: "Notifications" },
    { id: "security", label: "Security & Audit" },
    { id: "branding", label: "Branding" },
  ];

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-6 pb-6 border-b border-borderLight">
        <h1 className="text-2xl font-semibold text-textPrimary">Platform Settings</h1>
        <p className="text-sm text-textSecondary mt-1">
          Manage your organization's configuration, users, and security preferences.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Navigation */}
        <div className="w-full md:w-64 flex-shrink-0">
          <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-sm font-medium rounded-lg text-left whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary border-l-2 border-l-primary md:border-l-2"
                    : "text-textSecondary hover:bg-bgPrimary hover:text-textPrimary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content Areas */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-borderLight min-h-[500px]">
          {activeTab === "general" && (
            <div className="p-6 md:p-8 space-y-6">
              <h2 className="text-lg font-medium text-textPrimary border-b border-borderLight pb-4">
                General Information
              </h2>

              <div className="max-w-xl space-y-4">
                <div>
                  <label className="block text-sm font-medium text-textPrimary mb-1">Organization Name</label>
                  <input
                    type="text"
                    defaultValue="University of Ghana"
                    className="w-full px-3 py-2.5 border border-borderLight rounded-lg text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-textPrimary mb-1">Support Contact Email</label>
                  <input
                    type="email"
                    defaultValue="ashc@ug.edu.gh"
                    className="w-full px-3 py-2.5 border border-borderLight rounded-lg text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                  <p className="text-xs text-textSecondary mt-1">Used for system notification replies.</p>
                </div>

                <div className="pt-4">
                  <label className="block text-sm font-medium text-textPrimary mb-1">Data Retention Period</label>
                  <select className="w-full px-3 py-2.5 border border-borderLight rounded-lg text-sm outline-none focus:border-primary">
                    <option>1 Year</option>
                    <option>3 Years</option>
                    <option>5 Years (Compliance Mode)</option>
                    <option>Indefinite</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 border-t border-borderLight flex justify-end">
                <button className="bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors shadow-sm">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "roles" && (
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center border-b border-borderLight pb-4 mb-6">
                <h2 className="text-lg font-medium text-textPrimary">User Management</h2>
                <button className="bg-primary text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors shadow-sm">
                  + Add User
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-borderLight">
                <table className="w-full text-sm text-left">
                  <thead className="bg-bgPrimary text-textSecondary uppercase text-xs">
                    <tr>
                      <th className="px-6 py-3 font-medium">Name</th>
                      <th className="px-6 py-3 font-medium">Role</th>
                      <th className="px-6 py-3 font-medium">Status</th>
                      <th className="px-6 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-borderLight">
                    <tr className="hover:bg-bgPrimary/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-textPrimary">Jane Admin</td>
                      <td className="px-6 py-4">System Administrator</td>
                      <td className="px-6 py-4"><span className="text-success bg-success/10 px-2 py-1 rounded-full text-xs font-medium">Active</span></td>
                      <td className="px-6 py-4 text-primary font-medium cursor-pointer hover:text-primary-dark transition-colors">Edit</td>
                    </tr>
                    <tr className="hover:bg-bgPrimary/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-textPrimary">John Investigator</td>
                      <td className="px-6 py-4">Support Agent</td>
                      <td className="px-6 py-4"><span className="text-success bg-success/10 px-2 py-1 rounded-full text-xs font-medium">Active</span></td>
                      <td className="px-6 py-4 text-primary font-medium cursor-pointer hover:text-primary-dark transition-colors">Edit</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {["notifications", "security", "branding"].includes(activeTab) && (
            <div className="p-6 md:p-8 flex flex-col items-center justify-center h-full min-h-[400px]">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                 <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z m-2.071 8.527a3 3 0 114.243-4.243 3 3 0 01-4.243 4.243z" />
                 </svg>
              </div>
              <h3 className="text-lg font-medium text-textPrimary">Configuration Available</h3>
              <p className="text-sm text-textSecondary max-w-sm text-center mt-2">
                This section manages {activeTab} settings for your SecureGuard instance.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
