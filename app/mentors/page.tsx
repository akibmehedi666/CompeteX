"use client";

import { useState } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { MentorCard } from "@/components/mentors/MentorCard";
import { MentorProfile } from "@/types";
import { Search, Filter, Briefcase, Star, DollarSign } from "lucide-react";

// Mock Data
const MOCK_MENTORS: MentorProfile[] = [
    {
        id: "m1",
        userId: "u1",
        name: "Dr. Sarah Chen",
        title: "Senior AI Researcher",
        organization: "DeepMind",
        location: "London, UK",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        bio: "Specializing in Reinforcement Learning and Multi-Agent Systems. I help students prepare for IOI and research internships.",
        expertise: ["AI/ML", "Algorithms", "Research"],
        rating: 4.9,
        reviewCount: 42,
        hourlyRate: 120,
        currency: "$",
        availability: { slots: [], nextAvailable: "2026-01-20" },
        socials: {},
        offerings: ["One-to-One", "Research Guidance"],
        languages: ["English", "Mandarin"],
        verified: true
    },
    {
        id: "m2",
        userId: "u2",
        name: "Alex Rivera",
        title: "Staff Software Engineer",
        organization: "Google",
        location: "Mountain View, CA",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        bio: "Former ICPC World Finalist. I mentor competitive programmers and help with FAANG interview prep.",
        expertise: ["Competitive Programming", "System Design", "Interview Prep"],
        rating: 5.0,
        reviewCount: 88,
        hourlyRate: 150,
        currency: "$",
        availability: { slots: [], nextAvailable: "2026-01-21" },
        socials: {},
        offerings: ["Mock Interview", "Competition Prep"],
        languages: ["English", "Spanish"],
        verified: true
    },
    {
        id: "m3",
        userId: "u3",
        name: "Emily Zhang",
        title: "Product Designer",
        organization: "Figma",
        location: "Remote",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
        bio: "Helping hackathon teams build winning prototypes and pitches. Expert in UI/UX and rapid prototyping.",
        expertise: ["UI/UX Design", "Product Management", "Pitching"],
        rating: 4.8,
        reviewCount: 25,
        hourlyRate: 90,
        currency: "$",
        availability: { slots: [], nextAvailable: "2026-01-22" },
        socials: {},
        offerings: ["Project Review", "Team Mentoring"],
        languages: ["English"],
        verified: true
    },
    {
        id: "m4",
        userId: "u4",
        name: "James Wilson",
        title: "Robotics Engineer",
        organization: "Boston Dynamics",
        location: "Boston, MA",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
        bio: "First Robotics Alumni and Mentor. Can help with mechanical design and control theory.",
        expertise: ["Robotics", "Control Systems", "Electronics"],
        rating: 4.7,
        reviewCount: 15,
        hourlyRate: 0, // Free
        currency: "$",
        availability: { slots: [], nextAvailable: "2026-01-25" },
        socials: {},
        offerings: ["Project Review"],
        languages: ["English"],
        verified: true
    }
];

export default function MentorsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", "AI/ML", "Algorithms", "Design", "Robotics", "Business"];

    const filteredMentors = MOCK_MENTORS.filter(mentor => {
        const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mentor.expertise.some(e => e.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategory === "All" || mentor.expertise.some(e => e.includes(selectedCategory === "Business" ? "Product" : selectedCategory)); // Simple mapping for demo
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-black text-white selection:bg-accent1 selection:text-black">
            <Navbar />

            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            Find Your <span className="text-accent1">Mentor</span>
                        </h1>
                        <p className="text-gray-400 max-w-2xl text-lg">
                            Connect with industry experts, past winners, and researchers to fast-track your growth.
                        </p>
                    </div>

                    {/* Stats or Call to Action */}
                    <div className="flex gap-8">
                        <div className="text-center">
                            <h4 className="text-3xl font-bold text-white">500+</h4>
                            <p className="text-xs text-gray-500 uppercase tracking-widest">Mentors</p>
                        </div>
                        <div className="text-center">
                            <h4 className="text-3xl font-bold text-accent1">24/7</h4>
                            <p className="text-xs text-gray-500 uppercase tracking-widest">Support</p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col lg:flex-row gap-6 mb-12 sticky top-24 z-30 bg-black/80 backdrop-blur-xl p-4 rounded-xl border border-white/5">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, company, or skill..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-accent1/50 transition-colors"
                        />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`h-12 px-6 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === cat
                                        ? "bg-accent1 text-black shadow-[0_0_20px_rgba(0,229,255,0.3)]"
                                        : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredMentors.map((mentor) => (
                        <MentorCard key={mentor.id} mentor={mentor} />
                    ))}
                </div>

                {filteredMentors.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        <p>No mentors found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
