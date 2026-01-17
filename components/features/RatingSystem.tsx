"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, Calendar, MapPin, Search, Trophy } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const DUMMY_EVENTS = [
    { id: 1, name: "National Hackathon 2024", date: "Oct 15, 2024", location: "Dhaka", category: "Coding" },
    { id: 2, name: "Tech Summit 2024", date: "Nov 20, 2024", location: "Chittagong", category: "Conference" },
    { id: 3, name: "AI Conference", date: "Dec 05, 2024", location: "Online", category: "Seminar" },
    { id: 4, name: "Robotics Championship", date: "Jan 10, 2025", location: "BUET", category: "Robotics" },
    { id: 5, name: "Startup Pitch Deck", date: "Feb 14, 2025", location: "NSU", category: "Business" },
];

export function RatingSystem() {
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const [rating, setRating] = useState<number>(0);
    const [hoveredRating, setHoveredRating] = useState<number>(0);
    const [feedback, setFeedback] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredEvents = DUMMY_EVENTS.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedEventId || rating === 0) {
            toast.error("Please select an event and provide a rating.");
            return;
        }

        // Simulate API call
        setTimeout(() => {
            setSubmitted(true);
            toast.success("Thank you for your feedback!");
        }, 1000);
    };

    const resetForm = () => {
        setSubmitted(false);
        setRating(0);
        setFeedback("");
        setSelectedEventId(null);
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-16 text-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.3)]"
            >
                <div className="w-20 h-20 bg-accent2/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(170,255,0,0.2)]">
                    <Send className="w-10 h-10 text-accent2" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">Feedback Submitted!</h3>
                <p className="text-gray-400 max-w-lg text-lg mb-8">
                    Your rating helps us improve future events. Thank you for causing an impact in the community.
                </p>
                <button
                    onClick={resetForm}
                    className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all border border-white/10 font-bold tracking-wide hover:scale-105"
                >
                    Rate Another Event
                </button>
            </motion.div>
        );
    }

    return (
        <div className="w-full space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">
                        Rate an <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent1 to-accent2">Event</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl text-lg">
                        Select an event you've attended and share your experience. Your feedback drives our quality.
                    </p>
                </div>

                {/* Search Bar for Events (Mobile optimized) */}
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-black/20 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-accent1/50 transition-colors"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* LEFT COLUMN: Event Selection */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-5 space-y-4"
                >
                    <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl h-[600px] flex flex-col">
                        <div className="p-4 border-b border-white/5 bg-white/5">
                            <h3 className="font-bold text-gray-300 uppercase tracking-wider text-xs">Select an Event</h3>
                        </div>

                        <div className="overflow-y-auto p-4 space-y-3 custom-scrollbar flex-1">
                            {filteredEvents.length === 0 ? (
                                <div className="text-center py-10 text-gray-500">
                                    No events found.
                                </div>
                            ) : (
                                filteredEvents.map((event) => (
                                    <div
                                        key={event.id}
                                        onClick={() => setSelectedEventId(event.id)}
                                        className={cn(
                                            "group p-4 rounded-xl cursor-pointer transition-all border relative overflow-hidden",
                                            selectedEventId === event.id
                                                ? "bg-accent1/10 border-accent1/50 shadow-[0_0_20px_rgba(0,229,255,0.15)]"
                                                : "bg-white/5 border-transparent hover:bg-white/10 hover:border-white/20"
                                        )}
                                    >
                                        <div className="relative z-10 flex justify-between items-start">
                                            <div>
                                                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-gray-300 mb-2 border border-white/5">
                                                    {event.category}
                                                </span>
                                                <h4 className={cn(
                                                    "font-bold text-lg transition-colors",
                                                    selectedEventId === event.id ? "text-accent1" : "text-white group-hover:text-white"
                                                )}>
                                                    {event.name}
                                                </h4>
                                                <div className="flex items-center gap-3 text-xs text-gray-400 mt-2">
                                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {event.date}</span>
                                                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.location}</span>
                                                </div>
                                            </div>
                                            {selectedEventId === event.id && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="w-6 h-6 rounded-full bg-accent1 flex items-center justify-center shadow-[0_0_10px_#00E5FF]"
                                                >
                                                    <Trophy className="w-3 h-3 text-black" />
                                                </motion.div>
                                            )}
                                        </div>

                                        {/* Hover Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-accent1/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* RIGHT COLUMN: Rating Form */}
                <motion.form
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onSubmit={handleSubmit}
                    className="lg:col-span-7 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden h-[600px] flex flex-col"
                >
                    {/* Background blob */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-accent1/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-accent2/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 flex-1 flex flex-col">
                        {!selectedEventId ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 space-y-4">
                                <Trophy className="w-16 h-16 text-gray-700 opacity-50" />
                                <p className="text-lg">Select an event from the left to start rating</p>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex-1 flex flex-col space-y-8"
                            >
                                <div>
                                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                        <span className="w-1 h-6 bg-accent1 rounded-full" />
                                        Rate Your Experience
                                    </h3>
                                    <p className="text-gray-400 text-sm mt-1 ml-3">
                                        How was {DUMMY_EVENTS.find(e => e.id === selectedEventId)?.name}?
                                    </p>
                                </div>

                                <div className="space-y-4 border-b border-white/10 pb-8">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="flex gap-3">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onMouseEnter={() => setHoveredRating(star)}
                                                    onMouseLeave={() => setHoveredRating(0)}
                                                    onClick={() => setRating(star)}
                                                    className="group p-1 focus:outline-none transition-transform hover:scale-110 active:scale-95"
                                                >
                                                    <Star
                                                        className={cn(
                                                            "w-12 h-12 transition-all duration-200",
                                                            star <= (hoveredRating || rating)
                                                                ? "fill-accent2 text-accent2 drop-shadow-[0_0_15px_rgba(170,255,0,0.5)]"
                                                                : "text-gray-700 group-hover:text-gray-500"
                                                        )}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                        <div className="h-6">
                                            <AnimatePresence mode="wait">
                                                {(hoveredRating || rating) > 0 && (
                                                    <motion.span
                                                        key={hoveredRating || rating}
                                                        initial={{ opacity: 0, y: 5 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -5 }}
                                                        className="text-accent2 font-bold tracking-widest uppercase text-sm"
                                                    >
                                                        {["Poor", "Fair", "Good", "Very Good", "Excellent!"][(hoveredRating || rating) - 1]}
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 space-y-4">
                                    <label className="text-sm font-bold uppercase tracking-wider text-gray-400 block ml-1">
                                        Your Review (Optional)
                                    </label>
                                    <textarea
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        placeholder="Share your thoughts on the venue, organization, and overall experience..."
                                        className="w-full h-full min-h-[120px] bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent1/50 focus:bg-black/40 transition-all resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-gradient-to-r from-accent1 to-cyan-400 text-black font-bold uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_40px_rgba(0,229,255,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                                >
                                    <Send className="w-5 h-5" /> Submit Review
                                </button>
                            </motion.div>
                        )}
                    </div>
                </motion.form>
            </div>
        </div>
    );
}
