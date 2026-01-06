"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { ResourceUploadModal } from "@/components/resources/ResourceUploadModal";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Download, FileText, Image as ImageIcon, Archive, Plus, User, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Resource {
    id: string;
    name: string;
    category: string;
    description: string;
    fileUrl: string;
    fileType: string;
    fileName: string;
    fileSize: string;
    uploaderName: string;
    date: string;
    downloads: number;
}

const DUMMY_RESOURCES: Resource[] = [
    {
        id: "r1",
        name: "Hackathon Survival Guide 2026",
        category: "Guide",
        description: "Everything you need to know about surviving a 48-hour coding sprint. Tips on sleep, nutrition, and team management.",
        fileUrl: "#", // Dummy
        fileType: "application/pdf",
        fileName: "survival_guide.pdf",
        fileSize: "2.4 MB",
        uploaderName: "Admin",
        date: "Jan 1, 2026",
        downloads: 124
    },
    {
        id: "r2",
        name: "Pitch Deck Template",
        category: "Template",
        description: "A proven slide deck structure for presenting your project to judges. Includes key sections and design tips.",
        fileUrl: "#",
        fileType: "application/zip",
        fileName: "pitch_deck_v2.zip",
        fileSize: "5.1 MB",
        uploaderName: "Sarah J.",
        date: "Dec 28, 2025",
        downloads: 89
    },
    {
        id: "r3",
        name: "Official Competition Rules",
        category: "Rules",
        description: "The complete rulebook for the 2026 season. Read carefully to avoid disqualification.",
        fileUrl: "#",
        fileType: "application/pdf",
        fileName: "rules_2026_official.pdf",
        fileSize: "1.2 MB",
        uploaderName: "CompeteX HQ",
        date: "Dec 15, 2025",
        downloads: 450
    }
];

export default function ResourcesPage() {
    const [resources, setResources] = useState<Resource[]>([]);
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        // Load from LS
        const stored = localStorage.getItem("competex_resources");
        if (stored) {
            setResources(JSON.parse(stored));
        } else {
            // Init with dummy
            localStorage.setItem("competex_resources", JSON.stringify(DUMMY_RESOURCES));
            setResources(DUMMY_RESOURCES);
        }
    }, []);

    const handleUpload = (newResource: Resource) => {
        const updated = [newResource, ...resources];
        setResources(updated);
        localStorage.setItem("competex_resources", JSON.stringify(updated));
        setIsUploadOpen(false);
    };

    const handleDownload = (resource: Resource) => {
        // Create a link and trigger download
        const link = document.createElement("a");
        link.href = resource.fileUrl;
        link.download = resource.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getIcon = (type: string) => {
        if (type.includes("pdf")) return <FileText className="w-5 h-5 text-red-400" />;
        if (type.includes("zip") || type.includes("compressed")) return <Archive className="w-5 h-5 text-yellow-400" />;
        if (type.includes("image")) return <ImageIcon className="w-5 h-5 text-blue-400" />;
        return <FileText className="w-5 h-5 text-gray-400" />;
    };

    const filteredResources = resources.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-black selection:bg-accent1/30">
            <Navbar />

            <ResourceUploadModal
                isOpen={isUploadOpen}
                onClose={() => setIsUploadOpen(false)}
                onUpload={handleUpload}
            />

            <div className="pt-24 pb-12 max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Community <span className="text-accent2">Resources</span></h1>
                        <p className="text-gray-400 max-w-xl">
                            Share and discover tools, guides, and assets to level up your game.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <input
                                type="text"
                                placeholder="Search resources..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-10 pr-4 text-white text-sm focus:border-accent2 focus:outline-none transition-colors"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        </div>
                        <button
                            onClick={() => setIsUploadOpen(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-accent1 text-black font-bold rounded-full hover:bg-white transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)]"
                        >
                            <Plus className="w-5 h-5" /> Share Resource
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredResources.map((resource) => (
                            <motion.div
                                key={resource.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-accent2/30 transition-all hover:bg-white/10 flex flex-col"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors">
                                        {getIcon(resource.fileType)}
                                    </div>
                                    <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/5 text-gray-400 rounded-md border border-white/5">
                                        {resource.category}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1" title={resource.name}>{resource.name}</h3>
                                <p className="text-sm text-gray-400 mb-6 line-clamp-2 min-h-[40px]">{resource.description}</p>

                                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <User className="w-3 h-3" /> {resource.uploaderName}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <Clock className="w-3 h-3" /> {resource.date}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleDownload(resource)}
                                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-bold uppercase tracking-wider border border-white/10 hover:border-accent2/50 transition-all"
                                    >
                                        <Download className="w-4 h-4" /> Download
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredResources.length === 0 && (
                    <div className="text-center py-24 border border-dashed border-white/10 rounded-3xl">
                        <FolderOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-white font-bold text-lg mb-2">No resources found</h3>
                        <p className="text-gray-500">Try adjusting your search or upload a new resource.</p>
                    </div>
                )}

            </div>
        </div>
    );
}

// Icon for empty state
function FolderOpen({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2" />
        </svg>
    )
}

