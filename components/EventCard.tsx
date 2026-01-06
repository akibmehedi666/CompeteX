"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Users, Calendar } from "lucide-react";
import { useRef } from "react";
import { Event } from "@/types";
import { cn } from "@/lib/utils";
import { CountdownTimer } from "./CountdownTimer";

interface EventCardProps {
    event: Event;
    className?: string;
}

export function EventCard({ event, className }: EventCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
    const style = { maskImage, WebkitMaskImage: maskImage };

    return (
        <div
            onMouseMove={onMouseMove}
            className={cn(
                "group relative h-full w-full rounded-xl bg-white/5 border border-white/10 overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,255,0.15)] hover:border-accent1/50 hover:-translate-y-1",
                className
            )}
        >
            {/* Glow Follower */}
            <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent1/20 to-accent2/20 opacity-20"
                    style={style}
                />
            </div>

            <div className="p-6 h-full flex flex-col">
                {/* Status Badge & Timer */}
                <div className="flex justify-between items-start mb-4">
                    <span className={cn(
                        "px-2 py-1 text-[10px] uppercase font-bold tracking-widest rounded-sm border",
                        event.mode === "Online" ? "border-accent1 text-accent1" : "border-accent2 text-accent2"
                    )}>
                        {event.mode}
                    </span>
                    <CountdownTimer targetDate={event.startDate} />
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent1 transition-colors">
                    {event.title}
                </h3>

                <p className="text-sm text-gray-400 mb-6 flex-grow">
                    Organized by <span className="text-gray-300">{event.organizer}</span>
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 border-t border-white/5 pt-4">
                    <div className="flex items-center gap-1 text-accent1">
                        <Calendar className="w-3 h-3" />
                        <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{event.participantsCount} registered</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
