import { create } from 'zustand';
import { User, Event, Team, ChatMessage } from '@/types';
import { EVENTS, USERS } from '@/constants/mockData';
import { normalizeRole } from '@/lib/auth';

interface AppState {
    // Auth
    currentUser: User | null;
    login: (email: string) => void;
    logout: () => void;
    initAuth: () => void;

    // Data
    events: Event[];
    filteredEvents: Event[];
    setFilter: (filter: string) => void;

    // Team
    myTeam: Team | null;
    addToTeam: (user: User) => void;
    removeFromTeam: (userId: string) => void;

    // Chat
    messages: ChatMessage[];
    activeDirectMessageUser: User | null;
    setActiveDirectMessageUser: (user: User | null) => void;
    addMessage: (msg: Omit<ChatMessage, "id" | "timestamp" | "recipientId">) => void;
}

// Mock initial data handling... in real app would be API calls
export const useStore = create<AppState>((set, get) => ({
    currentUser: null,
    login: (email) => {
        // Check localStorage first for registered users
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem("competex_user_session");
            if (stored) {
                try {
                    const userData = JSON.parse(stored);
                    if (userData.email === email) {
                        // Normalize role if needed
                        if (userData.role) {
                            userData.role = normalizeRole(userData.role);
                        }
                        set({ currentUser: userData });
                        return;
                    }
                } catch (e) {
                    console.error("Error parsing stored user:", e);
                }
            }
        }

        // Fallback to mock users
        const existingUser = USERS.find(u => u.email === email);
        const user = existingUser || { ...USERS[0], email, name: email.split('@')[0] };

        set({ currentUser: user });
        localStorage.setItem("competex_user_session", JSON.stringify(user));
    },
    logout: () => {
        set({ currentUser: null });
        localStorage.removeItem("competex_user_session");
        window.location.href = "/";
    },

    // Initialize from LocalStorage
    initAuth: () => {
        if (typeof window !== 'undefined') {
            const session = localStorage.getItem("competex_user_session");
            if (session) {
                try {
                    const userData = JSON.parse(session);
                    // Normalize role if needed
                    if (userData.role) {
                        userData.role = normalizeRole(userData.role);
                    }
                    set({ currentUser: userData });
                } catch (e) {
                    console.error("Error parsing stored session:", e);
                }
            }
        }
    },

    events: EVENTS, // Assuming EVENTS will be updated to match new Type
    filteredEvents: EVENTS,
    setFilter: (filter) => {
        const { events } = get();
        if (filter === 'All') {
            set({ filteredEvents: events });
        } else {
            set({
                filteredEvents: events.filter(
                    (e) => e.category === filter || e.mode === filter
                ),
            });
        }
    },

    myTeam: {
        id: 'my-team',
        name: 'My Squad',
        members: [],
        maxMembers: 4,
        leaderId: 'u1'
    },
    addToTeam: (user) => set((state) => {
        if (!state.myTeam || state.myTeam.members.length >= state.myTeam.maxMembers) return {};
        return {
            myTeam: {
                ...state.myTeam,
                members: [...state.myTeam.members, user]
            }
        };
    }),
    removeFromTeam: (userId) => set((state) => {
        if (!state.myTeam) return {};
        return {
            myTeam: {
                ...state.myTeam,
                members: state.myTeam.members.filter(m => m.id !== userId)
            }
        };
    }),

    messages: [],
    activeDirectMessageUser: null,
    setActiveDirectMessageUser: (user) => set({ activeDirectMessageUser: user }),
    addMessage: (msg) => set((state) => ({
        messages: [
            ...state.messages,
            {
                ...msg,
                id: Date.now().toString(),
                timestamp: new Date().toISOString(),
                recipientId: msg.channel === "Direct" ? state.activeDirectMessageUser?.id : undefined
            }
        ]
    })),
}));
