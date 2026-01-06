import { OrganizerPortal } from "@/components/dashboard/OrganizerPortal";
import { Navbar } from "@/components/ui/Navbar";

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
