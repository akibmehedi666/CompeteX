"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { RegistrationSchema, RegistrationData } from "@/types/auth";
import { Check, ChevronRight, ChevronLeft, Loader2, User, LayoutDashboard, Building2, Handshake, Briefcase, Lock, Mail, Heading, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { normalizeRole, getDashboardRoute } from "@/lib/auth";
import { UserRole } from "@/types";
import Link from "next/link";

const ROLES = [
    { id: "participant", label: "Participant", icon: User, desc: "Join hackathons & compete" },
    { id: "organizer", label: "Organizer", icon: LayoutDashboard, desc: "Host events & manage teams" },
    { id: "sponsor", label: "Sponsor", icon: Handshake, desc: "Connect with talent & brands" },
    { id: "recruiter", label: "Recruiter", icon: Briefcase, desc: "Find top tech talent" },
    { id: "mentor", label: "Mentor", icon: GraduationCap, desc: "Share knowledge & guide others" },
] as const;

export function SignupForm() {
    const [step, setStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const form = useForm<RegistrationData>({
        resolver: zodResolver(RegistrationSchema),
        defaultValues: {
            role: "participant", // Default to avoid type issues before selection
            skills: [],
        } as any,
        mode: "onChange"
    });

    const { register, watch, setValue, trigger, formState: { errors, isValid } } = form;
    const role = watch("role");
    const password = watch("password");

    // Step Navigation Logic
    const nextStep = async () => {
        let valid = false;
        if (step === 0) {
            if (role) valid = true; // Role must be selected
        } else if (step === 1) {
            valid = await trigger(["fullName", "email", "password", "confirmPassword"]);
        } else {
            valid = await trigger(); // Final validation
        }

        if (valid) setStep(s => s + 1);
    };

    const prevStep = () => setStep(s => s - 1);

    const onSubmit = async (data: RegistrationData) => {
        console.log("Submitting Data:", data);
        setIsSubmitting(true);

        // Normalize role to match UserRole type (capitalized)
        const normalizedRole = normalizeRole(data.role);

        // Create user object matching User type
        const userData = {
            id: `u${Date.now()}`,
            name: data.fullName,
            email: data.email,
            role: normalizedRole as UserRole,
            university: data.role === "organizer" ? (data as any).organizationName : undefined,
            skills: data.role === "participant" ? (data as any).skills || [] : [],
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + data.fullName,
            stats: normalizedRole === "Participant" ? { rank: 42, points: 1250, eventsWon: 3 } : undefined,
            password: data.password, // Store password for login verification
        };

        // Persist to LocalStorage
        localStorage.setItem("competex_user_session", JSON.stringify(userData));

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        router.push(getDashboardRoute(normalizedRole));
    };

    const onErrors = (errors: any) => {
        console.error("Validation Errors:", errors);
        alert("Please fix the errors before submitting.");
    };

    // Password Strength Logic
    const getPasswordStrength = (pass: string) => {
        if (!pass) return 0;
        let score = 0;
        if (pass.length > 7) score += 1;
        if (/[A-Z]/.test(pass)) score += 1;
        if (/[0-9]/.test(pass)) score += 1;
        if (/[^A-Za-z0-9]/.test(pass)) score += 1;
        return score; // 0-4
    };
    const strength = getPasswordStrength(password || "");

    return (
        <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
            {/* Overlay for Submission */}
            <AnimatePresence>
                {isSubmitting && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center font-outfit"
                    >
                        <Loader2 className="w-16 h-16 text-accent1 animate-spin mb-6" />
                        <h2 className="text-3xl font-bold text-white mb-2">Configuring your Experience...</h2>
                        <p className="text-gray-400">Setting up your {role} dashboard</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Progress Bar */}
            <div className="flex items-center justify-center mb-12 gap-2">
                {[0, 1, 2].map(s => (
                    <div key={s} className={cn("h-1 w-16 rounded-full transition-colors duration-500", step >= s ? "bg-accent1" : "bg-white/10")} />
                ))}
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                {/* STEP 0: Role Selection */}
                {step === 0 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <div className="text-center mb-10">
                            <h1 className="text-4xl font-bold text-white mb-4">Choose your <span className="text-accent1">Path</span></h1>
                            <p className="text-gray-400">Select how you want to interact with the platform.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {ROLES.map((r) => (
                                <div
                                    key={r.id}
                                    onClick={() => r.id === 'mentor' ? router.push('/mentors/signup') : setValue("role", r.id as any)}
                                    className={cn(
                                        "cursor-pointer relative p-6 rounded-xl border transition-all duration-300 flex flex-col items-center text-center gap-4 group",
                                        role === r.id
                                            ? "bg-accent1/10 border-accent1 shadow-[0_0_20px_rgba(0,229,255,0.3)]"
                                            : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10"
                                    )}
                                >
                                    <AnimatePresence>
                                        {role === r.id && (
                                            <motion.div
                                                layoutId="role-check"
                                                className="absolute top-2 right-2 p-1 bg-accent1 rounded-full text-black"
                                            >
                                                <Check className="w-3 h-3" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <div className={cn("p-4 rounded-full bg-black/50 group-hover:scale-110 transition-transform", role === r.id ? "text-accent1" : "text-gray-400")}>
                                        <r.icon className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-white mb-1">{r.label}</div>
                                        <div className="text-[10px] text-gray-500 leading-tight">{r.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>


                    </motion.div>
                )}

                {/* STEP 1: Basic Info */}
                {
                    step === 1 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 max-w-md mx-auto">
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold text-white">Basic Information</h2>
                                <p className="text-sm text-gray-400">Lets get your account set up.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Full Name</label>
                                    <div className="relative">
                                        <input
                                            {...register("fullName")}
                                            className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 pl-10 text-white focus:border-accent1 focus:outline-none transition-colors"
                                            placeholder="John Doe"
                                        />
                                        <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                                    </div>
                                    {errors.fullName && <p className="text-red-500 text-xs">{String(errors.fullName.message)}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Email Address</label>
                                    <div className="relative">
                                        <input
                                            {...register("email")}
                                            type="email"
                                            className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 pl-10 text-white focus:border-accent1 focus:outline-none transition-colors"
                                            placeholder="john@example.com"
                                        />
                                        <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-xs">{String(errors.email.message)}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Password</label>
                                    <div className="relative">
                                        <input
                                            {...register("password")}
                                            type="password"
                                            className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 pl-10 text-white focus:border-accent1 focus:outline-none transition-colors"
                                            placeholder="••••••••"
                                        />
                                        <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                                    </div>
                                    {/* Password Strength Meter */}
                                    <div className="flex gap-1 h-1 mt-2">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className={cn("flex-1 rounded-full transition-colors", strength >= i ? (strength === 4 ? "bg-accent2" : "bg-yellow-400") : "bg-white/5")} />
                                        ))}
                                    </div>
                                    {errors.password && <p className="text-red-500 text-xs">{String(errors.password.message)}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Confirm Password</label>
                                    <input
                                        {...register("confirmPassword")}
                                        type="password"
                                        className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-accent1 focus:outline-none transition-colors"
                                        placeholder="••••••••"
                                    />
                                    {(errors as any).confirmPassword && <p className="text-red-500 text-xs">{String((errors as any).confirmPassword.message)}</p>}
                                </div>
                            </div>
                        </motion.div>
                    )
                }

                {/* STEP 2: Role Details */}
                {
                    step === 2 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 max-w-md mx-auto">
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold text-white capitalize">{role} Details</h2>
                                <p className="text-sm text-gray-400">Tell us more about your background.</p>
                            </div>

                            {/* Participant Fields */}
                            {role === "participant" && (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase">Skills (Comma sep)</label>
                                        <input
                                            placeholder="React, Python, Design..."
                                            className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-accent1 focus:outline-none"
                                            onChange={(e) => setValue("skills", e.target.value.split(',').map(s => s.trim()))}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase">GitHub URL</label>
                                        <input
                                            {...register("githubUrl")}
                                            className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-accent1 focus:outline-none"
                                            placeholder="https://github.com/..."
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Organizer Fields */}
                            {role === "organizer" && (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase">Organization Name</label>
                                        <input
                                            {...register("organizationName")}
                                            className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-accent1 focus:outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase">Website</label>
                                        <input
                                            {...register("website")}
                                            className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 text-white focus:border-accent1 focus:outline-none"
                                        />
                                    </div>
                                    <div className="flex items-center gap-3 p-4 border border-white/10 rounded-lg bg-white/5">
                                        <input
                                            type="checkbox"
                                            id="isInstitution"
                                            {...register("isInstitution")}
                                            className="w-5 h-5 rounded border-gray-600 text-accent1 focus:ring-accent1 bg-black"
                                        />
                                        <label htmlFor="isInstitution" className="text-sm text-gray-300">
                                            Is this an Official Institution / University?
                                        </label>
                                    </div>
                                </div>
                            )}

                            {/* Add other role fields similarly... just placeholder for brevity as per prompt specific examples */}
                            {(role === "sponsor" || role === "recruiter") && (
                                <div className="p-4 border border-dashed border-white/20 rounded text-center text-gray-500 text-sm">
                                    Additional fields for {role} would go here.
                                    <br /> (Simulated for Prototype)
                                </div>
                            )}
                        </motion.div>
                    )
                }

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-8 border-t border-white/5 max-w-md mx-auto">
                    <button
                        type="button"
                        onClick={prevStep}
                        disabled={step === 0}
                        className={cn("flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all", step === 0 ? "opacity-0 pointer-events-none" : "text-gray-400 hover:text-white hover:bg-white/5")}
                    >
                        <ChevronLeft className="w-4 h-4" /> Back
                    </button>

                    {step < 2 ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            className="flex items-center gap-2 px-8 py-3 bg-white text-black font-bold uppercase tracking-widest rounded-lg hover:scale-105 transition-transform"
                        >
                            Next <ChevronRight className="w-4 h-4" />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-8 py-3 bg-accent1 text-black font-bold uppercase tracking-widest rounded-lg shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] hover:scale-105 transition-all"
                        >
                            Complete Setup
                        </button>
                    )}
                </div>

            </form >
        </div >
    );
}
