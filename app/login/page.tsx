"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { Navbar } from "@/components/Navbar";

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
            const user = JSON.parse(storedUser);
            if (user.email === email && user.password === password) {
                // Success
                login(email); // Update global store (though store just takes email currently, we might want to pass full user later)
                // For now, let's update store to actually use this user data if possible, or just rely on localStorage for Profile page
                router.push("/profile"); // Go to Profile instead of Dashboard for consistency with Signup flow
                return;
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
            </div>
        </div>
    );
}
