"use client";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useState, useEffect } from "react";

const levels = [
    { level: 1, name: "Gatekeeper", icon: "🚪", unlocked: true },
    { level: 2, name: "Librarian", icon: "📚", unlocked: false },
    { level: 3, name: "Translator's Cave", icon: "🗺️", unlocked: false },
    { level: 4, name: "Teacher's Challenge", icon: "🎓", unlocked: false },
    { level: 5, name: "Creative Prompt Crafter", icon: "🎨", unlocked: false },
    { level: 6, name: "Multi-Step Prompt Master", icon: "⚡", unlocked: false },
    { level: 7, name: "IoT Collaboration Challenge", icon: "🔗", unlocked: false },
    { level: 8, name: "Music Remix Challenge", icon: "🎵", unlocked: false },
    { level: 9, name: "Puzzle Prompt Challenge", icon: "🧩", unlocked: false },
    { level: 10, name: "Ultimate Combo Challenge", icon: "🏆", unlocked: false },
    { level: "Boss", name: "Smart Kitchen Showdown", icon: "🔥", unlocked: false, boss: true },
];

const LevelCard = ({ level, name, icon, unlocked, boss }) => {
    const cardContent = (
    <div
        className={`relative rounded-xl border p-6 flex flex-col items-center text-center gap-3 transition-all duration-300 ${boss
                ? unlocked
                    ? "border-red-500/50 bg-red-900/10 hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] cursor-pointer group"
                    : "border-gray-700 bg-gray-900/40 opacity-50 cursor-not-allowed"
                : unlocked
                    ? "border-emerald-400/40 bg-gray-900 hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer group"
                    : "border-gary-700 bg-gary-900/40 opacity-50 cursor-not-allowed"
            }`}
    >
        {/* Lock overlay */}
        {!unlocked && (
            <div className="absolute inset-0 rounded-xl flex items-center justify-center z-10">
                <span className="text-3xl">🔒</span>
            </div>
        )}

        {/* Level badge */}
        <span
            className={`font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full ${boss
                    ? "bg-red-900/20 text-red-500"
                    : unlocked
                        ? "bg-emerald-900/20 text-emerald-400"
                        : "bg-gray-800 text-gray-400"
                }`}
        >
            {boss ? "Boss Level" : `Level ${level}`}
        </span>

        {/* Icon */}
        <span className={`text-4xl ${!unlocked ? "blur-[2px]" : ""}`}>{icon}</span>

        {/* Name */}
        <h3
            className={`font-semibold text-sm leading-tight ${!unlocked 
                ? "blur-[1px] text-gray-400" 
                : "text-white group-hover:text-emerald-400 transition-colors"
                }`}
        >
            {name}
        </h3>

        {/* Status */}
        {unlocked ? (
            <span className="text-[11px] font-mono text-emerald-400 font-bold mt-1">▶ Start</span>
        ) : (
            <span className="text-[11px] font-mono text-gray-400 mt-1 blur-[1px]">Locked</span>
        )}
    </div>
);

    if (unlocked) {
        if (level === 1) {
            return <Link href="/Assessment">{cardContent}</Link>;
        }
        if (!boss) {
            return <Link href={`/Assessment${level}`}>{cardContent}</Link>;
        }
    }

    return cardContent;
};

const Challenges = () => {
    const [unlockedLevel, setUnlockedLevel] = useState(1);

    useEffect(() => {
        // Fetch unlocked level on mount
        const fetchUnlockedLevel = async () => {
            const token = localStorage.getItem("token");
            
            // Try to fetch from backend first
            if (token) {
                try {
                    // Decode token to get user ID
                    const base64Url = token.split('.')[1];
                    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    const decoded = JSON.parse(atob(base64));
                    const userId = decoded._id;
                    
                    // Fetch user progress from backend
                    const res = await fetch(`http://localhost:5000/user/progress/${userId}`);
                    if (res.ok) {
                        const data = await res.json();
                        const highest = data.highestUnlockedLevel || 1;
                        setUnlockedLevel(highest);
                        // Sync with localStorage
                        localStorage.setItem("highestUnlockedLevel", String(highest));
                        return;
                    }
                } catch (err) {
                    console.error("Failed to fetch progress from backend:", err);
                }
            }
            
            // Fallback to localStorage
            const highest = parseInt(localStorage.getItem("highestUnlockedLevel") || "1", 10);
            setUnlockedLevel(highest);
        };
        
        fetchUnlockedLevel();
        
        // Also refetch when page becomes visible (user returns from another page)
        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                fetchUnlockedLevel();
            }
        };
        
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, []);

    const maxLevelInt = Math.min(unlockedLevel, 11);

    return (
        <div className="min-h-screen bg-black">
            {/* Top bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-700 bg-black/80 backdrop-blur-xl">
                <div className="container px-20 flex h-14 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-7 w-7 bg-emerald-600 rounded-md bg-primary flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-xs font-mono">I</span>
                        </div>
                        <span className="font-semibold tracking-tight text-white">Ignite</span>
                    </Link>
                    <Link href="/user/profile">
                        <Button className="px-3 py-1 text-sm rounded-lg bg-transparent text-gray-300 hover:bg-bg-gray-800">Profile</Button>
                    </Link>
                </div>
            </nav>

            <main className="container pt-28 pb-20">
                {/* Header */}
                <div className="text-center mb-14">
                    <span className="font-mono text-[13px] tracking-[0.25em] uppercase text-emerald-400 mb-3 block">
                        Challenge Arena
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">
                        Master the Art of Prompting
                    </h1>
                    <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
                        Complete each challenge to unlock the next. Conquer all levels to face the Boss.
                    </p>
                </div>

                {/* Progress bar */}
                <div className="max-w-md mx-auto mb-14">
                    <div className="flex justify-between text-xs font-mono text-emerald-400 mb-2">
                        <span>Progress</span>
                        <span>{maxLevelInt} / 11</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.6)] transition-all duration-500"
                            style={{ width: `${(maxLevelInt / 11) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">

                {levels.filter((l) => !l.boss).map((l) => (
                    <LevelCard key={l.level} {...l} unlocked={l.level <= unlockedLevel} />
                ))}
            </div>

            {/* Boss card */}
            <div className="max-w-sm mx-auto mt-14">
                {levels.filter((l) => l.boss).map((l) => (
                    <LevelCard key="boss" {...l} unlocked={unlockedLevel > 10} />
                ))}
            </div>
        </main>
    </div>
    );
};

export default Challenges;