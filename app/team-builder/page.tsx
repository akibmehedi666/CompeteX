"use client";

import { Navbar } from "@/components/ui/Navbar";
import { TeamBuilder } from "@/components/features/TeamBuilder";

export default function TeamBuilderPage() {
    return (
        <div className="min-h-screen bg-black selection:bg-accent1/30">
            <Navbar />
            <div className="pt-24 pb-12 max-w-7xl mx-auto px-6">
                <TeamBuilder />
            </div>
        </div>
    );
}
