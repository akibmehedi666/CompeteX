export interface DetailedEvent {
    id: string;
    title: string;
    category: string;
    date: string;
    startDate: string; // ISO String
    status: "Open" | "Closed" | "Live";
    participants: number;
    maxParticipants: number;
    image: string;
    description: string;
    rules: string[];
    timeline: { title: string; date: string }[];
    location: { type: "Online" | "Offline"; address: string; mapUrl?: string };
    leaderboard: { rank: number; name: string; score: number; avatar: string; institution?: string }[];
    organizer?: { name: string; id?: string }; // id links to institution
}

// Current base time for relative calc: 2026-01-02T01:19:03
export const DETAILED_EVENTS: DetailedEvent[] = [
    {
        id: "e1",
        title: "UIU CSE Fest 2026",
        category: "Coding",
        date: "Jan 02, 2026",
        startDate: "2026-01-02T13:30:00", // ~12 hours from now (Urgent)
        status: "Open",
        participants: 124,
        maxParticipants: 500,
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
        description: "A 48-hour sleepless marathon to build the future of tech. Join elite coders at UIU for this high-stakes development sprint.",
        rules: [
            "Projects must be built from scratch during the event.",
            "Teams of 2-4 members.",
            "Use of AI assistants is permitted but must be disclosed.",
            "Judging criteria: Innovation, Aesthetics, and Functionality."
        ],
        timeline: [
            { title: "Registration Opens", date: "Feb 15, 2025" },
            { title: "Team Formation", date: "Mar 10, 2025" },
            { title: "Hacking Begins", date: "Mar 15, 2025 - 9:00 AM" },
            { title: "Submission Deadline", date: "Mar 17, 2025 - 9:00 AM" }
        ],
        location: { type: "Offline", address: "United International University, Dhaka" },
        leaderboard: [
            { rank: 1, name: "UIU_Knights", score: 9850, avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=CN", institution: "UIU" },
            { rank: 2, name: "BUET_Cyphers", score: 9400, avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=NP", institution: "BUET" },
            { rank: 3, name: "NSU_Coders", score: 8900, avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=GM", institution: "NSU" },
            { rank: 4, name: "BRACU_Bots", score: 8500, avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=RE", institution: "BRACU" },
            { rank: 5, name: "IUT_Intellects", score: 8200, avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=AI", institution: "IUT" },
        ],
        organizer: { name: "UIU Computer Club", id: "inst-uiu" }
    },
    {
        id: "e2",
        title: "BUET RoboCarnival 2026",
        category: "Robotics",
        date: "Jan 04, 2026",
        startDate: "2026-01-04T09:00:00", // ~2 days from now
        status: "Open",
        participants: 45,
        maxParticipants: 100,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
        description: "Build, fight, destroy. The ultimate combat robotics tournament returning to the BUET arena. Weight class: 3kg.",
        rules: [
            "Robots must fit within 50cm x 50cm dimensions.",
            "No flamethrowers or EMP devices.",
            "Active weapon system required.",
            "Safety lock mechanism is mandatory."
        ],
        timeline: [
            { title: "Design Submission", date: "Jan 20, 2025" },
            { title: "Safety Inspection", date: "Mar 25, 2025" },
            { title: "Battle Day", date: "Apr 02, 2025" }
        ],
        location: { type: "Offline", address: "BUET Gymnasium, Dhaka" },
        leaderboard: [
            { rank: 1, name: "RoboTiger", score: 100, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=IG", institution: "BUET" },
            { rank: 2, name: "MechWarriors", score: 95, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=SP", institution: "RUET" },
            { rank: 3, name: "ElectroShock", score: 88, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=CB", institution: "KUET" },
        ],
        organizer: { name: "BUET Robotics Society", id: "inst-buet" }
    },
    {
        id: "e3",
        title: "Dhaka Design Sprint",
        category: "Design",
        date: "Jan 07, 2026",
        startDate: "2026-01-07T10:00:00", // ~5 days from now
        status: "Live",
        participants: 289,
        maxParticipants: 300,
        image: "https://images.unsplash.com/photo-1576153192396-4a2f02432668?w=800&q=80",
        description: "Redesign everyday objects for a sustainable future in Bangladesh. Focus on material efficiency and circular economy.",
        rules: [
            "Submit high-fidelity renders.",
            "Include a material breakdown sheet.",
            "Explain the lifecycle of the product.",
            "One submission per participant."
        ],
        timeline: [
            { title: "Theme Announcement", date: "Mar 01, 2025" },
            { title: "Sprint Begins", date: "Mar 18, 2025" },
            { title: "Final Pitch", date: "Mar 20, 2025" }
        ],
        location: { type: "Online", address: "https://meet.google.com/eco-sprint-bd-2025" },
        leaderboard: [
            { rank: 1, name: "GreenBengal", score: 9.8, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GF", institution: "Charukola" },
            { rank: 2, name: "EcoDhaka", score: 9.5, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=EM", institution: "AUST" },
            { rank: 3, name: "CircularBD", score: 9.2, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CD", institution: "Shanto-Mariam" },
        ],
        organizer: { name: "Shanto-Mariam University", id: "inst-shanto-mariam" }
    },
    {
        id: "e4",
        title: "FinTech Dhaka Challenge",
        category: "Finance",
        date: "Jan 15, 2026",
        startDate: "2026-01-15T08:00:00", // Future
        status: "Open",
        participants: 512,
        maxParticipants: 1000,
        image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?w=800&q=80",
        description: "Develop the most profitable trading algorithm for the Dhaka Stock Exchange using our simulated market data API.",
        rules: [
            "Initial capital: 100,000 BDT (Simulated).",
            "Max 50 trades per day.",
            "Use provided Python/C++ API wrapper.",
            "Strategies must be fully automated."
        ],
        timeline: [
            { title: "API Access Granted", date: "Apr 15, 2025" },
            { title: "Backtesting Phase", date: "Apr 20-30, 2025" },
            { title: "Live Market Simulation", date: "May 10, 2025" }
        ],
        location: { type: "Online", address: "CompeteX Trading Server" },
        leaderboard: [],
        organizer: { name: "IBA, Dhaka University", id: "inst-iba" }
    },
    {
        id: "e5",
        title: "NSU Cyber Struggle",
        category: "Science",
        date: "Feb 01, 2026",
        startDate: "2026-02-01T12:00:00",
        status: "Open",
        participants: 80,
        maxParticipants: 200,
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
        description: "Solve complex cybersecurity puzzles and capture flags in this intense CTF event.",
        rules: [
            "Solutions must be submitted within time limit.",
            "Code must be open source.",
            "Team collaboration encouraged.",
            "Novelty of the approach carries 50% score."
        ],
        timeline: [
            { title: "Problem Statements Released", date: "May 01, 2025" },
            { title: "Workshop Series", date: "May 10-20, 2025" },
            { title: "Submission", date: "Jun 01, 2025" }
        ],
        location: { type: "Online", address: "NSU Cyber Range" },
        leaderboard: [],
        organizer: { name: "North South University", id: "inst-nsu" }
    },
    {
        id: "e6",
        title: "GameDev 'Retro' Jam",
        category: "Gaming",
        date: "Feb 28, 2026",
        startDate: "2026-02-28T18:00:00",
        status: "Closed",
        participants: 2042,
        maxParticipants: 2000,
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
        description: "Create a game inspired by 1980s visuals but modern mechanics. Pixel art glory awaits.",
        rules: [
            "Max resolution 320x240.",
            "Color palette restricted to 16 colors.",
            "Any game engine allowed.",
            "Assets must be created during the jam."
        ],
        timeline: [
            { title: "Theme Reveal", date: "Feb 26, 2025" },
            { title: "Jamming", date: "Feb 26-28, 2025" },
            { title: "Community Voting", date: "Mar 01, 2025" }
        ],
        location: { type: "Online", address: "Itch.io / CompeteX Hub" },
        leaderboard: [
            { rank: 1, name: "PixelPerfect", score: 450, avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=PP", institution: "IndieDev" },
            { rank: 2, name: "RetroKing", score: 420, avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=RK", institution: "DigiPen" },
            { rank: 3, name: "8BitHero", score: 390, avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=8B", institution: "USC Games" },
            { rank: 4, name: "NeoNights", score: 350, avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=NN", institution: "NYU Game Center" },
        ],
        organizer: { name: "DigiPen", id: "inst-digipen" }
    },
    {
        id: "e-past-1",
        title: "AI Bangladesh Summit",
        category: "Artificial Intelligence",
        date: "Dec 15, 2025",
        startDate: "2025-12-15T09:00:00",
        status: "Closed",
        participants: 250,
        maxParticipants: 300,
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
        description: "An exclusive gathering of AI researchers and enthusiasts to discuss the breakthroughs of the year in Bangladesh.",
        rules: ["Invite only", "No recording"],
        timeline: [
            { title: "Keynote", date: "Dec 15, 2025" }
        ],
        location: { type: "Offline", address: "Bangabandhu International Conference Center" },
        leaderboard: [],
        organizer: { name: "UIU AI Club", id: "inst-uiu-ai" }
    },
    {
        id: "e-past-2",
        title: "MechWar Legacy",
        category: "Robotics",
        date: "Nov 10, 2025",
        startDate: "2025-11-10T09:00:00",
        status: "Closed",
        participants: 120,
        maxParticipants: 150,
        image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=800&q=80",
        description: "The classic robotics combat championship that started it all.",
        rules: ["Standard weight class"],
        timeline: [
            { title: "Battle", date: "Nov 10, 2025" }
        ],
        location: { type: "Offline", address: "Detroit, MI" },
        leaderboard: [],
        organizer: { name: "MechInstitute", id: "inst-mech" }
    }
];
