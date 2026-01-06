"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
    targetDate: string;
    className?: string;
    size?: "sm" | "lg";
}

export function CountdownTimer({ targetDate, className, size = "sm" }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
        isLive: boolean;
    } | null>(null);

    useEffect(() => {
        const calculateTime = () => {
            const difference = new Date(targetDate).getTime() - new Date().getTime();

            if (difference <= 0) {
                return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
                isLive: false,
            };
        };

        // Initial calculation
        setTimeLeft(calculateTime());

        const timer = setInterval(() => {
            setTimeLeft(calculateTime());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    if (!timeLeft) return <div className={cn("animate-pulse text-gray-500", className)}>Loading...</div>;

    if (timeLeft.isLive) {
        return (
            <div className={cn(
                "font-mono font-bold text-accent2 animate-pulse drop-shadow-[0_0_8px_rgba(173,255,0,0.8)]",
                size === "lg" ? "text-4xl" : "text-xs",
                className
            )}>
                EVENT LIVE
            </div>
        );
    }

    const isUrgent = timeLeft.days === 0 && timeLeft.hours < 24;

    return (
        <div
            className={cn(
                "font-mono tabular-nums tracking-widest text-accent1/90",
                size === "lg" ? "text-4xl" : "text-xs",
                isUrgent && "animate-pulse text-accent2", // Pulse if < 24h
                className
            )}
        >
            {String(timeLeft.days).padStart(2, '0')}d : {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
        </div>
    );
}
