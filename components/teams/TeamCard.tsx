"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, MessageCircle, CheckCircle, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamMember {
    id: string;
    name: string;
    avatar: string;
    role: "leader" | "member";
    skills: string[];
}

interface Team {
    id: string;
    name: string;
    description: string;
    project: string;
    categories: string[];
    requiredSkills: string[];
    members: TeamMember[];
    maxMembers: number;
    leaderId: string;
    status: "open" | "full" | "invite-only";
}

interface TeamCardProps {
    team: Team;
    userSkills: string[];
    onRequestJoin: (teamId: string) => void;
    onMessageTeam: (teamId: string) => void;
    requestStatus?: "idle" | "pending" | "accepted" | "rejected";
}

const CATEGORY_COLORS: Record<string, string> = {
    "AI": "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "ML": "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "Robotics": "bg-red-500/20 text-red-400 border-red-500/30",
    "Web Dev": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "Mobile": "bg-green-500/20 text-green-400 border-green-500/30",
    "Blockchain": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    "IoT": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    "Design": "bg-pink-500/20 text-pink-400 border-pink-500/30",
    "Hardware": "bg-orange-500/20 text-orange-400 border-orange-500/30",
};

export function TeamCard({ team, userSkills, onRequestJoin, onMessageTeam, requestStatus = "idle" }: TeamCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    // Calculate matching skills
    const matchingSkills = team.requiredSkills.filter(skill =>
        userSkills.includes(skill)
    );

    const hasMatches = matchingSkills.length > 0;
    const isFull = team.members.length >= team.maxMembers;
    const isOpen = team.status === "open" && !isFull;
    const Link = require("next/link").default;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className={cn(
                "relative p-6 rounded-2xl transition-all duration-300",
                "bg-black/60 backdrop-blur-xl border border-white/10",
                isHovered && "shadow-[0_0_30px_rgba(0,229,255,0.2)] border-[#00E5FF]/30"
            )}
        >
            {/* Status Badge */}
            <div className="absolute top-4 right-4">
                {isFull ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                        FULL
                    </span>
                ) : team.status === "invite-only" ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                        INVITE ONLY
                    </span>
                ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#AAFF00]/20 text-[#AAFF00] border border-[#AAFF00]/30">
                        OPEN
                    </span>
                )}
            </div>

            {/* Team Header */}
            <div className="mb-4">
                <Link href={`/teams/${team.id}`} className="hover:text-accent1 transition-colors block">
                    <h3 className="text-2xl font-bold text-white mb-2">{team.name}</h3>
                </Link>
                <p className="text-sm text-gray-400 line-clamp-2">{team.description}</p>
            </div>

            {/* Project */}
            <div className="mb-4 p-3 rounded-lg bg-white/5 border border-white/5">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Project</p>
                <p className="text-sm text-white font-medium">{team.project}</p>
            </div>

            {/* Category Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
                {team.categories.map((category) => (
                    <span
                        key={category}
                        className={cn(
                            "px-3 py-1 rounded-full text-xs font-bold border",
                            CATEGORY_COLORS[category] || "bg-gray-500/20 text-gray-400 border-gray-500/30"
                        )}
                    >
                        {category}
                    </span>
                ))}
            </div>

            {/* Matching Skills Badge */}
            {hasMatches && (
                <div className="mb-4 flex items-center gap-2 p-2 rounded-lg bg-[#AAFF00]/10 border border-[#AAFF00]/30">
                    <Sparkles className="w-4 h-4 text-[#AAFF00]" />
                    <span className="text-xs font-bold text-[#AAFF00]">
                        {matchingSkills.length} Matching Skill{matchingSkills.length > 1 ? 's' : ''}
                    </span>
                </div>
            )}

            {/* Members Section */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-400">
                            {team.members.length}/{team.maxMembers} Members
                        </span>
                    </div>
                </div>

                {/* Member Avatars */}
                <div className="flex items-center">
                    {team.members.slice(0, 4).map((member, index) => (
                        <div
                            key={member.id}
                            className="relative"
                            style={{ marginLeft: index > 0 ? '-12px' : '0' }}
                        >
                            <Link href={`/people/${member.id}`} title={member.name}>
                                <div className="w-10 h-10 rounded-full border-2 border-black bg-gradient-to-br from-[#00E5FF]/40 to-[#AAFF00]/40 flex items-center justify-center text-white font-bold text-sm overflow-hidden hover:scale-110 transition-transform hover:z-10 hover:border-accent1 cursor-pointer">
                                    {member.avatar ? (
                                        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                                    ) : (
                                        member.name.charAt(0).toUpperCase()
                                    )}
                                </div>
                            </Link>
                            {member.role === "leader" && (
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FFB800] rounded-full flex items-center justify-center border border-black pointer-events-none">
                                    <span className="text-[8px] text-black font-bold">★</span>
                                </div>
                            )}
                        </div>
                    ))}
                    {team.members.length > 4 && (
                        <div className="w-10 h-10 rounded-full border-2 border-black bg-white/5 flex items-center justify-center text-gray-400 text-xs font-bold -ml-3">
                            +{team.members.length - 4}
                        </div>
                    )}
                </div>

                {/* Capacity Progress Bar */}
                <div className="mt-3 h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(team.members.length / team.maxMembers) * 100}%` }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className={cn(
                            "h-full rounded-full",
                            isFull ? "bg-red-500" : "bg-gradient-to-r from-[#00E5FF] to-[#AAFF00]"
                        )}
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
                {/* Request to Join Button */}
                <button
                    onClick={() => onRequestJoin(team.id)}
                    disabled={!isOpen || requestStatus !== "idle"}
                    className={cn(
                        "flex-1 py-3 px-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2",
                        requestStatus === "idle" && isOpen && "bg-[#00E5FF] text-black hover:bg-[#00E5FF]/80 shadow-[0_0_20px_rgba(0,229,255,0.3)]",
                        requestStatus === "pending" && "bg-white/5 text-gray-400 cursor-not-allowed",
                        requestStatus === "accepted" && "bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/30 cursor-default",
                        (!isOpen || !["idle", "pending", "accepted"].includes(requestStatus)) && "bg-white/5 text-gray-600 cursor-not-allowed"
                    )}
                >
                    {requestStatus === "idle" && "Request to Join"}
                    {requestStatus === "pending" && (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Request Sent
                        </>
                    )}
                    {requestStatus === "accepted" && (
                        <>
                            <CheckCircle className="w-4 h-4" />
                            Joined
                        </>
                    )}
                </button>

                {/* Message Team Button */}
                <button
                    onClick={() => onMessageTeam(team.id)}
                    className="flex-1 py-3 px-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all border-2 bg-transparent text-[#AAFF00] border-[#AAFF00]/50 hover:bg-[#AAFF00]/10 hover:border-[#AAFF00] flex items-center justify-center gap-2"
                >
                    <MessageCircle className="w-4 h-4" />
                    Message Team
                </button>
            </div>
        </motion.div>
    );
}
