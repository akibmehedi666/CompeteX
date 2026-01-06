import { OrganizerPortal } from "@/components/OrganizerPortal";
import { Navbar } from "@/components/Navbar";

export default function OrganizerDashboardPage() {
    return (
        <div className="min-h-screen bg-black">
            <Navbar />
            <div className="pt-24 pb-12">
                <OrganizerPortal />
            </div>
        </div>
    );
}
