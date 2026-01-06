"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { UserProfile } from "@/components/UserProfile";
import { TeamBuilder } from "@/components/TeamBuilder";
import { ChatSystem } from "@/components/ChatSystem";
import { ResourcesSection } from "@/components/ResourcesSection";
import { OrganizerPortal } from "@/components/OrganizerPortal";
import { InstitutionProfile } from "@/components/InstitutionProfile";
import { useStore } from "@/store/useStore";
import { USERS } from "@/constants/mockData";

const ROLES = ["Organizer", "Sponsor", "Recruiter"];

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState("Profile");
    const { currentUser } = useStore();

    // Use mock user if not logged in (for demo)
    const user = currentUser || USERS[0];

    return (
        <div className="min-h-screen pt-20 px-6 max-w-7xl mx-auto pb-20 flex flex-col justify-center">
            <Navbar />

            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold text-white">
                    Hello, <span className="text-accent1">{user.name.split(' ')[0]}</span>
                </h1>

                <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
                    {["Profile", "Team", "Manage", "Resources"].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-full transition-all ${activeTab === tab ? "bg-white text-black" : "text-gray-400 hover:text-white"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {activeTab === "Profile" && <UserProfile user={user} />}
                {activeTab === "Team" && <div className="h-[500px]"><TeamBuilder /></div>}

                {activeTab === "Manage" && (
                    <>
                        {user.role === "Organizer" ? <OrganizerPortal /> : <InstitutionProfile />}
                    </>
                )}
                {activeTab === "Resources" && <ResourcesSection />}
            </motion.div>

            <ChatSystem />
        </div>
    );
}
