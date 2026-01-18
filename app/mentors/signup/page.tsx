"use client";

import { useState } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { motion } from "framer-motion";
import { User, Briefcase, Linkedin, Award, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MentorSignupPage() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setSubmitting(false);
            setSubmitted(true);
            // Redirect after delay
            setTimeout(() => router.push("/mentors"), 2000);
        }, 1500);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-6">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white/5 border border-accent2/20 rounded-2xl p-12 text-center max-w-md w-full"
                >
                    <div className="w-20 h-20 bg-accent2/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-accent2" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Application Received!</h2>
                    <p className="text-gray-400 mb-8">
                        Thanks for your interest in mentoring. We'll review your profile and get back to you shortly.
                    </p>
                    <button onClick={() => router.push("/mentors")} className="text-accent2 font-bold hover:underline">
                        Back to Mentors
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black selection:bg-accent1/30">
            <Navbar />

            <div className="pt-24 pb-12 px-6 max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Become a <span className="text-accent1">Mentor</span>
                    </h1>
                    <p className="text-xl text-gray-400">
                        Share your knowledge and shape the next generation of tech leaders.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent1/5 rounded-full blur-[100px] pointer-events-none" />

                    <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                        {/* Personal Info */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                                <User className="w-5 h-5 text-accent1" /> Personal Info
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Full Name</label>
                                    <input required type="text" placeholder="e.g. Sarah Connor" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent1/50 transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Email</label>
                                    <input required type="email" placeholder="sarah@example.com" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent1/50 transition-colors" />
                                </div>
                            </div>
                        </div>

                        {/* Professional Info */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                                <Briefcase className="w-5 h-5 text-accent1" /> Expertise
                            </h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Current Role & Company</label>
                                    <input required type="text" placeholder="e.g. Senior Engineer at Google" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent1/50 transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Key Skills (comma separated)</label>
                                    <input required type="text" placeholder="e.g. React, System Design, Leadership" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent1/50 transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400 flex items-center gap-2"><Linkedin className="w-4 h-4" /> LinkedIn URL</label>
                                    <input required type="url" placeholder="https://linkedin.com/in/..." className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent1/50 transition-colors" />
                                </div>
                            </div>
                        </div>

                        {/* Motivation */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                                <Award className="w-5 h-5 text-accent1" /> Motivation
                            </h3>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Why do you want to be a mentor?</label>
                                <textarea required rows={4} placeholder="Tell us about your experience and why you'd be a great mentor..." className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent1/50 transition-colors resize-none" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-4 bg-accent1 text-black font-bold uppercase tracking-widest rounded-lg hover:bg-white hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? "Submitting..." : "Submit Application"}
                        </button>

                    </form>
                </motion.div>
            </div>
        </div>
    );
}
