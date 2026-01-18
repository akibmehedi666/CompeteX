"use client";

import { useState } from "react";
import { Search, Filter, Building2, ExternalLink, Handshake } from "lucide-react";
import { MOCK_SPONSOR, SponsorProfile } from "@/components/sponsors/SponsorProfile";
import { motion, AnimatePresence } from "framer-motion";

// Mock List of Sponsors
const MOCK_SPONSORS = [
    MOCK_SPONSOR,
    {
        ...MOCK_SPONSOR,
        id: "s2",
        companyName: "DevGuild",
        industry: "Education & EdTech",
        sponsorshipCategories: ["Coding", "Seminars"],
        pastSponsorships: [],
        description: "Empowering developers through education and community resources."
    },
    {
        ...MOCK_SPONSOR,
        id: "s3",
        companyName: "NextGen Robotics",
        industry: "Robotics & Hardware",
        sponsorshipCategories: ["Robotics", "Hackathons"],
        pastSponsorships: [],
        description: "Building the future of automation with advanced robotics kits."
    }
];

export function SponsorDiscovery() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedSponsor, setSelectedSponsor] = useState<any | null>(null);

    const filteredSponsors = MOCK_SPONSORS.filter(sponsor => {
        const matchesSearch = sponsor.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sponsor.industry.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory ? sponsor.sponsorshipCategories.includes(selectedCategory) : true;
        return matchesSearch && matchesCategory;
    });

    const allCategories = Array.from(new Set(MOCK_SPONSORS.flatMap(s => s.sponsorshipCategories)));

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white">Find Sponsors</h2>
                    <p className="text-sm text-gray-400">Connect with top companies to support your event.</p>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search companies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:border-accent1 outline-none"
                        />
                    </div>
                    <button className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-400">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border transition-colors ${!selectedCategory ? "bg-accent1 text-black border-accent1" : "bg-white/5 border-white/10 text-gray-400 hover:text-white"}`}
                >
                    All Types
                </button>
                {allCategories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border transition-colors ${selectedCategory === cat ? "bg-accent1 text-black border-accent1" : "bg-white/5 border-white/10 text-gray-400 hover:text-white"}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Sponsor Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSponsors.map(sponsor => (
                    <motion.div
                        key={sponsor.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-accent1/30 transition-all group cursor-pointer"
                        onClick={() => setSelectedSponsor(sponsor)}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/10 rounded-lg p-1 border border-white/10">
                                    <img src={sponsor.logo} alt={sponsor.companyName} className="w-full h-full object-cover rounded" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white group-hover:text-accent1 transition-colors">{sponsor.companyName}</h3>
                                    <p className="text-xs text-gray-400">{sponsor.industry}</p>
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-gray-400 line-clamp-2 mb-4 h-10">
                            {sponsor.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {sponsor.sponsorshipCategories.slice(0, 3).map((cat: string) => (
                                <span key={cat} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-gray-300">
                                    {cat}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 mt-auto">
                            <button className="flex-1 py-2 bg-accent1/10 hover:bg-accent1/20 border border-accent1/20 text-accent1 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                                <Handshake className="w-4 h-4" /> Request
                            </button>
                            <button className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                                <ExternalLink className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredSponsors.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-bold text-white">No sponsors found</h3>
                    <p className="text-gray-400">Try adjusting your search or filters.</p>
                </div>
            )}

            {/* Sponsor Detail Modal (Simplified) */}
            <AnimatePresence>
                {selectedSponsor && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedSponsor(null)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#0A0A0A] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-6">
                                <div className="flex justify-end mb-4">
                                    <button onClick={() => setSelectedSponsor(null)} className="text-gray-400 hover:text-white">Close</button>
                                </div>
                                <SponsorProfile profile={selectedSponsor} />
                                <div className="mt-8 pt-6 border-t border-white/10 flex justify-end gap-3">
                                    <button onClick={() => setSelectedSponsor(null)} className="px-6 py-2 rounded-lg border border-white/10 text-gray-300 hover:bg-white/5">Cancel</button>
                                    <button className="px-6 py-2 rounded-lg bg-accent1 text-black font-bold hover:bg-accent2">Request Sponsorship</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
