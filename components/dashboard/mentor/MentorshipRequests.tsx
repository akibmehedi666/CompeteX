"use client";

import { useState } from "react";
import { MentorshipRequest } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Clock, MessageSquare, Calendar } from "lucide-react";
import { toast } from "sonner";

// Mock Data
const MOCK_REQUESTS: MentorshipRequest[] = [
    {
        id: "req1",
        mentorId: "m1",
        menteeId: "u5",
        menteeName: "David Kim",
        menteeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        type: "Competition Prep",
        status: "pending",
        message: "Hi! I'm preparing for the upcoming regional hackathon and would love some guidance on project architecture.",
        proposedSlots: ["Mon 10:00 AM", "Tue 2:00 PM"],
        createdAt: "2026-01-16T10:00:00Z"
    },
    {
        id: "req2",
        mentorId: "m1",
        menteeId: "u6",
        menteeName: "Sarah Jones",
        menteeAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahJ",
        type: "Career Counseling",
        status: "pending",
        message: "I'm a final year student looking to break into AI research. Would appreciate a resume review.",
        proposedSlots: ["Wed 4:00 PM"],
        createdAt: "2026-01-15T14:30:00Z"
    }
];

export function MentorshipRequests() {
    const [requests, setRequests] = useState<MentorshipRequest[]>(MOCK_REQUESTS);

    const handleAction = (id: string, action: "accept" | "reject") => {
        setRequests(prev => prev.filter(r => r.id !== id));
        toast.success(action === "accept" ? "Request accepted! Session scheduled." : "Request declined.");
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-white mb-6">Incoming Requests</h2>

            <AnimatePresence>
                {requests.length > 0 ? (
                    requests.map((request) => (
                        <motion.div
                            key={request.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                            className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col md:flex-row gap-6"
                        >
                            {/* Mentee Info */}
                            <div className="flex items-start gap-4 md:w-1/3">
                                <img src={request.menteeAvatar} alt={request.menteeName} className="w-12 h-12 rounded-full bg-white/10" />
                                <div>
                                    <h3 className="font-bold text-white">{request.menteeName}</h3>
                                    <span className="text-xs px-2 py-1 bg-accent1/10 text-accent1 rounded border border-accent1/20 mt-1 inline-block">
                                        {request.type}
                                    </span>
                                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> Requested 2 days ago
                                    </p>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="flex-1 space-y-3">
                                <div className="bg-black/40 rounded-lg p-3 text-sm text-gray-300 border border-white/5">
                                    <MessageSquare className="w-3 h-3 text-gray-500 inline mr-2" />
                                    "{request.message}"
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {request.proposedSlots.map(slot => (
                                        <span key={slot} className="flex items-center gap-1 text-xs px-2 py-1 bg-white/5 rounded text-gray-400 border border-white/10">
                                            <Calendar className="w-3 h-3" /> {slot}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex md:flex-col gap-2 justify-center min-w-[120px]">
                                <button
                                    onClick={() => handleAction(request.id, "accept")}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-accent1 text-black font-bold text-sm rounded-lg hover:bg-white transition-colors"
                                >
                                    <Check className="w-4 h-4" /> Accept
                                </button>
                                <button
                                    onClick={() => handleAction(request.id, "reject")}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 font-bold text-sm rounded-lg border border-red-500/20 hover:bg-red-500 hover:text-white transition-colors"
                                >
                                    <X className="w-4 h-4" /> Decline
                                </button>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="text-center py-20 text-gray-500">
                        <p>No pending requests.</p>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
