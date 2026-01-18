"use client";

import { useState } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { TeamCard } from "@/components/teams/TeamCard";
import { ChatSidePanel } from "@/components/teams/ChatSidePanel";
import { motion } from "framer-motion";
import { Search, Users, Trophy, ChevronRight, MessageSquare, Filter, Plus, LogIn } from "lucide-react";
import { CompetitionDropdown } from "@/components/ui/CompetitionDropdown";
import { useStore } from "@/store/useStore";

import { DUMMY_TEAMS, Team } from "./data";

// Dummy user skills for matching
const USER_SKILLS = ["React", "Python", "Machine Learning", "Arduino", "3D Modeling"];
const CURRENT_USER_ID = "user-1";

export default function TeamsPage() {
    const [teams] = useState<Team[]>(DUMMY_TEAMS);
    const [searchQuery, setSearchQuery] = useState("");
    const [requestStatuses, setRequestStatuses] = useState<Record<string, "idle" | "pending" | "accepted" | "rejected">>({});
    const [chatPanelOpen, setChatPanelOpen] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
    const [selectedCompetition, setSelectedCompetition] = useState<string>("All Competitions");
    const { currentUser } = useStore();

    // Comprehensive list of competition types
    const competitions = [
        "All Competitions",
        "Hackathons",
        "Tech Sprints",
        "Design Wars",
        "UI/UX Bootcamps",
        "Coding Battles",
        "Algorithm Arenas",
        "Olympiads",
        "DevOp Sprints",
        "AI Model-Offs",
        "Data Science Bowls",
        "Datathons",
        "App Showcases",
        "Game Jams",
        "E-sports Leagues",
        "Capture The Flag",
        "Cybersecurity Showdowns",
        "Innovation Challenges",
        "Startup Grinds",
        "Cloud Architecture Wars",
        "Mobile App Derbies",
        "Scripting Sprints",
        "Hardware Hacks",
        "Blockchain Battles",
        "Fintech Face-offs"
    ];

    const handleRequestJoin = (teamId: string) => {
        if (!currentUser) {
            window.location.href = '/login';
            return;
        }
        setRequestStatuses(prev => ({ ...prev, [teamId]: "pending" }));
        setTimeout(() => {
            setRequestStatuses(prev => ({ ...prev, [teamId]: "accepted" }));
        }, 2000);
    };

    const handleMessageTeam = (teamId: string) => {
        if (!currentUser) {
            window.location.href = '/login';
            return;
        }
        const team = teams.find(t => t.id === teamId);
        if (team) {
            setSelectedTeam(team);
            setChatPanelOpen(true);
        }
    };

    const filteredTeams = teams.filter(team => {
        const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            team.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            team.project.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCompetition = selectedCompetition === "All Competitions" ||
            team.competition === selectedCompetition;

        return matchesSearch && matchesCompetition;
    });

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

                <div className="mb-8 flex flex-col md:flex-row gap-4 items-center">
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
                    <div className="flex gap-4">
                        <CompetitionDropdown
                            competitions={competitions}
                            selected={selectedCompetition}
                            onSelect={setSelectedCompetition}
                            counts={competitions.reduce((acc, comp) => {
                                acc[comp] = comp === "All Competitions"
                                    ? teams.length
                                    : teams.filter(t => t.competition === comp).length;
                                return acc;
                            }, {} as Record<string, number>)}
                        />
                        <button
                            onClick={() => window.location.href = '/team-builder'}
                            className="flex items-center gap-2 px-6 py-3 bg-accent1 text-black font-bold uppercase text-sm rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] whitespace-nowrap"
                        >
                            <Plus className="w-5 h-5" />
                            Create Team
                        </button>
                    </div>
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
        </div >
    );
}
