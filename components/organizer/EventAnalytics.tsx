"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from "recharts";
import { Users, TrendingUp, Calendar, ArrowUpRight, ArrowDownRight, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const DAILY_STATS = [
    { name: 'Mon', signups: 12, views: 140 },
    { name: 'Tue', signups: 18, views: 220 },
    { name: 'Wed', signups: 15, views: 180 },
    { name: 'Thu', signups: 25, views: 300 },
    { name: 'Fri', signups: 32, views: 350 },
    { name: 'Sat', signups: 45, views: 450 },
    { name: 'Sun', signups: 38, views: 400 },
];

const CATEGORY_STATS = [
    { name: "Students", value: 65, color: "#ADFF00" },
    { name: "Professionals", value: 25, color: "#00E5FF" },
    { name: "Others", value: 10, color: "#B026FF" },
];

export function EventAnalytics() {
    return (
        <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <KPICard
                    label="Total Registrations"
                    value="1,248"
                    change="+12.5%"
                    trend="up"
                    icon={Users}
                />
                <KPICard
                    label="Page Views"
                    value="15.4k"
                    change="+24.2%"
                    trend="up"
                    icon={TrendingUp}
                />
                <KPICard
                    label="Conversion Rate"
                    value="8.1%"
                    change="-1.2%"
                    trend="down"
                    icon={Award}
                />
                <KPICard
                    label="Days Remaining"
                    value="14"
                    subtext="Until Registration Closes"
                    icon={Calendar}
                />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Main Velocity Chart */}
                <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-white">Registration Velocity</h3>
                        <select className="bg-black/30 border border-white/10 rounded-lg px-3 py-1 text-xs text-gray-400 focus:outline-none">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={DAILY_STATS}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="#525252"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#525252"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value}`}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#171717", borderColor: "#333", borderRadius: "8px", color: "#fff" }}
                                    itemStyle={{ color: "#ccc" }}
                                    cursor={{ stroke: "#ffffff20" }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="signups"
                                    stroke="#ADFF00"
                                    strokeWidth={3}
                                    dot={{ fill: "#ADFF00", r: 4, strokeWidth: 0 }}
                                    activeDot={{ r: 6, strokeWidth: 0 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="views"
                                    stroke="#00E5FF"
                                    strokeWidth={3}
                                    strokeOpacity={0.5}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Demographics / Pie Like */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="font-bold text-white mb-6">Demographics</h3>
                    <div className="space-y-6">
                        {CATEGORY_STATS.map((item) => (
                            <div key={item.name}>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-400">{item.name}</span>
                                    <span className="text-white font-bold">{item.value}%</span>
                                </div>
                                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-1000"
                                        style={{ width: `${item.value}%`, backgroundColor: item.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/10">
                        <div className="flex gap-4">
                            <div className="flex-1 text-center">
                                <div className="text-2xl font-bold text-white">45</div>
                                <div className="text-xs text-gray-500 uppercase mt-1">Institutions</div>
                            </div>
                            <div className="w-px bg-white/10" />
                            <div className="flex-1 text-center">
                                <div className="text-2xl font-bold text-white">12</div>
                                <div className="text-xs text-gray-500 uppercase mt-1">Countries</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function KPICard({ label, value, change, trend, subtext, icon: Icon }: any) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white/5 rounded-lg text-gray-400">
                    <Icon className="w-5 h-5" />
                </div>
                {change && (
                    <div className={cn(
                        "flex items-center text-xs font-bold px-2 py-1 rounded-full",
                        trend === "up" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                    )}>
                        {trend === "up" ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                        {change}
                    </div>
                )}
            </div>
            <div>
                <div className="text-2xl font-bold text-white mb-1 font-mono">{value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">{label}</div>
                {subtext && <div className="text-xs text-gray-600 mt-1">{subtext}</div>}
            </div>
        </div>
    );
}
