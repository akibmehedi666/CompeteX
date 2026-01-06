"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { EVENTS } from "@/constants/mockData";

export function VenueMap() {
    const [activeVenue, setActiveVenue] = useState<string | null>(null);

    // Filter only offline events that have coords
    const venueEvents = EVENTS.filter(e => e.mode === "Offline" && e.coords);

    return (
        <div className="relative w-full h-[600px] bg-[#050505] rounded-xl border border-white/10 overflow-hidden flex items-center justify-center p-4">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

            <h3 className="absolute top-6 left-6 text-xl font-bold text-white z-10 flex items-center gap-2">
                <MapPin className="text-accent1" /> Live Venue Map
            </h3>

            {/* Map Containter (Simulated Map) */}
            <div className="relative w-full max-w-4xl h-full max-h-[500px] bg-white/5 rounded-lg border border-white/5 shadow-2xl overflow-hidden backdrop-blur-sm">
                {/* Abstract Map Graphic */}
                <svg className="w-full h-full opacity-30" viewBox="0 0 800 500">
                    <path d="M100,100 Q200,50 300,150 T500,200 T700,100" fill="none" stroke="white" strokeWidth="2" />
                    <path d="M50,400 Q150,300 250,450 T450,400 T750,450" fill="none" stroke="white" strokeWidth="2" />
                    <circle cx="200" cy="150" r="10" fill="white" />
                    <circle cx="450" cy="300" r="15" fill="white" />
                </svg>

                {/* Hotspots */}
                {venueEvents.map((event) => (
                    <div
                        key={event.id}
                        className="absolute"
                        style={{ left: event.coords?.x, top: event.coords?.y }}
                    >
                        <button
                            onClick={() => setActiveVenue(activeVenue === event.id ? null : event.id)}
                            className="relative group"
                        >
                            <div className="w-4 h-4 rounded-full bg-accent1 animate-ping absolute inset-0" />
                            <div className="w-4 h-4 rounded-full bg-accent1 border-2 border-black relative z-10 hover:scale-125 transition-transform" />

                            {/* Peer-hover tooltip */}
                            <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/80 px-2 py-1 rounded text-[10px] text-accent1 border border-accent1/30">
                                {event.venue}
                            </div>
                        </button>

                        {/* Active Detail Card */}
                        {activeVenue === event.id && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 bg-black/90 border border-accent1/50 p-3 rounded-lg shadow-[0_0_20px_rgba(0,229,255,0.2)] z-20"
                            >
                                <h4 className="text-sm font-bold text-white mb-1">{event.title}</h4>
                                <p className="text-[10px] text-gray-400 mb-2">{event.venue}</p>
                                <button className="w-full py-1 text-[10px] font-bold uppercase bg-accent1 text-black rounded-sm">
                                    View Details
                                </button>
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
