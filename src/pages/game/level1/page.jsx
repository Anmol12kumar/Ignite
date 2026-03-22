"use client";
import { useState } from "react";

export default function Level1Page() {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");
    const [score, setScore] = useState(null);
    const [completed, setCompleted] = useState(false);

    const THRESHOLD = 55; // minimum score required to unlock next level

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simulated AI evaluation logic (replace with real AI API later)
        let simulatedScore = 0;
        let feedback = "";

        if (input.trim().length < 10) {
            simulatedScore = 30;
            feedback = "Your introduction is too short. Try adding your name and what you want to learn.";
        } else if (input.toLowerCase().includes("anmol")) {
            simulatedScore = 50 ;
            feedback = "Good attempt, but be more specific about yourself and your learning goals.";
        } else {
            simulatedScore = 80;
            feedback = "Great introduction! You clearly stated who you are and your goal.";
        }

        setScore(simulatedScore);
        setResponse(feedback);

        if (simulatedScore >= THRESHOLD) {
            setCompleted(true); // unlock next level
        } else {
            setCompleted(false); // must try again
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Navbar */}
            <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between sticky top-0 z-50">
                <span className="font-bold text-xl">Ignite</span>
                <div className="space-x-6">
                    <a href="/userdashboard">Dashboard</a>
                    <a href="/leaderboard">Leaderboard</a>
                    <a href="/userprofile">Profile</a>
                </div>
            </nav>

            {/* Hero */}
            <header className="text-center py-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <h1 className="text-4xl font-extrabold mb-4">🗝️ Level 1: Gatekeeper</h1>
                <p className="text-lg max-w-2xl mx-auto">
                    Introduce yourself to the AI. This is your first step in mastering prompt crafting.
                </p>
            </header>

            {/* Challenge */}
            <main className="flex-grow p-10 max-w-3xl mx-auto">
                <section className="bg-white shadow rounded p-6">
                    <h2 className="text-xl font-bold text-indigo-600 mb-4">Challenge</h2>
                    <p className="text-gray-700 mb-4">
                        Write a prompt that introduces yourself to the AI. Be clear, friendly, and specific.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Hi AI, I'm Anmol and I want to learn how to..."
                            className="w-full p-4 border rounded resize-none h-32"
                        />
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
                        >
                            Submit Prompt
                        </button>
                    </form>

                    {response && (
                        <div className="mt-6 bg-indigo-50 p-4 rounded text-indigo-800">
                            <strong>AI Feedback:</strong>
                            <p className="mt-2">{response}</p>
                            <p className="mt-2 font-semibold">Score: {score}/100</p>
                        </div>
                    )}

                    {completed ? (
                        <div className="mt-6 text-green-600 font-semibold">
                            ✅ Challenge Complete! Level 2 Unlocked.
                        </div>
                    ) : (
                        score !== null && (
                            <div className="mt-6 text-red-600 font-semibold">
                                ❌ Score below threshold ({THRESHOLD}). Try again with a stronger prompt.
                            </div>
                        )
                    )}
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white text-center py-6 mt-8">
                <p>Built by Anmol © 2026</p>
            </footer>
        </div>
    );
}