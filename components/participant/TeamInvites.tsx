"use client";

import { motion } from "framer-motion";
import { Users, Check, X, Shield } from "lucide-react";
import { toast } from "sonner";

export function TeamInvites() {
    // Mock data for invites
    const invites = [
        { id: 1, team: "Pixel Pioneers", event: "UI/UX Hackathon 2025", role: "Designer", match: "Perfect Match" },
        { id: 2, team: "Code Ninjas", event: "Algorithm Arena", role: "Frontend Dev", match: "Good Match" }
    ];

    const handleAccept = (team: string) => {
        toast.success(`Joined team ${team}!`);
    };

    const handleDecline = (team: string) => {
        toast.info(`Declined invitation from ${team}`);
    };

    if (invites.length === 0) {
        return (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3">
                    <Users className="w-6 h-6 text-gray-500" />
                </div>
                <h3 className="text-white font-bold mb-1">No Pending Invites</h3>
                <p className="text-gray-400 text-sm">Join a team or wait for invitations!</p>
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-accent1" /> Team Invites
                </h3>
                <span className="bg-accent1/20 text-accent1 text-xs font-bold px-2 py-1 rounded-full border border-accent1/30">
                    {invites.length} New
                </span>
            </div>

            <div className="space-y-3">
                {invites.map((invite, i) => (
                    <motion.div 
                        key={invite.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-black/40 border border-white/5 rounded-lg p-3 hover:bg-white/5 transition-colors"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-bold text-white text-sm">{invite.team}</h4>
                                <p className="text-xs text-gray-400">{invite.event}</p>
                            </div>
                            <span className="text-[10px] bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded uppercase font-bold">
                                {invite.role}
                            </span>
                        </div>
                        
                        <div className="flex gap-2 mt-3">
                            <button 
                                onClick={() => handleAccept(invite.team)}
                                className="flex-1 bg-accent1 text-black text-xs font-bold py-1.5 rounded hover:bg-white transition-colors flex items-center justify-center gap-1"
                            >
                                <Check className="w-3 h-3" /> Accept
                            </button>
                            <button 
                                onClick={() => handleDecline(invite.team)}
                                className="px-3 bg-white/5 text-gray-400 hover:text-white hover:bg-red-500/20 text-xs font-bold py-1.5 rounded transition-colors flex items-center justify-center"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
