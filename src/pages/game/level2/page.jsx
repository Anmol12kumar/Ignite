"use client";
import { useState } from "react";

export default function Level2Page() {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");
    const [score, setScore] = useState(null);
    const [completed, setCompleted] = useState(false);

    const THRESHOLD = 50;

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulated scoring logic
        let simulatedScore = 0;
        let feedback = "";

        if (input.split(" ").length < 5) {
            simulatedScore = 40;
            feedback = "Your summary is too short. Try capturing the main idea.";
        } else if (!input.toLowerCase().includes("ai")) {
            simulatedScore = 60;
            feedback = "Good attempt, but make sure to mention AI in your summary.";
        } else {
            simulatedScore = 80;
            feedback = "Great job! Your summary is clear and concise.";
        }

        setScore(simulatedScore);
        setResponse(feedback);
        setCompleted(simulatedScore >= THRESHOLD);
    };

        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between sticky top-0 z-50">
                    <span className="font-bold text-xl">Ignite</span>
                    <div className="space-x-6">
                        <a href="/userdashboard">Dashboard</a>
                        <a href="/game">Game</a>
                        <a href="/userprofile">Profile</a>
                    </div>
                </nav>

                <header className="text-center py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
                    <h1 className="text-4xl font-extrabold mb-4">📚 Level 2: Librarian</h1>
                    <p className="text-lg max-w-2xl mx-auto">
                        Summarize the given text into a clear, concise version.
                    </p>
                </header>

                <main className="flex-grow p-10 max-w-3xl mx-auto">
                    <section className="bg-white shadow rounded p-6">
                        <h2 className="text-xl font-bold text-green-600 mb-4">Challenge</h2>
                        <p className="text-gray-700 mb-4">
                            Summarize this passage: <br />
                            <em>
                                "AI helps people by answering questions quickly and making everyday tasks easier"
                            </em>
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Write your summary here..."
                                className="w-full p-4 border rounded resize-none h-32"
                            />
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                            >
                                Submit Summary
                            </button>
                        </form>

                        {response && (
                            <div className="mt-6 bg-green-50 p-4 rounded text-green-800">
                                <strong>AI Feedback:</strong>
                                <p className="mt-2">{response}</p>
                                <p className="mt-2 font-semibold">Score: {score}/100</p>
                            </div>
                        )}

                        {completed ? (
                            <div className="mt-6 text-green-600 font-semibold">
                                ✅ Challenge Complete! Level 3 Unlocked.
                            </div>
                        ) : (
                            score !== null && (
                                <div className="mt-6 text-red-600 font-semibold">
                                    ❌ Score below threshold ({THRESHOLD}). Try again with a stronger summary.
                                </div>
                            )
                        )}
                    </section>
                </main>

                <footer className="bg-gray-900 text-white text-center py-6 mt-8">
                    <p>Built by Anmol © 2026</p>
                </footer>
            </div>
        );
    }