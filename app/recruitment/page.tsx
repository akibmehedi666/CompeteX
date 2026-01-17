"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { TALENT_POOL } from "@/constants/talentData";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Briefcase, Star, MapPin, Filter, MessageSquare, ChevronRight, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";

export default function RecruitmentPage() {
    const [flippedId, setFlippedId] = useState<string | null>(null);
    const [filter, setFilter] = useState("All");
    const { currentUser, initAuth } = useStore();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        initAuth();
    }, [initAuth]);

    useEffect(() => {
        // Give a small delay for auth to initialize or check immediately if we can
        const timer = setTimeout(() => {
            if (!currentUser) {
                router.push("/login");
            } else if (currentUser.role !== "Recruiter") {
                router.push("/dashboard");
            } else {
                setIsLoading(false);
            }
        }, 500); // Small delay to prevent flicker if auth state is restoring

        return () => clearTimeout(timer);
    }, [currentUser, router]);

    const filteredTalent = filter === "All" ? TALENT_POOL : TALENT_POOL.filter(t => t.details.availability === filter);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-purple-500 animate-pulse font-bold text-xl">Accessing Secure Channel...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black selection:bg-purple-500/30">
            <Navbar />

            {/* Hero Section - Purple Theme */}
            <div className="relative pt-20 pb-10 overflow-hidden border-b border-white/10 flex flex-col justify-center min-h-[40vh]">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/20 blur-[150px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-8">
                        <div>
                            <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
                                Scout <span className="text-purple-400">Elite Talent</span>
                            </h1>
                            <p className="text-gray-400 max-w-xl text-lg">
                                Find the masterminds behind the winning projects.
                                Builders, designers, and engineers ready for their next challenge.
                            </p>
                        </div>

                        {/* Tactical Search */}
                        <div className="w-full md:w-auto flex flex-col gap-4 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-md">
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                                <Filter className="w-3 h-3" /> Tactical Filters
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setFilter("All")} className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-colors border", filter === "All" ? "bg-purple-500/20 text-purple-400 border-purple-500/50" : "bg-black/20 text-gray-400 border-white/5 hover:text-white")}>
                                    All
                                </button>
                                <button onClick={() => setFilter("Open to Work")} className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-colors border", filter === "Open to Work" ? "bg-green-500/20 text-green-400 border-green-500/50" : "bg-black/20 text-gray-400 border-white/5 hover:text-white")}>
                                    Open to Work
                                </button>
                                <button onClick={() => setFilter("Hiring")} className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-colors border", filter === "Hiring" ? "bg-blue-500/20 text-blue-400 border-blue-500/50" : "bg-black/20 text-gray-400 border-white/5 hover:text-white")}>
                                    Hiring
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredTalent.map((talent) => (
                        <div key={talent.id} className="perspective-1000 h-[420px] group cursor-pointer" onMouseEnter={() => setFlippedId(talent.id)} onMouseLeave={() => setFlippedId(null)}>
                            <motion.div
                                initial={false}
                                animate={{ rotateY: flippedId === talent.id ? 180 : 0 }}
                                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                                className="w-full h-full relative preserve-3d"
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                {/* Front Side */}
                                <div className="absolute inset-0 backface-hidden bg-[#0F0F0F] border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center shadow-xl overflow-hidden">
                                    {/* Background decoration */}
                                    <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-purple-900/20 to-transparent" />

                                    <div className="relative w-28 h-28 mb-4">
                                        <div className="absolute inset-0 bg-purple-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                                        <img src={talent.avatar} alt={talent.name} className="relative w-full h-full rounded-full border-2 border-white/10 object-cover z-10" />
                                        <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#0F0F0F] rounded-full flex items-center justify-center border border-white/10 z-20">
                                            <div className={cn("w-3 h-3 rounded-full", talent.details.availability === "Open to Work" ? "bg-green-500 shadow-[0_0_8px_#22c55e]" : "bg-gray-500")} />
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-white max-w-full truncate">{talent.name}</h3>
                                    <p className="text-purple-400 text-sm font-medium mb-1">{talent.role}</p>
                                    <p className="text-gray-500 text-xs mb-6 flex items-center gap-1">
                                        <MapPin className="w-3 h-3" /> {talent.location}
                                    </p>

                                    {/* Skills Pills */}
                                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                                        {talent.skills.slice(0, 3).map(skill => (
                                            <span key={skill} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/5">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-auto w-full grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                                        <div>
                                            <div className="text-gray-500 text-[10px] uppercase tracking-wider">Experience</div>
                                            <div className="text-white font-bold">{talent.details.experience}</div>
                                        </div>
                                        <div>
                                            <div className="text-gray-500 text-[10px] uppercase tracking-wider">Rate</div>
                                            <div className="text-white font-bold">{talent.details.rate}</div>
                                        </div>
                                    </div>

                                    <div className="mt-4 text-xs text-purple-400 flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                                        Hover for Stats <ChevronRight className="w-3 h-3" />
                                    </div>
                                </div>

                                {/* Back Side (Stats) */}
                                <div
                                    className="absolute inset-0 backface-hidden bg-purple-950/20 border border-purple-500/30 rounded-2xl p-6 flex flex-col justify-center shadow-xl backdrop-blur-xl"
                                    style={{ transform: "rotateY(180deg)" }}
                                >
                                    <div className="text-center mb-6">
                                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/20 mb-4 text-purple-400">
                                            <Trophy className="w-6 h-6" />
                                        </div>
                                        <h4 className="text-lg font-bold text-white">Competition Stats</h4>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-purple-500/10">
                                            <span className="text-gray-400 text-sm">Global Rank</span>
                                            <span className="text-white font-bold text-lg">#{talent.stats?.rank || "--"}</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-purple-500/10">
                                            <span className="text-gray-400 text-sm">Competitions Won</span>
                                            <span className="text-white font-bold text-lg">{talent.stats?.wins || "0"}</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-purple-500/10">
                                            <span className="text-gray-400 text-sm">Avg. Score</span>
                                            <span className="text-emerald-400 font-bold text-lg">{talent.stats?.avgScore || 0}%</span>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">Top Achievement</div>
                                        <div className="text-white font-medium text-sm italic">"{talent.stats?.topAchievement || "Rising Star"}"</div>
                                    </div>

                                    <button className="mt-8 w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold uppercase tracking-wider transition-colors shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2">
                                        <MessageSquare className="w-4 h-4" /> Contact
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
