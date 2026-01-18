"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";
import { DUMMY_TEAMS, Team } from "../data"; // Import from sibling
import { ArrowLeft, Users, Trophy, Code, Target, MessageSquare } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TeamDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [team, setTeam] = useState<Team | null>(null);

    useEffect(() => {
        const found = DUMMY_TEAMS.find(t => t.id === params.id);
        if (found) {
            setTeam(found);
        } else {
            // Check if loading or redirect
        }
    }, [params.id]);

    if (!team) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;

    return (
        <div className="min-h-screen bg-black selection:bg-accent1/30">
            <Navbar />
            <div className="pt-24 pb-12 max-w-7xl mx-auto px-6">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Teams
                </button>

                {/* Team Header */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8 backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-4xl font-bold text-white">{team.name}</h1>
                                <span className="px-3 py-1 bg-accent1/10 text-accent1 text-xs font-bold uppercase rounded-full border border-accent1/20">
                                    {team.status}
                                </span>
                            </div>
                            <p className="text-lg text-gray-400 max-w-2xl mb-4">{team.description}</p>

                            <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                                <div className="flex items-center gap-2">
                                    <Trophy className="w-4 h-4 text-accent2" />
                                    <span>{team.competition}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Target className="w-4 h-4 text-[#00E5FF]" />
                                    <span>{team.project}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 min-w-[200px]">
                            <button className="w-full py-3 bg-[#00E5FF] text-black font-bold uppercase text-sm rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                                Request to Join
                            </button>
                            <button className="w-full py-3 bg-transparent border border-white/20 text-white font-bold uppercase text-sm rounded-xl hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                                <MessageSquare className="w-4 h-4" /> Message Team
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Members */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Users className="w-5 h-5 text-accent1" /> Team Members
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {team.members.map(member => (
                                    <Link key={member.id} href={`/people/${member.id}`} className="block">
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            className="bg-black/40 border border-white/10 rounded-xl p-4 flex items-center gap-4 hover:border-accent1/50 transition-colors group"
                                        >
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00E5FF]/20 to-[#AAFF00]/20 flex items-center justify-center text-white font-bold text-lg border border-white/10 group-hover:border-accent1">
                                                {member.avatar ? (
                                                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover rounded-full" />
                                                ) : member.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h4 className="text-white font-bold group-hover:text-accent1 transition-colors">{member.name}</h4>
                                                    {member.role === 'leader' && (
                                                        <span className="text-[10px] bg-[#FFB800] text-black px-1.5 py-0.5 rounded font-bold uppercase">Leader</span>
                                                    )}
                                                </div>
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {member.skills.map(skill => (
                                                        <span key={skill} className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Requirements & Info */}
                    <div className="space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Code className="w-5 h-5 text-[#AAFF00]" /> Required Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {team.requiredSkills.map(skill => (
                                    <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 text-gray-300 text-sm rounded-lg">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Categories</h3>
                            <div className="flex flex-wrap gap-2">
                                {team.categories.map(cat => (
                                    <span key={cat} className="px-3 py-1 bg-accent1/10 text-accent1 text-sm rounded-lg border border-accent1/20 font-bold">
                                        {cat}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
