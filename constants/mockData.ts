import { Event, User, Achievement, CompetitionEntry } from "@/types";

export type EventStatus = "Upcoming" | "Live" | "Ended";
export type EventMode = "Offline" | "Online";

export const EVENTS: Event[] = [
    {
        id: "e1", // Sync with eventData.ts
        title: "Neon City Hackathon",
        organizer: "TechUniversity",
        organizerId: "u3",
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
        coords: { x: 200, y: 150 },
        prizes: ["$10,000", "$5,000", "$2,500"],
        difficulty: "Advanced",
        hasOnlineJudge: false,
        registrationDeadline: "2025-12-28T23:59:59",
        teamSize: { min: 2, max: 4 },
        tags: ["Web Development", "Innovation", "Startup"]
    },
    {
        id: "e2",
        title: "RoboWars 2025",
        organizer: "MechInstitute",
        organizerId: "u3",
        date: "Jan 04, 2026",
        startDate: "2026-01-04T09:00:00",
        category: "Robotics",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
        mode: "Offline",
        venue: "Tech Arena",
        status: "Upcoming",
        description: "Battle of the bots.",
        participantsCount: 45,
        coords: { x: 450, y: 300 },
        prizes: ["$15,000", "$7,500", "$3,000"],
        difficulty: "Intermediate",
        hasOnlineJudge: false,
        teamSize: { min: 3, max: 5 },
        tags: ["Robotics", "Engineering", "Hardware"]
    },
    {
        id: "e3",
        title: "Eco-Design Sprint",
        organizer: "GreenFuture",
        organizerId: "u3",
        date: "Jan 07, 2026",
        startDate: "2026-01-07T10:00:00",
        category: "Design",
        image: "https://images.unsplash.com/photo-1576153192396-4a2f02432668?w=800&q=80",
        mode: "Online",
        status: "Live",
        description: "Redesign for sustainability.",
        participantsCount: 289,
        prizes: ["$5,000", "$2,500", "$1,000"],
        difficulty: "Beginner",
        hasOnlineJudge: false,
        teamSize: { min: 1, max: 3 },
        tags: ["UI/UX", "Sustainability", "Design Thinking"]
    },
    {
        id: "e4",
        title: "Algorithmic Trading Cup",
        organizer: "FinTech Global",
        organizerId: "u3",
        date: "Jan 15, 2026",
        startDate: "2026-01-15T08:00:00",
        category: "Coding",
        image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?w=800&q=80",
        mode: "Online",
        status: "Upcoming",
        description: "Algorithmic trading excellence.",
        participantsCount: 512,
        prizes: ["$20,000", "$10,000", "$5,000"],
        difficulty: "Advanced",
        hasOnlineJudge: true,
        teamSize: { min: 1, max: 2 },
        tags: ["Algorithms", "Finance", "AI/ML"]
    }
];

// Mock achievements
const MOCK_ACHIEVEMENTS: Achievement[] = [
    {
        id: "ach1",
        eventId: "e1",
        eventTitle: "Neon City Hackathon",
        title: "First Place Winner",
        description: "Won first place in the 48-hour hackathon with an innovative fintech solution",
        earnedDate: "2025-12-15T18:00:00",
        type: "winner",
        badge: "🏆"
    },
    {
        id: "ach2",
        eventId: "e3",
        eventTitle: "Eco-Design Sprint",
        title: "Runner Up",
        description: "Secured second place with a sustainable design solution",
        earnedDate: "2025-11-20T16:00:00",
        type: "runner-up",
        badge: "🥈"
    },
    {
        id: "ach3",
        eventId: "e2",
        eventTitle: "RoboWars 2025",
        title: "Best Innovation Award",
        description: "Special recognition for innovative robot design",
        earnedDate: "2025-10-10T14:00:00",
        type: "special",
        badge: "💡"
    }
];

// Mock competition history
const MOCK_COMPETITION_HISTORY: CompetitionEntry[] = [
    {
        id: "comp1",
        eventId: "e1",
        eventTitle: "Neon City Hackathon",
        rank: 1,
        score: 98.5,
        date: "2025-12-15T18:00:00",
        category: "Hackathon",
        teamName: "Code Crusaders",
        participantsCount: 124
    },
    {
        id: "comp2",
        eventId: "e3",
        eventTitle: "Eco-Design Sprint",
        rank: 2,
        score: 95.0,
        date: "2025-11-20T16:00:00",
        category: "Design",
        teamName: "Green Innovators",
        participantsCount: 289
    },
    {
        id: "comp3",
        eventId: "e2",
        eventTitle: "RoboWars 2025",
        rank: 5,
        score: 87.3,
        date: "2025-10-10T14:00:00",
        category: "Robotics",
        teamName: "Mech Masters",
        participantsCount: 45
    }
];

export const USERS: User[] = [
    {
        id: "u1",
        name: "Alex Cyber",
        email: "alex@example.com",
        role: "Participant",
        university: "TechUniversity",
        skills: ["React", "Node.js", "Cybersecurity", "Python", "Docker"],
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        stats: {
            rank: 42,
            points: 1250,
            eventsWon: 3
        },
        profileVisibility: "public",
        achievements: MOCK_ACHIEVEMENTS,
        competitionHistory: MOCK_COMPETITION_HISTORY,
        verified: true,
        bio: "Passionate about cybersecurity and full-stack development. Love participating in hackathons and building innovative solutions.",
        github: "https://github.com/alexcyber",
        linkedin: "https://linkedin.com/in/alexcyber",
        portfolio: "https://alexcyber.dev"
    },
    {
        id: "u2",
        name: "Sarah Sponsor",
        email: "sarah@techcorp.com",
        role: "Sponsor",
        university: "TechCorp",
        skills: ["Marketing", "Management", "Brand Strategy"],
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        verified: true,
        bio: "Corporate partnerships manager at TechCorp, connecting brands with innovative tech events."
    },
    {
        id: "u3",
        name: "Dr. Alan",
        email: "alan@uni.edu",
        role: "Organizer",
        university: "Science Institute",
        skills: ["Physics", "Education", "Event Management"],
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alan",
        verified: true,
        bio: "Professor and event organizer passionate about creating learning opportunities for students."
    },
    {
        id: "u4",
        name: "Rachel Recruiter",
        email: "recruiter@agency.com",
        role: "Recruiter",
        university: "TechHunters Agency",
        skills: ["HR", "Talent Acquisition", "Technical Recruiting"],
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel",
        verified: true,
        bio: "Senior tech recruiter helping companies find exceptional talent through competitive programming."
    }
];

