"use client";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPersonalizedWelcome } from "@/data/personalizedQuestions";

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
                    : "border-gray-700 bg-gray-900/40 opacity-50 cursor-not-allowed"
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
        if (boss) {
            return <Link href="/AssessmentBoss">{cardContent}</Link>;
        }
        return <Link href={`/Assessment${level}`}>{cardContent}</Link>;
    }

    return cardContent;
};

const Challenges = () => {
    const router = useRouter();
    const [unlockedLevel, setUnlockedLevel] = useState(1);
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        // Fetch unlocked level and profile on mount
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            const profession = localStorage.getItem("profession");
            const domain = localStorage.getItem("domain");
            const experienceLevel = localStorage.getItem("experienceLevel");
            const name = localStorage.getItem("userName");
            const profileComplete = localStorage.getItem("profileComplete") === "true";

            // Guard: If profile not complete, redirect to onboarding
            if (token && !profileComplete) {
                router.push("/onboarding");
                return;
            }

            if (profession) {
                setUserProfile({ profession, domain, experienceLevel, name });
            }
            
            // Sync with backend progress
            if (token) {
                try {
                    const base64Url = token.split('.')[1];
                    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    const decoded = JSON.parse(atob(base64));
                    const userId = decoded._id;
                    
                    const res = await fetch(`http://localhost:5000/user/progress/${userId}`);
                    if (res.ok) {
                        const data = await res.json();
                        const highest = data.highestUnlockedLevel || 1;
                        setUnlockedLevel(highest);
                        localStorage.setItem("highestUnlockedLevel", String(highest));
                        return;
                    }
                } catch (err) {
                    console.error("Failed to fetch progress from backend:", err);
                }
            }
            
            const highest = parseInt(localStorage.getItem("highestUnlockedLevel") || "1", 10);
            setUnlockedLevel(highest);
        };
        
        fetchData();
        
        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                fetchData();
            }
        };
        
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, [router]);

    const maxLevelInt = Math.min(unlockedLevel, 11);
    
    // Get personalized welcome message
    const welcome = userProfile 
        ? getPersonalizedWelcome(userProfile.profession, userProfile.domain, userProfile.experienceLevel)
        : null;

    return (
        <div className="min-h-screen bg-black">
            {/* Top bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-700 bg-black/80 backdrop-blur-xl">
                <div className="container px-20 flex h-14 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-7 w-7 bg-emerald-600 rounded-md flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <span className="text-white font-bold text-xs font-mono">I</span>
                        </div>
                        <span className="font-semibold tracking-tight text-white">Ignite</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/concepts">
                            <span className="text-sm text-gray-400 hover:text-emerald-400 transition-colors mr-2 cursor-pointer">Concepts</span>
                        </Link>
                        {userProfile && (
                            <div className="hidden sm:flex flex-col items-end">
                                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">Personalized for</span>
                                <span className="text-xs text-gray-300 font-medium capitalize">{userProfile.profession} · {userProfile.domain}</span>
                            </div>
                        )}

                        <Link href="/user/profile">
                            <Button className="px-3 py-1 text-sm rounded-lg bg-gray-800/50 text-gray-300 hover:bg-gray-800 border border-gray-700">Profile</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="container pt-28 pb-20">
                {/* Header */}
                <div className="text-center mb-14 animate-in fade-in slide-in-from-top-4 duration-1000">
                    <span className="font-mono text-[13px] tracking-[0.25em] uppercase text-emerald-400 mb-3 block">
                        Challenge Arena
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white leading-tight">
                        {userProfile?.name ? `Welcome back, ${userProfile.name}` : "Master the Art of Prompting"}
                    </h1>
                    
                    {welcome ? (
                        <div className="max-w-2xl mx-auto space-y-2">
                            <p className="text-lg text-emerald-100/90 font-medium">
                                {welcome.headline}
                            </p>
                            <p className="text-gray-400 text-sm italic">
                                {welcome.subtext}
                            </p>
                        </div>
                    ) : (
                        <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
                            Complete each challenge to unlock the next. Conquer all levels to face the Boss.
                        </p>
                    )}
                </div>

                {/* Progress bar */}
                <div className="max-w-md mx-auto mb-14 px-4">
                    <div className="flex justify-between text-xs font-mono text-emerald-400 mb-2">
                        <span>Curriculum Progress</span>
                        <span>{maxLevelInt} / 11</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-800 overflow-hidden border border-gray-700/50">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all duration-1000"
                            style={{ width: `${(maxLevelInt / 11) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto px-4">
                    {levels.filter((l) => !l.boss).map((l) => (
                        <LevelCard key={l.level} {...l} unlocked={l.level <= unlockedLevel} />
                    ))}
                </div>

                {/* Boss card */}
                <div className="max-w-sm mx-auto mt-14 px-4">
                    {levels.filter((l) => l.boss).map((l) => (
                        <LevelCard key="boss" {...l} unlocked={unlockedLevel > 10} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Challenges;