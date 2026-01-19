
export interface TeamMember {
    id: string;
    name: string;
    avatar: string;
    role: "leader" | "member";
    skills: string[];
}

export interface Team {
    id: string;
    name: string;
    description: string;
    project: string;
    categories: string[];
    requiredSkills: string[];
    members: TeamMember[];
    maxMembers: number;
    leaderId: string;
    status: "open" | "full" | "invite-only";
    competition: string;
}

export const DUMMY_TEAMS: Team[] = [
    {
        id: "team-1",
        name: "AI Vision Squad",
        description: "Building an AI-powered object detection system for autonomous vehicles using YOLOv8 and PyTorch.",
        project: "Self-Driving Car Vision System",
        categories: ["AI", "ML", "Robotics"],
        requiredSkills: ["Python", "Machine Learning", "Computer Vision", "TensorFlow"],
        members: [
            { id: "m1", name: "Sarah Chen", avatar: "", role: "leader", skills: ["Python", "ML"] },
            { id: "m2", name: "Alex Kumar", avatar: "", role: "member", skills: ["PyTorch", "CV"] },
            { id: "m3", name: "Emma Davis", avatar: "", role: "member", skills: ["TensorFlow"] },
        ],
        maxMembers: 4,
        leaderId: "m1",
        status: "open",
        competition: "Global AI Challenge"
    },
    {
        id: "team-2",
        name: "RoboBuilders",
        description: "Designing and building an autonomous robot for warehouse navigation and package sorting.",
        project: "Warehouse Automation Bot",
        categories: ["Robotics", "Hardware", "IoT"],
        requiredSkills: ["Arduino", "C++", "3D Modeling", "Electronics"],
        members: [
            { id: "m4", name: "Marcus Lee", avatar: "", role: "leader", skills: ["Arduino", "C++"] },
            { id: "m5", name: "Priya Patel", avatar: "", role: "member", skills: ["3D Modeling"] },
        ],
        maxMembers: 4,
        leaderId: "m4",
        status: "open",
        competition: "Neon City Hackathon"
    },
    {
        id: "team-3",
        name: "Web3 Innovators",
        description: "Creating a decentralized marketplace for digital art with NFT integration and smart contracts.",
        project: "NFT Art Marketplace DApp",
        categories: ["Blockchain", "Web Dev"],
        requiredSkills: ["Solidity", "React", "Web3.js", "Smart Contracts"],
        members: [
            { id: "m6", name: "Jordan Taylor", avatar: "", role: "leader", skills: ["Solidity", "Web3"] },
            { id: "m7", name: "Lisa Wang", avatar: "", role: "member", skills: ["React", "UI/UX"] },
            { id: "m8", name: "David Kim", avatar: "", role: "member", skills: ["Smart Contracts"] },
            { id: "m9", name: "Amy Rodriguez", avatar: "", role: "member", skills: ["Backend"] },
        ],
        maxMembers: 4,
        leaderId: "m6",
        status: "full",
        competition: "Neon City Hackathon"
    },
    {
        id: "team-4",
        name: "HealthTrack Solutions",
        description: "Developing a mobile app for personalized health monitoring with AI-driven insights and recommendations.",
        project: "AI Health Companion App",
        categories: ["Mobile", "AI", "Design"],
        requiredSkills: ["React Native", "Python", "UI/UX Design", "Machine Learning"],
        members: [
            { id: "m10", name: "Sophie Anderson", avatar: "", role: "leader", skills: ["React Native", "Mobile"] },
            { id: "m11", name: "Ryan Mitchell", avatar: "", role: "member", skills: ["Python", "ML"] },
        ],
        maxMembers: 5,
        leaderId: "m10",
        status: "open",
        competition: "Design Wars"
    },
    {
        id: "team-5",
        name: "SmartHome Architects",
        description: "Building an integrated IoT home automation system with voice control and energy optimization.",
        project: "Voice-Controlled Smart Home Hub",
        categories: ["IoT", "Hardware", "AI"],
        requiredSkills: ["Arduino", "Raspberry Pi", "Python", "Voice Recognition"],
        members: [
            { id: "m12", name: "James Wilson", avatar: "", role: "leader", skills: ["Arduino", "IoT"] },
            { id: "m13", name: "Olivia Brown", avatar: "", role: "member", skills: ["Python"] },
            { id: "m14", name: "Ethan Garcia", avatar: "", role: "member", skills: ["Raspberry Pi"] },
        ],
        maxMembers: 4,
        leaderId: "m12",
        status: "invite-only",
        competition: "IoT Smart City Challenge"
    },
    {
        id: "team-6",
        name: "EduTech Wizards",
        description: "Creating an interactive e-learning platform with gamification and adaptive learning algorithms.",
        project: "Gamified Learning Platform",
        categories: ["Web Dev", "AI", "Design"],
        requiredSkills: ["React", "Node.js", "MongoDB", "UI/UX Design"],
        members: [
            { id: "m15", name: "Isabella Martinez", avatar: "", role: "leader", skills: ["React", "Node"] },
        ],
        maxMembers: 6,
        leaderId: "m15",
        status: "open",
        competition: "Web Wiz 2026"
    },
];
