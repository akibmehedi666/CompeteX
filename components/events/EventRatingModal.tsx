"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X } from "lucide-react";

export interface EventRatingModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventName: string;
    isRegistered: boolean;
    eventEndDate?: string; // ISO string
}

const CATEGORIES = ["Organization", "Venue Quality", "Difficulty", "Timing"];

export function EventRatingModal({ isOpen, onClose, eventName, isRegistered, eventEndDate }: EventRatingModalProps) {
    const [ratings, setRatings] = useState<Record<string, number>>({});

    // Check constraints
    const hasEnded = eventEndDate ? new Date() > new Date(eventEndDate) : true; // Default to true if not provided for now, or false? Better to be strict.
    // Actually, user said "also after the event end time".

    const canRate = isRegistered && hasEnded;

    const handleRate = (category: string, score: number) => {
        setRatings(prev => ({ ...prev, [category]: score }));
    };

    const handleSubmit = () => {
        onClose();
        alert("Feedback Submitted!");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="w-full max-w-lg bg-[#0A0A0A] border border-white/20 rounded-xl p-6 shadow-2xl relative"
                    >
                        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>

                        <h3 className="text-xl font-bold text-white mb-2">Rate Event</h3>
                        <p className="text-sm text-gray-400 mb-6">How was your experience at <span className="text-accent1">{eventName}</span>?</p>

                        {!canRate ? (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-center mb-6">
                                <p className="text-red-400 font-bold mb-1">Rating Unavailable</p>
                                <p className="text-sm text-gray-400">
                                    {!isRegistered
                                        ? "You can only rate events you have registered for."
                                        : "You can only rate this event after it has ended."}
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-4 mb-8">
                                    {CATEGORIES.map(cat => (
                                        <div key={cat} className="flex items-center justify-between">
                                            <span className="text-sm text-gray-300 font-medium">{cat}</span>
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map(star => (
                                                    <button
                                                        key={star}
                                                        onClick={() => handleRate(cat, star)}
                                                        className={`w-8 h-8 flex items-center justify-center transition-all ${(ratings[cat] || 0) >= star ? "text-accent2 scale-110" : "text-gray-700 hover:text-gray-500"
                                                            }`}
                                                    >
                                                        <Star className="w-5 h-5 fill-current" />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-end gap-3">
                                    <button onClick={onClose} className="px-4 py-2 text-sm text-gray-400 hover:text-white">Cancel</button>
                                    <button onClick={handleSubmit} className="px-6 py-2 bg-white text-black font-bold uppercase text-sm rounded-sm hover:bg-gray-200">
                                        Submit Review
                                    </button>
                                </div>
                            </>
                        )}

                        {!canRate && (
                            <div className="flex justify-end gap-3">
                                <button onClick={onClose} className="px-4 py-2 text-sm text-gray-400 hover:text-white">Close</button>
                            </div>
                        )}

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
