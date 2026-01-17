"use client";

import { useState } from "react";
import { Save, Upload, Building2, Globe, Mail, Phone, MapPin, Plus, X } from "lucide-react";
import { MOCK_SPONSOR } from "@/components/sponsors/SponsorProfile";

export function SponsorProfileEditor() {
    const [profile, setProfile] = useState(MOCK_SPONSOR);
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            // Show toast or success message (omitted for brevity)
        }, 1000);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
                    <p className="text-gray-400">Manage your public appearance and company details.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-2 bg-accent1 text-black font-bold rounded-lg hover:bg-white transition-colors disabled:opacity-50"
                >
                    <Save className="w-4 h-4" />
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Logo & Basic Info */}
                <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h3 className="font-bold text-white mb-4">Company Logo</h3>
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-32 h-32 bg-black/40 rounded-xl border border-white/10 p-2">
                                <img src={profile.logo} alt="Logo" className="w-full h-full object-cover rounded-lg" />
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm font-medium">
                                <Upload className="w-4 h-4" /> Upload New Logo
                            </button>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                        <h3 className="font-bold text-white mb-2">Contact Information</h3>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Website</label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    value={profile.website}
                                    onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:border-accent1 outline-none transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                                <input
                                    type="email"
                                    value={profile.email}
                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:border-accent1 outline-none transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    value={profile.phone || ""}
                                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:border-accent1 outline-none transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    value={profile.location}
                                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:border-accent1 outline-none transition-colors"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Company Details & Preferences */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                        <h3 className="font-bold text-white mb-2">Company Details</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Company Name</label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                                    <input
                                        type="text"
                                        value={profile.companyName}
                                        onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:border-accent1 outline-none transition-colors"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Industry</label>
                                <input
                                    type="text"
                                    value={profile.industry}
                                    onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent1 outline-none transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                            <textarea
                                value={profile.description}
                                onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                                rows={4}
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-accent1 outline-none transition-colors resize-none"
                            />
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
                        <h3 className="font-bold text-white">Sponsorship Preferences</h3>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Categories</label>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {profile.sponsorshipCategories.map((cat, i) => (
                                    <span key={i} className="flex items-center gap-1 bg-accent1/10 text-accent1 px-3 py-1 rounded-full border border-accent1/20 text-sm">
                                        {cat}
                                        <button onClick={() => {
                                            const newCats = [...profile.sponsorshipCategories];
                                            newCats.splice(i, 1);
                                            setProfile({ ...profile, sponsorshipCategories: newCats });
                                        }}>
                                            <X className="w-3 h-3 hover:text-white" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Add category..."
                                    className="bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:border-accent1 outline-none w-full max-w-xs"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            const val = e.currentTarget.value.trim();
                                            if (val && !profile.sponsorshipCategories.includes(val)) {
                                                setProfile({ ...profile, sponsorshipCategories: [...profile.sponsorshipCategories, val] });
                                                e.currentTarget.value = "";
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Target Audience</label>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {profile.preferences.targetAudience.map((target, i) => (
                                    <span key={i} className="flex items-center gap-1 bg-white/10 text-gray-300 px-3 py-1 rounded-full border border-white/10 text-sm">
                                        {target}
                                        <button onClick={() => {
                                            const newTargets = [...profile.preferences.targetAudience];
                                            newTargets.splice(i, 1);
                                            setProfile({ ...profile, preferences: { ...profile.preferences, targetAudience: newTargets } });
                                        }}>
                                            <X className="w-3 h-3 hover:text-white" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Add audience type..."
                                    className="bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:border-accent1 outline-none w-full max-w-xs"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            const val = e.currentTarget.value.trim();
                                            if (val && !profile.preferences.targetAudience.includes(val)) {
                                                setProfile({
                                                    ...profile,
                                                    preferences: {
                                                        ...profile.preferences,
                                                        targetAudience: [...profile.preferences.targetAudience, val]
                                                    }
                                                });
                                                e.currentTarget.value = "";
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
