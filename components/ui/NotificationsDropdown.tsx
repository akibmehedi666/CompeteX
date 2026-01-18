"use client";

import { motion } from "framer-motion";
import { X, Check, Bell, Clock, AlertCircle, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { NOTIFICATIONS } from "@/constants/notificationData";

interface NotificationsDropdownProps {
    onClose: () => void;
}

export function NotificationsDropdown({ onClose }: NotificationsDropdownProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute top-full right-0 mt-4 w-[380px] bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden z-50"
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5">
                <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-accent1" />
                    <span className="font-bold text-white text-sm">Notifications</span>
                    <span className="bg-accent1/20 text-accent1 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {NOTIFICATIONS.filter(n => !n.read).length} New
                    </span>
                </div>
                <button
                    onClick={onClose}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                    <X className="w-4 h-4 text-gray-400 hover:text-white" />
                </button>
            </div>

            {/* List */}
            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                {NOTIFICATIONS.map((notification) => (
                    <div
                        key={notification.id}
                        className={cn(
                            "p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group relative",
                            !notification.read ? "bg-accent1/5" : ""
                        )}
                    >
                        <div className="flex gap-3">
                            <div className={cn(
                                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1",
                                notification.type === 'success' && "bg-green-500/20 text-green-400",
                                notification.type === 'info' && "bg-blue-500/20 text-blue-400",
                                notification.type === 'warning' && "bg-amber-500/20 text-amber-400",
                                notification.type === 'alert' && "bg-red-500/20 text-red-400",
                            )}>
                                {notification.type === 'success' && <CheckCircle2 className="w-4 h-4" />}
                                {notification.type === 'info' && <Info className="w-4 h-4" />}
                                {notification.type === 'warning' && <AlertCircle className="w-4 h-4" />}
                                {notification.type === 'alert' && <Bell className="w-4 h-4" />}
                            </div>

                            <div className="flex-1">
                                <h4 className={cn("text-sm font-semibold mb-1", !notification.read ? "text-white" : "text-gray-300")}>
                                    {notification.title}
                                </h4>
                                <p className="text-xs text-gray-400 leading-relaxed mb-2">
                                    {notification.message}
                                </p>
                                <div className="flex items-center gap-1 text-[10px] text-gray-500 font-medium">
                                    <Clock className="w-3 h-3" /> {notification.time}
                                </div>
                            </div>

                            {!notification.read && (
                                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-accent1 shadow-[0_0_8px_#00E5FF]" />
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-white/5 bg-white/5 text-center">
                <button className="text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-wider">
                    Mark all as read
                </button>
            </div>
        </motion.div>
    );
}
