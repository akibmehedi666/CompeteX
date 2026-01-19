"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";
import { ParticipantDashboard } from "@/components/dashboard/ParticipantDashboard";
import { SponsorDashboard } from "@/components/dashboard/SponsorDashboard";
import { RecruiterDashboard } from "@/components/dashboard/RecruiterDashboard";
import { ChatSystem } from "@/components/features/ChatSystem";
import { useStore } from "@/store/useStore";
import { normalizeRole } from "@/lib/auth";
import { UserRole } from "@/types";

function DashboardContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { currentUser } = useStore();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load user from store or localStorage
        if (currentUser) {
            setUser(currentUser);
            setLoading(false);
        } else if (typeof window !== 'undefined') {
            const stored = localStorage.getItem("competex_user_session");
            if (stored) {
                try {
                    const userData = JSON.parse(stored);
                    userData.role = normalizeRole(userData.role || "Participant");
                    setUser(userData);
                } catch (e) {
                    console.error("Error parsing user:", e);
                    router.push("/login");
                }
            } else {
                router.push("/login");
            }
            setLoading(false);
        }
    }, [currentUser, router]);

    useEffect(() => {
        const tabParam = searchParams.get("tab");
        if (tabParam) {
            // Handle tab params if needed
        }
    }, [searchParams]);

    const userRole = user ? normalizeRole(user.role || "Participant") : null;

    useEffect(() => {
        // Don't redirect organizer if they're accessing messaging
        if (userRole === "Organizer" && searchParams.get("tab") !== "chat") {
            router.push("/organizer/dashboard");
        }
    }, [userRole, router, searchParams]);

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
        <div className="min-h-screen bg-black pt-24 pb-12 px-6">
            <Navbar />

            {searchParams.get("tab") === "chat" ? (
                <ChatSystem variant="fullscreen" />
            ) : (
                <>
                    {userRole === "Participant" && (
                        <ParticipantDashboard user={user} setUser={setUser} />
                    )}
                    {userRole === "Sponsor" && (
                        <SponsorDashboard user={user} />
                    )}
                    {userRole === "Recruiter" && (
                        <RecruiterDashboard user={user} />
                    )}
<<<<<<< HEAD
                    {userRole === "Mentor" && (
                        <div className="text-white text-center py-12">
                            <p className="text-lg mb-4">Mentor Dashboard</p>
                            <p className="text-gray-400">Access your mentor dashboard for detailed mentorship features.</p>
                            <a href="/mentor/dashboard" className="text-accent1 hover:text-accent2 mt-4 inline-block">
                                Go to Mentor Dashboard →
                            </a>
                        </div>
                    )}
=======
>>>>>>> 1c1d603a399e8e39a1cc4517dbfa6972a4ea5d5c

                    {/* Floating Widget for non-chat tabs */}
                    <ChatSystem initialOpen={false} variant="widget" />
                </>
            )}
        </div>
    );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        }>
            <DashboardContent />
        </Suspense>
    );
}
