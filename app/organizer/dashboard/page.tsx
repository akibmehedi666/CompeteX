"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OrganizerPortal } from "@/components/dashboard/OrganizerPortal";
import { Navbar } from "@/components/ui/Navbar";
import { normalizeRole } from "@/lib/auth";

export default function OrganizerDashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check authentication and role
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem("competex_user_session");
            if (stored) {
                try {
                    const userData = JSON.parse(stored);
                    const normalizedRole = normalizeRole(userData.role || "Participant");

                    // Redirect if not an organizer
                    if (normalizedRole !== "Organizer") {
                        router.push("/dashboard");
                        return;
                    }

                    setUser(userData);
                } catch (e) {
                    console.error("Error parsing user:", e);
                    router.push("/login");
                }
            } else {
                router.push("/login");
            }
        }
        setLoading(false);
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-black">
            <Navbar />
            <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
                <OrganizerPortal />

                {/* Profile Settings Section */}
                <div className="mt-12 pt-12 border-t border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Banner Upload */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h3 className="text-white font-bold mb-4">Organization Banner</h3>
                            <div className="aspect-[3/1] bg-black rounded-lg border-2 border-dashed border-white/20 flex flex-col items-center justify-center relative overflow-hidden group hover:border-accent1/50 transition-colors cursor-pointer">
                                <span className="text-gray-500 text-sm mb-2 group-hover:text-white">Click to upload banner</span>
                                <span className="text-xs text-gray-600">1200x400 recommended</span>
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                            </div>
                        </div>

                        {/* Profile Picture Upload */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h3 className="text-white font-bold mb-4">Profile Picture</h3>
                            <div className="flex items-center gap-6">
                                <div className="w-24 h-24 rounded-full bg-black border-2 border-dashed border-white/20 flex items-center justify-center relative overflow-hidden group hover:border-accent1/50 transition-colors cursor-pointer">
                                    <span className="text-gray-500 text-xs text-center px-2 group-hover:text-white">Upload Logo</span>
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 mb-2">Upload your organization logo or profile picture.</p>
                                    <p className="text-xs text-gray-600">Square JPG or PNG, max 2MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
