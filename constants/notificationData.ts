export interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
    type: 'info' | 'success' | 'warning' | 'alert';
}

export const NOTIFICATIONS: Notification[] = [
    {
        id: '1',
        title: "Team Invite Accepted",
        message: "Sarah Jena accepted your invitation to join Team 'Pixel Pioneers'.",
        time: "2 mins ago",
        read: false,
        type: 'success'
    },
    {
        id: '2',
        title: "New Hackathon Alert",
        message: "Registration for 'Global AI Challenge 2026' is now open! Early bird slots available.",
        time: "1 hour ago",
        read: false,
        type: 'info'
    },
    {
        id: '3',
        title: "Profile Review",
        message: "Your profile was viewed by 3 recruiters from top tech companies this week.",
        time: "5 hours ago",
        read: true,
        type: 'info'
    },
    {
        id: '4',
        title: "System Maintenance",
        message: "Scheduled maintenance on Sat, Jan 20th from 2:00 AM to 4:00 AM UTC.",
        time: "1 day ago",
        read: true,
        type: 'warning'
    },
    {
        id: '5',
        title: "Submission Reminder",
        message: "Deadline for 'Design Wars' project submission is in 24 hours.",
        time: "1 day ago",
        read: true,
        type: 'alert'
    }
];
