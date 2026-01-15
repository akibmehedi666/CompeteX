"use client";

import { motion } from "framer-motion";
import { Briefcase, Search, UserCheck, Star, Users, Download, MessageSquare } from "lucide-react";
import { User } from "@/types";
import { cn } from "@/lib/utils";

interface RecruiterDashboardProps {
    user: User;
}

export function RecruiterDashboard({ user }: RecruiterDashboardProps) {
    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Recruitment Hub</h1>
                    <p className="text-gray-400">Find and connect with top tech talent.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-6 py-2 bg-purple-600 text-white font-bold uppercase tracking-wider rounded-lg hover:bg-purple-500 transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)] flex items-center gap-2">
                        <Search className="w-4 h-4" /> scout Talent
                    </button>
                    <button className="px-6 py-2 bg-white/5 text-white font-bold uppercase tracking-wider rounded-lg hover:bg-white/10 transition-all border border-white/10">
                        Post Job
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatCard
                    icon={Briefcase}
                    label="Open Positions"
                    value="5"
                    color="text-purple-400"
                    bg="bg-purple-500/10"
                    border="border-purple-500/20"
                />
                <StatCard
                    icon={UserCheck}
                    label="Candidates Hired"
                    value="24"
                    color="text-green-400"
                    bg="bg-green-500/10"
                    border="border-green-500/20"
                />
                <StatCard
                    icon={Star}
                    label="Saved Profiles"
                    value="142"
                    color="text-yellow-400"
                    bg="bg-yellow-500/10"
                    border="border-yellow-500/20"
                />
                <StatCard
                    icon={Users}
                    label="Pipeline Size"
                    value="1.2k"
                    color="text-blue-400"
                    bg="bg-blue-500/10"
                    border="border-blue-500/20"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Top Candidates */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Star className="w-5 h-5 text-purple-500" /> Top Matches
                        </h2>
                        <button className="text-sm text-purple-400 hover:text-purple-300">View All</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { name: "Sarah Connor", role: "Full Stack Dev", skill: "React, Node", match: "98%" },
                            { name: "John Wick", role: "Cybersecurity", skill: "Pen Testing", match: "95%" },
                            { name: "Ellen Ripley", role: "DevOps Eng", skill: "AWS, Docker", match: "92%" },
                            { name: "Tony Stark", role: "AI Engineer", skill: "Python, PyTorch", match: "99%" },
                        ].map((candidate, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all hover:border-purple-500/30 group"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
                                        {candidate.name[0]}
                                    </div>
                                    <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">
                                        {candidate.match} Match
                                    </span>
                                </div>
                                <h3 className="font-bold text-white">{candidate.name}</h3>
                                <div className="text-sm text-gray-400 mb-4">{candidate.role}</div>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-xs text-gray-500 bg-black/30 px-2 py-1 rounded">{candidate.skill}</span>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1.5 bg-purple-500/20 text-purple-400 rounded hover:bg-purple-500 hover:text-white">
                                            <MessageSquare className="w-4 h-4" />
                                        </button>
                                        <button className="p-1.5 bg-white/10 text-gray-300 rounded hover:bg-white/20">
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Pipeline Activity */}
                <div className="lg:col-span-1 space-y-6">
                    <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">

                        <div className="space-y-4">
                            {[
                                { action: "Applied to", job: "Frontend Dev", user: "Alex Chen", time: "2h ago" },
                                { action: "Interview with", job: "Backend Lead", user: "Sarah Smith", time: "5h ago" },
                                { action: "Accepted offer", job: "UI Designer", user: "Mike Ross", time: "1d ago" },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-3 relative pl-4 border-l border-white/10">
                                    <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-purple-500" />
                                    <div>
                                        <p className="text-sm text-gray-300">
                                            <span className="font-bold text-white">{item.user}</span> {item.action} <span className="text-purple-400">{item.job}</span>
                                        </p>
                                        <span className="text-xs text-gray-600">{item.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-white/10">
                            <h4 className="text-sm font-bold text-white mb-2">Your Job Posts</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-gray-400 hover:text-white cursor-pointer">
                                    <span>Senior React Dev</span>
                                    <span className="text-green-400">12 New</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-400 hover:text-white cursor-pointer">
                                    <span>Product Manager</span>
                                    <span className="text-green-400">5 New</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

function StatCard({ icon: Icon, label, value, color, bg, border }: any) {
    return (
        <div className={cn("p-6 rounded-xl border bg-backdrop-blur-sm", bg, border)}>
            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-3 bg-black/40", color)}>
                <Icon className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{value}</div>
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</div>
        </div>
    );
}
