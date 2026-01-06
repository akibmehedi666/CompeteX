import { Event, User } from "@/types";

export type EventStatus = "Upcoming" | "Live" | "Ended";
export type EventMode = "Offline" | "Online";

export const EVENTS: Event[] = [
    {
        id: "e1", // Sync with eventData.ts
        title: "Neon City Hackathon",
        organizer: "TechUniversity",
        date: "Jan 02, 2026",
        startDate: "2026-01-02T13:30:00",
        category: "Hackathon",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
        mode: "Offline",
        venue: "Moscone Center",
        status: "Upcoming",
        description: "A 48-hour sleepless marathon.",
        participantsCount: 124,
        maxParticipants: 500,
        coords: { x: 200, y: 150 }
    },
    {
        id: "e2",
        title: "RoboWars 2025",
        organizer: "MechInstitute",
        date: "Jan 04, 2026",
        startDate: "2026-01-04T09:00:00",
        category: "Robotics",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
        mode: "Offline",
        venue: "Tech Arena",
        status: "Upcoming",
        description: "Battle of the bots.",
        participantsCount: 45,
        coords: { x: 450, y: 300 }
    },
    {
        id: "e3",
        title: "Eco-Design Sprint",
        organizer: "GreenFuture",
        date: "Jan 07, 2026",
        startDate: "2026-01-07T10:00:00",
        category: "Design",
        image: "https://images.unsplash.com/photo-1576153192396-4a2f02432668?w=800&q=80",
        mode: "Online",
        status: "Live",
        description: "Redesign for sustainability.",
        participantsCount: 289,
    },
    {
        id: "e4",
        title: "Algorithmic Trading Cup",
        organizer: "FinTech Global",
        date: "Jan 15, 2026",
        startDate: "2026-01-15T08:00:00",
        category: "Coding", // Changed from AI/ML to Coding to match filters maybe? Or keep generic.
        image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?w=800&q=80",
        mode: "Online",
        status: "Upcoming",
        description: "Algorithmic trading excellence.",
        participantsCount: 512,
    }
];

export const USERS: User[] = [
    {
        id: "u1",
        name: "Alex Cyber",
        email: "alex@example.com",
        role: "Participant",
        university: "TechUniversity",
        skills: ["React", "Node.js", "Cybersecurity"],
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        stats: {
            rank: 42,
            points: 1250,
            eventsWon: 3
        }
    },
    {
        id: "u2",
        name: "Sarah Sponsor",
        email: "sarah@techcorp.com",
        role: "Sponsor",
        university: "TechCorp",
        skills: ["Marketing", "Management"],
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
        id: "u3",
        name: "Dr. Alan",
        email: "alan@uni.edu",
        role: "Organizer",
        university: "Science Institute",
        skills: ["Physics", "Education"],
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alan",
    }
];
