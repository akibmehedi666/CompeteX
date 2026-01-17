"use client";

import { useState } from "react";
import { User, MentorProfile, Achievement } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Upload, Save, Trophy, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Helper to mock a profile since User and MentorProfile are slightly different in our mock setup
// In a real app, we'd fetch the specific MentorProfile for this user
const MOCK_INITIAL_PROFILE: Partial<MentorProfile> = {
    title: "Senior AI Researcher",
    organization: "DeepMind",
    bio: "I specialize in Reinforcement Learning and Multi-Agent Systems.",
    expertise: ["AI/ML", "Algorithms", "Research"],
    hourlyRate: 120,
    currency: "$",
    languages: ["English", "Mandarin"],
    availability: { slots: [], nextAvailable: "2026-01-20" },
    socials: { linkedin: "https://linkedin.com", github: "https://github.com" },
    offerings: ["One-to-One", "Research Guidance"]
};

interface MentorProfileEditorProps {
    user: User;
    setUser: (user: User) => void;
}

export function MentorProfileEditor({ user, setUser }: MentorProfileEditorProps) {
    const [profile, setProfile] = useState({ ...MOCK_INITIAL_PROFILE, ...user }); // Merge user data
    const [newExpertise, setNewExpertise] = useState("");
    const [achievements, setAchievements] = useState<Achievement[]>(user.achievements || []);

    // Form States
    const [isDirty, setIsDirty] = useState(false);

    const handleChange = (field: keyof MentorProfile, value: any) => {
        setProfile(prev => ({ ...prev, [field]: value }));
        setIsDirty(true);
    };

    const addExpertise = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && newExpertise.trim()) {
            if (!profile.expertise?.includes(newExpertise.trim())) {
                const updated = [...(profile.expertise || []), newExpertise.trim()];
                handleChange("expertise", updated);
                setNewExpertise("");
            }
        }
    };

    const removeExpertise = (tag: string) => {
        const updated = profile.expertise?.filter(t => t !== tag);
        handleChange("expertise", updated);
    };

    // Achievement Handling
    const handleAchievementUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Mock Upload
            const newAchievement: Achievement = {
                id: Date.now().toString(),
                eventId: "custom-upload",
                eventTitle: "External Certification",
                title: file.name.split('.')[0],
                description: "Uploaded certificate/proof.",
                earnedDate: new Date().toISOString(),
                type: "special",
                badge: "🏆",
                certificateUrl: URL.createObjectURL(file) // Local preview
            };
            setAchievements(prev => [...prev, newAchievement]);
            setIsDirty(true);
            toast.success("Certificate uploaded!");
        }
    };

    const removeAchievement = (id: string) => {
        setAchievements(prev => prev.filter(a => a.id !== id));
        setIsDirty(true);
    };

    const handleSave = () => {
        // In a real app, this would be an API call to update the MentorProfile
        // For now, we update the User object where applicable/shared
        const updatedUser = {
            ...user,
            achievements: achievements,
            skills: profile.expertise || [] // Sync expertise to skills for now
            // Other fields would go to a specific mentor table
        };
        setUser(updatedUser);
        localStorage.setItem("competex_user_session", JSON.stringify(updatedUser)); // Persist mock
        setIsDirty(false);
        toast.success("Profile updated successfully!");
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Edit Mentor Profile</h2>
                <button
                    onClick={handleSave}
                    disabled={!isDirty}
                    className={cn(
                        "flex items-center gap-2 px-6 py-2 rounded-lg font-bold uppercase tracking-wide text-sm transition-all",
                        isDirty
                            ? "bg-accent1 text-black shadow-[0_0_15px_rgba(0,229,255,0.3)] hover:scale-105"
                            : "bg-white/10 text-gray-500 cursor-not-allowed"
                    )}
                >
                    <Save className="w-4 h-4" /> Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Basic Info */}
                <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Basic Information</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Professional Title</label>
                                <input
                                    type="text"
                                    value={profile.title || ""}
                                    onChange={(e) => handleChange("title", e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-accent1 outline-none"
                                    placeholder="e.g. Senior Software Engineer"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Organization</label>
                                <input
                                    type="text"
                                    value={profile.organization || ""}
                                    onChange={(e) => handleChange("organization", e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-accent1 outline-none"
                                    placeholder="e.g. Google"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
                                <textarea
                                    value={profile.bio || ""}
                                    onChange={(e) => handleChange("bio", e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-accent1 outline-none min-h-[120px]"
                                    placeholder="Tell mentees about your experience..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Expertise & Skills</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Add Skill (Press Enter)</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newExpertise}
                                        onChange={(e) => setNewExpertise(e.target.value)}
                                        onKeyDown={addExpertise}
                                        className="flex-1 bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-accent1 outline-none"
                                        placeholder="e.g. System Design"
                                    />
                                    <button
                                        onClick={() => {
                                            if (newExpertise.trim()) {
                                                const updated = [...(profile.expertise || []), newExpertise.trim()];
                                                handleChange("expertise", updated);
                                                setNewExpertise("");
                                            }
                                        }}
                                        className="p-3 bg-white/10 rounded-lg hover:bg-white/20"
                                    >
                                        <Plus className="w-5 h-5 text-white" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {profile.expertise?.map(tag => (
                                    <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-accent1/10 border border-accent1/30 text-accent1 rounded-full text-sm group">
                                        {tag}
                                        <button onClick={() => removeExpertise(tag)} className="hover:text-white transition-colors">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Achievements & Offerings */}
                <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-white">Achievements & Certificates</h3>
                            <label className="cursor-pointer flex items-center gap-2 px-3 py-1.5 bg-accent1/10 text-accent1 text-xs font-bold uppercase rounded-lg border border-accent1/20 hover:bg-accent1 hover:text-black transition-all">
                                <Upload className="w-3 h-3" /> Upload
                                <input type="file" className="hidden" accept="image/*,.pdf" onChange={handleAchievementUpload} />
                            </label>
                        </div>

                        <div className="space-y-3">
                            <AnimatePresence>
                                {achievements.map(ach => (
                                    <motion.div
                                        key={ach.id}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="flex items-center gap-3 p-3 bg-black/40 rounded-lg border border-white/5 group"
                                    >
                                        <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center text-2xl">
                                            {ach.badge || "🏆"}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-bold text-white truncate">{ach.title}</h4>
                                            <p className="text-xs text-gray-500 truncate">{ach.eventTitle}</p>
                                        </div>
                                        <button
                                            onClick={() => removeAchievement(ach.id)}
                                            className="p-2 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {achievements.length === 0 && (
                                <div className="text-center py-8 text-gray-500 text-sm border border-dashed border-white/10 rounded-lg">
                                    No achievements added yet.
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Mentorship Details</h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Hourly Rate ($)</label>
                                <input
                                    type="number"
                                    value={profile.hourlyRate || 0}
                                    onChange={(e) => handleChange("hourlyRate", parseInt(e.target.value))}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-accent1 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Currency</label>
                                <select
                                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-accent1 outline-none"
                                    value={profile.currency}
                                    onChange={(e) => handleChange("currency", e.target.value)}
                                >
                                    <option value="$">USD ($)</option>
                                    <option value="€">EUR (€)</option>
                                    <option value="£">GBP (£)</option>
                                    <option value="৳">BDT (৳)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
