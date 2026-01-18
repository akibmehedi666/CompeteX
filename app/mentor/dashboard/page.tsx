"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";
import { MentorDashboard } from "@/components/dashboard/MentorDashboard";
import { useStore } from "@/store/useStore";
import { normalizeRole } from "@/lib/auth";

function MentorDashboardContent() {
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
                    const role = normalizeRole(userData.role);

                    if (role !== "Mentor") {
                        router.push("/dashboard"); // Redirect non-mentors
                        return;
                    }

                    userData.role = role;
                    setUser(userData);
                } catch (e) {
                    router.push("/login");
                }
            } else {
                router.push("/login");
            }
            setLoading(false);
        }
    }, [currentUser, router]);

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
            <MentorDashboard user={user} setUser={setUser} />
        </div>
    );
}

export default function MentorDashboardPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
            <MentorDashboardContent />
        </Suspense>
    );
}
