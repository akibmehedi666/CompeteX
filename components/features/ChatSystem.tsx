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

const RECENT_CONTACTS = [
    { id: "u2", name: "Sarah Chen", avatar: "", status: "online", lastMsg: "Hey, are we still on for meeting?" },
    { id: "u3", name: "Marcus Lee", avatar: "", status: "offline", lastMsg: "Thanks for the help!" },
    { id: "u4", name: "Jessica Wu", avatar: "", status: "online", lastMsg: "Check out this repo." },
];

export function ChatSystem({ initialOpen = false, variant = "widget" }: { initialOpen?: boolean; variant?: "widget" | "fullscreen" }) {
    const [isOpen, setIsOpen] = useState(initialOpen || variant === "fullscreen");
    const [activeChannel, setActiveChannel] = useState<typeof CHANNELS[number]["id"]>("Global");
    const [input, setInput] = useState("");
    const { messages, addMessage, currentUser, activeDirectMessageUser, setActiveDirectMessageUser } = useStore();

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        addMessage({
            senderId: currentUser?.id || "anon",
            content: input,
            channel: activeChannel
        });
        setInput("");
    };

    const currentMessages = messages.filter(m => {
        if (m.channel !== activeChannel) return false;
        if (activeChannel === "Direct") {
            // Filter DMs involving BOTH current user and active target user
            return (m.senderId === currentUser?.id && m.recipientId === activeDirectMessageUser?.id) ||
                (m.senderId === activeDirectMessageUser?.id && m.recipientId === currentUser?.id);
        }
        return true;
    });

    const isWidget = variant === "widget";

    return (
        <div className={cn(
            "bg-[#0A0A0A] border border-white/10 flex flex-col overflow-hidden z-40 transition-all duration-300",
            isWidget
                ? cn(
                    "fixed bottom-4 right-4 w-[350px] h-[500px] rounded-xl shadow-2xl",
                    isOpen ? "translate-y-0" : "translate-y-[calc(100%-60px)] hover:translate-y-0"
                )
                : "w-full max-w-6xl mx-auto h-[calc(100vh-140px)] rounded-2xl relative border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        )}>
            {/* Header / Tabs */}
            <div className="bg-black/40 p-1 flex gap-1 border-b border-white/5 shrink-0">
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

                {isWidget && (
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="px-3 hover:bg-white/10 text-gray-500 rounded"
                    >
                        {isOpen ? "−" : "+"}
                    </button>
                )}
            </div>

            {/* Messages Area */}
            <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-white/[0.02]">
                {activeChannel === "Direct" && !activeDirectMessageUser ? (
                    // Contact List View (Messenger Style)
                    <div className="space-y-2">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Recent Chats</p>
                        {RECENT_CONTACTS.map(contact => (
                            <button
                                key={contact.id}
                                onClick={() => setActiveDirectMessageUser({
                                    id: contact.id,
                                    name: contact.name,
                                    avatar: contact.avatar,
                                    email: "", // Dummy
                                    role: "Participant", // Dummy
                                    skills: [] // Dummy
                                })}
                                className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left group"
                            >
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00E5FF]/20 to-[#AAFF00]/20 flex items-center justify-center text-white font-bold border border-white/10">
                                        {contact.name.charAt(0)}
                                    </div>
                                    <div className={cn(
                                        "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#0A0A0A]",
                                        contact.status === "online" ? "bg-green-500" : "bg-gray-500"
                                    )} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-0.5">
                                        <span className="text-sm font-bold text-gray-200 group-hover:text-white truncate">{contact.name}</span>
                                        <span className="text-[10px] text-gray-600">12:30 PM</span>
                                    </div>
                                    <p className="text-xs text-gray-500 truncate group-hover:text-gray-400">{contact.lastMsg}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                ) : (
                    // Active Chat View
                    <>
                        {activeChannel === "Direct" && activeDirectMessageUser && (
                            <div className="flex items-center justify-between p-2 bg-accent1/5 border border-accent1/20 rounded-lg mb-2 sticky top-0 backdrop-blur-md z-10">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setActiveDirectMessageUser(null)}
                                        className="mr-1 text-gray-500 hover:text-white"
                                    >
                                        ←
                                    </button>
                                    <div className="w-6 h-6 rounded-full overflow-hidden border border-accent1/30 bg-white/10 flex items-center justify-center text-[10px] text-white">
                                        {activeDirectMessageUser.avatar ? (
                                            <img src={activeDirectMessageUser.avatar} alt="" className="w-full h-full object-cover" />
                                        ) : activeDirectMessageUser.name?.charAt(0)}
                                    </div>
                                    <span className="text-xs font-bold text-accent1">{activeDirectMessageUser.name}</span>
                                </div>
                            </div>
                        )}

                        {currentMessages.length === 0 && (activeChannel !== "Direct" || activeDirectMessageUser) && (
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
                    </>
                )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 bg-black/40 border-t border-white/5 flex gap-2 shrink-0">
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
