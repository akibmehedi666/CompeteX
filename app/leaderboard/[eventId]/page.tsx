"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";
import { DETAILED_EVENTS, DetailedEvent } from "@/constants/eventData";
import { motion } from "framer-motion";
import { Trophy, Calendar, Users, ArrowLeft, Medal, Crown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EventLeaderboardPage() {
    const params = useParams();
    const router = useRouter();
    const [event, setEvent] = useState<DetailedEvent | null>(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const found = DETAILED_EVENTS.find(e => e.id === params.eventId);
        if (!found) {
            router.push("/leaderboard");
            return;
        }
        setEvent(found);
    }, [params.eventId, router]);

    if (!event) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;

    const filteredLeaderboard = (event.leaderboard || []).filter(entry =>
        entry.name.toLowerCase().includes(search.toLowerCase()) ||
        (entry.institution && entry.institution.toLowerCase().includes(search.toLowerCase()))
    );

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1: return <Crown className="w-5 h-5 text-yellow-500 fill-yellow-500 animate-pulse" />;
            case 2: return <Medal className="w-5 h-5 text-gray-300 fill-gray-300" />;
            case 3: return <Medal className="w-5 h-5 text-amber-700 fill-amber-700" />;
            default: return <span className="text-gray-500 font-mono font-bold">#{rank}</span>;
        }
    };

    return (
        <div className="min-h-screen bg-black selection:bg-accent1/30">
            <Navbar />

            <div className="pt-24 pb-12 max-w-7xl mx-auto px-6">
                {/* Back Button */}
                <button
                    onClick={() => router.push("/leaderboard")}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 group transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Hubs
                </button>

                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 border-b border-white/10 pb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-accent1/10 text-accent1 border border-accent1/20">
                                {event.category}
                            </span>
                            <span className={cn(
                                "text-xs font-bold uppercase tracking-wider",
                                event.status === 'Live' ? "text-green-500" : "text-gray-500"
                            )}>
                                {event.status}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{event.title}</h1>
                        <div className="flex gap-6 text-gray-400 text-sm">
                            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-accent2" /> {event.date}</span>
                            <span className="flex items-center gap-2"><Users className="w-4 h-4 text-accent2" /> {event.participants.toLocaleString()} Participants</span>
                        </div>
                    </div>

                    <div className="relative w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Find participant..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full md:w-64 bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white hover:border-white/20 focus:border-accent1 focus:outline-none transition-all"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                    </div>
                </div>

                {/* Leaderboard Table */}
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 bg-black/40 text-xs font-bold uppercase text-gray-500 tracking-wider">
                        <div className="col-span-1 text-center">Rank</div>
                        <div className="col-span-5 md:col-span-4">Participant / Team</div>
                        <div className="hidden md:block col-span-4">Institution</div>
                        <div className="col-span-6 md:col-span-3 text-right">Score</div>
                    </div>

                    {/* Table Body */}
                    {filteredLeaderboard.length > 0 ? (
                        <div className="divide-y divide-white/5">
                            {filteredLeaderboard.map((entry, index) => (
                                <motion.div
                                    key={entry.name}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={cn(
                                        "grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors group",
                                        entry.rank === 1 ? "bg-gradient-to-r from-yellow-500/10 to-transparent" : "",
                                        entry.rank === 2 ? "bg-gradient-to-r from-gray-300/10 to-transparent" : "",
                                        entry.rank === 3 ? "bg-gradient-to-r from-amber-700/10 to-transparent" : ""
                                    )}
                                >
                                    {/* Rank */}
                                    <div className="col-span-1 flex justify-center">
                                        {getRankIcon(entry.rank)}
                                    </div>

                                    {/* Participant */}
                                    <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-black border border-white/10 overflow-hidden flex-shrink-0">
                                            <img src={entry.avatar} alt={entry.name} className="w-full h-full object-cover" />
                                        </div>
                                        <span className={cn(
                                            "font-bold truncate",
                                            entry.rank === 1 ? "text-yellow-500" :
                                                entry.rank === 2 ? "text-gray-300" :
                                                    entry.rank === 3 ? "text-amber-600" : "text-white"
                                        )}>
                                            {entry.name}
                                        </span>
                                    </div>

                                    {/* Institution */}
                                    <div className="hidden md:block col-span-4 text-gray-400 text-sm">
                                        {entry.institution || "—"}
                                    </div>

                                    {/* Score */}
                                    <div className="col-span-6 md:col-span-3 text-right font-mono font-bold text-accent1">
                                        {entry.score.toLocaleString()}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-24 text-center">
                            <Trophy className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-500 mb-2">No Results Found</h3>
                            <p className="text-gray-600">Try adjusting your search or check back later.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
