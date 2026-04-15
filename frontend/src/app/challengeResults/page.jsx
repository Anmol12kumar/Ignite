"use client";
import { Button } from "@/components/ui/Button";
import Navbar from "@/components/Navbar/page";
import Footer from "@/components/Footer/page";
import ScrollReveal from "@/components/ScrollReveal/page";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { level1ChallengeQuestions } from "@/data/level1challengequestions";
import { useState, useEffect } from "react";

const ChallengeResults = () => {
    const { level } = useParams();
    const router = useRouter();
    const questions = level1ChallengeQuestions;
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
    }, []);

    const totalQuestions = questions.length || 3;
    const scoreValues = Object.values(scores);
    const overallScore = scoreValues.length
        ? Math.round(scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length)
        : 0;

    const passed = scoreValues.every((s) => s >= 50);

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
        <div className="min-h-screen bg-gray-950 text-white">
            <Navbar />

            <div className="container pt-28 pb-24 max-w-2xl mx-auto">
                {/* Header */}
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-emerald-400 mb-4 block">
                            Challenge Complete
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
                            Level {level} Results
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
                                    key={q.id}
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
                        {passed ? (
                            <Link href="/leaderboard" className="flex-1">
                                <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-black">
                                    🏆 View Leaderboard
                                </Button>
                            </Link>
                        ) : (
                            <Link href={`/challenge/${level}`} className="flex-1">
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

            <Footer />
        </div>
    );
};

export default ChallengeResults;