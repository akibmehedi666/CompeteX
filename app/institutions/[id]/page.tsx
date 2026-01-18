"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";
import { INSTITUTIONS, Institution } from "@/constants/institutionData";
import { DETAILED_EVENTS, DetailedEvent } from "@/constants/eventData";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ShieldCheck, Trophy, ArrowLeft, ArrowRight, Calendar, Users, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { CountdownTimer } from "@/components/ui/CountdownTimer";

export default function InstitutionProfilePage() {
    const params = useParams();
    const router = useRouter();
    const [institution, setInstitution] = useState<Institution | null>(null);
    const [events, setEvents] = useState<DetailedEvent[]>([]);
    const [activeTab, setActiveTab] = useState<"upcoming" | "archive">("upcoming");

    useEffect(() => {
        const foundInst = INSTITUTIONS.find(i => i.id === params.id);
        if (!foundInst) {
            router.push("/institutions");
            return;
        }
        setInstitution(foundInst);

        // Fetch related events
        const relatedEvents = DETAILED_EVENTS.filter(e => foundInst.hostedEvents.includes(e.id));
        setEvents(relatedEvents);
    }, [params.id, router]);

    if (!institution) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;

    // Filter Logic
    const upcomingEvents = events.filter(e => new Date(e.startDate).getTime() > new Date("2026-01-04T23:28:31+06:00").getTime()); // Using provided context time
    const pastEvents = events.filter(e => new Date(e.startDate).getTime() <= new Date("2026-01-04T23:28:31+06:00").getTime());

    const displayedEvents = activeTab === "upcoming" ? upcomingEvents : pastEvents;

    return (
        <div className="min-h-screen bg-black selection:bg-accent1/30">
            <Navbar />

            {/* Hero Section */}
            <div className="relative pt-32 pb-12 overflow-hidden border-b border-white/10">
                {/* Brand Glow */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20 blur-[100px] pointer-events-none rounded-full"
                    style={{ backgroundColor: institution.color }}
                />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <button
                        onClick={() => router.push("/institutions")}
                        className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 group transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Directory
                    </button>

                    <div className="flex flex-col md:flex-row items-start gap-8">
                        <div className="w-32 h-32 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                            <institution.logo className="w-16 h-16 text-white" />
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{institution.name}</h1>
                                {institution.verified && (
                                    <div className="flex items-center gap-1 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold rounded-full">
                                        <ShieldCheck className="w-4 h-4" /> Verified Institution
                                    </div>
                                )}
                            </div>

                            <p className="text-xl text-gray-300 mb-6 max-w-3xl leading-relaxed">{institution.description}</p>

                            <div className="flex flex-wrap gap-8 text-gray-400">
                                <span className="flex items-center gap-2"><MapPin className="w-5 h-5 text-accent2" /> {institution.location}</span>
                                <span className="flex items-center gap-2"><Trophy className="w-5 h-5 text-accent2" /> Ranked #{institution.stats.rank} Nationally</span>
                                <span className="flex items-center gap-2"><Users className="w-5 h-5 text-accent2" /> {institution.stats.members.toLocaleString()} Members</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Tabs */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex gap-8 mb-12 border-b border-white/10">
                    <button
                        onClick={() => setActiveTab("upcoming")}
                        className={cn(
                            "pb-4 text-sm font-bold uppercase tracking-widest transition-all relative",
                            activeTab === "upcoming" ? "text-white" : "text-gray-500 hover:text-gray-300"
                        )}
                    >
                        Upcoming Events
                        {activeTab === "upcoming" && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent2" />}
                    </button>
                    <button
                        onClick={() => setActiveTab("archive")}
                        className={cn(
                            "pb-4 text-sm font-bold uppercase tracking-widest transition-all relative",
                            activeTab === "archive" ? "text-white" : "text-gray-500 hover:text-gray-300"
                        )}
                    >
                        Event Archive
                        {activeTab === "archive" && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent2" />}
                    </button>
                </div>

                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {displayedEvents.map((event) => (
                            <div key={event.id} className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all flex flex-col">
                                <div className="h-48 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute top-4 right-4 z-20">
                                        <span className={cn(
                                            "px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md border",
                                            event.status === "Live"
                                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                                : "bg-black/50 text-white border-white/10"
                                        )}>
                                            {event.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="text-xs font-bold text-accent2 uppercase tracking-widest mb-2">{event.category}</div>
                                    <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                                    <div className="flex items-center gap-4 text-gray-400 text-sm mb-6">
                                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {event.date}</span>
                                    </div>

                                    <div className="mt-auto pt-6 border-t border-white/5">
                                        {activeTab === "upcoming" ? (
                                            <div className="flex items-center justify-between">
                                                <div className="text-xs text-gray-400">Starts in:</div>
                                                <CountdownTimer targetDate={event.startDate} size="sm" />
                                            </div>
                                        ) : (
                                            <Link
                                                href={`/leaderboard/${event.id}`}
                                                className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-white text-sm font-bold uppercase tracking-wider transition-all"
                                            >
                                                View Results <ExternalLink className="w-4 h-4" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </AnimatePresence>

                    {displayedEvents.length === 0 && (
                        <div className="col-span-full py-12 text-center text-gray-500 border border-dashed border-white/10 rounded-2xl">
                            No events found in {activeTab}.
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
