"use client";

import React, { useEffect, useState } from "react";

type Report = {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  priority: string;
  anonymous: boolean;
  createdAt: string;
};

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(true);

  useEffect(() => {
    fetch("/api/reports").then(r => r.json()).then((data) => {
      setReports(data);
      if (data.length) setSelectedId(data[0].id);
    });
  }, []);

  const selected = reports.find(r => r.id === selectedId);

  const updateStatus = async (status: string) => {
    if (!selected) return;
    await fetch("/api/reports", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: selected.id, status }),
    });
    setReports(prev => prev.map(r => r.id === selected.id ? { ...r, status } : r));
  };

  const timeAgo = (iso: string) => {
    const ms = Date.now() - new Date(iso).getTime();
    if (ms < 3600000) return `${Math.round(ms / 60000)}m ago`;
    if (ms < 86400000) return `${Math.round(ms / 3600000)}h ago`;
    return `${Math.round(ms / 86400000)}d ago`;
  };

  return (
    <div className="h-full flex overflow-hidden">
      {/* Left List Panel */}
      <div className="w-80 border-r border-borderLight bg-white flex flex-col flex-shrink-0 z-10">
        <div className="p-4 border-b border-borderLight">
          <h2 className="font-semibold text-textPrimary">Reports ({reports.length})</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {reports.map((r) => (
            <div
              key={r.id}
              onClick={() => setSelectedId(r.id)}
              className={`p-4 border-b border-borderLight cursor-pointer transition-colors ${
                selectedId === r.id ? "bg-primary/5 border-l-4 border-l-primary" : "hover:bg-bgPrimary border-l-4 border-l-transparent"
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-medium text-textSecondary">{r.id}</span>
                <span className="text-xs text-textSecondary">{timeAgo(r.createdAt)}</span>
              </div>
              <h3 className="text-sm font-medium text-textPrimary mb-2 line-clamp-1">{r.title}</h3>
              <div className="flex gap-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  r.priority === "Critical" ? "bg-error/10 text-error" : r.priority === "High" ? "bg-warning/10 text-warning" : "bg-success/10 text-success"
                }`}>{r.priority}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-bgPrimary text-textSecondary font-medium border border-borderLight">{r.status}</span>
              </div>
            </div>
          ))}
          {reports.length === 0 && (
            <div className="p-6 text-center text-sm text-textSecondary">No reports yet.</div>
          )}
        </div>
      </div>

      {/* Center Detail Panel */}
      <div className="flex-1 flex flex-col bg-bgPrimary relative min-w-0">
        {selected ? (
          <>
            <div className="h-14 border-b border-borderLight bg-white flex items-center justify-between px-6 flex-shrink-0">
              <div className="flex items-center gap-3">
                <h2 className="font-semibold text-textPrimary">{selected.title}</h2>
                <span className="text-xs text-textSecondary">{selected.id}</span>
              </div>
              <button onClick={() => setPanelOpen(!panelOpen)} className={`p-1.5 rounded-lg transition-colors ${panelOpen ? "text-primary bg-primary/10" : "text-textSecondary hover:bg-bgPrimary"}`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 lg:p-8">
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-borderLight p-6">
                  <div className="flex items-center gap-3 mb-6 pb-6 border-b border-borderLight">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">AN</div>
                    <div>
                      <p className="font-medium text-textPrimary text-sm">{selected.anonymous ? "Anonymous Submitter" : "Identified Submitter"}</p>
                      <p className="text-xs text-textSecondary">{selected.category} • {timeAgo(selected.createdAt)}</p>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-textPrimary mb-4">Report Details</h3>
                  <div className="prose prose-sm text-textSecondary max-w-none">
                    <p>{selected.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-textSecondary text-sm">
            Select a report to view details
          </div>
        )}
      </div>

      {/* Right Action Panel */}
      {panelOpen && selected && (
        <div className="w-80 border-l border-borderLight bg-white flex flex-col flex-shrink-0 z-10">
          <div className="h-14 border-b border-borderLight flex items-center px-4">
            <h3 className="font-semibold text-textPrimary text-sm">Case Management</h3>
          </div>
          <div className="p-5 space-y-6 overflow-y-auto">
            <div>
              <label className="block text-xs font-medium text-textSecondary uppercase mb-2">Status</label>
              <select
                value={selected.status}
                onChange={(e) => updateStatus(e.target.value)}
                className="w-full border border-borderLight rounded-lg px-3 py-2 text-sm bg-bgPrimary text-textPrimary outline-none focus:border-primary"
              >
                <option>New</option>
                <option>In Progress</option>
                <option>Escalated</option>
                <option>Resolved</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-textSecondary uppercase mb-2">Priority</label>
              <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                selected.priority === "Critical" ? "bg-error/10 text-error" : selected.priority === "High" ? "bg-warning/10 text-warning" : "bg-bgPrimary text-textSecondary"
              }`}>{selected.priority}</span>
            </div>
            <div>
              <label className="block text-xs font-medium text-textSecondary uppercase mb-2">Category</label>
              <span className="text-sm text-textPrimary">{selected.category}</span>
            </div>
            <hr className="border-borderLight" />
            <div>
              <button className="w-full bg-primary text-white rounded-lg py-2 text-sm font-medium hover:bg-primary-dark transition-colors">
                Open in Support Chat
              </button>
              <button
                onClick={() => updateStatus("Escalated")}
                className="w-full mt-2 bg-white border border-error text-error rounded-lg py-2 text-sm font-medium hover:bg-error/5 transition-colors"
              >
                Escalate Case
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
