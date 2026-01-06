"use client";

import { useState } from "react";
import { Send, Users, Globe, User } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

const CHANNELS = [
    { id: "Global", icon: Globe, label: "Global Chat" },
    { id: "Team", icon: Users, label: "Team Squad" },
    { id: "Direct", icon: User, label: "Direct Msgs" },
] as const;

export function ChatSystem() {
    const [activeChannel, setActiveChannel] = useState<typeof CHANNELS[number]["id"]>("Global");
    const [input, setInput] = useState("");
    const { messages, addMessage, currentUser } = useStore();

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        addMessage({
            id: Date.now().toString(),
            senderId: currentUser?.id || "anon",
            content: input,
            timestamp: new Date().toISOString(),
            channel: activeChannel
        });
        setInput("");
    };

    const currentMessages = messages.filter(m => m.channel === activeChannel);

    return (
        <div className="fixed bottom-4 right-4 w-[350px] h-[500px] bg-[#0A0A0A] border border-white/10 rounded-xl shadow-2xl flex flex-col overflow-hidden z-40 transition-transform translate-y-[calc(100%-60px)] hover:translate-y-0 duration-300">
            {/* Header / Tabs */}
            <div className="bg-black/40 p-1 flex gap-1 border-b border-white/5">
                {CHANNELS.map(ch => (
                    <button
                        key={ch.id}
                        onClick={() => setActiveChannel(ch.id)}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider rounded transition-colors",
                            activeChannel === ch.id ? "bg-accent1/10 text-accent1" : "text-gray-500 hover:bg-white/5"
                        )}
                    >
                        <ch.icon className="w-3 h-3" /> {ch.label}
                    </button>
                ))}
            </div>

            {/* Messages Area */}
            <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-white/[0.02]">
                {currentMessages.length === 0 && (
                    <div className="h-full flex items-center justify-center text-xs text-gray-600 italic">
                        No messages in {activeChannel} yet.
                    </div>
                )}
                {currentMessages.map((msg) => (
                    <div key={msg.id} className={cn("flex flex-col", msg.senderId === currentUser?.id ? "items-end" : "items-start")}>
                        <div className={cn(
                            "max-w-[80%] px-3 py-2 rounded-lg text-sm",
                            msg.senderId === currentUser?.id ? "bg-accent1 text-black rounded-tr-none" : "bg-white/10 text-gray-200 rounded-tl-none"
                        )}>
                            {msg.content}
                        </div>
                        <span className="text-[10px] text-gray-600 mt-1">Just now</span>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 bg-black/40 border-t border-white/5 flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Message #${activeChannel}...`}
                    className="flex-grow bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-accent1/50 transition-colors"
                />
                <button type="submit" className="p-2 bg-accent1 text-black rounded hover:bg-accent1/80">
                    <Send className="w-4 h-4" />
                </button>
            </form>
        </div>
    );
}
