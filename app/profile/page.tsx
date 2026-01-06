"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { Camera, Edit2, Save, Github, Linkedin, Shield, MapPin, Award } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [tempSkills, setTempSkills] = useState("");

    useEffect(() => {
        // Load user from local storage
        const stored = localStorage.getItem("competex_user_session");
        if (stored) {
            const parsed = JSON.parse(stored);
            setUser(parsed);
            setTempSkills(parsed.skills?.join(", ") || "");
            console.log("Loaded User:", parsed);
        } else {
            console.log("No user found in localStorage");
            // router.push("/signup"); // Comment out redirect for debugging
        }
        setLoading(false);
    }, [router]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                const updated = { ...user, avatar: base64 };
                setUser(updated);
                localStorage.setItem("competex_user_session", JSON.stringify(updated));
                toast.success("Profile photo updated successfully!");
            };
            reader.readAsDataURL(file);
        }
    };

    const saveProfile = () => {
        const updated = {
            ...user,
            skills: tempSkills.split(",").map(s => s.trim()).filter(Boolean)
        };
        setUser(updated);
        localStorage.setItem("competex_user_session", JSON.stringify(updated));
        setIsEditing(false);
        toast.success("Profile information saved!");
    };

    if (loading) return null;

    return (
        <div className="min-h-screen bg-black pt-24 pb-12 px-6">
            <Navbar />
            <div className="max-w-4xl mx-auto">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative bg-white/5 border border-white/10 rounded-2xl p-8 mb-8 backdrop-blur-md overflow-hidden"
                >
                    {/* Background Decor */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent1/10 rounded-full blur-[80px]" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">

                        {/* Avatar Upload */}
                        <div className="relative group">
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="w-32 h-32 rounded-full border-2 border-accent1 p-1 cursor-pointer overflow-hidden transition-all hover:shadow-[0_0_20px_#00E5FF]"
                            >
                                {user?.avatar ? (
                                    <img src={user.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center">
                                        <UserPlaceholder />
                                    </div>
                                )}

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                                    <Camera className="w-6 h-6 text-white mb-1" />
                                    <span className="text-[10px] font-bold text-accent1 uppercase">Change Photo</span>
                                </div>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                accept="image/*"
                                className="hidden"
                            />
                        </div>

                        {/* User Info */}
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                <h1 className="text-3xl font-bold text-white">{user?.fullName}</h1>
                                <span className="px-3 py-1 bg-accent1/20 text-accent1 text-xs font-bold uppercase rounded-full border border-accent1/50">
                                    {user?.role}
                                </span>
                            </div>
                            <p className="text-gray-400 mb-4 flex items-center justify-center md:justify-start gap-2">
                                <MapPin className="w-4 h-4" /> {user?.role === 'institution' ? user?.campusLocation : 'San Francisco, CA'}
                                <span className="w-1 h-1 rounded-full bg-gray-600" />
                                {user?.email}
                            </p>

                            <div className="flex gap-3 justify-center md:justify-start">
                                <SocialButton icon={Github} label="GitHub" />
                                <SocialButton icon={Linkedin} label="LinkedIn" />
                            </div>
                        </div>

                        {/* Edit Action */}
                        <button
                            onClick={() => isEditing ? saveProfile() : setIsEditing(true)}
                            className={cn(
                                "flex items-center gap-2 px-6 py-2 rounded-lg font-bold uppercase tracking-wide text-xs transition-all",
                                isEditing
                                    ? "bg-accent2 text-black shadow-[0_0_15px_#ADFF00]"
                                    : "bg-white/10 text-white hover:bg-white/20"
                            )}
                        >
                            {isEditing ? <><Save className="w-4 h-4" /> Save</> : <><Edit2 className="w-4 h-4" /> Edit Profile</>}
                        </button>
                    </div>
                </motion.div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Skills Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-2 bg-white/5 border border-white/10 rounded-xl p-6"
                    >
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-accent1" /> Skills & Expertise
                        </h3>

                        {isEditing ? (
                            <textarea
                                value={tempSkills}
                                onChange={(e) => setTempSkills(e.target.value)}
                                className="w-full bg-black/40 border border-white/20 rounded-lg p-4 text-white focus:border-accent1 outline-none min-h-[100px]"
                                placeholder="Enter skills separated by comma..."
                            />
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {(user?.skills || []).map((skill: string, i: number) => (
                                    <span key={i} className="px-3 py-1 bg-accent1/10 border border-accent1/30 text-accent1 text-sm rounded-md">
                                        {skill}
                                    </span>
                                ))}
                                {(!user?.skills || user.skills.length === 0) && (
                                    <span className="text-gray-500 text-sm italic">No skills listed yet.</span>
                                )}
                            </div>
                        )}
                    </motion.div>

                    {/* Stats Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 border border-white/10 rounded-xl p-6"
                    >
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Award className="w-5 h-5 text-yellow-500" /> Platform Stats
                        </h3>

                        <div className="space-y-4">
                            <StatRow label="Rank" value={`#${user?.stats?.rank || 999}`} />
                            <StatRow label="XP Points" value={user?.stats?.points || 0} />
                            <StatRow label="Events Won" value={user?.stats?.eventsWon || 0} />
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}

function UserPlaceholder() {
    return (
        <svg className="w-12 h-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    );
}

function SocialButton({ icon: Icon, label }: { icon: any, label: string }) {
    return (
        <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/30 transition-all group">
            <Icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
        </button>
    );
}

function StatRow({ label, value }: { label: string, value: string | number }) {
    return (
        <div className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
            <span className="text-gray-400 text-sm">{label}</span>
            <span className="text-white font-bold font-mono">{value}</span>
        </div>
    );
}
