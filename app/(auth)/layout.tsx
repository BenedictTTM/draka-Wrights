import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-primary-light/30 blur-[100px]" />
        <div className="absolute right-0 bottom-1/4 h-56 w-56 rounded-full bg-accent/8 blur-[80px]" />
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
