import { TeamBuilder } from "@/components/TeamBuilder";
import { Navbar } from "@/components/Navbar";

export default function TeamsPage() {
    return (
        <div className="min-h-screen bg-black">
            <Navbar />
            <div className="pt-24 pb-12 max-w-7xl mx-auto px-6">
                <h1 className="text-4xl font-bold text-white mb-8 text-center">Find your <span className="text-accent1">Squad</span></h1>
                <TeamBuilder />
            </div>
        </div>
    );
}
