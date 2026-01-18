

"use client";

import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { Plus, X, CheckCircle, UserPlus, Users, Search, GripVertical, Trophy } from "lucide-react";
import { CompetitionDropdown } from "@/components/ui/CompetitionDropdown";
import { useState, useEffect, useRef } from "react";
import { useStore } from "@/store/useStore";
import { TALENT_POOL } from "@/constants/talentData";
import { User } from "@/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
<<<<<<< HEAD
import Link from "next/link";
=======
>>>>>>> cd66b90ad0c7e2ca61bad9ecde19d1ce0d1b3b6d

export function TeamBuilder() {
    const { myTeam, addToTeam, removeFromTeam, currentUser } = useStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCompetition, setSelectedCompetition] = useState<string>("All Competitions");
    const [filteredTalent, setFilteredTalent] = useState<User[]>(TALENT_POOL);
    const [draggingId, setDraggingId] = useState<string | null>(null);

<<<<<<< HEAD
    // Team Creation State
    const [isCreating, setIsCreating] = useState(false);
    const [teamForm, setTeamForm] = useState({
        name: "",
        type: "Competition" as "Competition" | "Project",
        contextName: "",
        description: "",
        maxMembers: 4,
        requiredSkills: "" as string,
        lookingFor: "" as string
    });

=======
>>>>>>> cd66b90ad0c7e2ca61bad9ecde19d1ce0d1b3b6d
    // Derive available competitions from TALENT_POOL
    const competitions = ["All Competitions", ...Array.from(new Set(TALENT_POOL.flatMap(u => u.competitions || [])))];

    // Persistence on Mount
    useEffect(() => {
        const savedTeam = localStorage.getItem("competex_team_members");
        if (savedTeam) {
            const members = JSON.parse(savedTeam);
            // This is a bit hacky to sync with store, ideally store handles this.
            // But we'll just respect the store's state if it's already hydration-safe.
            // For now, let's assume store is the source of truth, and we save to LS on change.
        }
    }, []);

    // Save on Change
    useEffect(() => {
        if (myTeam?.members) {
            localStorage.setItem("competex_team_members", JSON.stringify(myTeam.members));
        }
    }, [myTeam?.members]);

    // Filter Logic
    useEffect(() => {
        const lowerSearch = searchTerm.toLowerCase();
        const filtered = TALENT_POOL.filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(lowerSearch) ||
                user.skills?.some(s => s.toLowerCase().includes(lowerSearch)) ||
                user.role.toLowerCase().includes(lowerSearch);

            const matchesCompetition = selectedCompetition === "All Competitions" ||
                user.competitions?.includes(selectedCompetition);

            const notInTeam = !myTeam?.members.some(m => m.id === user.id);

            return notInTeam && matchesSearch && matchesCompetition;
        });
        setFilteredTalent(filtered);
    }, [searchTerm, selectedCompetition, myTeam?.members]);

    const handleInvite = (user: User) => {
        if ((myTeam?.members.length || 0) >= (myTeam?.maxMembers || 4)) {
            toast.error("Team is full!");
            return;
        }
        addToTeam(user);
        toast.promise(new Promise(resolve => setTimeout(resolve, 500)), {
            loading: `Sending invite to ${user.name}...`,
            success: `Invite accepted by ${user.name}!`,
            error: "Failed to send invite"
        });
    };

    const handleRemove = (userId: string) => {
        removeFromTeam(userId);
        toast.info("Teammate removed.");
    };

    const isFull = (myTeam?.members.length ?? 0) >= (myTeam?.maxMembers ?? 4);
<<<<<<< HEAD
    const hasTeam = myTeam !== null && myTeam.members.length > 0;

    const handleCreateTeam = () => {
        if (!teamForm.name || !teamForm.contextName || !teamForm.description) {
            toast.error("Please fill in required fields (Name, Competition/Project, Description)");
            return;
        }

        toast.success(`Team "${teamForm.name}" created for ${teamForm.type}: ${teamForm.contextName}!`);
        setIsCreating(false);
        // Reset form
        setTeamForm({
            name: "",
            type: "Competition",
            contextName: "",
            description: "",
            maxMembers: 4,
            requiredSkills: "",
            lookingFor: ""
        });
        // Here you might call a store method like createTeam(teamForm)
    };
=======
>>>>>>> cd66b90ad0c7e2ca61bad9ecde19d1ce0d1b3b6d

    // If not logged in, show login prompt
    if (!currentUser) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-140px)]">
                <div className="lg:col-span-12 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-8 text-center backdrop-blur-sm"
                    >
                        <div className="w-16 h-16 bg-accent1/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Users className="w-8 h-8 text-accent1" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-3">Team Builder Access Required</h2>
                        <p className="text-gray-400 mb-6">
                            You need to be logged in to build your squad and invite teammates. Join CompeteX to unlock team collaboration features.
                        </p>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => window.location.href = '/login'}
                                className="w-full py-3 bg-accent1 text-black font-bold uppercase tracking-widest text-sm rounded-lg hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                            >
                                Log In to Continue
                            </button>
                            <button
                                onClick={() => window.location.href = '/signup'}
                                className="w-full py-3 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-white/10 transition-all"
                            >
                                Create Account
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
<<<<<<< HEAD
        <div className="flex flex-col lg:flex-row gap-8 max-h-[calc(100vh-180px)]">

            {/* LEFT: Talent Feed */}
            <div className="flex-1 flex flex-col gap-8">
                <div className="flex items-center justify-between py-10 mb-2">
                    <h3 className="text-2xl font-extrabold text-white flex items-center gap-3 mr-8">
                        <Users className="w-6 h-6 text-accent1" /> Talent Feed
                    </h3>
                    <div className="flex gap-6">
=======
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-140px)]">

            {/* LEFT: Talent Feed */}
            <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Users className="w-6 h-6 text-accent1" /> Talent Feed
                    </h3>
                    <div className="flex gap-2">
>>>>>>> cd66b90ad0c7e2ca61bad9ecde19d1ce0d1b3b6d
                        <CompetitionDropdown
                            competitions={competitions}
                            selected={selectedCompetition}
                            onSelect={setSelectedCompetition}
                            counts={competitions.reduce((acc, comp) => {
                                acc[comp] = comp === "All Competitions"
                                    ? TALENT_POOL.length
                                    : TALENT_POOL.filter(t => t.competitions?.includes(comp)).length;
                                return acc;
                            }, {} as Record<string, number>)}
                        />

                        {/* Search Bar */}
<<<<<<< HEAD
                        <div className="relative w-72">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Find skills (e.g. React, Design)..."
                                className="w-full bg-black/40 border border-white/10 rounded-full py-3 pl-11 pr-5 text-sm text-white focus:outline-none focus:border-accent1/50 transition-colors placeholder:text-gray-600"
=======
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Find skills (e.g. React, Design)..."
                                className="w-full bg-black/40 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-accent1/50 transition-colors placeholder:text-gray-600"
>>>>>>> cd66b90ad0c7e2ca61bad9ecde19d1ce0d1b3b6d
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

<<<<<<< HEAD
                <div className="flex-grow overflow-y-auto pr-3 space-y-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
=======
                <div className="flex-grow overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
>>>>>>> cd66b90ad0c7e2ca61bad9ecde19d1ce0d1b3b6d
                    {filteredTalent.map(user => (
                        <TalentCard
                            key={user.id}
                            user={user}
                            onInvite={() => handleInvite(user)}
                            isDraggable={!isFull}
                            onDragStart={() => setDraggingId(user.id)}
                            onDragEnd={() => setDraggingId(null)}
                        />
                    ))}
                    {filteredTalent.length === 0 && (
                        <div className="text-center text-gray-500 py-12">
                            No agents found matching your criteria.
                        </div>
                    )}
                </div>
            </div>

<<<<<<< HEAD
            {/* RIGHT: Your Team - Fixed Sidebar */}
            <div className="w-full lg:w-[380px] flex-shrink-0 flex flex-col">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 h-full flex flex-col relative overflow-hidden backdrop-blur-sm min-h-[calc(100vh-200px)]">
=======
            {/* RIGHT: Your Team */}
            <div className="lg:col-span-5 flex flex-col h-full">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full flex flex-col relative overflow-hidden backdrop-blur-sm">
>>>>>>> cd66b90ad0c7e2ca61bad9ecde19d1ce0d1b3b6d
                    {/* Success Overlay */}
                    <AnimatePresence>
                        {isFull && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-x-0 top-0 z-20 bg-gradient-to-b from-green-500/20 to-transparent p-4 text-center border-b border-green-500/30"
                            >
                                <span className="text-green-400 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                                    <CheckCircle className="w-4 h-4" /> Squad Complete
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>

<<<<<<< HEAD
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center justify-between">
                        <span>My Squad</span>
                        <span className="text-base font-normal text-gray-400 font-mono">
=======
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center justify-between">
                        <span>My Squad</span>
                        <span className="text-sm font-normal text-gray-400 font-mono">
>>>>>>> cd66b90ad0c7e2ca61bad9ecde19d1ce0d1b3b6d
                            {myTeam?.members.length || 0} / {myTeam?.maxMembers || 4}
                        </span>
                    </h3>

                    <div className="flex-grow space-y-4">
<<<<<<< HEAD
                        {/* Create Team Form or Team List */}
                        {!hasTeam && !isCreating ? (
                            <div className="flex-grow flex flex-col items-center justify-center text-center p-6 bg-white/5 rounded-xl border border-dashed border-white/10">
                                <Users className="w-12 h-12 text-gray-600 mb-4" />
                                <h4 className="text-white font-bold mb-2">No Team Yet</h4>
                                <p className="text-sm text-gray-400 mb-6">Create a team to start inviting others.</p>
                                <div className="my-6">
                                    <button
                                        onClick={() => setIsCreating(true)}
                                        className="px-6 py-2 bg-accent1 text-black font-bold uppercase text-sm rounded-lg hover:bg-white transition-colors"
                                    >
                                        Create Team
                                    </button>
                                </div>
                            </div>
                        ) : isCreating ? (
                            <div className="flex-grow space-y-4 overflow-y-auto pr-2">
                                <div className="text-center mb-4">
                                    <h4 className="text-white font-bold text-lg mb-1">Create Your Team</h4>
                                    <p className="text-xs text-gray-400">Fill in the details to build your squad</p>
                                </div>

                                {/* Team Name */}
                                <div>
                                    <label className="text-xs text-gray-400 uppercase font-bold mb-1 block">Team Name *</label>
                                    <input
                                        type="text"
                                        value={teamForm.name}
                                        onChange={e => setTeamForm({ ...teamForm, name: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-accent1 outline-none text-sm"
                                        placeholder="e.g. Code Warriors"
                                    />
                                </div>

                                {/* Team Type */}
                                <div>
                                    <label className="text-xs text-gray-400 uppercase font-bold mb-1 block">Team Type *</label>
                                    <div className="flex gap-2">
                                        {(["Competition", "Project"] as const).map(type => (
                                            <button
                                                key={type}
                                                onClick={() => setTeamForm({ ...teamForm, type })}
                                                className={cn(
                                                    "flex-1 py-2 text-sm font-bold rounded-lg border transition-colors",
                                                    teamForm.type === type
                                                        ? "bg-accent1/10 border-accent1 text-accent1"
                                                        : "bg-black/40 border-white/10 text-gray-500 hover:text-white"
                                                )}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Competition/Project Name */}
                                <div>
                                    <label className="text-xs text-gray-400 uppercase font-bold mb-1 block">
                                        {teamForm.type === "Competition" ? "Competition Name *" : "Project Name *"}
                                    </label>
                                    <input
                                        type="text"
                                        value={teamForm.contextName}
                                        onChange={e => setTeamForm({ ...teamForm, contextName: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-accent1 outline-none text-sm"
                                        placeholder={teamForm.type === "Competition" ? "e.g. CyberHack 2025" : "e.g. AI Assistant"}
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="text-xs text-gray-400 uppercase font-bold mb-1 block">Description *</label>
                                    <textarea
                                        value={teamForm.description}
                                        onChange={e => setTeamForm({ ...teamForm, description: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-accent1 outline-none text-sm resize-none"
                                        placeholder="Describe your project or competition goals..."
                                        rows={3}
                                    />
                                </div>

                                {/* Max Members */}
                                <div>
                                    <label className="text-xs text-gray-400 uppercase font-bold mb-1 block">Team Size</label>
                                    <select
                                        value={teamForm.maxMembers}
                                        onChange={e => setTeamForm({ ...teamForm, maxMembers: parseInt(e.target.value) })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-accent1 outline-none text-sm"
                                    >
                                        <option value={2}>2 Members</option>
                                        <option value={3}>3 Members</option>
                                        <option value={4}>4 Members</option>
                                        <option value={5}>5 Members</option>
                                        <option value={6}>6 Members</option>
                                    </select>
                                </div>

                                {/* Looking For */}
                                <div>
                                    <label className="text-xs text-gray-400 uppercase font-bold mb-1 block">
                                        Looking For (Roles/Skills)
                                    </label>
                                    <input
                                        type="text"
                                        value={teamForm.lookingFor}
                                        onChange={e => setTeamForm({ ...teamForm, lookingFor: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-accent1 outline-none text-sm"
                                        placeholder="e.g. Frontend Developer, UI Designer"
                                    />
                                </div>

                                {/* Required Skills */}
                                <div>
                                    <label className="text-xs text-gray-400 uppercase font-bold mb-1 block">
                                        Required Skills (comma-separated)
                                    </label>
                                    <input
                                        type="text"
                                        value={teamForm.requiredSkills}
                                        onChange={e => setTeamForm({ ...teamForm, requiredSkills: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-accent1 outline-none text-sm"
                                        placeholder="e.g. React, Python, Machine Learning"
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={() => setIsCreating(false)}
                                        className="flex-1 py-3 bg-white/5 text-white font-bold uppercase text-sm rounded-lg hover:bg-white/10 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleCreateTeam}
                                        className="flex-1 py-3 bg-accent1 text-black font-bold uppercase text-sm rounded-lg hover:bg-white transition-colors"
                                    >
                                        Create Team
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                {myTeam?.members.map(user => (
                                    <TeamMemberCard key={user.id} user={user} onRemove={() => handleRemove(user.id)} />
                                ))}

                                {/* Empty Slots */}
                                {Array.from({ length: Math.max(0, (myTeam?.maxMembers || 4) - (myTeam?.members.length || 0)) }).map((_, i) => (
                                    <EmptySlot key={`empty-${i}`} isTarget={!!draggingId} />
                                ))}
                            </>
                        )}
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                        {hasTeam && !isFull && (
                            <button
                                className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-widest text-sm rounded-lg transition-colors border border-dashed border-white/20"
                                onClick={() => {
                                    toast("Invitation Sent", {
                                        description: "Your invite link has been copied to clipboard.",
                                        action: {
                                            label: "Undo",
                                            onClick: () => console.log("Undo")
                                        }
                                    });
                                }}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <UserPlus className="w-4 h-4" /> Invite Member
                                </div>
                            </button>
                        )}

=======
                        {myTeam?.members.map(user => (
                            <TeamMemberCard key={user.id} user={user} onRemove={() => handleRemove(user.id)} />
                        ))}

                        {/* Empty Slots */}
                        {Array.from({ length: Math.max(0, (myTeam?.maxMembers || 4) - (myTeam?.members.length || 0)) }).map((_, i) => (
                            <EmptySlot key={`empty-${i}`} isTarget={!!draggingId} />
                        ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/5">
>>>>>>> cd66b90ad0c7e2ca61bad9ecde19d1ce0d1b3b6d
                        <button
                            disabled={!isFull}
                            className={cn(
                                "w-full py-4 font-bold uppercase tracking-widest text-sm rounded-sm transition-all",
                                isFull
                                    ? "bg-accent2 text-black hover:scale-[1.02] shadow-[0_0_20px_rgba(173,255,0,0.4)]"
                                    : "bg-white/5 text-gray-500 cursor-not-allowed"
                            )}
                        >
                            {isFull ? "Confirm Team Registration" : "Fill All Slots to Register"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TalentCard({ user, onInvite, isDraggable, onDragStart, onDragEnd }: { user: User, onInvite: () => void, isDraggable: boolean, onDragStart: () => void, onDragEnd: () => void }) {
    const controls = useDragControls();

    return (
        <motion.div
            layoutId={user.id}
            drag={isDraggable}
            dragControls={controls}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} // Snap back
            dragElastic={0.2}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            whileDrag={{ scale: 1.05, opacity: 0.8, zIndex: 50 }}
<<<<<<< HEAD
            className="group relative bg-white/5 hover:bg-white/10 border border-white/5 hover:border-accent1/30 rounded-xl p-6 transition-all"
=======
            className="group relative bg-white/5 hover:bg-white/10 border border-white/5 hover:border-accent1/30 rounded-xl p-4 transition-all"
>>>>>>> cd66b90ad0c7e2ca61bad9ecde19d1ce0d1b3b6d
        >
            <div className="flex items-center gap-4">
                {/* Drag Handle */}
                <div className="cursor-grab active:cursor-grabbing text-gray-600 group-hover:text-gray-400 p-1">
                    <GripVertical className="w-5 h-5" />
                </div>

                {/* Avatar */}
<<<<<<< HEAD
                <Link href={`/profile/${user.id}`} className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 group-hover:border-accent1/50 transition-colors cursor-pointer">
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </Link>

                {/* Info */}
                <div className="flex-grow">
                    <Link href={`/profile/${user.id}`} className="font-extrabold text-white group-hover:text-accent1 transition-colors hover:underline">{user.name}</Link>
                    <p className="text-xs text-gray-500">{user.university}</p>

                    {/* Skills */}
                    <div className="flex gap-2 mt-3 flex-wrap">
=======
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 group-hover:border-accent1/50 transition-colors">
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>

                {/* Info */}
                <div className="flex-grow">
                    <h4 className="font-bold text-white group-hover:text-accent1 transition-colors">{user.name}</h4>
                    <p className="text-xs text-gray-400">{user.university}</p>

                    {/* Skills */}
                    <div className="flex gap-2 mt-2 flex-wrap">
>>>>>>> cd66b90ad0c7e2ca61bad9ecde19d1ce0d1b3b6d
                        {user.skills?.slice(0, 3).map(skill => (
                            <span key={skill} className="px-2 py-0.5 bg-black/40 border border-white/10 rounded-sm text-[10px] text-gray-300">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <button
                    onClick={onInvite}
                    className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-accent1 text-black font-bold text-xs uppercase rounded-sm hover:scale-105 transition-all shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                >
                    Invite
                </button>
            </div>
        </motion.div>
    );
}

function TeamMemberCard({ user, onRemove }: { user: User, onRemove: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
<<<<<<< HEAD
            className="flex items-center gap-4 p-6 bg-accent1/5 border border-accent1/20 rounded-xl"
        >
            <Link href={`/profile/${user.id}`} className="w-10 h-10 rounded-full overflow-hidden border border-accent1/50 cursor-pointer hover:border-accent1 transition-colors">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </Link>
            <div className="flex-grow">
                <div className="font-extrabold text-white text-sm">{user.name}</div>
                <div className="text-[10px] text-gray-500">{user.role}</div>
=======
            className="flex items-center gap-4 p-3 bg-accent1/5 border border-accent1/20 rounded-xl"
        >
            <div className="w-10 h-10 rounded-full overflow-hidden border border-accent1/50">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow">
                <div className="font-bold text-white text-sm">{user.name}</div>
                <div className="text-[10px] text-accent1">{user.role}</div>
>>>>>>> cd66b90ad0c7e2ca61bad9ecde19d1ce0d1b3b6d
            </div>
            <button onClick={onRemove} className="p-2 text-gray-500 hover:text-red-500 transition-colors">
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
}

function EmptySlot({ isTarget }: { isTarget: boolean }) {
    return (
        <motion.div
            animate={{
                borderColor: isTarget ? "rgba(173, 255, 0, 0.5)" : "rgba(255, 255, 255, 0.1)",
                backgroundColor: isTarget ? "rgba(173, 255, 0, 0.05)" : "transparent"
            }}
            className="h-20 rounded-xl border-2 border-dashed flex items-center justify-center transition-colors"
        >
            <div className="text-center">
                <div className={cn("w-2 h-2 rounded-full mx-auto mb-2", isTarget ? "bg-accent2 animate-ping" : "bg-gray-700")} />
                <span className={cn("text-xs font-mono uppercase tracking-widest", isTarget ? "text-accent2" : "text-gray-600")}>
                    {isTarget ? "Drop to Invite" : "Empty Slot"}
                </span>
            </div>
        </motion.div>
    );
}
