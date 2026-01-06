import { create } from 'zustand';
import { User, Event, Team, ChatMessage } from '@/types';
import { EVENTS, USERS } from '@/constants/mockData';

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
    addMessage: (msg: ChatMessage) => void;
}

// Mock initial data handling... in real app would be API calls
export const useStore = create<AppState>((set, get) => ({
    currentUser: null,
    login: (email) => {
        // Simulated login
        const user = USERS[0]; // Just picking first mock user
        const userData = { ...user, email };
        set({ currentUser: userData });
        localStorage.setItem("competex_user_session", JSON.stringify(userData));
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
                set({ currentUser: JSON.parse(session) });
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
    addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
}));
