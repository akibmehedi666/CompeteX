"use client";

import { useState } from "react";
import { User, Event } from "@/types";
import { motion } from "framer-motion";
import { Building2, Mail, MapPin, Globe, Award, Star, TrendingUp, Calendar, Edit2, Save, Users, Plus, Code, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";
import { EVENTS } from "@/constants/mockData"; // Mock events for "Past Events"

// Extended type for Organizer stats (mocked for now)
interface OrganizerStats {
    reputationScore: number;
    totalEvents: number;
    avgRating: number;
    responseTime: string;
}

const MOCK_STATS: OrganizerStats = {
    reputationScore: 98,
    totalEvents: 15,
    avgRating: 4.8,
    responseTime: "< 2 hours"
};

export function OrganizerProfile() {
    // In a real app, we'd fetch the current user and their specific organizer profile
    // For now, we'll mock the state
    const [profile, setProfile] = useState({
        name: "Dr. Hasanuzzaman",
        institution: "United International University",
        department: "Dept. of Computer Science & Engineering",
        bio: "Professor and event organizer passionate about creating learning opportunities for students through competitive programming and hackathons.",
        email: "hasan@uiu.ac.bd",
        location: "Dhaka, Bangladesh",
        website: "https://cse.uiu.ac.bd/faculty/hasan",
        verified: true
    });

    const [isEditing, setIsEditing] = useState(false);

    // Filter events organized by this user (mock ID 'u3' for Dr. Hasanuzzaman)
    const myEvents = EVENTS.filter(e => e.organizerId === "u3");

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent1/5 rounded-full blur-[80px]" />

                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent1/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-4xl">
                        🎓
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                                    {profile.name}
                                    {profile.verified && <Award className="w-6 h-6 text-accent1" />}
                                </h2>
                                <p className="text-accent1 font-medium">{profile.institution}</p>
                            </div>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                            >
                                {isEditing ? <Save className="w-5 h-5 text-accent1" /> : <Edit2 className="w-5 h-5" />}
                            </button>
                        </div>

                        {isEditing ? (
                            <textarea
                                value={profile.bio}
                                onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-gray-300 focus:border-accent1 outline-none min-h-[80px] mb-4"
                            />
                        ) : (
                            <p className="text-gray-400 max-w-2xl mb-6 leading-relaxed">
                                {profile.bio}
                            </p>
                        )}

                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-black/30 rounded-lg border border-white/5">
                                <Building2 className="w-4 h-4" /> {profile.department}
                            </span>
                            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-black/30 rounded-lg border border-white/5">
                                <MapPin className="w-4 h-4" /> {profile.location}
                            </span>
                            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-black/30 rounded-lg border border-white/5">
                                <Mail className="w-4 h-4" /> {profile.email}
                            </span>
                            {profile.website && (
                                <a href={profile.website} target="_blank" className="flex items-center gap-1.5 px-3 py-1.5 bg-black/30 rounded-lg border border-white/5 hover:text-accent1 transition-colors">
                                    <Globe className="w-4 h-4" /> Website
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatBox
                    icon={Star}
                    label="Reputation Score"
                    value={MOCK_STATS.reputationScore}
                    suffix="/100"
                    color="text-yellow-400"
                />
                <StatBox
                    icon={Calendar}
                    label="Events Hosted"
                    value={MOCK_STATS.totalEvents}
                    color="text-blue-400"
                />
                <StatBox
                    icon={TrendingUp}
                    label="Avg Rating"
                    value={MOCK_STATS.avgRating}
                    suffix="/5.0"
                    color="text-green-400"
                />
                <StatBox
                    icon={Award}
                    label="Response Time"
                    value={MOCK_STATS.responseTime}
                    color="text-purple-400"
                    isText
                />
            </div>

            {/* Institution Clubs & Departments */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Users className="w-5 h-5 text-accent1" /> Clubs & Departments
                    </h3>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white transition-colors">
                        <Plus className="w-4 h-4" /> Add Club
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Mock Club Cards */}
                    <div className="p-4 bg-black/40 border border-white/5 rounded-xl hover:border-accent1/30 transition-all cursor-pointer group">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                                <Code className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white group-hover:text-accent1 transition-colors">Computer Club</h4>
                                <p className="text-xs text-gray-500">Founded 2012</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">Organizes hackathons, coding contests, and tech workshops.</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1"><Users className="w-3 h-3" /> 120 Members</span>
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> 5 Events</span>
                        </div>
                    </div>

                    <div className="p-4 bg-black/40 border border-white/5 rounded-xl hover:border-accent1/30 transition-all cursor-pointer group">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                                <Cpu className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white group-hover:text-accent1 transition-colors">Robotics Club</h4>
                                <p className="text-xs text-gray-500">Founded 2015</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">Focuses on robotics, automation, and hardware projects.</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1"><Users className="w-3 h-3" /> 85 Members</span>
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> 3 Events</span>
                        </div>
                    </div>

                    <div className="p-4 bg-black/40 border border-white/5 rounded-xl hover:border-accent1/30 transition-all cursor-pointer group border-dashed hover:border-solid flex flex-col items-center justify-center text-center py-8">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <Plus className="w-6 h-6 text-gray-400" />
                        </div>
                        <h4 className="font-bold text-gray-400 group-hover:text-white transition-colors">Register New Entity</h4>
                        <p className="text-xs text-gray-600 mt-1">Add a club, lab, or department</p>
                    </div>
                </div>
            </div>

            {/* Past & Upcoming Events */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-accent1" /> Event History
                </h3>

                <div className="space-y-4">
                    {myEvents.length > 0 ? (
                        myEvents.map(event => (
                            <div key={event.id} className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-xl hover:border-white/20 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-white/5 overflow-hidden">
                                        <img src={event.image} alt={event.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white group-hover:text-accent1 transition-colors">{event.title}</h4>
                                        <p className="text-xs text-gray-500">
                                            {event.date} • {event.category} • <span className={cn(
                                                event.status === "Live" ? "text-green-400" :
                                                    event.status === "Upcoming" ? "text-blue-400" : "text-gray-500"
                                            )}>{event.status}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-bold text-white font-mono">{event.participantsCount}</div>
                                    <div className="text-xs text-gray-500">Participants</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center py-8">No events found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

function StatBox({ icon: Icon, label, value, suffix, color, isText }: any) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors group">
            <div className="flex items-start justify-between mb-4">
                <div className={cn("p-2 rounded-lg bg-black/40", color)}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>
            <div>
                <div className="flex items-baseline gap-1">
                    <span className={cn("text-2xl font-bold font-mono text-white", isText ? "text-lg" : "text-3xl")}>
                        {value}
                    </span>
                    {suffix && <span className="text-sm text-gray-500 font-medium">{suffix}</span>}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">{label}</div>
            </div>
        </div>
    );
}
