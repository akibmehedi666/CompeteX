"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Phone, Video, Paperclip, Search, Users, MessageSquare } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";
import { User } from "@/types";

interface Conversation {
    id: string;
    user: User;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount?: number;
    isGroup?: boolean;
}

<<<<<<< HEAD
export function ChatSystem({ initialOpen = false, variant = "widget" }: { initialOpen?: boolean; variant?: "widget" | "fullscreen" }) {
    const [isOpen, setIsOpen] = useState(initialOpen || variant === "fullscreen");
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
=======
const RECENT_CONTACTS = [
    { id: "u2", name: "Sarah Chen", avatar: "", status: "online", lastMsg: "Hey, are we still on for meeting?" },
    { id: "u3", name: "Marcus Lee", avatar: "", status: "offline", lastMsg: "Thanks for the help!" },
    { id: "u4", name: "Jessica Wu", avatar: "", status: "online", lastMsg: "Check out this repo." },
];

export function ChatSystem({ initialOpen = false, variant = "widget" }: { initialOpen?: boolean; variant?: "widget" | "fullscreen" }) {
    const [isOpen, setIsOpen] = useState(initialOpen || variant === "fullscreen");
    const [activeChannel, setActiveChannel] = useState<typeof CHANNELS[number]["id"]>("Global");
>>>>>>> 1c1d603a399e8e39a1cc4517dbfa6972a4ea5d5c
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { messages, addMessage, currentUser, activeDirectMessageUser, setActiveDirectMessageUser } = useStore();

    // Format time helper function
    const formatTime = (timestamp: string | Date) => {
        const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
        if (isNaN(date.getTime())) {
            // If it's already a formatted string like "10:35 AM" or "Yesterday"
            return timestamp as string;
        }
        
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        const displayHours = hours % 12 || 12;
        const displayMinutes = minutes.toString().padStart(2, "0");
        
        if (diff < 86400000) { // Less than 24 hours
            return `${displayHours}:${displayMinutes} ${ampm}`;
        }
        return date.toLocaleDateString();
    };

    // Generate conversations from messages and mock contacts
    const generateConversations = (): Conversation[] => {
        const convMap = new Map<string, Conversation>();
        
        // Get all direct messages
        const directMessages = messages.filter(m => m.channel === "Direct");
        
        // Process messages to build conversations
        directMessages.forEach(msg => {
            const otherUserId = msg.senderId === currentUser?.id ? msg.recipientId : msg.senderId;
            if (!otherUserId) return;
            
            if (!convMap.has(otherUserId)) {
                // Create conversation from mock users or generate placeholder
                const mockUsers: Record<string, User> = {
                    "u2": { id: "u2", name: "Sarah Ahmed", email: "sarah@example.com", role: "Participant", skills: [], avatar: "" },
                    "u3": { id: "u3", name: "Dr. Rahman", email: "rahman@example.com", role: "Organizer", skills: [], avatar: "" },
                    "u4": { id: "u4", name: "AI Research Team", email: "team@example.com", role: "Participant", skills: [], avatar: "" },
                    "u5": { id: "u5", name: "Dr. Sarah Chen", email: "sarah@example.com", role: "Mentor", skills: [], avatar: "" },
                };
                
                const user = mockUsers[otherUserId] || {
                    id: otherUserId,
                    name: `User ${otherUserId}`,
                    email: `${otherUserId}@example.com`,
                    role: "Participant" as const,
                    skills: [],
                    avatar: ""
                };
                
                convMap.set(otherUserId, {
                    id: otherUserId,
                    user,
                    lastMessage: msg.content,
                    lastMessageTime: formatTime(msg.timestamp),
                    unreadCount: 0
                });
            } else {
                // Update last message if this is more recent
                const conv = convMap.get(otherUserId)!;
                const msgTime = new Date(msg.timestamp).getTime();
                // Try to parse lastMessageTime, if it fails assume it's a formatted string and use current time
                let lastTime = 0;
                try {
                    lastTime = new Date(conv.lastMessageTime).getTime();
                    if (isNaN(lastTime)) {
                        lastTime = 0; // If parsing fails, treat as old
                    }
                } catch {
                    lastTime = 0;
                }
                if (msgTime > lastTime || lastTime === 0) {
                    conv.lastMessage = msg.content;
                    conv.lastMessageTime = formatTime(msg.timestamp);
                }
            }
        });
        
        // Add default conversations if no messages exist
        if (convMap.size === 0) {
            return [
                {
                    id: "conv1",
                    user: {
                        id: "u3",
                        name: "Dr. Rahman",
                        email: "rahman@example.com",
                        role: "Organizer",
                        skills: [],
                        avatar: ""
                    },
                    lastMessage: "Can we meet tomorrow?",
                    lastMessageTime: "10:35 AM",
                    unreadCount: 0
                },
                {
                    id: "conv2",
                    user: {
                        id: "u2",
                        name: "Sarah Ahmed",
                        email: "sarah@example.com",
                        role: "Participant",
                        skills: [],
                        avatar: ""
                    },
                    lastMessage: "I sent the dataset.",
                    lastMessageTime: "9:15 AM",
                    unreadCount: 0
                },
                {
                    id: "conv3",
                    user: {
                        id: "u4",
                        name: "AI Research Team",
                        email: "team@example.com",
                        role: "Participant",
                        skills: [],
                        avatar: ""
                    },
                    lastMessage: "New meeting scheduled.",
                    lastMessageTime: "Yesterday",
                    unreadCount: 2,
                    isGroup: true
                }
            ];
        }
        
        // Sort by last message time (most recent first)
        return Array.from(convMap.values()).sort((a, b) => {
            try {
                const timeA = new Date(a.lastMessageTime).getTime();
                const timeB = new Date(b.lastMessageTime).getTime();
                if (isNaN(timeA) || isNaN(timeB)) return 0;
                return timeB - timeA;
            } catch {
                return 0;
            }
        });
    };
    
    const conversations = generateConversations();

    // Filter conversations based on search
    const filteredConversations = conversations.filter(conv =>
        conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Get messages for selected conversation
    const currentMessages = selectedConversation
        ? messages.filter(m => {
            if (m.channel !== "Direct") return false;
            return (m.senderId === currentUser?.id && m.recipientId === selectedConversation.user.id) ||
                (m.senderId === selectedConversation.user.id && m.recipientId === currentUser?.id);
        })
        : [];

    // Auto-select first conversation if none selected
    useEffect(() => {
        if (!selectedConversation && filteredConversations.length > 0 && variant === "fullscreen") {
            setSelectedConversation(filteredConversations[0]);
            setActiveDirectMessageUser(filteredConversations[0].user);
        }
    }, [filteredConversations, selectedConversation, variant, setActiveDirectMessageUser]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [currentMessages]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !selectedConversation) return;

        addMessage({
            senderId: currentUser?.id || "anon",
            content: input,
            channel: "Direct",
            recipientId: selectedConversation.user.id
        });
        setInput("");
    };

    const isWidget = variant === "widget";

<<<<<<< HEAD
    if (isWidget) {
        // Widget version - simplified
        return (
            <div className={cn(
                "bg-[#0A0A0A] border border-white/10 flex flex-col overflow-hidden z-40 transition-all duration-300 rounded-xl shadow-2xl",
                "fixed bottom-4 right-4 w-[350px] h-[500px]",
                isOpen ? "translate-y-0" : "translate-y-[calc(100%-60px)] hover:translate-y-0"
            )}>
                <div className="bg-black/40 p-4 border-b border-white/10 flex items-center justify-between shrink-0">
                    <h2 className="text-lg font-semibold text-white">Messages</h2>
=======
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
>>>>>>> 1c1d603a399e8e39a1cc4517dbfa6972a4ea5d5c
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        {isOpen ? "−" : "+"}
                    </button>
<<<<<<< HEAD
                </div>
                <div className="flex-grow p-4 overflow-y-auto bg-[#0A0A0A]">
                    {filteredConversations.length === 0 ? (
                        <div className="text-center text-gray-500 text-sm py-8">
                            No conversations found
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {filteredConversations.map(conv => (
                                <button
                                    key={conv.id}
                                    onClick={() => {
                                        setSelectedConversation(conv);
                                        setActiveDirectMessageUser(conv.user);
                                    }}
                                    className={cn(
                                        "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors",
                                        selectedConversation?.id === conv.id
                                            ? "bg-accent1/10 border border-accent1/30"
                                            : "hover:bg-white/5"
                                    )}
                                >
                                    <div className="relative flex-shrink-0">
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-medium border border-white/10">
                                            {conv.isGroup ? (
                                                <Users className="w-5 h-5" />
                                            ) : (
                                                conv.user.name.charAt(0)
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-semibold text-white truncate">
                                                {conv.user.name}
                                            </span>
                                            <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                                                {conv.lastMessageTime}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-400 truncate">{conv.lastMessage}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Fullscreen version - dark theme
    return (
        <div className="w-full max-w-7xl mx-auto h-[calc(100vh-140px)] rounded-2xl bg-[#0A0A0A] border border-white/10 shadow-xl overflow-hidden flex">
            {/* Left Sidebar */}
            <div className="w-80 border-r border-white/10 flex flex-col bg-black/40">
                {/* Header */}
                <div className="p-4 border-b border-white/10 bg-black/40">
                    <h2 className="text-xl font-semibold text-white mb-4">Messages</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent1/50 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Conversation List */}
                <div className="flex-1 overflow-y-auto">
                    {filteredConversations.length === 0 ? (
                        <div className="text-center text-gray-500 text-sm py-8 px-4">
                            No conversations found
                        </div>
                    ) : (
                        <div className="divide-y divide-white/5">
                            {filteredConversations.map(conv => (
                                <button
                                    key={conv.id}
                                    onClick={() => {
                                        setSelectedConversation(conv);
                                        setActiveDirectMessageUser(conv.user);
                                    }}
                                    className={cn(
                                        "w-full flex items-center gap-3 p-4 text-left transition-colors hover:bg-white/5",
                                        selectedConversation?.id === conv.id && "bg-accent1/10 border-l-4 border-accent1"
                                    )}
                                >
                                    <div className="relative flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white font-medium text-lg border border-white/10">
                                            {conv.isGroup ? (
                                                <Users className="w-6 h-6" />
                                            ) : (
                                                conv.user.name.charAt(0)
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-semibold text-white truncate">
                                                {conv.user.name}
                                            </span>
                                            <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                                                {conv.lastMessageTime}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-400 truncate">{conv.lastMessage}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Right Pane - Chat Window */}
            <div className="flex-1 flex flex-col bg-[#0A0A0A]">
                {selectedConversation ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b border-white/10 bg-black/40 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-medium border border-white/10">
                                    {selectedConversation.isGroup ? (
                                        <Users className="w-5 h-5" />
                                    ) : (
                                        selectedConversation.user.name.charAt(0)
                                    )}
                                </div>
                                <span className="text-base font-semibold text-white">
                                    {selectedConversation.user.name}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                    <Phone className="w-5 h-5 text-gray-400 hover:text-accent1 transition-colors" />
                                </button>
                                <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                    <Video className="w-5 h-5 text-gray-400 hover:text-accent1 transition-colors" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 bg-white/[0.02] space-y-4">
                            {currentMessages.length === 0 ? (
                                <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                                    No messages yet. Start the conversation!
                                </div>
                            ) : (
                                currentMessages.map((msg) => {
                                    const isOwn = msg.senderId === currentUser?.id;
                                    return (
                                        <div
                                            key={msg.id}
                                            className={cn(
                                                "flex flex-col",
                                                isOwn ? "items-end" : "items-start"
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "max-w-[70%] px-4 py-2 rounded-lg text-sm",
                                                    isOwn
                                                        ? "bg-accent1 text-black rounded-br-none"
                                                        : "bg-white/10 text-gray-200 rounded-bl-none border border-white/10"
                                                )}
                                            >
                                                {msg.content}
                                            </div>
                                            <span className="text-xs text-gray-500 mt-1 px-1">
                                                {formatTime(msg.timestamp)}
                                            </span>
                                        </div>
                                    );
                                })
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-white/10 bg-black/40">
                            <form onSubmit={handleSend} className="flex items-center gap-2">
                                <button
                                    type="button"
                                    className="p-2 hover:bg-white/5 rounded-full transition-colors"
                                >
                                    <Paperclip className="w-5 h-5 text-gray-400 hover:text-accent1 transition-colors" />
                                </button>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent1/50 focus:border-transparent"
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-accent1 text-black rounded-lg hover:bg-accent1/80 transition-colors flex items-center gap-2 font-medium text-sm"
                                >
                                    <Send className="w-4 h-4" />
                                    Send
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center bg-white/[0.02]">
                        <div className="text-center text-gray-500">
                            <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                            <p className="text-lg font-medium">Select a conversation to start messaging</p>
                        </div>
                    </div>
                )}
            </div>
=======
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
>>>>>>> 1c1d603a399e8e39a1cc4517dbfa6972a4ea5d5c
        </div>
    );
}
