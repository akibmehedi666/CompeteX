"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { DETAILED_EVENTS, DetailedEvent } from "@/constants/eventData";
import { Calendar, MapPin, Users, Trophy, Flag, Clock, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { EventLeaderboard } from "@/components/events/EventLeaderboard";
import { useStore } from "@/store/useStore";

export default function EventDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [event, setEvent] = useState<DetailedEvent | null>(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const [loading, setLoading] = useState(true);
    const { currentUser, initAuth } = useStore();

    useEffect(() => {
        initAuth();
    }, [initAuth]);

    useEffect(() => {
        // Find event data
        const found = DETAILED_EVENTS.find(e => e.id === params.id);
        if (!found) {
            router.push("/dashboard");
            return;
        }
        setEvent(found);

        // Check if user is registered (Simulated)
        const userSession = localStorage.getItem("competex_user_session");
        if (userSession) {
            const user = JSON.parse(userSession);
            // Assuming user.registeredEvents contains IDs
            if (user.registeredEvents?.includes(found.id)) {
                setIsRegistered(true);
            }
        }
        setLoading(false);
    }, [params.id, router]);

    const handleRegister = () => {
        if (!localStorage.getItem("competex_user_session")) {
            toast.error("Please login to register!");
            router.push("/login");
            return;
        }

        const userSession = JSON.parse(localStorage.getItem("competex_user_session")!);
        const updatedEvents = [...(userSession.registeredEvents || []), event?.id];

        // De-dupe
        const uniqueEvents = Array.from(new Set(updatedEvents));

        // Save
        userSession.registeredEvents = uniqueEvents;
        localStorage.setItem("competex_user_session", JSON.stringify(userSession));

        setIsRegistered(true);
        toast.success(`Successfully registered for ${event?.title}!`);
    };

    if (loading || !event) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading Event...</div>;

    return (
        <div className="min-h-screen bg-black pt-24 pb-12 selection:bg-accent1/30">
            <Navbar />

            <div className='max-w-7xl mx-auto px-6'>
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Events
                </button>

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
                >
                    {/* Main Image & Info */}
                    <div className="lg:col-span-2 relative rounded-2xl overflow-hidden border border-white/10 group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                        <img src={event.image} alt={event.title} className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700" />

                        <div className="absolute bottom-6 left-6 z-20">
                            <div className="flex gap-2 mb-3">
                                <span className="px-3 py-1 bg-accent1 text-black font-bold uppercase text-xs rounded-sm">
                                    {event.category}
                                </span>
                                {event.organizer && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); router.push(`/institutions/${event.organizer?.id}`); }}
                                        className="px-3 py-1 bg-white/10 text-white font-bold uppercase text-xs rounded-sm hover:bg-white/20 transition-colors flex items-center gap-1"
                                    >
                                        by {event.organizer.name}
                                    </button>
                                )}
                                <span className={cn(
                                    "px-3 py-1 font-bold uppercase text-xs rounded-sm text-white",
                                    event.status === "Open" ? "bg-green-600" : "bg-red-600"
                                )}>
                                    {event.status}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{event.title}</h1>

                            <div className="mb-6">
                                <CountdownTimer targetDate={event.startDate} size="lg" />
                            </div>

                            <div className="flex items-center gap-6 text-gray-300">
                                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-accent1" /> {event.location.address}</span>
                                <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-accent1" /> {event.date}</span>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Action Column */}
                    <div className="space-y-6">
                        {/* Register Card */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Registration</h3>
                            <div className="flex justify-between text-sm text-gray-400 mb-4">
                                <span>Status</span>
                                <span className={cn(
                                    "font-bold",
                                    event.status === "Open" ? "text-green-500" : "text-red-500"
                                )}>{event.status}</span>
                            </div>

                            {(!currentUser || currentUser.role === 'Participant') ? (
                                <button
                                    onClick={handleRegister}
                                    disabled={isRegistered || event.status === "Closed"}
                                    className={cn(
                                        "w-full py-3 text-black font-bold uppercase tracking-widest rounded-lg transition-all text-sm",
                                        isRegistered
                                            ? "bg-green-500 cursor-default"
                                            : event.status === "Closed"
                                                ? "bg-gray-600 cursor-not-allowed"
                                                : "bg-accent1 hover:bg-white hover:shadow-[0_0_20px_#00E5FF]"
                                    )}
                                >

                                    {isRegistered ? <span className="flex items-center justify-center gap-2"><CheckCircle className="w-4 h-4" /> Registered</span> : "Register Now"}
                                </button>
                            ) : (
                                <div className="w-full py-3 bg-white/5 border border-white/10 text-gray-400 font-bold uppercase tracking-widest rounded-lg text-center text-xs">
                                    Participants Only
                                </div>
                            )}

                            <p className="text-xs text-gray-500 mt-4 text-center">
                                Registration closes on {new Date(event.startDate).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                </motion.div>

                {/* Details & Rules */}
                {/* Details & Rules */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Rules */}
                    <div className="md:col-span-2 space-y-8">
                        <Section title="Description" content={event.description} />

                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Flag className="w-5 h-5 text-accent1" /> Rules & Guidelines
                            </h3>
                            <ul className="space-y-3">
                                {event.rules.map((rule, i) => (
                                    <li key={i} className="flex gap-3 text-gray-300">
                                        <span className="w-1.5 h-1.5 rounded-full bg-accent1 mt-2 flex-shrink-0" />
                                        {rule}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Live Leaderboard */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Trophy className="w-5 h-5 text-accent2" /> Live Leaderboard
                                </h3>
                                <button
                                    onClick={() => router.push(`/leaderboard/${event.id}`)}
                                    className="text-xs font-bold uppercase tracking-widest text-accent1 hover:text-white transition-colors flex items-center gap-1"
                                >
                                    View Full Standings <ArrowLeft className="w-3 h-3 rotate-180" />
                                </button>
                            </div>
                            <EventLeaderboard leaderboard={event.leaderboard || []} />
                        </div>
                    </div>

                    {/* Timeline */}
                    <div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 sticky top-24">
                            <h3 className="text-xl font-bold text-white mb-6">Event Timeline</h3>
                            <div className="space-y-6 relative pl-2">
                                <div className="absolute top-2 left-[5px] w-0.5 h-[80%] bg-white/10" />
                                {event.timeline.map((step, i) => (
                                    <div key={i} className="relative flex gap-4">
                                        <div className="w-3 h-3 rounded-full bg-accent1 mt-1.5 relative z-10 shadow-[0_0_10px_#00E5FF]" />
                                        <div>
                                            <div className="text-white font-bold">{step.title}</div>
                                            <div className="text-sm text-gray-400">{step.date}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function Section({ title, content }: { title: string, content: string }) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
            <p className="text-gray-300 leading-relaxed">{content}</p>
        </div>
    );
}

function StatItem({ label, value, icon: Icon }: { label: string, value: string, icon: any }) {
    return (
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
            <div className="flex items-center gap-3 text-gray-400">
                <Icon className="w-4 h-4" />
                <span className="text-sm">{label}</span>
            </div>
            <span className="text-white font-bold">{value}</span>
        </div>
    );
}
