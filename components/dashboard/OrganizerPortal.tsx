import { Plus, Users, Calendar, TrendingUp } from "lucide-react";
import { RegistrationVelocityChart } from "@/components/dashboard/RegistrationVelocityChart";

const DATA = [
    { name: 'Day 1', signups: 40 },
    { name: 'Day 2', signups: 75 },
    { name: 'Day 3', signups: 120 },
    { name: 'Day 4', signups: 90 },
    { name: 'Day 5', signups: 150 },
];

export function OrganizerPortal() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="col-span-1 border border-dashed border-accent1/50 bg-accent1/5 rounded-xl flex flex-col items-center justify-center p-8 hover:bg-accent1/10 transition-colors group">
                    <div className="w-12 h-12 rounded-full bg-accent1 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Plus className="w-6 h-6 text-black" />
                    </div>
                    <span className="font-bold text-white">Publish New Event</span>
                </button>

                <div className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Registration Velocity</h3>
                    <div className="h-[200px] w-full bg-black/20 rounded border border-white/5 pt-4 pr-4">
                        <RegistrationVelocityChart />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="font-bold text-white mb-4">Active Events</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-12 bg-accent1 rounded-full" />
                                <div>
                                    <div className="font-bold text-white">CyberHack 2025</div>
                                    <div className="text-xs text-gray-400">Ends in 2 days</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-xl font-bold text-white">1,240</div>
                                <div className="text-[10px] text-gray-500 uppercase">Participants</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
