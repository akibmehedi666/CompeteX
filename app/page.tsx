import { Hero } from "@/components/ui/Hero";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />

      {/* Footer Placeholder */}
      <footer className="fixed bottom-0 w-full py-6 border-t border-white/10 text-center text-gray-500 text-xs bg-black/80 backdrop-blur-md">
        <p>© 2025 CompeteX. The Future of Competition.</p>
      </footer>
    </div>
  );
}
