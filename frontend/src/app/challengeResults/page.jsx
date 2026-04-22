"use client";
import React, { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/Button";
import Navbar from "@/components/Navbar/page";
import Footer from "@/components/Footer/page";
import ScrollReveal from "@/components/ScrollReveal/page";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import { level1ChallengeQuestions } from "@/data/level1challengequestions";
import { level2ChallengeQuestions } from "@/data/level2challengequestions";
import { level3ChallengeQuestions } from "@/data/level3challengequestions";
import { level4ChallengeQuestions } from "@/data/level4challengequestions";
import { level5ChallengeQuestions } from "@/data/level5challengequestions";
import { level6ChallengeQuestions } from "@/data/level6challengequestions";
import { level7ChallengeQuestions } from "@/data/level7challengequestions";
import { level8ChallengeQuestions } from "@/data/level8challengequestions";
import { level9ChallengeQuestions } from "@/data/level9challengequestions";
import { level10ChallengeQuestions } from "@/data/level10challengequestions";
import { bosslevelChallengeQuestions } from "@/data/bosslevelchallengequestions";

const getQuestionsForLevel = (lvl) => {
    switch (String(lvl).toLowerCase()) {
        case "1": return level1ChallengeQuestions;
        case "2": return level2ChallengeQuestions;
        case "3": return level3ChallengeQuestions;
        case "4": return level4ChallengeQuestions;
        case "5": return level5ChallengeQuestions;
        case "6": return level6ChallengeQuestions;
        case "7": return level7ChallengeQuestions;
        case "8": return level8ChallengeQuestions;
        case "9": return level9ChallengeQuestions;
        case "10": return level10ChallengeQuestions;
        case "boss": return bosslevelChallengeQuestions;
        default: return level1ChallengeQuestions; // fallback
    }
};

const ChallengeResultsContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    // Read level from query string, e.g. ?level=2
    const levelStr = searchParams.get("level") || "1";
    const questions = getQuestionsForLevel(levelStr);
    
    const [scores, setScores] = useState({});
    
    useEffect(() => {
        const savedScores = localStorage.getItem("challengeScores");
        if (savedScores) {
            const parsed = JSON.parse(savedScores);
            setScores(parsed);
            
            const vals = Object.values(parsed);
            if (vals.length > 0) {
                const overall = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
                const earnedXP = overall * 10;
                
                if (overall >= 75) {
                    const currentHighest = parseInt(localStorage.getItem("highestUnlockedLevel") || "1", 10);
                    
                    // Parse level number carefully taking "boss" string into account
                    let currentLevelNum = levelStr.toLowerCase() === "boss" ? "boss" : parseInt(levelStr, 10) || 1;
                    const token = localStorage.getItem("token");
                    
                    // Award badge for completing level with 75+ score
                    // This now properly sends levelNumber: 2, 3, etc. because level is extracted from URL!
                    if (token) {
                        fetch("http://localhost:5000/user/award-badge", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ token, levelNumber: currentLevelNum })
                        })
                        .then(res => res.json())
                        .then(data => {
                            if (data.success) {
                                toast.success(data.message, { duration: 3000 });
                            }
                        })
                        .catch(err => console.error("Failed to award badge:", err));
                    }
                    
                    // Only unlock next level if the current level is a number
                    if (currentLevelNum !== "boss" && currentLevelNum >= currentHighest) {
                        const nextLevel = currentLevelNum + 1;
                        localStorage.setItem("highestUnlockedLevel", String(nextLevel));
                        toast.success(`🎉 Level ${nextLevel} Unlocked! Ready for the next challenge?`, { duration: 4000 });
                        
                        // Save unlocked level to backend
                        if (token) {
                            fetch("http://localhost:5000/user/unlock-level", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ token, levelNumber: nextLevel })
                            })
                            .then(res => res.json())
                            .then(data => console.log("Level unlocked saved to database:", data))
                            .catch(err => console.error("Failed to save level unlock:", err));
                        }
                        
                        setTimeout(() => {
                            router.push("/Challenges");
                        }, 2500);
                    } else if (currentLevelNum === "boss") {
                        toast.success(`🏆 YOU DEFEATED THE BOSS CHALLENGE!`, { duration: 6000 });
                    }
                }

                const baselineXp = parseInt(localStorage.getItem("userXP") || "0"); 
                localStorage.setItem("userXP", String(baselineXp + earnedXP));

                const token = localStorage.getItem("token");
                if (token) {
                    fetch("http://localhost:5000/leaderboard/update", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ token, xpToAdd: earnedXP })
                    })
                    .then(res => res.json())
                    .then(data => console.log("Leaderboard updated:", data))
                    .catch(err => console.error("Leaderboard sync failed:", err));
                }
            }
        }
    }, [levelStr, router]);

    const totalQuestions = questions.length || 3;
    const scoreValues = Object.values(scores);
    const overallScore = scoreValues.length
        ? Math.round(scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length)
        : 0;

    const grade =
        overallScore >= 90
            ? { label: "S", color: "text-emerald-400", bg: "bg-emerald-900/20" }
            : overallScore >= 75
                ? { label: "A", color: "text-emerald-400", bg: "bg-emerald-900/20" }
                : overallScore >= 60
                    ? { label: "B", color: "text-yellow-400", bg: "bg-yellow-400/20" }
                    : overallScore >= 50
                        ? { label: "C", color: "text-orange-400", bg: "bg-orange-400/20" }
                        : { label: "F", color: "text-red-500", bg: "bg-red-900/20" };

    return (
        <div className="container pt-28 pb-24 max-w-2xl mx-auto">
            {/* Header */}
            <ScrollReveal>
                <div className="text-center mb-12">
                    <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-emerald-400 mb-4 block">
                        Challenge Complete
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
                        Level {levelStr === "boss" ? "Boss" : levelStr} Results
                    </h1>
                    <p className="text-gray-400">
                        Here's how you performed across all {totalQuestions} questions.
                    </p>
                </div>
            </ScrollReveal>

            {/* Overall Score Card */}
            <ScrollReveal delay={100}>
                <div className="rounded-2xl border border-gray-700 bg-gray-900 p-8 text-center mb-8">
                    <p className="text-sm text-gray-400 mb-2">Overall Score</p>
                    <div className="flex items-center justify-center gap-6 mb-4">
                        <div>
                            <p className={`text-7xl font-bold ${grade.color}`}>
                                {overallScore}
                            </p>
                            <p className="text-gray-400 text-sm mt-1">out of 100</p>
                        </div>
                        <div
                            className={`w-20 h-20 rounded-2xl ${grade.bg} flex items-center justify-center`}
                        >
                            <span className={`text-4xl font-bold ${grade.color}`}>
                                {grade.label}
                            </span>
                        </div>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full bg-gray-800 rounded-full h-3 mt-2">
                        <div
                            className="h-3 rounded-full transition-all duration-1000"
                            style={{
                                width: `${overallScore}%`,
                                background:
                                    overallScore >= 75
                                        ? "rgb(16,185,129)"
                                        : overallScore >= 50
                                            ? "rgb(234,179,8)"
                                            : "rgb(239,68,68)",
                            }}
                        />
                    </div>
                    <p className="text-sm text-gray-400 mt-4">
                        {overallScore >= 75
                            ? "🎉 Outstanding performance! You've mastered this level."
                            : overallScore >= 50
                                ? "👍 Good effort! You passed the challenge."
                                : "Keep practicing — you'll get there!"}
                    </p>
                </div>
            </ScrollReveal>

            {/* Per-question breakdown */}
            <ScrollReveal delay={200}>
                <div className="rounded-2xl border border-gray-700 bg-gray-900 overflow-hidden mb-8">
                    <div className="px-6 py-4 border-b border-gray-700/40">
                        <p className="font-mono-code text-[11px] tracking-[0.25em] uppercase text-gray-400">
                            Question Breakdown
                        </p>
                    </div>
                    {questions.map((q, i) => {
                        const s = scores[i] ?? 0;
                        const qColor =
                            s >= 80
                                ? "text-emerald-400"
                                : s >= 50
                                    ? "text-yellow-400"
                                    : "text-red-500";
                        return (
                            <div
                                key={q.id || i}
                                className={`px-6 py-4 flex items-center gap-4 ${i !== questions.length - 1
                                        ? "border-b border-gray-700/30"
                                        : ""
                                    }`}
                            >
                                <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-sm font-bold font-mono text-white flex-shrink-0">
                                    Q{i + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-white line-clamp-1">
                                        {q.question}
                                    </p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <span className={`text-xl font-bold font-mono-code ${qColor}`}>
                                        {s}
                                    </span>
                                    <span className="text-xs text-gray-400">/100</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </ScrollReveal>

            {/* Actions */}
            <ScrollReveal delay={300}>
                <div className="flex flex-col sm:flex-row gap-3">
                    {overallScore >= 75 ? (
                        <Link href="/leaderboard" className="flex-1">
                            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-black">
                                🏆 View Leaderboard
                            </Button>
                        </Link>
                    ) : (
                        <Link href={levelStr === "boss" ? "/challengeBoss" : (levelStr === "1" ? "/challenge" : `/challenge${levelStr}`)} className="flex-1">
                            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-black">
                                🔄 Retry Challenge
                            </Button>
                        </Link>
                    )}
                    <Link href="/Challenges" className="flex-1">
                        <Button 
                        variant="outline" 
                        className="w-full border border-gray-700 text-gray-400 hover:text-white hover:border-gray-800">
                            ← Back to Levels
                        </Button>
                    </Link>
                </div>
            </ScrollReveal>
        </div>
    );
};

const ChallengeResults = () => {
    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <Navbar />
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center pt-28"><p>Loading Results...</p></div>}>
                <ChallengeResultsContent />
            </Suspense>
            <Footer />
        </div>
    );
};

export default ChallengeResults;