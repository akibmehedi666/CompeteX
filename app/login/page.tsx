"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { Navbar } from "@/components/ui/Navbar";
import { getDashboardRoute, normalizeRole } from "@/lib/auth";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const login = useStore(state => state.login);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Check LocalStorage
        const storedUser = localStorage.getItem("competex_user_session");

        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                if (user.email === email && user.password === password) {
                    // Success - normalize role and redirect to appropriate dashboard
                    const normalizedRole = normalizeRole(user.role || "Participant");
                    login(email);
                    router.push(getDashboardRoute(normalizedRole));
                    return;
                }
            } catch (e) {
                console.error("Error parsing stored user:", e);
            }
        }

        // Fallback / Error
        alert("Invalid credentials or no account found. Please Sign Up.");
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
            <Navbar />
            <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-md">
                <h1 className="text-3xl font-bold text-white mb-2 text-center">Welcome Back</h1>
                <p className="text-gray-400 text-center mb-8">Login to your CompeteX account</p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-black/50 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-accent1 transition-colors"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-black/50 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-accent1 transition-colors"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-accent1 text-black font-bold uppercase tracking-widest rounded-md hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    Don't have an account?{" "}
                    <button onClick={() => router.push('/signup')} className="text-accent1 hover:underline">
                        Sign Up
                    </button>
                </div>
                <div className="mt-8 pt-8 border-t border-white/10">
                    <p className="text-gray-500 text-xs uppercase tracking-widest text-center mb-4">Development Access</p>
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { label: "Student", email: "akib@example.com", color: "bg-blue-500/20 text-blue-400" },
                            { label: "Sponsor", email: "sadia@grameenphone.com", color: "bg-purple-500/20 text-purple-400" },
                            { label: "Organizer", email: "hasan@uiu.ac.bd", color: "bg-green-500/20 text-green-400" },
                            { label: "Recruiter", email: "recruiter@brainstation23.com", color: "bg-pink-500/20 text-pink-400" },
                        ].map((role) => (
                            <button
                                key={role.label}
                                onClick={() => {
                                    login(role.email);
                                    // Get user from localStorage to determine role
                                    const stored = localStorage.getItem("competex_user_session");
                                    if (stored) {
                                        try {
                                            const user = JSON.parse(stored);
                                            const normalizedRole = normalizeRole(user.role || "Participant");
                                            router.push(getDashboardRoute(normalizedRole));
                                        } catch (e) {
                                            router.push("/dashboard");
                                        }
                                    } else {
                                        router.push("/dashboard");
                                    }
                                }}
                                className={`p-2 rounded text-xs font-bold border border-transparent hover:border-white/20 transition-all ${role.color}`}
                            >
                                {role.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
