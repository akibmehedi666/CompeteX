"use client";

import { useState } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { INSTITUTIONS } from "@/constants/institutionData";
import { motion } from "framer-motion";
import { Search, MapPin, Award, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function InstitutionDirectoryPage() {
    const [search, setSearch] = useState("");

    const filteredInstitutions = INSTITUTIONS.filter(inst =>
        inst.name.toLowerCase().includes(search.toLowerCase()) ||
        inst.location.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-black selection:bg-accent1/30">
            <Navbar />

            <div className="pt-24 pb-12 max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Partner <span className="text-accent2">Institutions</span>
                    </h1>
                    <p className="text-gray-400 mb-8">
                        Discover the universities and organizations driving the future of innovation through competitive events.
                    </p>

                    {/* Search Bar */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-accent2/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search universities..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-black/80 border border-white/10 rounded-full py-4 pl-12 pr-6 text-white text-lg focus:border-accent2 focus:outline-none transition-colors"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredInstitutions.map((inst, index) => (
                        <motion.div
                            key={inst.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={`/institutions/${inst.id}`}>
                                <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-accent2/50 transition-all hover:bg-white/10 h-full flex flex-col justify-between overflow-hidden">
                                    {/* Ambient Glow */}
                                    <div
                                        className="absolute -right-10 -top-10 w-32 h-32 blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity rounded-full pointer-events-none"
                                        style={{ backgroundColor: inst.color }}
                                    />

                                    <div>
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                                <inst.logo className="w-8 h-8 text-white" />
                                            </div>
                                            {inst.verified && (
                                                <div className="flex items-center gap-1 px-2 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold rounded-full">
                                                    <ShieldCheck className="w-3 h-3" /> Verified
                                                </div>
                                            )}
                                        </div>

                                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-accent2 transition-colors">
                                            {inst.name}
                                        </h3>
                                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                                            <MapPin className="w-4 h-4" /> {inst.location}
                                        </div>
                                        <p className="text-gray-500 text-sm line-clamp-3 mb-6">
                                            {inst.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-500 uppercase font-bold">Total Events</span>
                                            <span className="text-white font-mono font-bold text-lg">{inst.stats.totalEvents}</span>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent2 group-hover:text-black transition-all">
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
