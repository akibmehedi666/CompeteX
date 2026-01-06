export type UserRole = "Participant" | "Organizer" | "Sponsor" | "Recruiter";
export type EventMode = "Offline" | "Online";
export type EventStatus = "Upcoming" | "Live" | "Ended";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    university?: string;
    skills: string[];
    avatar: string; // URL
    stats?: {
        rank: number;
        points: number;
        eventsWon: number;
    };
}

export interface Event {
    id: string;
    title: string;
    organizer: string;
    date: string; // Display Date (e.g. "Jan 24, 2026")
    startDate: string; // ISO String for Countdown
    venue?: string;
    category: "Hackathon" | "Coding" | "Debate" | "Robotics" | "Gaming" | "Design" | "Seminar" | "AI/ML";
    mode: EventMode;
    status: EventStatus;
    description: string;
    participantsCount: number;
    maxParticipants?: number;
    image: string;
    coords?: { x: number; y: number }; // For Venue Map
}

export interface Team {
    id: string;
    name: string;
    members: User[];
    maxMembers: number;
    leaderId: string;
}

export interface Institution {
    id: string;
    name: string;
    logo: string;
    rank: number;
    totalPoints: number;
    location: string;
}

export interface ChatMessage {
    id: string;
    senderId: string;
    content: string;
    timestamp: string;
    channel: "Global" | "Team" | "Direct";
}

export interface Resource {
    id: string;
    title: string;
    type: "Video" | "PDF" | "Course";
    isPremium: boolean;
    category: string;
    thumbnail: string;
}
