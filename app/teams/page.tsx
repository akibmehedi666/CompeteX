"use client";

import { useState } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { TeamCard } from "@/components/teams/TeamCard";
import { ChatSidePanel } from "@/components/teams/ChatSidePanel";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";

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

// Dummy user skills for matching
const USER_SKILLS = ["React", "Python", "Machine Learning", "Arduino", "3D Modeling"];
const CURRENT_USER_ID = "user-1";

// Dummy team data
const DUMMY_TEAMS: Team[] = [
    {
        id: "team-1",
        name: "AI Vision Squad",
        description: "Building an AI-powered object detection system for autonomous vehicles using YOLOv8 and PyTorch.",
        project: "Self-Driving Car Vision System",
        categories: ["AI", "ML", "Robotics"],
        requiredSkills: ["Python", "Machine Learning", "Computer Vision", "TensorFlow"],
        members: [
            { id: "m1", name: "Sarah Chen", avatar: "", role: "leader", skills: ["Python", "ML"] },
            { id: "m2", name: "Alex Kumar", avatar: "", role: "member", skills: ["PyTorch", "CV"] },
            { id: "m3", name: "Emma Davis", avatar: "", role: "member", skills: ["TensorFlow"] },
        ],
        maxMembers: 4,
        leaderId: "m1",
        status: "open",
    },
    {
        id: "team-2",
        name: "RoboBuilders",
        description: "Designing and building an autonomous robot for warehouse navigation and package sorting.",
        project: "Warehouse Automation Bot",
        categories: ["Robotics", "Hardware", "IoT"],
        requiredSkills: ["Arduino", "C++", "3D Modeling", "Electronics"],
        members: [
            { id: "m4", name: "Marcus Lee", avatar: "", role: "leader", skills: ["Arduino", "C++"] },
            { id: "m5", name: "Priya Patel", avatar: "", role: "member", skills: ["3D Modeling"] },
        ],
        maxMembers: 4,
        leaderId: "m4",
        status: "open",
    },
    {
        id: "team-3",
        name: "Web3 Innovators",
        description: "Creating a decentralized marketplace for digital art with NFT integration and smart contracts.",
        project: "NFT Art Marketplace DApp",
        categories: ["Blockchain", "Web Dev"],
        requiredSkills: ["Solidity", "React", "Web3.js", "Smart Contracts"],
        members: [
            { id: "m6", name: "Jordan Taylor", avatar: "", role: "leader", skills: ["Solidity", "Web3"] },
            { id: "m7", name: "Lisa Wang", avatar: "", role: "member", skills: ["React", "UI/UX"] },
            { id: "m8", name: "David Kim", avatar: "", role: "member", skills: ["Smart Contracts"] },
            { id: "m9", name: "Amy Rodriguez", avatar: "", role: "member", skills: ["Backend"] },
        ],
        maxMembers: 4,
        leaderId: "m6",
        status: "full",
    },
    {
        id: "team-4",
        name: "HealthTrack Solutions",
        description: "Developing a mobile app for personalized health monitoring with AI-driven insights and recommendations.",
        project: "AI Health Companion App",
        categories: ["Mobile", "AI", "Design"],
        requiredSkills: ["React Native", "Python", "UI/UX Design", "Machine Learning"],
        members: [
            { id: "m10", name: "Sophie Anderson", avatar: "", role: "leader", skills: ["React Native", "Mobile"] },
            { id: "m11", name: "Ryan Mitchell", avatar: "", role: "member", skills: ["Python", "ML"] },
        ],
        maxMembers: 5,
        leaderId: "m10",
        status: "open",
    },
    {
        id: "team-5",
        name: "SmartHome Architects",
        description: "Building an integrated IoT home automation system with voice control and energy optimization.",
        project: "Voice-Controlled Smart Home Hub",
        categories: ["IoT", "Hardware", "AI"],
        requiredSkills: ["Arduino", "Raspberry Pi", "Python", "Voice Recognition"],
        members: [
            { id: "m12", name: "James Wilson", avatar: "", role: "leader", skills: ["Arduino", "IoT"] },
            { id: "m13", name: "Olivia Brown", avatar: "", role: "member", skills: ["Python"] },
            { id: "m14", name: "Ethan Garcia", avatar: "", role: "member", skills: ["Raspberry Pi"] },
        ],
        maxMembers: 4,
        leaderId: "m12",
        status: "invite-only",
    },
    {
        id: "team-6",
        name: "EduTech Wizards",
        description: "Creating an interactive e-learning platform with gamification and adaptive learning algorithms.",
        project: "Gamified Learning Platform",
        categories: ["Web Dev", "AI", "Design"],
        requiredSkills: ["React", "Node.js", "MongoDB", "UI/UX Design"],
        members: [
            { id: "m15", name: "Isabella Martinez", avatar: "", role: "leader", skills: ["React", "Node"] },
        ],
        maxMembers: 6,
        leaderId: "m15",
        status: "open",
    },
];

export default function TeamsPage() {
    const [teams] = useState<Team[]>(DUMMY_TEAMS);
    const [searchQuery, setSearchQuery] = useState("");
    const [requestStatuses, setRequestStatuses] = useState<Record<string, "idle" | "pending" | "accepted" | "rejected">>({});
    const [chatPanelOpen, setChatPanelOpen] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

    const handleRequestJoin = (teamId: string) => {
        setRequestStatuses(prev => ({ ...prev, [teamId]: "pending" }));
        setTimeout(() => {
            setRequestStatuses(prev => ({ ...prev, [teamId]: "accepted" }));
        }, 2000);
    };

    const handleMessageTeam = (teamId: string) => {
        const team = teams.find(t => t.id === teamId);
        if (team) {
            setSelectedTeam(team);
            setChatPanelOpen(true);
        }
    };

    const filteredTeams = teams.filter(team =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.project.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-black selection:bg-accent1/30">
            <Navbar />

            <div className="pt-24 pb-12 max-w-7xl mx-auto px-6">
                <div className="mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-bold text-white mb-3 tracking-tight"
                    >
                        Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#AAFF00]">Teams</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-lg max-w-2xl"
                    >
                        Find the perfect team for your next competition. Message teams to discuss projects, or request to join directly.
                    </motion.p>
                </div>

                <div className="mb-8 flex gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search teams..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white text-sm focus:border-[#00E5FF]/50 focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/20 transition-all"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-white font-medium">
                        <Filter className="w-5 h-5" />
                        <span>Filters</span>
                    </button>
                </div>

                <div className="mb-8 grid grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-3xl font-bold text-white mb-1">{teams.length}</p>
                        <p className="text-sm text-gray-400">Active Teams</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-3xl font-bold text-[#00E5FF] mb-1">
                            {teams.filter(t => t.status === "open" && t.members.length < t.maxMembers).length}
                        </p>
                        <p className="text-sm text-gray-400">Open Slots</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-3xl font-bold text-[#AAFF00] mb-1">
                            {teams.reduce((acc, team) => acc + team.requiredSkills.filter(skill => USER_SKILLS.includes(skill)).length, 0)}
                        </p>
                        <p className="text-sm text-gray-400">Skill Matches</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTeams.map((team, index) => (
                        <motion.div
                            key={team.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <TeamCard
                                team={team}
                                userSkills={USER_SKILLS}
                                onRequestJoin={handleRequestJoin}
                                onMessageTeam={handleMessageTeam}
                                requestStatus={requestStatuses[team.id] || "idle"}
                            />
                        </motion.div>
                    ))}
                </div>

                {filteredTeams.length === 0 && (
                    <div className="text-center py-24 border border-dashed border-white/10 rounded-3xl">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-gray-600" />
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2">No teams found</h3>
                        <p className="text-gray-500">Try adjusting your search query</p>
                    </div>
                )}
            </div>

            <ChatSidePanel
                isOpen={chatPanelOpen}
                onClose={() => setChatPanelOpen(false)}
                team={selectedTeam}
                userSkills={USER_SKILLS}
                currentUserId={CURRENT_USER_ID}
            />
        </div>
    );
}
