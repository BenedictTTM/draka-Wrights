"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, ChevronDown, Circle, Command, LayoutDashboard, LifeBuoy, LockKeyhole, Search, Settings, Shield, Sparkles, UserCircle2 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-bgPrimary text-textPrimary">
      {/* Sidebar */}
      <aside className="w-68 flex-shrink-0 bg-primary text-white flex flex-col relative z-20 border-r border-primary-dark shadow-[0_24px_80px_rgba(0,59,122,0.18)]">
        <div className="absolute inset-0 bg-gradient-to-b from-primary to-primary-dark" />
        <div className="relative h-20 flex items-center px-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.15)]">
              <Shield className="w-5 h-5 text-accent" />
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-primary" />
            </div>
            <div>
              <div className="text-lg font-semibold tracking-tight leading-none">SecureGuard</div>
              <div className="text-xs text-white/55 mt-1 flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" />Enterprise SOC</div>
            </div>
          </div>
        </div>

        <div className="relative p-4 flex-1 overflow-y-auto">
          <div className="mb-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">Workspace</p>
            <div className="mt-2 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">UG Security Ops</p>
                <p className="text-xs text-white/50">Live monitoring enabled</p>
              </div>
              <Circle className="w-3 h-3 fill-accent text-accent" />
            </div>
          </div>

          <div className="space-y-1.5">
            <SidebarItem href="/dashboard" label="Dashboard" icon="dashboard" active={pathname === "/dashboard"} />
            <SidebarItem href="/reports" label="Reports" icon="reports" active={pathname === "/reports"} />
            <SidebarItem href="/chat" label="Support Chat" icon="chat" active={pathname === "/chat"} />
            <SidebarItem href="/settings" label="Settings" icon="settings" active={pathname === "/settings"} />
          </div>

          <div className="mt-6 border-t border-white/10 pt-5 space-y-3">
            <div className="flex items-center justify-between text-xs text-white/45 uppercase tracking-[0.22em] px-1">
              <span>Operations</span>
              <Command className="w-3.5 h-3.5" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <QuickAction icon={<LifeBuoy className="w-4 h-4" />} label="Triage" />
              <QuickAction icon={<LockKeyhole className="w-4 h-4" />} label="Audit" />
            </div>
          </div>
        </div>

        <div className="relative p-4 border-t border-white/10 bg-white/5 backdrop-blur-md">
          <div className="flex items-center gap-3 rounded-2xl bg-white/7 border border-white/10 px-3 py-3 shadow-inner shadow-black/20">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-semibold text-sm shadow-[0_0_20px_rgba(201,162,74,0.3)]">
                AD
              </div>
              <span className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium leading-tight">Admin User</p>
              <p className="text-xs text-white/55 truncate">System Admin</p>
            </div>
            <ChevronDown className="w-4 h-4 text-white/45" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 border-b border-borderLight/70 flex items-center justify-between px-6 lg:px-8 z-10 flex-shrink-0 bg-bgSurface/80 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.55)_inset,0_12px_40px_rgba(10,18,32,0.04)]">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-textSecondary">Command Center</p>
              <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
            </div>
            <div className="hidden xl:flex items-center gap-2 rounded-full border border-borderLight bg-white/70 px-3 py-1.5 text-xs text-textSecondary shadow-sm">
              <Circle className="w-2.5 h-2.5 fill-accent text-accent" />
              Live monitoring active
            </div>
          </div>

          <div className="flex items-center gap-3 min-w-0">
            <div className="hidden md:flex items-center gap-2 rounded-full border border-borderLight bg-bgPrimary/90 px-3 py-1.5 text-xs text-textSecondary shadow-inner shadow-white/70">
              <Command className="w-3.5 h-3.5" />
              Cmd+K
            </div>
            <div className="relative w-[min(42vw,480px)] hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-textSecondary" />
              <input
                type="text"
                placeholder="Search reports, messages, users..."
                className="w-full h-11 pl-11 pr-4 rounded-full border border-borderLight/80 bg-white/75 text-sm outline-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.85),0_14px_30px_rgba(10,18,32,0.05)] focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
              />
            </div>
            <IconButton icon={<Bell className="w-4.5 h-4.5" />} badge />
            <IconButton icon={<UserCircle2 className="w-4.5 h-4.5" />} />
            <button
              onClick={handleLogout}
              className="hidden lg:inline-flex items-center gap-2 rounded-full border border-borderLight bg-white/75 px-4 py-2 text-sm font-medium text-textPrimary shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              Log out
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-bgPrimary">
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ href, label, icon, active }: { href: string; label: string; icon: string; active: boolean }) {
  const icons: Record<string, React.ReactNode> = {
    dashboard: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    ),
    reports: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    ),
    chat: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    ),
    settings: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z m-2.071 8.527a3 3 0 114.243-4.243 3 3 0 01-4.243 4.243z" />
    )
  };

  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
        active
          ? "text-white bg-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_12px_24px_rgba(0,0,0,0.12)]"
          : "text-white/68 hover:text-white hover:bg-white/8 hover:translate-x-0.5"
      }`}
    >
      {active && <span className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-accent shadow-[0_0_16px_rgba(109,163,255,0.8)]" />}
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {icons[icon]}
      </svg>
      {label}
    </Link>
  );
}

function QuickAction({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/6 px-3 py-2 text-sm text-white/78 transition-all hover:bg-white/10 hover:text-white">
      <span className="text-accent">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function IconButton({ icon, badge }: { icon: React.ReactNode; badge?: boolean }) {
  return (
    <button className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-borderLight bg-white/75 text-textPrimary shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      {icon}
      {badge && <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-error ring-2 ring-white" />}
    </button>
  );
}
