export type UserRole = "Participant" | "Organizer" | "Sponsor" | "Recruiter" | "Admin";
export type EventMode = "Offline" | "Online";
export type EventStatus = "Upcoming" | "Live" | "Ended";
export type ProfileVisibility = "public" | "recruiters-only" | "private";
export type CertificateStatus = "pending" | "issued" | "revoked";
export type SponsorshipStatus = "pending" | "approved" | "rejected" | "active" | "completed";
export type ApplicationStatus = "draft" | "submitted" | "under-review" | "accepted" | "rejected";
export type JobType = "full-time" | "part-time" | "internship" | "contract";
export type ShortlistStatus = "interested" | "contacted" | "interviewing" | "offered" | "hired" | "rejected";

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
    profileVisibility?: ProfileVisibility;
    achievements?: Achievement[];
    competitionHistory?: CompetitionEntry[];
    verified?: boolean;
    institution?: Institution;
    bio?: string;
    github?: string;
    linkedin?: string;
    portfolio?: string;
}

export interface Event {
    id: string;
    title: string;
    organizer: string;
    organizerId?: string;
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
    prizes?: string[];
    rules?: string;
    schedule?: string;
    hasOnlineJudge?: boolean;
    registrationDeadline?: string;
    teamSize?: { min: number; max: number };
    difficulty?: "Beginner" | "Intermediate" | "Advanced";
    tags?: string[];
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
    verified?: boolean;
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

export interface Achievement {
    id: string;
    eventId: string;
    eventTitle: string;
    title: string;
    description: string;
    earnedDate: string;
    certificateUrl?: string;
    badge?: string;
    type: "winner" | "runner-up" | "participant" | "special";
}

export interface CompetitionEntry {
    id: string;
    eventId: string;
    eventTitle: string;
    rank: number;
    score: number;
    date: string;
    category: string;
    teamName?: string;
    participantsCount: number;
}

export interface SponsorshipOpportunity {
    id: string;
    sponsorId: string;
    sponsorName: string;
    title: string;
    budget: string;
    budgetAmount?: number;
    category: string[];
    description: string;
    requirements: string[];
    minReach: number;
    focus: string;
    industry: string;
    status: SponsorshipStatus;
    createdAt: string;
    logo?: any;
    deliverables?: string[];
    duration?: string;
}

export interface SponsorshipApplication {
    id: string;
    eventId: string;
    eventTitle: string;
    sponsorshipId: string;
    organizerId: string;
    organizerName: string;
    status: ApplicationStatus;
    proposedValue: string;
    message: string;
    createdAt: string;
    updatedAt?: string;
    expectedReach?: number;
    eventMetrics?: {
        previousAttendance?: number;
        socialMediaReach?: number;
        mediaPartners?: string[];
    };
}

export interface JobPosting {
    id: string;
    recruiterId: string;
    recruiterName: string;
    companyName: string;
    title: string;
    description: string;
    requirements: string[];
    skills: string[];
    location: string;
    type: JobType;
    salary?: string;
    postedAt: string;
    deadline?: string;
    applicationsCount?: number;
}

export interface Shortlist {
    id: string;
    recruiterId: string;
    candidateId: string;
    candidateName: string;
    jobId?: string;
    jobTitle?: string;
    notes: string;
    status: ShortlistStatus;
    addedAt: string;
    lastContact?: string;
    rating?: number;
}

export interface EventRegistration {
    id: string;
    eventId: string;
    userId: string;
    user?: User; // Populated
    teamId?: string;
    teamName?: string; // Populated
    status: "pending" | "confirmed" | "rejected" | "waitlisted" | "checked-in" | "approved";
    registeredAt: string;
    paymentStatus?: "pending" | "completed" | "failed";
}

export interface Announcement {
    id: string;
    eventId: string;
    organizerId: string;
    title: string;
    content: string;
    priority: "low" | "medium" | "high" | "urgent";
    createdAt: string;
    targetAudience: "all" | "participants" | "sponsors" | "team-leaders";
}
