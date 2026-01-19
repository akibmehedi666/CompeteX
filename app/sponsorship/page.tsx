"use client";

import { Navbar } from "@/components/ui/Navbar";
<<<<<<< HEAD
import { SPONSOR_COMMUNITY } from "@/constants/mockSponsors";
import { motion } from "framer-motion";
import { DollarSign, CheckCircle, Ticket, Users, TrendingUp, Handshake, Globe, Target, Award, BarChart3, Zap, Eye, Briefcase, Star, ArrowRight } from "lucide-react";
=======
import { SPONSORSHIP_OPPORTUNITIES } from "@/constants/mockSponsorships";
import { SPONSOR_COMMUNITY } from "@/constants/mockSponsors";
import { motion } from "framer-motion";
import { DollarSign, CheckCircle, Ticket, Users, TrendingUp, Handshake, Globe } from "lucide-react";
>>>>>>> 1c1d603a399e8e39a1cc4517dbfa6972a4ea5d5c
import { cn } from "@/lib/utils";

export default function SponsorshipPage() {
    return (
        <div className="min-h-screen bg-black selection:bg-yellow-500/30">
            <Navbar />

            {/* Hero Section - Gold Theme */}
            <div className="relative pt-20 pb-10 overflow-hidden border-b border-white/10 flex flex-col justify-center min-h-[40vh]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-yellow-500/20 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Fuel Your <span className="text-yellow-400">Events</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                        Connect with top-tier brands looking to sponsor the next big thing in tech.
                        Secure funding, prizes, and partnerships.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <button className="px-8 py-3 bg-yellow-500 text-black font-bold uppercase tracking-wider rounded-full hover:bg-yellow-400 hover:scale-105 transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                            Pitch Your Event
                        </button>
                        <button className="px-8 py-3 bg-white/5 text-white font-bold uppercase tracking-wider rounded-full border border-white/10 hover:bg-white/10 transition-all">
                            View Success Stories
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">$2.4M+</div>
                            <div className="text-sm text-gray-400">Total Funding Secured</div>
                        </div>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                            <Handshake className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">450+</div>
                            <div className="text-sm text-gray-400">Active Partnerships</div>
                        </div>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">85%</div>
                            <div className="text-sm text-gray-400">Success Rate</div>
                        </div>
                    </div>
                </div>

                {/* Why Sponsor Section */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Why Sponsor on <span className="text-yellow-400">CompeteX</span>?
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Connect with the brightest minds in tech competitions. Build your brand, discover talent, and drive innovation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-yellow-500/50 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 mb-4 group-hover:bg-yellow-500/30 transition-colors">
                                <Target className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Targeted Talent Pipeline</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Access top performers from hackathons, coding contests, and robotics competitions. Filter by skills, achievements, and competition history to find your ideal candidates.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-yellow-500/50 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 mb-4 group-hover:bg-yellow-500/30 transition-colors">
                                <Eye className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Maximum Brand Visibility</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Get your logo on event pages, leaderboards, and winner announcements. Reach thousands of students, developers, and tech enthusiasts across the platform.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-yellow-500/50 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 mb-4 group-hover:bg-yellow-500/30 transition-colors">
                                <BarChart3 className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Data-Driven Insights</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Track event performance, audience reach, and engagement metrics. Make informed decisions with detailed analytics on participant demographics and event success.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-yellow-500/50 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 mb-4 group-hover:bg-yellow-500/30 transition-colors">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Smart Matching</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Our platform automatically matches your sponsorship criteria with relevant events. Filter by category, audience size, location, and event type to find perfect fits.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-yellow-500/50 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 mb-4 group-hover:bg-yellow-500/30 transition-colors">
                                <Briefcase className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Recruitment Opportunities</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Connect directly with top performers through our integrated messaging system. Build relationships with future talent and create a pipeline for internships and full-time roles.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-yellow-500/50 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 mb-4 group-hover:bg-yellow-500/30 transition-colors">
                                <Award className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Flexible Sponsorship Tiers</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Choose from Title, Platinum, Gold, Silver, Bronze, or Partner levels. Customize your sponsorship package with workshops, prizes, cloud credits, or direct funding.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* How It Works Section */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            How <span className="text-yellow-400">Sponsorship</span> Works
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Simple steps to connect with events and maximize your impact
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            {
                                step: "01",
                                title: "Create Profile",
                                description: "Set up your sponsor profile with company details, industry focus, and sponsorship preferences.",
                                icon: Users
                            },
                            {
                                step: "02",
                                title: "Define Opportunities",
                                description: "Post sponsorship roles with budget ranges, categories, and requirements. Set your target audience.",
                                icon: Target
                            },
                            {
                                step: "03",
                                title: "Review Applications",
                                description: "Organizers apply with event details, expected reach, and proposals. Review and negotiate terms.",
                                icon: CheckCircle
                            },
                            {
                                step: "04",
                                title: "Launch & Track",
                                description: "Activate your sponsorship and track performance metrics, engagement, and ROI in real-time.",
                                icon: TrendingUp
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative"
                            >
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-yellow-500/50 transition-all h-full flex flex-col">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 font-bold text-sm">
                                            {item.step}
                                        </div>
                                        <item.icon className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed flex-grow">{item.description}</p>
                                </div>
                                {index < 3 && (
                                    <div className="hidden md:block absolute top-1/2 -right-3 z-10">
                                        <ArrowRight className="w-6 h-6 text-yellow-500/50" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Success Stories Section */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Success <span className="text-yellow-400">Stories</span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            See how sponsors have transformed events and discovered exceptional talent
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                company: "TechTitan Corp",
                                event: "UIU CSE Fest 2026",
                                result: "Hired 12 top performers",
                                metric: "500+ applications",
                                description: "Sponsored a 48-hour hackathon and discovered exceptional AI/ML talent. 8 candidates joined as full-time engineers."
                            },
                            {
                                company: "CloudNet Systems",
                                event: "BUET RoboCarnival",
                                result: "85% brand awareness",
                                metric: "15K+ impressions",
                                description: "Title sponsorship led to significant brand visibility among robotics enthusiasts and engineering students."
                            },
                            {
                                company: "PixelStream",
                                event: "Dhaka Design Sprint",
                                result: "3 interns hired",
                                metric: "200+ participants",
                                description: "Workshop sponsorship connected us with creative designers. Built a talent pipeline for future projects."
                            }
                        ].map((story, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-yellow-500/50 transition-all group"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1">{story.company}</h3>
                                        <p className="text-sm text-gray-400">{story.event}</p>
                                    </div>
                                    <Star className="w-5 h-5 text-yellow-500" />
                                </div>
                                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{story.description}</p>
                                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                                    <div>
                                        <div className="text-lg font-bold text-yellow-400">{story.result}</div>
                                        <div className="text-xs text-gray-500">Outcome</div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-white">{story.metric}</div>
                                        <div className="text-xs text-gray-500">Reach</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Sponsor Community Section */}
                <div className="mt-24">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Globe className="w-6 h-6 text-yellow-400" /> Sponsor Community
                        </h2>
                        <button className="text-sm text-yellow-500 font-bold hover:text-white transition-colors">
                            View All Partners
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {SPONSOR_COMMUNITY.map((sponsor, index) => (
                            <motion.div
                                key={sponsor.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-4 hover:bg-white/10 hover:border-yellow-500/50 transition-all group"
                            >
                                <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center p-3 border border-white/10 group-hover:border-yellow-500 transition-colors">
                                    {sponsor.logo ? (
                                        <img src={sponsor.logo} alt={sponsor.name} className="w-full h-full object-contain filter invert opacity-80 group-hover:opacity-100 transition-opacity" />
                                    ) : (
                                        <Users className="w-8 h-8 text-gray-700 group-hover:text-yellow-500" />
                                    )}
                                </div>
                                <div className="text-center">
                                    <h3 className="text-white font-bold text-sm mb-1">{sponsor.name}</h3>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">{sponsor.industry}</p>
                                </div>
                                <button className="w-full py-2 bg-black/50 hover:bg-yellow-500 hover:text-black text-xs text-white font-bold rounded transition-colors border border-white/10 hover:border-transparent">
                                    View Profile
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
                {/* Sponsor Community Section */}
                <div className="mt-24">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Globe className="w-6 h-6 text-yellow-400" /> Sponsor Community
                        </h2>
                        <button className="text-sm text-yellow-500 font-bold hover:text-white transition-colors">
                            View All Partners
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {SPONSOR_COMMUNITY.map((sponsor, index) => (
                            <motion.div
                                key={sponsor.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-4 hover:bg-white/10 hover:border-yellow-500/50 transition-all group"
                            >
                                <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center p-3 border border-white/10 group-hover:border-yellow-500 transition-colors">
                                    {sponsor.logo ? (
                                        <img src={sponsor.logo} alt={sponsor.name} className="w-full h-full object-contain filter invert opacity-80 group-hover:opacity-100 transition-opacity" />
                                    ) : (
                                        <Users className="w-8 h-8 text-gray-700 group-hover:text-yellow-500" />
                                    )}
                                </div>
                                <div className="text-center">
                                    <h3 className="text-white font-bold text-sm mb-1">{sponsor.name}</h3>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">{sponsor.industry}</p>
                                </div>
                                <button className="w-full py-2 bg-black/50 hover:bg-yellow-500 hover:text-black text-xs text-white font-bold rounded transition-colors border border-white/10 hover:border-transparent">
                                    View Profile
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

