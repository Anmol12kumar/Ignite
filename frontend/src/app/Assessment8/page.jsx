"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import ChatButton from "@/components/ChatButton";
import { level8Questions } from "@/data/level8Questions";

const Assessment8 = () => {
    const [selectedQ, setSelectedQ] = useState(null);
    const [userPrompt, setUserPrompt] = useState("");
    const [feedback, setFeedback] = useState(null);
    const [completedQs, setCompletedQs] = useState(new Set());
    const [dividerPos, setDividerPos] = useState(40);
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [voiceStatus, setVoiceStatus] = useState("");
    const containerRef = useRef(null);
    const dragging = useRef(false);
    const recognitionRef = useRef(null);

    // Initialize speech recognition
    useEffect(() => {
        if (typeof window !== "undefined") {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.lang = "en-US";

                recognition.onstart = () => {
                    setIsListening(true);
                    setVoiceStatus("🎤 Listening...");
                };

                recognition.onresult = (event) => {
                    let interimTranscript = "";
                    let finalTranscript = "";

                    for (let i = event.resultIndex; i < event.results.length; i++) {
                        const transcript = event.results[i][0].transcript;
                        if (event.results[i].isFinal) {
                            finalTranscript += transcript + " ";
                        } else {
                            interimTranscript += transcript;
                        }
                    }

                    if (finalTranscript) {
                        setUserPrompt((prev) => prev + finalTranscript);
                        setFeedback(null);
                    }

                    if (interimTranscript) {
                        setVoiceStatus(`🎤 ${interimTranscript}`);
                    }
                };

                recognition.onerror = (event) => {
                    setVoiceStatus(`❌ Error: ${event.error}`);
                    console.error("Speech recognition error:", event.error);
                };

                recognition.onend = () => {
                    setIsListening(false);
                    setVoiceStatus("");
                };

                recognitionRef.current = recognition;
            }
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.abort();
            }
        };
    }, []);

    const toggleVoiceInput = () => {
        if (!recognitionRef.current) {
            setVoiceStatus("❌ Voice recognition not supported");
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
            setVoiceStatus("");
        } else {
            recognitionRef.current.start();
        }
    };

    const onMouseDown = useCallback((e) => {
        e.preventDefault();
        dragging.current = true;
        const onMouseMove = (e) => {
            if (!dragging.current || !containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const pct = ((e.clientX - rect.left) / rect.width) * 100;
            setDividerPos(Math.min(70, Math.max(25, pct)));
        };
        const onMouseUp = () => {
            dragging.current = false;
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    }, []);

    const handleSubmit = async () => {
        if (!userPrompt.trim()) return;
        const q = level8Questions.find((q) => q.id === selectedQ);
        if (!q) return;

        setIsEvaluating(true);
        setFeedback(null);

        const evaluateWithRetry = async (retries = 3) => {
            for (let attempt = 1; attempt <= retries; attempt++) {
                try {
                    const controller = new AbortController();
                    const timeout = setTimeout(() => controller.abort(new Error("Request timeout after 30s")), 30000); // 30s timeout per attempt
                    
                    try {
                        const res = await fetch("http://localhost:5000/evaluate", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                userPrompt,
                                question: q.question,
                                sampleAnswer: q.sampleAnswer,
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
            const passed = pct >= 75;
            
            setFeedback({
                pct,
                matched: data.matched || [],
                missed: data.missed || [],
                suggestions: data.suggestions,
                sampleAnswer: q.sampleAnswer,
                passed
            });
            
            if (passed) {
                setCompletedQs((prev) => new Set([...prev, selectedQ]));
            }
        } catch (err) {
            console.warn("Evaluation error, falling back to basic matching:", err.message);
            const promptLower = userPrompt.toLowerCase();
            let score = 0;
            const matched = [];
            const missed = [];

            q.keyPoints.forEach((point) => {
                const keywords = point.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
                const hit = keywords.some((kw) => promptLower.includes(kw));
                if (hit) { score++; matched.push(point); } else { missed.push(point); }
            });

            const pct = Math.round((score / q.keyPoints.length) * 100);
            const passed = pct >= 75;
            setFeedback({ pct, matched, missed, sampleAnswer: q.sampleAnswer, passed });
            if (passed) {
                setCompletedQs((prev) => new Set([...prev, selectedQ]));
            }
        } finally {
            setIsEvaluating(false);
        }
    };

    const activeQuestion = level8Questions.find((q) => q.id === selectedQ);
    const completionPct = Math.round((completedQs.size / level8Questions.length) * 100);
    const isLastQuestion = selectedQ === level8Questions[level8Questions.length - 1].id;
    const allCompleted = completedQs.size === level8Questions.length;

    return (
        <div className="h-screen flex flex-col bg-black text-white">
            {/* Top bar */}
            <nav className="flex-shrink-0 px-30 border-b border-gray-700 bg-black/80 backdrop-blur-xl z-50">
                <div className="container flex h-14 items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/Challenges" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <span className="text-lg">←</span>
                            <span className="text-sm hover:text-gray-500 font-medium">Back</span>
                        </Link>
                        <div className="h-5 w-px bg-gray-700/60" />
                        <div className="flex items-center gap-2">
                            <span className="text-lg">🚪</span>
                            <span className="font-semibold tracking-tight">Level 8 — Music Remix Challenge</span>
                        </div>
                    </div>
                    {/* Progress bar */}
                    <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-gray-500">
                            {completedQs.size}/{level8Questions.length} practiced
                        </span>
                        <div className="w-32 h-2 rounded-full bg-muted overflow-hidden">
                            <div
                                className="h-full rounded-full border-b-gray-600 bg-linear-to-r from-emerald-500 to-emerald-700 transition-all duration-500"
                                style={{ width: `${completionPct}%` }}
                            />
                        </div>
                        <span className="font-mono text-xs font-bold text-emerald-600">{completionPct}%</span>
                    </div>
                </div>
            </nav>

            {/* Split pane */}
            <div ref={containerRef} className="flex-1 flex overflow-hidden relative select-none">
                {/* Left panel — Questions */}
                <div className="overflow-y-auto border-r-0" style={{ width: `${dividerPos}%` }}>
                    <div className="p-6">
                        <h2 className="font-mono text-[11px] tracking-[0.2em] uppercase text-emerald-400 mb-4">
                            Practice Questions
                        </h2>
                        <div className="space-y-2">
                            {level8Questions.map((q, index) => {
                                const isUnlocked = index === 0 || completedQs.has(level8Questions[index - 1].id);
                                return (
                                    <button
                                        key={q.id}
                                        onClick={() => {
                                            if (isUnlocked) {
                                                setSelectedQ(q.id); setUserPrompt(""); setFeedback(null);
                                            }
                                        }}
                                        disabled={!isUnlocked}
                                        className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${!isUnlocked
                                            ? "opacity-50 cursor-not-allowed border-gray-800 bg-gray-900/40"
                                            : selectedQ === q.id
                                                ? "border-emerald-400 bg-emerald-400/10 shadow-[0_0_20px_-8px_rgba(16,185,129,0.4)] scale-105"
                                                : "border-gray-700 bg-gray-900 hover:-translate-y-1 hover:border-emerald-400/50 hover:bg-gray-800/60 hover:shadow-lg hover:shadow-emerald-500/10"
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <span
                                                className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold ${!isUnlocked ? "bg-gray-800 text-gray-600" :
                                                    completedQs.has(q.id)
                                                        ? "bg-primary text-primary-foreground"
                                                        : selectedQ === q.id
                                                            ? "bg-emerald-400 text-black"
                                                            : "bg-gray-700 text-gray-400"
                                                    }`}>
                                                {!isUnlocked ? '🔒' : completedQs.has(q.id) ? "✓" : q.id}
                                            </span>
                                            <div>
                                                <p className={`text-sm leading-relaxed ${!isUnlocked ? "text-gray-600" : selectedQ === q.id ? "text-white" : "text-gray-400"}`}>
                                                    {q.question}
                                                </p>
                                                <p className={`text-xs mt-2 italic ${!isUnlocked ? "text-gray-700" : "text-gray-400"}`}>💡 {q.hint}</p>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Draggable divider */}
                <div
                    onMouseDown={onMouseDown}
                    className="w-2 flex-shrink-0 bg-gray-700/30 hover:bg-emerald-400/40 active:bg-emerald-400/60 cursor-col-resize transition-colors duration-150 relative z-10 flex items-center justify-center"
                >
                    <div className="w-1 h-10 rounded-full bg-gray-400/30" />
                </div>

                {/* Right panel — Answer area */}
                <div className="flex-1 overflow-y-auto">
                    {!activeQuestion ? (
                        <div className="h-full flex items-center justify-center">
                            <div className="text-center">
                                <span className="text-5xl block mb-4">👈</span>
                                <p className="text-gray-400 text-sm">Select a question to start practicing</p>
                            </div>
                        </div>
                    ) : (
                        <div className="p-6 max-w-2xl">
                            {/* Question display */}
                            <div className="mb-6">
                                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-emerald-400 mb-2 block">
                                    Question {activeQuestion.id}
                                </span>
                                <h3 className="text-lg font-semibold mb-1 text-white">{activeQuestion.question}</h3>
                            </div>

                            {/* Sample answer (always visible) */}
                            <div className="mb-6 rounded-xl border border-emerald-600
                            bg-emerald-950/90 p-5">
                                <h4 className="text-s font-mono uppercase tracking-wider text-emerald-600 mb-3 flex items-center gap-2">
                                    📝 Sample Answer
                                </h4>
                                <pre className="text-sm text-gray-400 whitespace-pre-wrap font-mono leading-relaxed">
                                    {activeQuestion.sampleAnswer}
                                </pre>
                                <div className="mt-4 pt-3 border-t border-primary/10">
                                    <h5 className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">Key Points to Include:</h5>
                                    <ul className="space-y-1">
                                        {activeQuestion.keyPoints.map((point, i) => (
                                            <li key={i} className="text-s text-gray-500 flex items-start gap-2">
                                                <span className="text-emerald-600 mb-0.5">•</span> {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Prompt input */}
                            <div className="mb-4">
                                <label className="text-xs font-mono text-gray-400 mb-2 block uppercase tracking-wider">
                                    Now Try It Yourself
                                </label>
                                <div className="flex gap-3">
                                    {/* Textarea */}
                                    <textarea
                                        value={userPrompt}
                                        onChange={(e) => { setUserPrompt(e.target.value); setFeedback(null); }}
                                        placeholder="Write your own prompt based on the example above..."
                                        rows={6}
                                        className="flex-1 rounded-lg border border-gray-700 bg-gray-900 p-4 text-sm text-white placeholder:text-gray-400/50 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 focus:shadow-xl focus:shadow-emerald-500/20 resize-none transition-all duration-300 focus:scale-[1.01]"
                                    />

                                    {/* Voice Input Button */}
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={toggleVoiceInput}
                                            className={`p-3 rounded-lg border-2 transition-all duration-300 flex items-center justify-center h-14 w-14 hover:-translate-y-1 hover:shadow-lg active:scale-95 ${
                                                isListening
                                                    ? "border-red-500 bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:shadow-red-500/20 animate-pulse"
                                                    : "border-blue-500/50 bg-blue-500/10 text-blue-400 hover:border-blue-400 hover:bg-blue-500/30 hover:shadow-lg hover:shadow-blue-500/20"
                                            }`}
                                            title={isListening ? "Click to stop recording" : "Click to enable voice input"}
                                        >
                                            <span className="text-xl">{isListening ? "🎤" : "🎙️"}</span>
                                        </button>

                                        {/* Voice Status Display */}
                                        {voiceStatus && (
                                            <div className="p-2 rounded-lg bg-blue-900/30 border border-blue-500/30 text-center">
                                                <p className="text-xs text-blue-300 truncate">{voiceStatus}</p>
                                            </div>
                                        )}

                                        {/* Voice Help Text */}
                                        {!isListening && (
                                            <div className="text-xs text-gray-500 text-center">
                                                <p>Click to activate</p>
                                                <p>voice input</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <Button disabled={isEvaluating} onClick={handleSubmit} variant="hero" size="lg" className="w-full mb-8 bg-emerald-400 text-black hover:bg-emerald-500 shadow-md hover:shadow-2xl hover:shadow-emerald-500/30 hover:-translate-y-1 active:scale-95 transition-all duration-300 disabled:opacity-75">
                                {isEvaluating ? "Analyzing with AI..." : "Submit & Check Accuracy"}
                            </Button>

                            {/* Feedback */}
                            {feedback && (
                                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className={`rounded-xl border p-5 ${feedback.pct >= 75 ? "border-emerald-400/40 bg-emerald-400/10"
                                        : feedback.pct >= 50 ? "border-yellow-500/40 bg-yellow-500/10"
                                            : "border-red-500/40 bg-red-500/10"
                                        }`}>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-2xl">{feedback.pct >= 75 ? "🎯" : feedback.pct >= 50 ? "🔶" : "🔴"}</span>
                                            <div>
                                                <span className="text-2xl font-bold text-white">{feedback.pct}%</span>
                                                <span className="text-sm text-gray-400 ml-2">accuracy</span>
                                            </div>
                                        </div>
                                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                                            <div className={`h-full rounded-full transition-all duration-700 ${feedback.pct >= 75 ? "bg-emerald-400" : feedback.pct >= 50 ? "bg-yellow-500" : "bg-red-500"
                                                }`} style={{ width: `${feedback.pct}%` }} />
                                        </div>
                                    </div>

                                    {feedback.matched.length > 0 && (
                                        <div>
                                            <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">✓ What you got right</h4>
                                            <ul className="space-y-1">
                                                {feedback.matched.map((p, i) => (
                                                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                                                        <span className="text-emerald-400 mt-0.5">✓</span> {p}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {feedback.missed.length > 0 && (
                                        <div>
                                            <h4 className="text-xs font-mono uppercase tracking-wider text-red-500 mb-2">✗ What to improve</h4>
                                            <ul className="space-y-1">
                                                {feedback.missed.map((p, i) => (
                                                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                                                        <span className="text-red-500 mt-0.5">✗</span> {p}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {feedback.suggestions && (
                                        <div className="mt-4 p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/40">
                                            <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-2 flex items-center gap-2">✨ AI Suggestions</h4>
                                            <p className="text-sm text-indigo-200 leading-relaxed">{feedback.suggestions}</p>
                                        </div>
                                    )}

                                    {!feedback.passed && (
                                        <div className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/40 text-center">
                                            <p className="text-red-400 font-semibold mb-1">Score below 80%</p>
                                            <p className="text-sm text-red-300">You missed some important keywords. Please review the missing points above and retry to unlock the next question!</p>
                                        </div>
                                    )}

                                    {feedback.passed && !isLastQuestion && (
                                        <div className="mt-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/40 text-center flex flex-col items-center">
                                            <p className="text-emerald-400 font-semibold mb-1">Great job! (Score {feedback.pct}%)</p>
                                            <p className="text-sm text-emerald-300 mb-4">You've successfully answered this question. You can now attempt the next question.</p>
                                            <Button
                                                onClick={() => {
                                                    const currentIndex = level8Questions.findIndex(q => q.id === selectedQ);
                                                    const nextQ = level8Questions[currentIndex + 1];
                                                    if (nextQ) {
                                                        setSelectedQ(nextQ.id);
                                                        setUserPrompt("");
                                                        setFeedback(null);
                                                    }
                                                }}
                                                className="w-full bg-emerald-600 text-white hover:bg-emerald-500"
                                            >
                                                Next Question ➡️
                                            </Button>
                                        </div>
                                    )}

                                    {/* Ready button on last question when all completed */}
                                    {isLastQuestion && allCompleted && feedback.passed && (
                                        <div className="mt-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/40 text-center flex flex-col items-center">
                                            <p className="text-emerald-400 font-semibold mb-1">Level Complete!</p>
                                            <p className="text-sm text-emerald-300 mb-4">You have successfully mastered all questions in Level 8.</p>
                                            <Link href="/challenge8" className="w-full">
                                                <Button size="lg" className="w-full text-fuchsia-600 decoration-wavy decoration-fuchsia-800 font-semibold">
                                                    🚀 Ready for the Eighth Challenge
                                                </Button>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <ChatButton />
        </div>
    );
};

export default Assessment8;