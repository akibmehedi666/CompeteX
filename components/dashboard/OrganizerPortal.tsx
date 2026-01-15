"use client";

import { useState } from "react";
import { Plus, Users, Calendar, TrendingUp, LayoutDashboard, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { EventCreationWizard } from "@/components/organizer/EventCreationWizard";
import { ParticipantManager } from "@/components/organizer/ParticipantManager";
import { EventAnalytics } from "@/components/organizer/EventAnalytics";

export function OrganizerPortal() {
    const [activeTab, setActiveTab] = useState<"overview" | "participants" | "analytics" | "create">("overview");
    const [showWizard, setShowWizard] = useState(false);

    if (showWizard) {
        return (
            <EventCreationWizard
                onComplete={() => setShowWizard(false)}
                onCancel={() => setShowWizard(false)}
            />
        );
    }

    return (
        <div className="min-h-screen">
            {/* Top Navigation Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Organizer Dashboard</h1>
                    <p className="text-gray-400">Manage your events, track performance, and engage with participants.</p>
                </div>
                <button
                    onClick={() => setShowWizard(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-accent1 text-black rounded-xl font-bold uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                >
                    <Plus className="w-5 h-5" /> Create Event
                </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-8 border-b border-white/10 overflow-x-auto">
                <TabButton
                    active={activeTab === "overview"}
                    onClick={() => setActiveTab("overview")}
                    icon={LayoutDashboard}
                    label="Overview"
                />
                <TabButton
                    active={activeTab === "participants"}
                    onClick={() => setActiveTab("participants")}
                    icon={Users}
                    label="Participants"
                />
                <TabButton
                    active={activeTab === "analytics"}
                    onClick={() => setActiveTab("analytics")}
                    icon={TrendingUp}
                    label="Analytics"
                />
                <TabButton
                    active={false}
                    onClick={() => { }}
                    icon={Settings}
                    label="Settings"
                    disabled
                />
            </div>

            {/* Content Area */}
            <div className="animate-in fade-in zoom-in-95 duration-300">
                {activeTab === "overview" && <OverviewTab onAnalytics={() => setActiveTab("analytics")} />}
                {activeTab === "participants" && <ParticipantManager />}
                {activeTab === "analytics" && <EventAnalytics />}
            </div>
        </div>
    );
}

function TabButton({ active, onClick, icon: Icon, label, disabled }: any) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "flex items-center gap-2 px-6 py-4 border-b-2 font-bold text-sm transition-all whitespace-nowrap",
                active
                    ? "border-accent1 text-accent1 bg-accent1/5"
                    : "border-transparent text-gray-400 hover:text-white hover:bg-white/5",
                disabled && "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-gray-400"
            )}
        >
            <Icon className="w-4 h-4" />
            {label}
        </button>
    );
}

function OverviewTab({ onAnalytics }: { onAnalytics: () => void }) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Active Event Card */}
                <div className="md:col-span-2 bg-[#111] border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent1/5 rounded-full blur-[80px]" />

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold uppercase rounded-full border border-green-500/20 mb-3 inline-block">
                                    Live Now
                                </span>
                                <h2 className="text-2xl font-bold text-white mb-1">CyberHack 2025</h2>
                                <p className="text-gray-400 text-sm">Global AI & Cybersecurity Hackathon</p>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold text-white font-mono">1,248</div>
                                <div className="text-xs text-gray-500 uppercase">Registrations</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <StatBox label="Days Left" value="02" />
                            <StatBox label="Teams" value="312" />
                            <StatBox label="Sponsors" value="5" />
                            <StatBox label="Prize Pool" value="$50k" />
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm text-white transition-colors">
                                Manage Event
                            </button>
                            <button
                                onClick={onAnalytics}
                                className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold text-sm text-gray-300 transition-colors"
                            >
                                View Stats
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="font-bold text-white mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <QuickActionButton icon={Users} label="Review New Applications" badge="12" />
                        <QuickActionButton icon={Calendar} label="Update Schedule" />
                        <QuickActionButton icon={LayoutDashboard} label="Judge Dashboard" />
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="font-bold text-white mb-6">Recent Activity</h3>
                <div className="space-y-4">
                    <ActivityItem
                        icon={Users}
                        title="New Team Registered"
                        desc="Team 'Neural Net' joined CyberHack 2025"
                        time="2 mins ago"
                    />
                    <ActivityItem
                        icon={Settings}
                        title="Event Settings Updated"
                        desc="Registration deadline extended by 24 hours"
                        time="1 hour ago"
                    />
                    <ActivityItem
                        icon={TrendingUp}
                        title="Milestone Reached"
                        desc="Crossed 1,000 active participants!"
                        time="3 hours ago"
                        highlight
                    />
                </div>
            </div>
        </div>
    );
}

function StatBox({ label, value }: { label: string, value: string }) {
    return (
        <div className="bg-black/40 rounded-lg p-3 border border-white/5">
            <div className="text-xl font-bold text-white font-mono">{value}</div>
            <div className="text-[10px] text-gray-500 uppercase">{label}</div>
        </div>
    );
}

function QuickActionButton({ icon: Icon, label, badge }: any) {
    return (
        <button className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-colors group">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-gray-300 group-hover:text-white">{label}</span>
            </div>
            {badge && (
                <span className="px-2 py-0.5 bg-accent1 text-black text-[10px] font-bold rounded-full">
                    {badge}
                </span>
            )}
        </button>
    );
}

function ActivityItem({ icon: Icon, title, desc, time, highlight }: any) {
    return (
        <div className="flex gap-4 items-start">
            <div className={cn(
                "w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1",
                highlight ? "bg-accent1/20 text-accent1" : "bg-white/5 text-gray-400"
            )}>
                <Icon className="w-4 h-4" />
            </div>
            <div>
                <h4 className={cn("text-sm font-bold", highlight ? "text-accent1" : "text-white")}>{title}</h4>
                <p className="text-sm text-gray-400">{desc}</p>
                <div className="text-xs text-gray-600 mt-1">{time}</div>
            </div>
        </div>
    );
}

