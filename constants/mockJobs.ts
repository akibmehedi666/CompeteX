
export interface JobPost {
    id: string;
    title: string;
    company: string;
    type: "Internship" | "Full-time" | "Contract";
    location: string;
    salary: string;
    description: string;
    requirements: string[];
    postedAt: string;
    applicants: number;
}

export const MOCK_JOBS: JobPost[] = [
    {
        id: "j1",
        title: "Frontend Developer Intern",
        company: "TechGiant Corp",
        type: "Internship",
        location: "Remote",
        salary: "$25 - $35 / hr",
        description: "Join our core product team to build the next generation of web interfaces. You will work closely with designers and senior engineers.",
        requirements: ["React", "TypeScript", "Tailwind CSS", "Git"],
        postedAt: "2 days ago",
        applicants: 45
    },
    {
        id: "j2",
        title: "Junior Backend Engineer",
        company: "CloudSystems",
        type: "Full-time",
        location: "New York, NY",
        salary: "$90k - $120k",
        description: "We are looking for a backend engineer to help scale our microservices architecture.",
        requirements: ["Node.js", "PostgreSQL", "Docker", "AWS"],
        postedAt: "1 week ago",
        applicants: 120
    },
    {
        id: "j3",
        title: "UI/UX Designer",
        company: "Creative Studios",
        type: "Contract",
        location: "London, UK",
        salary: "$50 - $80 / hr",
        description: "Design intuitive and beautiful user experiences for our fintech clients.",
        requirements: ["Figma", "Prototyping", "User Research"],
        postedAt: "3 days ago",
        applicants: 28
    },
    {
        id: "j4",
        title: "AI Research Intern",
        company: "DeepMind",
        type: "Internship",
        location: "London, UK",
        salary: "Competitive",
        description: "Work on cutting-edge reinforcement learning algorithms.",
        requirements: ["Python", "PyTorch", "Mathematics", "Machine Learning"],
        postedAt: "1 day ago",
        applicants: 200
    }
];
