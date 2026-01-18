"use client";

import { useState } from "react";
import { MentorshipSession } from "@/types";
import { motion } from "framer-motion";
import { Calendar, Clock, Video, MoreVertical, Link as LinkIcon, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data
const MOCK_SESSIONS: MentorshipSession[] = [
    {
        id: "s1",
        mentorId: "m1",
        menteeId: "u10",
        menteeName: "Alice Wu",
        startTime: "2026-01-20T10:00:00Z",
        duration: 60,
        status: "scheduled",
        meetLink: "https://meet.google.com/abc-defg-hij",
        topic: "Mock Interview: Google L4"
    },
    {
        id: "s2",
        mentorId: "m1",
        menteeId: "u11",
        menteeName: "Bob Smith",
        startTime: "2026-01-22T14:00:00Z",
        duration: 45,
        status: "scheduled",
        topic: "Project Code Review"
    },
    {
        id: "s3",
        mentorId: "m1",
        menteeId: "u12",
        menteeName: "Charlie Brown",
        startTime: "2026-01-10T11:00:00Z",
        duration: 60,
        status: "completed",
        topic: "Career Guidance"
    }
];

export function SessionManager() {
    const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");

    const filteredSessions = MOCK_SESSIONS.filter(session => {
        const isPast = new Date(session.startTime).getTime() < new Date().getTime();
        return filter === "upcoming" ? !isPast && session.status !== "completed" : isPast || session.status === "completed";
    });

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', weekday: 'short' }).format(date);
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(date);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Your Sessions</h2>
                <div className="bg-white/5 p-1 rounded-lg border border-white/10 flex">
                    <button
                        onClick={() => setFilter("upcoming")}
                        className={cn("px-4 py-1.5 rounded-md text-sm font-medium transition-all", filter === "upcoming" ? "bg-accent1 text-black shadow-lg" : "text-gray-400 hover:text-white")}
                    >
                        Upcoming
                    </button>
                    <button
                        onClick={() => setFilter("past")}
                        className={cn("px-4 py-1.5 rounded-md text-sm font-medium transition-all", filter === "past" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white")}
                    >
                        Past
                    </button>
                </div>
            </div>

            <div className="grid gap-4">
                {filteredSessions.length > 0 ? (
                    filteredSessions.map((session) => (
                        <motion.div
                            key={session.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all group"
                        >
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                {/* Date Box */}
                                <div className="flex flex-col items-center justify-center w-16 h-16 bg-black/40 border border-white/10 rounded-xl text-center">
                                    <span className="text-xs text-red-500 font-bold uppercase">{new Date(session.startTime).toLocaleDateString('en-US', { month: 'short' })}</span>
                                    <span className="text-2xl font-bold text-white">{new Date(session.startTime).getDate()}</span>
                                </div>

                                {/* Info */}
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="font-bold text-lg text-white mb-1">{session.topic}</h3>
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <i className="w-2 h-2 rounded-full bg-accent1" />
                                            with <span className="text-white font-medium">{session.menteeName}</span>
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {formatTime(session.startTime)} ({session.duration} min)
                                        </span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3">
                                    {session.status === "scheduled" && !new Date(session.startTime).getTime() && ( // Simplification for demo
                                        <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                                            Reschedule
                                        </button>
                                    )}

                                    {session.meetLink && filter === "upcoming" ? (
                                        <a
                                            href={session.meetLink}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-2 px-5 py-2.5 bg-accent1 text-black font-bold rounded-lg shadow-[0_0_15px_rgba(0,229,255,0.3)] hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] hover:scale-105 transition-all"
                                        >
                                            <Video className="w-4 h-4" /> Join Meet
                                        </a>
                                    ) : (
                                        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 text-gray-400 rounded-lg hover:text-white hover:bg-white/10 transition-colors">
                                            <FileText className="w-4 h-4" /> Notes
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="text-center py-16 bg-white/5 rounded-xl border border-white/5 border-dashed">
                        <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                        <p className="text-gray-400">No {filter} sessions found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
