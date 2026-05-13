"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  Clock3,
  Filter,
  Layers3,
  MoreHorizontal,
  RefreshCw,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  TriangleAlert,
  Workflow,
  ShieldCheck,
  Activity,
  Database,
  WandSparkles,
  Globe,
  FileText,
  Search,
} from "lucide-react";

type Report = {
  id: string;
  title: string;
  category: string;
  status: string;
  priority: string;
  createdAt: string;
};

const categories = ["Sexual Harassment", "Safety Concern", "Policy Violation", "Stalking / Bullying", "Other"];
const statusOrder = ["New", "In Progress", "Escalated", "Resolved"];

const statusTone: Record<string, string> = {
  New: "bg-sky-500/12 text-sky-700 border-sky-500/15 dark:text-sky-300 dark:bg-sky-400/12",
  "In Progress": "bg-blue-500/12 text-blue-700 border-blue-500/15 dark:text-blue-300 dark:bg-blue-400/12",
  Escalated: "bg-rose-500/12 text-rose-700 border-rose-500/15 dark:text-rose-300 dark:bg-rose-400/12",
  Resolved: "bg-emerald-500/12 text-emerald-700 border-emerald-500/15 dark:text-emerald-300 dark:bg-emerald-400/12",
};

const priorityTone: Record<string, string> = {
  Critical: "bg-rose-500/12 text-rose-700 border-rose-500/15 dark:text-rose-300 dark:bg-rose-400/12",
  High: "bg-amber-500/12 text-amber-700 border-amber-500/15 dark:text-amber-300 dark:bg-amber-400/12",
  Medium: "bg-slate-500/12 text-slate-700 border-slate-500/15 dark:text-slate-300 dark:bg-slate-400/12",
  Low: "bg-emerald-500/12 text-emerald-700 border-emerald-500/15 dark:text-emerald-300 dark:bg-emerald-400/12",
};

export default function DashboardPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch("/api/reports")
      .then((response) => response.json())
      .then((data) => {
        if (!active) return;
        setReports(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!active) return;
        setReports([]);
      })
      .finally(() => {
        if (!active) return;
        setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const stats = useMemo(() => {
    const total = reports.length;
    const activeCases = reports.filter((report) => report.status !== "Resolved").length;
    const escalated = reports.filter((report) => report.status === "Escalated").length;
    const newCount = reports.filter((report) => report.status === "New").length;
    const resolved = reports.filter((report) => report.status === "Resolved").length;
    const inProgress = reports.filter((report) => report.status === "In Progress").length;
    const avgPriority = total
      ? Math.round(
          (reports.reduce((score, report) => {
            if (report.priority === "Critical") return score + 4;
            if (report.priority === "High") return score + 3;
            if (report.priority === "Medium") return score + 2;
            return score + 1;
          }, 0) /
            total) *
            25
        )
      : 0;

    return { total, activeCases, escalated, newCount, resolved, inProgress, avgPriority };
  }, [reports]);

  const categoriesWithCounts = useMemo(
    () => categories.map((category) => ({ name: category, count: reports.filter((report) => report.category === category).length })),
    [reports]
  );

  const weeklySeries = [22, 31, 29, 46, 55, 49, 62, 57, 71, 66, 84, 79, 95, 88, 104, 112];

  const activityFeed = [
    { title: "Escalation spike detected", meta: "3 cases moved to priority review in the last 6h", tone: "text-rose-600 dark:text-rose-300", icon: TriangleAlert },
    { title: "Queue stabilization", meta: "Analyst throughput is up 18% versus yesterday", tone: "text-sky-600 dark:text-sky-300", icon: Workflow },
    { title: "Compliance sync completed", meta: "Evidence ledger updated and archived successfully", tone: "text-emerald-600 dark:text-emerald-300", icon: ShieldCheck },
  ];

  const recentReports = reports.slice(0, 8);
  const inProgress = stats.inProgress;
  const resolved = stats.resolved;

  const timeAgo = (iso: string) => {
    const age = Date.now() - new Date(iso).getTime();
    if (Number.isNaN(age)) return "Just now";
    if (age < 3600000) return `${Math.max(1, Math.round(age / 60000))}m ago`;
    if (age < 86400000) return `${Math.max(1, Math.round(age / 3600000))}h ago`;
    return `${Math.max(1, Math.round(age / 86400000))}d ago`;
  };

  return (
    <div className="relative min-h-full overflow-hidden bg-bgPrimary text-textPrimary">
      <div className="absolute inset-0 dashboard-noise opacity-100 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[-8rem] top-[-6rem] h-96 w-96 rounded-md bg-primary/10 blur-3xl" />
        <div className="absolute right-[-5rem] top-24 h-96 w-96 rounded-md bg-accent/10 blur-3xl" />
        <div className="absolute bottom-[-8rem] left-1/3 h-[28rem] w-[28rem] rounded-md bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1640px] space-y-5 px-4 py-5 lg:px-6 lg:py-6">
        <section className="overflow-hidden rounded-md border border-borderLight/80 bg-bgSurface/85 shadow-sm backdrop-blur-2xl dark:shadow-sm">
          <div className="flex flex-col gap-4 border-b border-borderLight/70 px-6 py-5 lg:flex-row lg:items-end lg:justify-between lg:px-7">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-md border border-borderLight/70 bg-white/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-textSecondary shadow-sm dark:bg-white/5">
                <ShieldAlert className="h-3.5 w-3.5 text-info" />
                Security operations
              </div>
              <div>
                <h2 className="text-3xl font-semibold tracking-tight lg:text-[34px]">Operational intelligence at a glance</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-textSecondary lg:text-[15px]">
                  Executive visibility into case velocity, escalation pressure, and remediation progress across the active queue.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Pill icon={<RefreshCw className="h-3.5 w-3.5" />} label="Synced 12s ago" />
              <Pill icon={<Layers3 className="h-3.5 w-3.5" />} label="SOC workspace" />
              <Pill icon={<Activity className="h-3.5 w-3.5" />} label="Live monitoring" />
            </div>
          </div>

          <div className="grid gap-4 px-6 py-6 sm:grid-cols-2 xl:grid-cols-4 lg:px-7">
            <KpiCard
              title="Total Reports"
              value={String(stats.total)}
              delta="+12% from last week"
              trend={weeklySeries}
              accent="from-primary to-primary-dark"
              icon={<TrendingUp className="h-4 w-4" />}
            />
            <KpiCard
              title="Active Cases"
              value={String(stats.activeCases)}
              delta="-5% from last week"
              trend={weeklySeries.slice().reverse()}
              accent="from-primary to-primary-dark"
              icon={<ArrowUpRight className="h-4 w-4" />}
            />
            <KpiCard
              title="Escalated"
              value={String(stats.escalated)}
              delta="+2 since yesterday"
              trend={weeklySeries.map((value, index) => (index % 3 === 0 ? value + 12 : value - 3))}
              accent="from-accent to-accent/80"
              critical
              icon={<TriangleAlert className="h-4 w-4" />}
            />
            <KpiCard
              title="Resolved"
              value={String(resolved)}
              delta="+8% from last week"
              trend={weeklySeries.map((value) => value + 10)}
              accent="from-primary to-primary-dark"
              icon={<ArrowDownRight className="h-4 w-4" />}
            />
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.45fr_0.85fr_0.8fr]">
          <Panel title="Incident trends" subtitle="30-day case velocity with surface-glow analytics" action={<Pill icon={<TrendingUp className="h-3.5 w-3.5" />} label="Incidents" />}>
            <TrendChart data={weeklySeries} />
          </Panel>

          <Panel title="Category breakdown" subtitle="Case mix across the operational queue">
            <DonutPanel counts={categoriesWithCounts} total={stats.total} />
          </Panel>

          <Panel title="Status" subtitle="Queue health and SLA coverage">
            <StatusPanel stats={stats} />
          </Panel>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.55fr_0.95fr]">
          <Panel title="Recent reports" subtitle="High-fidelity incident log with live status context" action={<ToolbarButton icon={<Filter className="h-4 w-4" />} label="Filter" />}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] text-left text-sm">
                <thead className="sticky top-0 z-10 bg-bgSurface/95 text-[11px] uppercase tracking-[0.16em] text-textSecondary backdrop-blur-xl">
                  <tr className="border-b border-borderLight/70">
                    <th className="px-6 py-4 lg:px-7 font-medium">Case ID</th>
                    <th className="px-6 py-4 lg:px-7 font-medium">Category</th>
                    <th className="px-6 py-4 lg:px-7 font-medium">Priority</th>
                    <th className="px-6 py-4 lg:px-7 font-medium">Status</th>
                    <th className="px-6 py-4 lg:px-7 font-medium">Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-borderLight/70">
                  {isLoading && (
                    <tr>
                      <td colSpan={5} className="px-6 py-16 text-center text-textSecondary lg:px-7">
                        Loading operational data...
                      </td>
                    </tr>
                  )}

                  {!isLoading && recentReports.map((report, index) => (
                    <tr key={report.id} className="group transition-all duration-200 hover:bg-primary/4 dark:hover:bg-white/4">
                      <td className="px-6 py-4 lg:px-7">
                        <div className="font-medium text-primary">{report.id}</div>
                        <div className="mt-1 text-xs text-textSecondary">#{String(index + 1).padStart(2, "0")}</div>
                      </td>
                      <td className="px-6 py-4 lg:px-7 text-textPrimary">{report.category}</td>
                      <td className="px-6 py-4 lg:px-7">
                        <span className={`inline-flex items-center rounded-md border px-3 py-1 text-xs font-medium ${priorityTone[report.priority] ?? priorityTone.Medium}`}>
                          {report.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 lg:px-7">
                        <span className={`inline-flex items-center rounded-md border px-3 py-1 text-xs font-medium ${statusTone[report.status] ?? "border-borderLight bg-bgPrimary text-textSecondary"}`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 lg:px-7 text-textSecondary">{timeAgo(report.createdAt)}</td>
                    </tr>
                  ))}

                  {!isLoading && recentReports.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-16 text-center text-textSecondary lg:px-7">
                        No reports are available yet. Once reports are submitted, they will appear here.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Panel>

          <Panel title="Live activity feed" subtitle="Recent operations and analyst signals">
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                {activityFeed.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="group rounded-md border border-borderLight/70 bg-white/65 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm dark:bg-white/4">
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 flex h-11 w-11 items-center justify-center rounded-md ${index === 0 ? "bg-rose-500/10 text-rose-600 dark:text-rose-300" : index === 1 ? "bg-sky-500/10 text-sky-600 dark:text-sky-300" : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"}`}>
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={`text-sm font-medium ${item.tone}`}>{item.title}</p>
                          <p className="mt-1 text-sm leading-6 text-textSecondary">{item.meta}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-md border border-dashed border-borderLight/80 bg-bgPrimary/55 p-4 shadow-inner shadow-white/40 dark:bg-white/3">
                <p className="text-[11px] uppercase tracking-[0.24em] text-textSecondary">Quick actions</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <ActionChip label="Create case" />
                  <ActionChip label="Import evidence" />
                  <ActionChip label="Invite analyst" />
                  <ActionChip label="Open settings" />
                </div>
              </div>

              <div className="rounded-md border border-borderLight/70 bg-gradient-to-br from-bgSurface via-white/75 to-bgPrimary/70 p-5 shadow-sm dark:from-white/5 dark:via-white/4 dark:to-white/3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-textPrimary">Risk index</p>
                    <p className="mt-1 text-xs text-textSecondary">Based on queue pressure and current escalations</p>
                  </div>
                  <div className="rounded-md border border-borderLight bg-white/75 px-3 py-2 text-right shadow-sm dark:bg-white/5">
                    <p className="text-xs text-textSecondary">Score</p>
                    <p className="text-lg font-semibold text-textPrimary">{stats.avgPriority}%</p>
                  </div>
                </div>
                <div className="mt-4 h-2.5 overflow-hidden rounded-md bg-bgPrimary/80 shadow-inner">
                  <div
                    className="h-full rounded-md bg-[linear-gradient(90deg,#2d7bf4,#69a7ff,#34d399)] shadow-sm transition-all duration-700"
                    style={{ width: `${Math.min(100, Math.max(15, stats.avgPriority || 18))}%` }}
                  />
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-textSecondary">
                  <span>Lower is healthier</span>
                  <span>Operationally tracked</span>
                </div>
              </div>
            </div>
          </Panel>
        </section>
      </div>
    </div>
  );
}

function Panel({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-md border border-borderLight/80 bg-bgSurface/85 shadow-sm backdrop-blur-2xl dark:shadow-sm">
      <div className="flex items-start justify-between gap-4 border-b border-borderLight/70 px-6 py-5 lg:px-7">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          <p className="mt-1 text-sm text-textSecondary">{subtitle}</p>
        </div>
        {action}
      </div>
      <div className="p-6 lg:p-7">{children}</div>
    </section>
  );
}

function ToolbarButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="inline-flex items-center gap-2 rounded-md border border-borderLight bg-white/75 px-3.5 py-2 text-sm shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:bg-white/5">
      <span className="text-textSecondary">{icon}</span>
      {label}
    </button>
  );
}

function Pill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-md border border-borderLight/80 bg-white/70 px-3 py-1.5 text-xs font-medium text-textSecondary shadow-sm dark:bg-white/5">
      <span className="text-primary">{icon}</span>
      {label}
    </div>
  );
}

function ActionChip({ label }: { label: string }) {
  return (
    <button className="rounded-md border border-borderLight bg-white/70 px-3 py-2 text-sm font-medium text-textPrimary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:bg-white/5">
      {label}
    </button>
  );
}

function KpiCard({
  title,
  value,
  delta,
  trend,
  accent,
  icon,
  critical,
}: {
  title: string;
  value: string;
  delta: string;
  trend: number[];
  accent: string;
  icon: React.ReactNode;
  critical?: boolean;
}) {
  const spark = sparkPath(trend);

  return (
    <div className={`group relative overflow-hidden rounded-md border border-borderLight/80 bg-white/70 p-5 shadow-sm backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-sm dark:bg-white/5 ${critical ? "ring-1 ring-rose-500/15" : ""}`}>
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent} opacity-90`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(105,167,255,0.08),transparent_35%)] opacity-70" />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.24em] text-textSecondary">{title}</span>
          <div className="mt-2 text-3xl font-semibold tracking-tight text-textPrimary">{value}</div>
          <div className={`mt-2 inline-flex items-center gap-1.5 text-xs ${critical ? "text-rose-600 font-medium dark:text-rose-300" : "text-textSecondary"}`}>
            <span className="inline-flex h-1.5 w-1.5 rounded-md bg-current opacity-80" />
            {delta}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className={`flex h-10 w-10 items-center justify-center rounded-md border border-borderLight bg-white/80 text-primary shadow-sm transition-all duration-200 group-hover:shadow-md dark:bg-white/10 ${critical ? "text-rose-600 dark:text-rose-300" : ""}`}>
            {icon}
          </div>
          <MiniSparkline path={spark} />
        </div>
      </div>
    </div>
  );
}

function TrendChart({ data }: { data: number[] }) {
  const width = 760;
  const height = 260;
  const paddingX = 18;
  const paddingY = 18;
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = paddingX + (index / Math.max(1, data.length - 1)) * (width - paddingX * 2);
    const normalized = (value - min) / range;
    const y = height - paddingY - normalized * (height - paddingY * 2);
    return { x, y, value };
  });

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  return (
    <div className="relative">
      <div className="mb-3 flex items-center justify-end">
        <ToolbarButton icon={<Search className="h-4 w-4" />} label="Incidents" />
      </div>
      <div className="relative overflow-hidden rounded-md border border-borderLight/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(255,255,255,0.45))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(105,167,255,0.12),transparent_40%)]" />
        <svg viewBox={`0 0 ${width} ${height}`} className="relative h-[280px] w-full">
          <defs>
            <linearGradient id="trendStroke" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="var(--color-primary, #003b7a)" />
              <stop offset="100%" stopColor="var(--color-accent, #c9a24a)" />
            </linearGradient>
            <linearGradient id="trendFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(0,59,122,0.26)" />
              <stop offset="100%" stopColor="rgba(0,59,122,0.02)" />
            </linearGradient>
          </defs>

          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = paddingY + ratio * (height - paddingY * 2);
            return <line key={ratio} x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="rgba(148,163,184,0.18)" strokeDasharray="4 6" />;
          })}

          {[0, 5, 10, 15, 20, 25, 30].map((tick, index) => {
            const x = paddingX + (index / 6) * (width - paddingX * 2);
            return (
              <g key={tick}>
                <line x1={x} y1={height - paddingY} x2={x} y2={height - paddingY + 8} stroke="rgba(148,163,184,0.22)" />
                <text x={x} y={height - 2} textAnchor="middle" fontSize="11" fill="rgba(94,107,130,0.9)">
                  {tick}
                </text>
              </g>
            );
          })}

          <path d={areaPath} fill="url(#trendFill)" />
          <path d={linePath} fill="none" stroke="url(#trendStroke)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-sm" />

          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={index === points.length - 1 ? 5 : 3.5}
              fill={index === points.length - 1 ? "#2d7bf4" : "#69a7ff"}
              stroke="rgba(255,255,255,0.95)"
              strokeWidth="2"
              className="drop-shadow-sm"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

function DonutPanel({ counts, total }: { counts: { name: string; count: number }[]; total: number }) {
  const palette = ["#003b7a", "#002855", "#c9a24a", "#e5c575", "#004a99"];
  const visible = counts.filter((item) => item.count > 0);
  const totalCount = visible.reduce((sum, item) => sum + item.count, 0) || total;

  const segments = visible.map((item, index) => ({
    ...item,
    color: palette[index % palette.length],
    percent: totalCount ? item.count / totalCount : 0,
  }));

  const circumference = 2 * Math.PI * 42;
  let offset = 0;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-center">
        <div className="relative h-44 w-44">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90 drop-shadow-sm">
            <circle cx="60" cy="60" r="42" fill="none" stroke="rgba(148,163,184,0.16)" strokeWidth="16" />
            {segments.map((segment) => {
              const dash = Math.max(1, segment.percent * circumference);
              const currentOffset = circumference - offset * circumference;
              offset += segment.percent;
              return (
                <circle
                  key={segment.name}
                  cx="60"
                  cy="60"
                  r="42"
                  fill="none"
                  stroke={segment.color}
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeDasharray={`${dash} ${circumference - dash}`}
                  strokeDashoffset={currentOffset}
                  className="transition-all duration-700 ease-out"
                  style={{ filter: `drop-shadow(0 0 10px ${segment.color}55)` }}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-md border border-white/60 bg-white/65 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.78)] dark:bg-white/5">
            <div className="text-3xl font-semibold tracking-tight text-textPrimary">{totalCount}</div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.24em] text-textSecondary">Cases</div>
          </div>
        </div>
      </div>

      <div className="grid gap-2">
        {segments.map((segment) => (
          <div key={segment.name} className="flex items-center justify-between rounded-md border border-borderLight/60 bg-white/60 px-3 py-2.5 text-sm shadow-sm dark:bg-white/5">
            <div className="flex min-w-0 items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-md" style={{ backgroundColor: segment.color }} />
              <span className="truncate text-textPrimary">{segment.name}</span>
            </div>
            <div className="text-textSecondary">
              {segment.count}
              <span className="ml-1 text-[11px]">({Math.round(segment.percent * 100)}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusPanel({ stats }: { stats: { total: number; newCount: number; inProgress: number; escalated: number; resolved: number } }) {
  const items = [
    { label: "New", value: stats.newCount, percent: stats.total ? Math.round((stats.newCount / stats.total) * 100) : 0, tone: "from-primary to-primary-dark" },
    { label: "In Progress", value: stats.inProgress, percent: stats.total ? Math.round((stats.inProgress / stats.total) * 100) : 0, tone: "from-primary to-primary-dark" },
    { label: "Escalated", value: stats.escalated, percent: stats.total ? Math.round((stats.escalated / stats.total) * 100) : 0, tone: "from-accent to-accent/80" },
    { label: "Resolved", value: stats.resolved, percent: stats.total ? Math.round((stats.resolved / stats.total) * 100) : 0, tone: "from-primary to-primary-dark" },
  ];

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.label} className="space-y-2 rounded-md border border-borderLight/60 bg-white/60 p-4 shadow-sm dark:bg-white/5">
          <div className="flex items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-2 text-textPrimary">
              <span className={`h-2.5 w-2.5 rounded-md bg-gradient-to-r ${item.tone} shadow-sm`} />
              {item.label}
            </div>
            <div className="text-textSecondary">{item.value}</div>
          </div>
          <div className="h-2.5 overflow-hidden rounded-md bg-bgPrimary/70 shadow-inner">
            <div
              className={`h-full rounded-md bg-gradient-to-r ${item.tone} shadow-sm transition-all duration-500`}
              style={{ width: `${Math.max(4, item.percent)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function MiniSparkline({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 100 36" className="h-8 w-20 overflow-visible">
      <defs>
        <linearGradient id="spark" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="var(--color-primary, #003b7a)" />
          <stop offset="100%" stopColor="var(--color-accent, #c9a24a)" />
        </linearGradient>
      </defs>
      <path d={path} fill="none" stroke="url(#spark)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-sm" />
    </svg>
  );
}

function sparkPath(values: number[]) {
  const width = 100;
  const height = 36;
  const padding = 4;
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;

  return values
    .map((value, index) => {
      const x = padding + (index / Math.max(1, values.length - 1)) * (width - padding * 2);
      const normalized = (value - min) / range;
      const y = height - padding - normalized * (height - padding * 2);
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}
