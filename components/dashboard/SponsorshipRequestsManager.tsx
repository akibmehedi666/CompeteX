"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, DollarSign, CheckCircle, XCircle, MessageSquare, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { SponsorshipRequest } from "@/types";
import { cn } from "@/lib/utils";

// Mock Data
const MOCK_REQUESTS: SponsorshipRequest[] = [
    {
        id: "req1",
        eventId: "e1",
        eventTitle: "CyberHack 2026",
        organizerId: "org1",
        organizerName: "North South University Computer Club",
        sponsorId: "s1",
        sponsorName: "TechCorp",
        sponsorshipRoleId: "r1",
        sponsorshipRoleTitle: "Title Sponsor",
        status: "pending",
        proposal: {
            description: "We are hosting the largest inter-university hackathon in the country. We believe TechCorp would be the perfect Title Sponsor given your focus on innovation.",
            audienceReach: 5000,
            requestedAmount: "$10,000",
            requestedBenefits: ["Logo on T-shirts", "Keynote Speaker Slot", "Booth at Venue"],
            sponsorshipType: "Financial"
        },
        createdAt: "2026-01-15T10:00:00Z",
        updatedAt: "2026-01-15T10:00:00Z"
    },
    {
        id: "req2",
        eventId: "e2",
        eventTitle: "RoboCarnival 2026",
        organizerId: "org2",
        organizerName: "BUET Robotics Society",
        sponsorId: "s1",
        sponsorName: "TechCorp",
        sponsorshipRoleId: "r2",
        sponsorshipRoleTitle: "Beverage Partner",
        status: "negotiating",
        proposal: {
            description: "Requesting energy drinks and snacks for 500 participants.",
            audienceReach: 1200,
            requestedAmount: "In-Kind",
            requestedBenefits: ["Logo on Banners", "Stall"],
            sponsorshipType: "In-Kind"
        },
        createdAt: "2026-01-14T09:00:00Z",
        updatedAt: "2026-01-16T14:00:00Z"
    }
];

export function SponsorshipRequestsManager() {
    const [requests, setRequests] = useState<SponsorshipRequest[]>(MOCK_REQUESTS);
    const [filter, setFilter] = useState<"all" | "pending" | "negotiating">("all");

    const filteredRequests = requests.filter(req => {
        if (filter === "all") return true;
        return req.status === filter;
    });

    const handleAction = (id: string, action: "accept" | "reject") => {
        setRequests(requests.map(req => {
            if (req.id === id) {
                return { ...req, status: action === "accept" ? "accepted" : "rejected" };
            }
            return req;
        }));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white">Sponsorship Requests</h2>
                    <p className="text-gray-400">Manage incoming proposals from event organizers.</p>
                </div>
                <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                    <button
                        onClick={() => setFilter("all")}
                        className={cn("px-4 py-1.5 rounded-md text-sm font-medium transition-colors", filter === "all" ? "bg-white text-black" : "text-gray-400 hover:text-white")}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter("pending")}
                        className={cn("px-4 py-1.5 rounded-md text-sm font-medium transition-colors", filter === "pending" ? "bg-accent1 text-black" : "text-gray-400 hover:text-white")}
                    >
                        Pending
                    </button>
                    <button
                        onClick={() => setFilter("negotiating")}
                        className={cn("px-4 py-1.5 rounded-md text-sm font-medium transition-colors", filter === "negotiating" ? "bg-blue-500 text-white" : "text-gray-400 hover:text-white")}
                    >
                        Negotiating
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <AnimatePresence>
                    {filteredRequests.length > 0 ? (
                        filteredRequests.map((req) => (
                            <RequestCard key={req.id} request={req} onAction={handleAction} />
                        ))
                    ) : (
                        <div className="text-center py-12 text-gray-500 border border-dashed border-white/10 rounded-xl">
                            <h3 className="text-lg font-medium text-gray-400">No requests found</h3>
                            <p className="text-sm">Requests matching your filter will appear here.</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function RequestCard({ request, onAction }: { request: SponsorshipRequest, onAction: (id: string, action: "accept" | "reject") => void }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#111] border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors"
        >
            <div className="p-6 cursor-pointer" onClick={() => setExpanded(!expanded)}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center font-bold text-xl text-gray-500">
                            {request.eventTitle.charAt(0)}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-lg font-bold text-white">{request.eventTitle}</h3>
                                {request.status === 'pending' && <span className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded border border-yellow-500/20 uppercase font-bold">Pending</span>}
                                {request.status === 'negotiating' && <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded border border-blue-500/20 uppercase font-bold">Negotiating</span>}
                                {request.status === 'accepted' && <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded border border-green-500/20 uppercase font-bold">Accepted</span>}
                                {request.status === 'rejected' && <span className="text-xs bg-red-500/10 text-red-500 px-2 py-0.5 rounded border border-red-500/20 uppercase font-bold">Rejected</span>}
                            </div>
                            <p className="text-sm text-gray-400 mt-1">
                                Organized by <span className="text-accent1">{request.organizerName}</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <div className="text-xs text-gray-500 uppercase font-bold mb-1">Requested Role</div>
                            <div className="text-sm font-bold text-white bg-white/5 px-3 py-1 rounded-lg border border-white/5">{request.sponsorshipRoleTitle || "General Sponsorship"}</div>
                        </div>
                        <div className="text-right hidden md:block">
                            <div className="text-xs text-gray-500 uppercase font-bold mb-1">Value</div>
                            <div className="text-sm font-bold text-accent1">{request.proposal.requestedAmount}</div>
                        </div>
                        <div className="bg-white/5 p-2 rounded-lg text-gray-400 transition-transform duration-300">
                            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-white/5 bg-white/5"
                    >
                        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-6">
                                <div>
                                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Proposal Message</h4>
                                    <p className="text-gray-300 leading-relaxed text-sm bg-black/20 p-4 rounded-xl border border-white/5">
                                        {request.proposal.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Requested Benefits</h4>
                                        <ul className="space-y-1">
                                            {request.proposal.requestedBenefits.map((b, i) => (
                                                <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
                                                    <CheckCircle className="w-3 h-3 text-accent1" /> {b}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Audience Reach</h4>
                                        <div className="flex items-center gap-2 text-white font-bold text-xl">
                                            <Users className="w-5 h-5 text-blue-400" />
                                            {request.proposal.audienceReach.toLocaleString()} +
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                                    <h4 className="text-sm font-bold text-white mb-4">Actions</h4>

                                    {request.status === 'pending' || request.status === 'negotiating' ? (
                                        <div className="space-y-3">
                                            <button
                                                onClick={() => onAction(request.id, "accept")}
                                                className="w-full py-2 bg-green-500 text-black font-bold rounded-lg hover:bg-green-400 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <CheckCircle className="w-4 h-4" /> Accept Proposal
                                            </button>
                                            <button className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 transition-colors flex items-center justify-center gap-2">
                                                <MessageSquare className="w-4 h-4" /> Negotiate
                                            </button>
                                            <button
                                                onClick={() => onAction(request.id, "reject")}
                                                className="w-full py-2 bg-white/5 text-red-400 border border-red-500/20 font-bold rounded-lg hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <XCircle className="w-4 h-4" /> Reject
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-center text-gray-500 py-4">
                                            Action taken: {request.status}
                                        </div>
                                    )}

                                    <div className="mt-4 pt-4 border-t border-white/5 text-center">
                                        <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                                            <Clock className="w-3 h-3" /> Received {new Date(request.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
