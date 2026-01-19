"use client";

import { useState } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { motion } from "framer-motion";
import { Briefcase, MapPin, DollarSign, Clock, Search, Filter, Loader } from "lucide-react";
import { MOCK_JOBS, JobPost } from "@/constants/mockJobs";

export default function JobsPage() {
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [applying, setApplying] = useState<string | null>(null);

    const filteredJobs = MOCK_JOBS.filter(job => {
        const matchesType = filter === "All" || job.type === filter;
        const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) ||
            job.company.toLowerCase().includes(search.toLowerCase());
        return matchesType && matchesSearch;
    });

    const handleApply = (id: string) => {
        setApplying(id);
        setTimeout(() => {
            alert("Application Sent! (Mock)");
            setApplying(null);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-black selection:bg-accent1/30">
            <Navbar />

            <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">
                            Career <span className="text-accent1">Hub</span>
                        </h1>
                        <p className="text-gray-400">Find your next internship or dream job.</p>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-grow md:flex-grow-0">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search roles..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full md:w-64 bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-accent1/50 transition-colors"
                            />
                        </div>
                        <div className="flex bg-white/5 border border-white/10 rounded-lg p-1">
                            {["All", "Internship", "Full-time"].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setFilter(type)}
                                    className={`px-3 py-1 text-xs font-bold rounded transition-colors ${filter === type ? 'bg-accent1 text-black' : 'text-gray-400 hover:text-white'}`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Job Grid */}
                <div className="grid grid-cols-1 gap-6">
                    {filteredJobs.map((job) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 hover:border-accent1/30 transition-all group"
                        >
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-white group-hover:text-accent1 transition-colors">{job.title}</h3>
                                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${job.type === "Internship" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                                                job.type === "Full-time" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                                                    "bg-purple-500/10 text-purple-400 border-purple-500/20"
                                            }`}>
                                            {job.type}
                                        </span>
                                    </div>
                                    <p className="text-lg text-gray-300 mb-4">{job.company}</p>

                                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" /> {job.location}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <DollarSign className="w-4 h-4" /> {job.salary}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" /> Posted {job.postedAt}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {job.requirements.map((req, i) => (
                                            <span key={i} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400 border border-white/5">
                                                {req}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-3 min-w-[140px]">
                                    <button
                                        onClick={() => handleApply(job.id)}
                                        disabled={applying === job.id}
                                        className="w-full py-2 bg-white text-black font-bold uppercase tracking-wider rounded text-sm hover:bg-accent1 transition-colors disabled:opacity-50 disabled:bg-gray-500"
                                    >
                                        {applying === job.id ? "Sending..." : "Apply Now"}
                                    </button>
                                    <span className="text-xs text-gray-500">{job.applicants} applicants</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {filteredJobs.length === 0 && (
                        <div className="text-center py-24 text-gray-500">
                            <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            No jobs found matching your criteria.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
