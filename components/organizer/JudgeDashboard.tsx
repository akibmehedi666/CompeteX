"use client";

import { useState } from "react";
import { CheckCircle, Clock, Award, ChevronRight, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data
const SUBMISSIONS = [
    { id: 1, team: "Neural Net", project: "AI Disease Detection", status: "pending", score: null },
    { id: 2, team: "Cipher Squad", project: "Quantum Encryption", status: "completed", score: 92 },
    { id: 3, team: "Pixel Perfect", project: "AR Navigation", status: "completed", score: 88 },
    { id: 4, team: "Data Miners", project: "Predictive Analytics", status: "pending", score: null },
    { id: 5, team: "Green Tech", project: "Smart Energy Grid", status: "completed", score: 95 },
];

export function JudgeDashboard() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

    const filteredSubmissions = SUBMISSIONS.filter(sub => {
        const matchesSearch = sub.team.toLowerCase().includes(searchTerm.toLowerCase()) || sub.project.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === "all" || sub.status === filter;
        return matchesSearch && matchesFilter;
    });

    const stats = {
        total: SUBMISSIONS.length,
        completed: SUBMISSIONS.filter(s => s.status === "completed").length,
        pending: SUBMISSIONS.filter(s => s.status === "pending").length,
    };

    return (
        <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                    label="Total Assignments"
                    value={stats.total}
                    icon={Award}
                    color="text-blue-400"
                    bg="bg-blue-500/10"
                />
                <StatCard
                    label="Pending Reviews"
                    value={stats.pending}
                    icon={Clock}
                    color="text-yellow-400"
                    bg="bg-yellow-500/10"
                />
                <StatCard
                    label="Completed"
                    value={stats.completed}
                    icon={CheckCircle}
                    color="text-green-400"
                    bg="bg-green-500/10"
                />
            </div>

            {/* Main Content Area */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-white mb-1">Assigned Submissions</h2>
                        <p className="text-gray-400 text-sm">Review and score projcts assigned to you.</p>
                    </div>

                    <div className="flex gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search team or project..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-accent1 outline-none"
                            />
                        </div>
                        <div className="flex border border-white/10 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setFilter("all")}
                                className={cn("px-3 py-2 text-sm font-medium transition-colors", filter === "all" ? "bg-white/10 text-white" : "bg-transparent text-gray-500 hover:text-gray-300")}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilter("pending")}
                                className={cn("px-3 py-2 text-sm font-medium transition-colors", filter === "pending" ? "bg-white/10 text-white" : "bg-transparent text-gray-500 hover:text-gray-300")}
                            >
                                Pending
                            </button>
                            <button
                                onClick={() => setFilter("completed")}
                                className={cn("px-3 py-2 text-sm font-medium transition-colors", filter === "completed" ? "bg-white/10 text-white" : "bg-transparent text-gray-500 hover:text-gray-300")}
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    {filteredSubmissions.length > 0 ? (
                        filteredSubmissions.map((sub) => (
                            <SubmissionCard key={sub.id} submission={sub} />
                        ))
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            No submissions found matching your criteria.
                        </div>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end">
                <button className="px-6 py-3 bg-accent1 text-black rounded-xl font-bold hover:bg-white transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed">
                    Finalize Results
                </button>
            </div>
        </div>
    );
}

function StatCard({ label, value, icon: Icon, color, bg }: any) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center gap-4">
            <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", bg, color)}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <div className="text-2xl font-bold text-white font-mono">{value}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">{label}</div>
            </div>
        </div>
    );
}

function SubmissionCard({ submission }: any) {
    return (
        <div className="group bg-black/40 border border-white/5 hover:border-accent1/50 rounded-xl p-4 flex items-center justify-between transition-all">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center font-bold text-white text-sm">
                    {submission.team.substring(0, 2).toUpperCase()}
                </div>
                <div>
                    <h4 className="font-bold text-white group-hover:text-accent1 transition-colors">{submission.project}</h4>
                    <div className="text-xs text-gray-400 flex items-center gap-2">
                        <span>{submission.team}</span>
                        {submission.status === "completed" && (
                            <span className="text-green-400 flex items-center gap-1 bg-green-500/10 px-1.5 py-0.5 rounded">
                                <CheckCircle className="w-3 h-3" /> Scored: {submission.score}/100
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <button className={cn(
                "px-4 py-2 rounded-lg text-sm font-bold transition-colors",
                submission.status === "completed"
                    ? "bg-white/5 text-gray-400 hover:bg-white/10"
                    : "bg-accent1/10 text-accent1 border border-accent1/20 hover:bg-accent1 hover:text-black"
            )}>
                {submission.status === "completed" ? "Edit Score" : "Evaluate"}
            </button>
        </div>
    );
}
