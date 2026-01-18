"use client";

import { useState } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { motion } from "framer-motion";
import { Briefcase, Building2, MapPin, DollarSign, Eye } from "lucide-react";

export default function PostJobPage() {
    const [preview, setPreview] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        type: "Full-time",
        salary: "",
        description: "",
        requirements: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePublish = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Job Posted Successfully! (Mock)");
        // Redirect or reset
    };

    return (
        <div className="min-h-screen bg-black selection:bg-accent1/30">
            <Navbar />

            <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-white">Post a Job</h1>
                    <button
                        onClick={() => setPreview(!preview)}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white transition-colors"
                    >
                        <Eye className="w-4 h-4" /> {preview ? "Edit" : "Preview"}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form Side */}
                    <div className={preview ? "hidden lg:block opacity-50 pointer-events-none" : "block"}>
                        <form onSubmit={handlePublish} className="space-y-6">
                            <div className="space-y-4 p-6 bg-white/5 border border-white/10 rounded-xl">
                                <h3 className="text-lg font-bold text-white mb-4">Job Details</h3>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Job Title</label>
                                    <input required name="title" value={formData.title} onChange={handleChange} type="text" placeholder="e.g. Senior Product Designer" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent1/50 transition-colors" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Company Name</label>
                                        <input required name="company" value={formData.company} onChange={handleChange} type="text" placeholder="e.g. Acme Corp" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent1/50 transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Employment Type</label>
                                        <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent1/50 transition-colors appearance-none">
                                            <option>Full-time</option>
                                            <option>Part-time</option>
                                            <option>Internship</option>
                                            <option>Contract</option>
                                            <option>Freelance</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Location</label>
                                        <input required name="location" value={formData.location} onChange={handleChange} type="text" placeholder="e.g. Remote / New York" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent1/50 transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Salary Range</label>
                                        <input required name="salary" value={formData.salary} onChange={handleChange} type="text" placeholder="e.g. $100k - $120k" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent1/50 transition-colors" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 p-6 bg-white/5 border border-white/10 rounded-xl">
                                <h3 className="text-lg font-bold text-white mb-4">Description & Requirements</h3>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Job Description</label>
                                    <textarea required name="description" value={formData.description} onChange={handleChange} rows={6} placeholder="Describe the role, responsibilities, and team culture..." className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent1/50 transition-colors resize-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Requirements (Separate by commas)</label>
                                    <textarea required name="requirements" value={formData.requirements} onChange={handleChange} rows={3} placeholder="React, Node.js, 3+ years experience..." className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent1/50 transition-colors resize-none" />
                                </div>
                            </div>

                            <button type="submit" className="w-full py-4 bg-accent1 text-black font-bold uppercase tracking-widest rounded-lg hover:bg-white hover:scale-[1.01] transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                                Publish Job Post
                            </button>
                        </form>
                    </div>

                    {/* Preview Side */}
                    <div className={!preview ? "hidden lg:block" : "block"}>
                        <div className="sticky top-24">
                            <h3 className="text-sm text-gray-500 uppercase tracking-widest mb-4">Live Preview</h3>

                            <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-6 border-l-4 border-l-accent1 relative overflow-hidden">
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h2 className="text-2xl font-bold text-white">{formData.title || "Job Title"}</h2>
                                            <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-white/10 text-gray-300 border border-white/10">
                                                {formData.type}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-lg text-accent1 font-medium">
                                            <Building2 className="w-5 h-5" /> {formData.company || "Company Name"}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-white font-bold">{formData.salary || "$TBD"}</div>
                                        <div className="text-xs text-gray-500 flex items-center justify-end gap-1 mt-1">
                                            <MapPin className="w-3 h-3" /> {formData.location || "Location"}
                                        </div>
                                    </div>
                                </div>

                                <div className="prose prose-invert max-w-none mb-6">
                                    <p className="text-gray-400 text-sm whitespace-pre-wrap">{formData.description || "Job description will appear here..."}</p>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {(formData.requirements ? formData.requirements.split(',') : ["Requirement 1", "Requirement 2"]).map((req, i) => (
                                        <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/5">
                                            {req.trim()}
                                        </span>
                                    ))}
                                </div>

                                <button disabled className="w-full py-3 bg-white/5 text-gray-500 font-bold uppercase tracking-wider rounded border border-white/10 cursor-not-allowed">
                                    Apply Now (Preview)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
