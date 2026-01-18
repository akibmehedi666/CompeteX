"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";
import { MentorProfile } from "@/types";
import { Star, MapPin, Share2, MessageSquare, Clock, Globe, Linkedin, Github, CheckCircle, Calendar } from "lucide-react";
import { motion } from "framer-motion";

// Mock Data (In a real app, fetch from API)
const MOCK_MENTOR: MentorProfile = {
    id: "m1",
    userId: "u1",
    name: "Dr. Sarah Chen",
    title: "Senior AI Researcher",
    organization: "DeepMind",
    location: "London, UK",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    bio: "I specialize in Reinforcement Learning and Multi-Agent Systems. With over 5 years of experience in top-tier research labs, I help students prepare for IOI, research internships, and grad school applications. My mentees have gone on to join MIT, Stanford, and Google Brain.",
    expertise: ["AI/ML", "Algorithms", "Research", "Python", "PyTorch"],
    rating: 4.9,
    reviewCount: 42,
    hourlyRate: 120,
    currency: "$",
    availability: {
        slots: ["Mon 10:00 AM", "Tue 2:00 PM", "Thu 4:00 PM"],
        nextAvailable: "2026-01-20"
    },
    socials: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        website: "https://sarahchen.ai"
    },
    offerings: ["One-to-One", "Research Guidance", "Career Counseling"],
    languages: ["English", "Mandarin"],
    verified: true
};

export default function MentorProfilePage() {
    const params = useParams(); // In real app, use params.id to fetch
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    // Mock toggle for booking modal
    const [bookingOpen, setBookingOpen] = useState(false);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-accent1 selection:text-black">
            <Navbar />

            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Profile Card */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="relative mb-6">
                                    <div className="w-32 h-32 rounded-full border-2 border-accent1/50 p-1 overflow-hidden">
                                        <img src={MOCK_MENTOR.avatar} alt={MOCK_MENTOR.name} className="w-full h-full object-cover rounded-full" />
                                    </div>
                                    {MOCK_MENTOR.verified && (
                                        <div className="absolute bottom-1 right-1 bg-accent1 text-black p-1.5 rounded-full border-4 border-black" title="Verified Mentor">
                                            <CheckCircle className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>

                                <h1 className="text-2xl font-bold mb-1">{MOCK_MENTOR.name}</h1>
                                <p className="text-gray-400 mb-4">{MOCK_MENTOR.title} @ <span className="text-white">{MOCK_MENTOR.organization}</span></p>

                                <div className="flex items-center gap-4 text-sm mb-6 bg-black/40 px-4 py-2 rounded-full border border-white/5">
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <Star className="w-4 h-4 fill-current" />
                                        <span className="font-bold">{MOCK_MENTOR.rating}</span>
                                    </div>
                                    <span className="text-gray-600">|</span>
                                    <div className="flex items-center gap-1 text-gray-400">
                                        <MapPin className="w-4 h-4" />
                                        <span>{MOCK_MENTOR.location}</span>
                                    </div>
                                </div>

                                <div className="w-full grid grid-cols-2 gap-3 mb-6">
                                    <button className="flex items-center justify-center gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all text-sm font-medium">
                                        <Share2 className="w-4 h-4" /> Share
                                    </button>
                                    <button className="flex items-center justify-center gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all text-sm font-medium">
                                        <MessageSquare className="w-4 h-4" /> Chat
                                    </button>
                                </div>

                                <div className="w-full border-t border-white/10 pt-6">
                                    <div className="flex justify-center gap-4">
                                        {MOCK_MENTOR.socials.linkedin && (
                                            <a href={MOCK_MENTOR.socials.linkedin} target="_blank" rel="noreferrer" className="p-2 bg-blue-600/10 text-blue-500 rounded-full hover:bg-blue-600 hover:text-white transition-all">
                                                <Linkedin className="w-5 h-5" />
                                            </a>
                                        )}
                                        {MOCK_MENTOR.socials.github && (
                                            <a href={MOCK_MENTOR.socials.github} target="_blank" rel="noreferrer" className="p-2 bg-gray-600/10 text-gray-400 rounded-full hover:bg-white hover:text-black transition-all">
                                                <Github className="w-5 h-5" />
                                            </a>
                                        )}
                                        {MOCK_MENTOR.socials.website && (
                                            <a href={MOCK_MENTOR.socials.website} target="_blank" rel="noreferrer" className="p-2 bg-pink-600/10 text-pink-500 rounded-full hover:bg-pink-600 hover:text-white transition-all">
                                                <Globe className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Details & Booking */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* About */}
                        <section>
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-accent1 rounded-full" /> About Me
                            </h2>
                            <p className="text-gray-300 leading-relaxed text-lg">{MOCK_MENTOR.bio}</p>
                        </section>

                        {/* Expertise */}
                        <section>
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-accent1 rounded-full" /> Expertise
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {MOCK_MENTOR.expertise.map(skill => (
                                    <span key={skill} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:border-accent1/50 transition-colors">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Offerings */}
                        <section>
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-accent1 rounded-full" /> Mentorship Offerings
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {MOCK_MENTOR.offerings.map(offer => (
                                    <div key={offer} className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-accent1/10 flex items-center justify-center">
                                            <Star className="w-5 h-5 text-accent1" />
                                        </div>
                                        <span className="font-medium text-gray-200">{offer}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Booking */}
                        <section className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6 lg:p-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-2">Book a Session</h2>
                                    <p className="text-gray-400">Next available slot: <span className="text-accent1 font-medium">{MOCK_MENTOR.availability.nextAvailable}</span></p>
                                </div>
                                <div className="mt-4 md:mt-0 text-right">
                                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Rate</p>
                                    <p className="text-3xl font-bold text-white">{MOCK_MENTOR.hourlyRate === 0 ? "Free" : `${MOCK_MENTOR.currency}${MOCK_MENTOR.hourlyRate}`} <span className="text-lg text-gray-500 font-normal">/ hr</span></p>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-sm font-medium text-gray-400 mb-4">Available Slots</h3>
                                <div className="flex flex-wrap gap-3">
                                    {MOCK_MENTOR.availability.slots.map(slot => (
                                        <button
                                            key={slot}
                                            onClick={() => setSelectedSlot(slot)}
                                            className={`px-4 py-3 rounded-lg border text-sm transition-all ${selectedSlot === slot
                                                    ? "bg-accent1 text-black border-accent1 font-bold shadow-[0_0_20px_rgba(0,229,255,0.3)]"
                                                    : "bg-black border-white/20 text-gray-300 hover:border-white/50"
                                                }`}
                                        >
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                disabled={!selectedSlot}
                                className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all ${selectedSlot
                                        ? "bg-white text-black hover:scale-[1.02] shadow-xl"
                                        : "bg-white/10 text-gray-500 cursor-not-allowed"
                                    }`}
                            >
                                {selectedSlot ? "Confirm Booking" : "Select a Time Slot"}
                            </button>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
}
