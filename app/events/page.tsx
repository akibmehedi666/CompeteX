import { BentoGrid } from "@/components/BentoGrid";
import { Navbar } from "@/components/Navbar";

export default function EventsPage() {
    return (
        <div className="min-h-screen bg-black">
            <Navbar />
            <div className="pt-24 pb-12">
                <BentoGrid />
            </div>
        </div>
    );
}
