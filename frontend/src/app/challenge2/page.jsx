"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { level2ChallengeQuestions } from "@/data/level2challengequestions";

const ScoreCard = ({ score, onNext, isLast, suggestions }) => {
    const color =
        score >= 75
            ? "text-emerald-400"
            : score >= 50
                ? "text-yellow-400"
                : "text-red-500";
                
    return (
        <div className="mt-6 p-6 rounded-xl border border-gray-700 bg-gray-900 animate-fade-in">
            <p className="text-sm text-gray-400 mb-2">Your Score</p>
            <p className={`text-6xl font-bold ${color}`}>{score}</p>
            <p className="text-gray-400 text-sm mt-1">out of 100</p>
            <div className="w-full bg-gray-800 rounded-full h-3 mt-4">
                <div
                    className="h-3 rounded-full transition-all duration-700"
                    style={{
                        width: `${score}%`,
                        background:
                            score >= 80
                                ? "rgb(16,185,129)"
                                : score >= 50
                                    ? "rgb(234,179,8)"
                                    : "rgb(239,68,68)",
                    }}
                />
            </div>
            <p className="text-xs text-gray-400 mt-3">
                {score >= 75
                    ? "Excellent! You nailed it."
                    : score >= 50
                        ? "Good effort, but there's room to improve."
                        : "Keep practicing — review the sample answers."}
            </p>

            {suggestions && (
                <div className="mt-4 p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/40 text-left">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-2 flex items-center gap-2">✨ AI Suggestions</h4>
                    <p className="text-sm text-indigo-200 leading-relaxed">{suggestions}</p>
                </div>
            )}
            {!isLast && score >= 50 && (
                <Button className="mt-4 w-full bg-emerald-500 text-black font-semibold hover:bg-emerald-600" onClick={onNext}>
                    Next Question →
                </Button>
            )}
            {isLast && score >= 50 && (
                <Link href="/challengeResults">
                    <Button className="mt-4 w-full bg-emerald-500 text-black font-semibold hover:bg-emerald-600">
                        🎉 Challenge Complete — Go to results
                    </Button>
                </Link>
            )}
        </div>
    );
};

const Challenge2 = () => {
    const { level } = useParams();
    const [unlockedUpTo, setUnlockedUpTo] = useState(100); // index
    const [activeQ, setActiveQ] = useState(0);
    const [userPrompt, setUserPrompt] = useState("");
    const [scores, setScores] = useState({}); // { qIndex: score }
    const [evaluations, setEvaluations] = useState({}); // { qIndex: suggestions_string }
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (Object.keys(scores).length > 0) {
            localStorage.setItem("challengeScores", JSON.stringify(scores));
        }
    }, [scores]);

    const questions = level2ChallengeQuestions;

    const evaluate = async () => {
        setSubmitting(true);
        const q = questions[activeQ];
        
        const evaluateWithRetry = async (retries = 3) => {
            for (let attempt = 1; attempt <= retries; attempt++) {
                try {
                    const controller = new AbortController();
                    const timeout = setTimeout(() => controller.abort(new Error("Request timeout after 30s")), 30000);
                    
                    try {
                        const res = await fetch("http://localhost:5000/evaluate", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                userPrompt,
                                question: q.question,
                                sampleAnswer: q.sampleAnswer || "",
                                keyPoints: q.keyPoints,
                                token: localStorage.getItem("token")
                            }),
                            signal: controller.signal
                        });

                        if (!res.ok) {
                            const errorText = await res.text();
                            console.error(`Attempt ${attempt}: Server returned ${res.status}:`, errorText);
                            if (res.status === 503 && attempt < retries) {
                                const delay = Math.pow(2, attempt) * 1000;
                                console.log(`Retrying in ${delay}ms...`);
                                await new Promise(resolve => setTimeout(resolve, delay));
                                continue;
                            }
                            throw new Error(`API Error ${res.status}: ${errorText}`);
                        }
                        
                        return await res.json();
                    } finally {
                        clearTimeout(timeout);
                    }
                } catch (err) {
                    if (attempt < retries && (err.name === 'AbortError' || err.message.includes('503') || err.message.includes('timeout'))) {
                        const delay = Math.pow(2, attempt) * 1000;
                        console.warn(`Attempt ${attempt} failed: ${err.message}. Retrying in ${delay}ms...`);
                        await new Promise(resolve => setTimeout(resolve, delay));
                    } else {
                        throw err;
                    }
                }
            }
        };

        try {
            const data = await evaluateWithRetry();
            const pct = data.pct;
            
            setScores((prev) => ({ ...prev, [activeQ]: pct }));
            setEvaluations((prev) => ({ ...prev, [activeQ]: data.suggestions }));
            
            if (pct >= 50 && activeQ === unlockedUpTo && activeQ < questions.length - 1) {
                setUnlockedUpTo(activeQ + 1);
            }
        } catch (err) {
            console.warn("Evaluation error, falling back to basic matching:", err.message);
            const promptLower = userPrompt.toLowerCase();
            let score = 0;
            q.keyPoints.forEach((point) => {
                const keywords = point
                    .toLowerCase()
                    .split(/\s+/)
                    .filter((w) => w.length > 3);
                const hit = keywords.some((kw) => promptLower.includes(kw));
                if (hit) score++;
            });
            const pct = Math.round((score / q.keyPoints.length) * 100);
            
            setScores((prev) => ({ ...prev, [activeQ]: pct }));
            
            if (pct >= 50 && activeQ === unlockedUpTo && activeQ < questions.length - 1) {
                setUnlockedUpTo(activeQ + 1);
            }
        } finally {
            setSubmitting(false);
        }
    };

    const goToNext = () => {
        setActiveQ((prev) => prev + 1);
        setUserPrompt("");
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col">
            {/* Header */}
            <header className="border-b border-gray-700 px-6 py-4 flex items-center justify-between">
                <Link
                    href={`/Assessment2`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                    ← Back to Practice
                </Link>
                <h1 className="text-lg font-semibold">
                    Level {level} —{" "}
                    <span className="text-emerald-400">Challenge</span>
                </h1>
                <span className="text-xs text-gray-400">
                    {Object.keys(scores).length}/{questions.length} answered
                </span>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Left — Question List */}
                <aside className="w-72 border-r border-gray-700 p-4 overflow-y-auto flex-shrink-0">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-4">
                        Questions
                    </p>
                    {questions.map((q, i) => {
                        const locked = i > unlockedUpTo;
                        const answered = scores[i] !== undefined;
                        return (
                            <button
                                key={q.id}
                                disabled={locked}
                                onClick={() => {
                                    if (!locked) {
                                        setActiveQ(i);
                                        if (scores[i] === undefined) setUserPrompt("");
                                    }
                                }}
                                className={`w-full text-left p-3 rounded-lg mb-2 transition-all text-sm flex items-center gap-3 ${locked
                                        ? "opacity-40 cursor-not-allowed bg-gray-800 text-gray-500"
                                        : activeQ === i
                                            ? "bg-emerald-900/20 border border-emerald-400 text-white"
                                            : "hover:bg-gray-700 text-gray-400"
                                    }`}
                            >
                                <span
                                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${answered
                                            ? scores[i] >= 50
                                                ? "bg-emerald-900/20 text-emerald-400"
                                                : "bg-red-900/20 text-red-500"
                                            : locked
                                                ? "bg-gray-700 text-gray-500"
                                                : "bg-gray-600 text-white"
                                        }`}
                                >
                                    {locked ? "🔒" : answered ? (scores[i] >= 50 ? "✓" : "✗") : i + 1}
                                </span>
                                <span className="line-clamp-2">
                                    {locked ? "Locked" : `Question ${i + 1}`}
                                </span>
                            </button>
                        );
                    })}
                </aside>

                {/* Right — Active Question */}
                <main className="flex-1 p-8 overflow-y-auto flex flex-col items-center">
                    <div className="w-full max-w-2xl">
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
                            Question {activeQ + 1} of {questions.length}
                        </p>
                        <h2 className="text-xl font-semibold leading-relaxed mb-6">
                            {questions[activeQ].question}
                        </h2>

                        {scores[activeQ] === undefined ? (
                            <>
                                <textarea
                                    className="w-full h-48 bg-gray-800 border border-gray-700 rounded-lg p-4 text-sm text-white placeholder:text-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                    placeholder="Write your prompt here…"
                                    value={userPrompt}
                                    onChange={(e) => setUserPrompt(e.target.value)}
                                />
                                <Button
                                    className="mt-4 w-full bg-emerald-500 text-black font-semibold hover:bg-emerald-600 shadow-lg"
                                    disabled={!userPrompt.trim() || submitting}
                                    onClick={evaluate}
                                >
                                    {submitting ? "Evaluating…" : "Submit Prompt"}
                                </Button>
                            </>
                        ) : (
                            <ScoreCard
                                score={scores[activeQ]}
                                onNext={goToNext}
                                isLast={activeQ === questions.length - 1}
                                suggestions={evaluations[activeQ]}
                            />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Challenge2;