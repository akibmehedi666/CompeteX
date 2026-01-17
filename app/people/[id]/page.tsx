"use client";

import { use } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { PublicProfile } from "@/components/profile/PublicProfile";
import { TALENT_POOL } from "@/constants/talentData";
import { notFound } from "next/navigation";
import { useStore } from "@/store/useStore";
import { useEffect, useState } from "react";

interface ProfilePageProps {
    params: Promise<{ id: string }>;
}

export default function UserProfilePage({ params }: ProfilePageProps) {
    const { id } = use(params);
    const { setActiveDirectMessageUser } = useStore();
    const [scrolled, setScrolled] = useState(false);

    const user = TALENT_POOL.find(u => u.id === id);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!user) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-black">
            <Navbar />

            <div className="pt-32 pb-20">
                <PublicProfile
                    user={user}
                    onMessageClick={(u) => setActiveDirectMessageUser(u)}
                />
            </div>
        </main>
    );
}
