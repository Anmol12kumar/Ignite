"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { level1ChallengeQuestions } from "@/data/level1challengequestions";
import { useParams } from "next/navigation";

const ScoreCard = ({ score, onNext, isLast }) => {
    const color =
        score >= 80
            ? "text-primary"
            : score >= 50
                ? "text-yellow-400"
                : "text-red-500";

    return (
        <div className="mt-6 p-6 rounded-xl border border-border bg-card animate-fade-in">
            <p className="text-sm text-muted-foreground mb-2">Your Score</p>
            <p className={`text-6xl font-bold ${color}`}>{score}</p>
            <p className="text-muted-foreground text-sm mt-1">out of 100</p>
            <div className="w-full bg-muted rounded-full h-3 mt-4">
                <div
                    className="h-3 rounded-full transition-all duration-700"
                    style={{
                        width: `${score}%`,
                        background:
                            score >= 80
                                ? "hsl(var(--primary))"
                                : score >= 50
                                    ? "hsl(48,96%,53%)"
                                    : "hsl(var(--destructive))",
                    }}
                />
            </div>
            <p className="text-xs text-muted-foreground mt-3">
                {score >= 80
                    ? "Excellent! You nailed it."
                    : score >= 50
                        ? "Good effort, but there's room to improve."
                        : "Keep practicing — review the sample answers."}
            </p>
            {!isLast && score >= 50 && (
                <Button className="mt-4 w-full" onClick={onNext}>
                    Unlock Next Question →
                </Button>
            )}
            {isLast && score >= 50 && (
                <Link href="/challenges">
                    <Button className="mt-4 w-full">
                        🎉 Challenge Complete — Back to Levels
                    </Button>
                </Link>
            )}
        </div>
    );
};

const Challenge = () => {
    const { level } = useParams();
    const [unlockedUpTo, setUnlockedUpTo] = useState(0); // index
    const [activeQ, setActiveQ] = useState(0);
    const [userPrompt, setUserPrompt] = useState("");
    const [scores, setScores] = useState({}); // { qIndex: score }
    const [submitting, setSubmitting] = useState(false);

    const questions = level1ChallengeQuestions;

    const evaluate = () => {
        setSubmitting(true);
        const q = questions[activeQ];
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
        setTimeout(() => {
            setScores((prev) => ({ ...prev, [activeQ]: pct }));
            if (pct >= 50 && activeQ === unlockedUpTo && activeQ < questions.length - 1) {
                setUnlockedUpTo(activeQ + 1);
            }
            setSubmitting(false);
        }, 600);
    };

    const goToNext = () => {
        setActiveQ((prev) => prev + 1);
        setUserPrompt("");
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            {/* Header */}
            <header className="border-b border-border px-6 py-4 flex items-center justify-between">
                <Link
                    href={`/assessment/${level}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    ← Back to Practice
                </Link>
                <h1 className="text-lg font-semibold">
                    Level {level} —{" "}
                    <span className="text-primary">Challenge</span>
                </h1>
                <span className="text-xs text-muted-foreground">
                    {Object.keys(scores).length}/{questions.length} answered
                </span>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Left — Question List */}
                <aside className="w-72 border-r border-border p-4 overflow-y-auto flex-shrink-0">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
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
                                        ? "opacity-40 cursor-not-allowed bg-muted"
                                        : activeQ === i
                                            ? "bg-primary/15 border border-primary/30 text-foreground"
                                            : "hover:bg-secondary/60 text-muted-foreground"
                                    }`}
                            >
                                <span
                                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${answered
                                            ? scores[i] >= 50
                                                ? "bg-primary/20 text-primary"
                                                : "bg-destructive/20 text-destructive"
                                            : locked
                                                ? "bg-muted text-muted-foreground"
                                                : "bg-secondary text-foreground"
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
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                            Question {activeQ + 1} of {questions.length}
                        </p>
                        <h2 className="text-xl font-semibold leading-relaxed mb-6">
                            {questions[activeQ].question}
                        </h2>

                        {scores[activeQ] === undefined ? (
                            <>
                                <textarea
                                    className="w-full h-48 bg-muted border border-border rounded-lg p-4 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/40"
                                    placeholder="Write your prompt here…"
                                    value={userPrompt}
                                    onChange={(e) => setUserPrompt(e.target.value)}
                                />
                                <Button
                                    className="mt-4 w-full"
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
                            />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Challenge;