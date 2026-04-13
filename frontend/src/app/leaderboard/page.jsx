"use client";
import Navbar from "@/components/Navbar/page";
import Footer from "@/components/Footer/page";
import ScrollReveal from "@/components/ScrollReveal/page";
import { useState, useEffect } from "react";

const initialTopPlayers = [
    { rank: 2, name: "CipherMind", avatar: "CM", xp: 8420, level: 14, badges: 9, streak: 12 },
    { rank: 1, name: "PromptLord", avatar: "PL", xp: 12850, level: 18, badges: 14, streak: 21 },
    { rank: 3, name: "NeuralNinja", avatar: "NN", xp: 7190, level: 12, badges: 7, streak: 8 },
];

const initialRestPlayers = [
    { rank: 4, name: "ByteWhisperer", avatar: "BW", xp: 6300, level: 11, badges: 6, streak: 5 },
    { rank: 5, name: "LogicWeaver", avatar: "LW", xp: 5780, level: 10, badges: 5, streak: 9 },
    { rank: 6, name: "DataDruid", avatar: "DD", xp: 5100, level: 9, badges: 5, streak: 3 },
    { rank: 7, name: "TokenTamer", avatar: "TT", xp: 4650, level: 8, badges: 4, streak: 7 },
    { rank: 8, name: "QueryQueen", avatar: "QQ", xp: 4200, level: 8, badges: 4, streak: 4 },
    { rank: 9, name: "SyntaxSage", avatar: "SS", xp: 3900, level: 7, badges: 3, streak: 6 },
    { rank: 10, name: "PromptPilot", avatar: "PP", xp: 3400, level: 7, badges: 3, streak: 2 },
];

const initialPodiumOrder = [initialTopPlayers[0], initialTopPlayers[1], initialTopPlayers[2]]; // 2nd, 1st, 3rd

const PodiumCard = ({ player, place }) => {
    const heights = { 1: "h-44", 2: "h-36", 3: "h-28" };
    const sizes = { 1: "w-20 h-20 text-2xl", 2: "w-16 h-16 text-xl", 3: "w-16 h-16 text-xl" };
    const glows = {
        1: "shadow-[0_0_40px_hsl(45,90%,55%,0.25)] border-[hsl(45,90%,55%)]",
        2: "shadow-[0_0_24px_hsl(220,10%,70%,0.2)] border-[hsl(220,10%,72%)]",
        3: "shadow-[0_0_24px_hsl(25,60%,50%,0.2)] border-[hsl(25,60%,50%)]",
    };
    const medals = { 1: "🥇", 2: "🥈", 3: "🥉" };

    return (
        <div className={`flex flex-col items-center gap-3 ${place === 1 ? "-mt-8" : "mt-4"}`}>
            <div className={`${sizes[place]} rounded-full bg-card border-2 ${glows[place]} flex items-center justify-center font-bold font-mono-code text-foreground`}>
                {player.avatar}
            </div>
            <div className="text-center">
                <p className="font-semibold text-foreground text-sm">{player.name}</p>
                <p className="font-mono-code text-xs text-primary">{player.xp.toLocaleString()} XP</p>
            </div>
            <div className={`${heights[place]} w-28 sm:w-36 rounded-t-xl bg-linear-to-t from-card to-secondary flex flex-col items-center justify-end pb-4 border border-border/60`}>
                <span className="text-3xl">{medals[place]}</span>
                <span className="font-mono-code text-xs text-muted-foreground mt-1">Lvl {player.level}</span>
            </div>
        </div>
    );
};

const Leaderboard = () => {
    const [players, setPlayers] = useState(initialRestPlayers);
    const [top, setTop] = useState(initialTopPlayers);
    const [podium, setPodium] = useState(initialPodiumOrder);

    useEffect(() => {
        const userXP = parseInt(localStorage.getItem("userXP"));
        if (!isNaN(userXP)) {
            const you = { rank: 0, name: "You", avatar: "👤", xp: userXP, level: Math.floor(userXP/1000) + 1, badges: 3, streak: 2 };
            const all = [...initialTopPlayers, ...initialRestPlayers, you];
            all.sort((a, b) => b.xp - a.xp);
            all.forEach((p, i) => p.rank = i + 1);
            
            const newTop = [all[0], all[1], all[2]];
            setTop(newTop);
            setPodium([newTop[1], newTop[0], newTop[2]]); // 2nd, 1st, 3rd
            setPlayers(all.slice(3));
        }
    }, []);

    return (
    <div className="min-h-screen">
        <Navbar />

        <div className="container pt-28 pb-24">
            {/* Header */}
            <ScrollReveal>
                <div className="text-center mb-16">
                    <span className="font-mono-code text-[11px] tracking-[0.25em] uppercase text-primary mb-4 block">
                        Rankings
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
                        Leaderboard
                    </h1>
                    <p className="text-secondary-foreground max-w-md mx-auto">
                        The top prompt engineers ranked by experience, streaks, and badges earned.
                    </p>
                </div>
            </ScrollReveal>

            {/* Podium */}
            <ScrollReveal delay={150}>
                <div className="flex items-end justify-center gap-4 sm:gap-8 mb-16">
                    {podium.map((p) => (
                        <PodiumCard key={p.rank} player={p} place={p.rank} />
                    ))}
                </div>
            </ScrollReveal>

            {/* Table */}
            <ScrollReveal delay={300}>
                <div className="max-w-3xl mx-auto rounded-xl border border-border/60 bg-card overflow-hidden">
                    {/* Table header */}
                    <div className="grid grid-cols-[3rem_1fr_5rem_5rem_5rem_5rem] sm:grid-cols-[4rem_1fr_6rem_5rem_5rem_5rem] px-4 py-3 text-[11px] font-mono-code uppercase tracking-wider text-muted-foreground border-b border-border/40">
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
                            className={`grid grid-cols-[3rem_1fr_5rem_5rem_5rem_5rem] sm:grid-cols-[4rem_1fr_6rem_5rem_5rem_5rem] px-4 py-3 items-center text-sm transition-colors hover:bg-secondary/50 ${i !== players.length - 1 ? "border-b border-border/30" : ""} ${p.name === "You" ? "bg-emerald-900/20" : ""}`}
                        >
                            <span className="font-mono-code text-muted-foreground">{p.rank}</span>
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-mono-code ${p.name === "You" ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" : "bg-secondary border-border/60 text-foreground"}`}>
                                    {p.avatar}
                                </div>
                                <span className={`font-medium ${p.name === "You" ? "text-emerald-400 font-bold" : "text-foreground"}`}>{p.name}</span>
                            </div>
                            <span className="text-right font-mono-code text-primary text-xs">{p.xp.toLocaleString()}</span>
                            <span className="text-right text-muted-foreground text-xs">{p.level}</span>
                            <span className="text-right text-muted-foreground text-xs hidden sm:block">{p.badges}</span>
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