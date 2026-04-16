"use client";
import Navbar from "@/components/Navbar/page";
import Footer from "@/components/Footer/page";
import ScrollReveal from "@/components/ScrollReveal/page";
import { useState, useEffect } from "react";

const PodiumCard = ({ player, place }) => {
    if (!player) {
        return (
            <div className={`flex flex-col items-center gap-3 ${place === 1 ? "-mt-8" : "mt-4"} opacity-20`}>
                <div className="w-16 h-16 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center font-bold font-mono text-gray-500">
                    ?
                </div>
                <div className="text-center">
                    <p className="font-semibold text-gray-500 text-sm">Awaiting</p>
                    <p className="font-mono text-xs text-gray-600">0 XP</p>
                </div>
                <div className="h-28 w-28 sm:w-36 rounded-t-xl bg-gray-900 border border-gray-800 flex flex-col items-center justify-end pb-4" />
            </div>
        );
    }

    const heights = { 1: "h-44", 2: "h-36", 3: "h-28" };
    const sizes = { 
        1: "w-20 h-20 text-2xl", 
        2: "w-16 h-16 text-xl", 
        3: "w-16 h-16 text-xl" };
    const glows = {
        1: "shadow-[0_0_40px_hsl(45,90%,55%,0.25)] border-[hsl(45,90%,55%)]",
        2: "shadow-[0_0_24px_hsl(220,10%,70%,0.2)] border-[hsl(220,10%,72%)]",
        3: "shadow-[0_0_24px_hsl(25,60%,50%,0.2)] border-[hsl(25,60%,50%)]",
    };
    const medals = { 1: "🥇", 2: "🥈", 3: "🥉" };

    return (
        <div className={`flex flex-col items-center gap-3 ${place === 1 ? "-mt-8" : "mt-4"}`}>
            <div className={`${sizes[place]} rounded-full bg-gray-900 border-2 ${glows[place]} flex items-center justify-center font-bold font-mono text-white`}>
                {player.avatar}
            </div>
            <div className="text-center">
                <p className="font-semibold text-white text-sm">{player.name}</p>
                <p className="font-mono text-xs text-emerald-400">{player.xp.toLocaleString()} XP</p>
            </div>
            <div className={`${heights[place]} w-28 sm:w-36 rounded-t-xl bg-gradient-to-t from-gray-900 to-emerald-900/20 flex flex-col items-center justify-end pb-4 border border-gray-800`}>
                <span className="text-3xl">{medals[place]}</span>
                <span className="font-mono text-xs text-gray-400 mt-1">Lvl {player.level}</span>
            </div>
        </div>
    );
};

const Leaderboard = () => {
    const [players, setPlayers] = useState([]);
    const [top, setTop] = useState([]);
    const [podium, setPodium] = useState([null, null, null]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRankings = async () => {
            try {
                const res = await fetch("http://localhost:5000/leaderboard");
                const data = await res.json();
                
                if (data && data.length > 0) {
                    const formatted = data.map((p, i) => ({
                        rank: i + 1,
                        name: p.name || "Anonymous",
                        avatar: p.name ? p.name.charAt(0).toUpperCase() : "👤",
                        xp: p.totalXP,
                        level: p.level,
                        badges: Math.floor(p.totalXP / 2000), 
                        streak: p.bestStreak || 0
                    }));

                    const newTop = formatted.slice(0, 3);
                    setTop(newTop);
                    setPodium([
                        newTop[1] || null, 
                        newTop[0] || null, 
                        newTop[2] || null
                    ]);
                    setPlayers(formatted.slice(3));
                }
            } catch (err) {
                console.error("Failed to fetch leaderboard:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRankings();
    }, []);

    if (loading) {
        return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-emerald-500 font-mono">Loading Rankings...</div>;
    }


    return (
    <div className="min-h-screen bg-gray-950 text-white">
        <Navbar />

        <div className="container pt-28 pb-24">
            {/* Header */}
            <ScrollReveal>
                <div className="text-center mb-16">
                    <span className="font-mono-code text-[11px] tracking-[0.25em] uppercase text-emerald-400 mb-4 block">
                        Rankings
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
                        Leaderboard
                    </h1>
                    <p className="text-gray-400 max-w-md mx-auto">
                        The top prompt engineers ranked by experience, streaks, and badges earned.
                    </p>
                </div>
            </ScrollReveal>

            {/* Podium */}
            <ScrollReveal delay={150}>
                <div className="flex items-end justify-center gap-4 sm:gap-8 mb-16">
                    {podium.map((p, index) => {
                        const place = index === 0 ? 2 : index === 1 ? 1 : 3;
                        return <PodiumCard key={`podium-${place}`} player={p} place={place} />
                    })}
                </div>
            </ScrollReveal>

            {/* Table */}
            <ScrollReveal delay={300}>
                <div className="max-w-3xl mx-auto rounded-xl border border-gray-700 bg-gray-900 overflow-hidden">
                    {/* Table header */}
                    <div className="grid grid-cols-[3rem_1fr_5rem_5rem_5rem_5rem] sm:grid-cols-[4rem_1fr_6rem_5rem_5rem_5rem] px-4 py-3 text-[11px] font-mono-code uppercase tracking-wider text-gray-400 border-b border-gray-700">
                        <span>#</span>
                        <span>Player</span>
                        <span className="text-right">XP</span>
                        <span className="text-right">Level</span>
                        <span className="text-right hidden sm:block">Badges</span>
                        <span className="text-right">Streak</span>
                    </div>

                    {/* Rows */}
                    {players.map((p, i) => (
                        <div
                            key={p.rank}
                            className={`grid grid-cols-[3rem_1fr_5rem_5rem_5rem_5rem] sm:grid-cols-[4rem_1fr_6rem_5rem_5rem_5rem] px-4 py-3 items-center text-sm transition-colors hover:bg-gray-800/50 ${i !== players.length - 1 ? "border-b border-gray-700" : ""} ${p.name === "You" ? "bg-emerald-900/20" : ""}`}
                        >
                            <span className="font-mono-code text-gray-400">{p.rank}</span>
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-mono-code ${p.name === "You" ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" : "bg-gray-800 border-gray-700 text-white"}`}>
                                    {p.avatar}
                                </div>
                                <span className={`font-medium ${p.name === "You" ? "text-emerald-400 font-bold" : "text-white"}`}>{p.name}</span>
                            </div>
                            <span className="text-right font-mono-code text-emerald-400 text-xs">{p.xp.toLocaleString()}</span>
                            <span className="text-right text-gray-400 text-xs">{p.level}</span>
                            <span className="text-right text-gray-400 text-xs hidden sm:block">{p.badges}</span>
                            <span className="text-right text-xs">
                                <span className="text-orange-400">🔥</span> {p.streak}d
                            </span>
                        </div>
                    ))}
                </div>
            </ScrollReveal>
        </div>

        <Footer />
    </div>
    );
};

export default Leaderboard;