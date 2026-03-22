"use client";
import { useState } from "react";

export default function BossLevelPage() {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");
    const [score, setScore] = useState(null);
    const [completed, setCompleted] = useState(false);

    const THRESHOLD = 95;

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulated scoring logic
        let simulatedScore = 0;
        let feedback = "";

        if (input.trim().length < 30) {
            simulatedScore = 40;
            feedback = "Prompt bahut short hai. Boss mode ke liye detailed multi-step likhna zaroori hai.";
        } else if (!input.toLowerCase().includes("iot") && !input.toLowerCase().includes("smart")) {
            simulatedScore = 60;
            feedback = "Good attempt, but pehle step mein 'IoT kitchen device' mention karo.";
        } else if (!input.toLowerCase().includes("cook") && !input.toLowerCase().includes("recipe") && !input.toLowerCase().includes("food")) {
            simulatedScore = 70;
            feedback = "Better, but second step mein 'cooking integration' mention karo.";
        } else if (!input.toLowerCase().includes("funny") || !input.toLowerCase().includes("hinglish") || !input.toLowerCase().includes("recipe")) {
            simulatedScore = 85;
            feedback = "Almost there! Third step mein 'funny Hinglish recipe rewrite' mention karo.";
        } else {
            simulatedScore = 100;
            feedback = "🔥 Excellent! Tumhara Boss Mode Smart Kitchen prompt clear, tricky aur entertaining hai.";
        }

        setScore(simulatedScore);
        setResponse(feedback);
        setCompleted(simulatedScore >= THRESHOLD);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Navbar */}
            <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between sticky top-0 z-50">
                <span className="font-bold text-xl">Ignite</span>
                <div className="space-x-6">
                    <a href="/userdashboard">Dashboard</a>
                    <a href="/game">Game</a>
                    <a href="/userprofile">Profile</a>
                </div>
            </nav>

            {/* Hero */}
            <header className="text-center py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
                <h1 className="text-4xl font-extrabold mb-4">🍳⚡ Boss Level: Smart Kitchen Showdown</h1>
                <p className="text-lg max-w-2xl mx-auto">
                    Final challenge! Ek Hinglish prompt likho jo AI ko bole: IoT kitchen device + cooking recipe integrate karo, aur usko funny Hinglish recipe style mein rewrite karo.
                </p>
            </header>

            {/* Challenge */}
            <main className="flex-grow p-10 max-w-3xl mx-auto">
                <section className="bg-white shadow rounded p-6">
                    <h2 className="text-xl font-bold text-orange-600 mb-4">Challenge</h2>
                    <p className="text-gray-700 mb-4">
                        Ek Hinglish prompt likho jo AI ko bole: <br />
                        1. Pehle ek IoT kitchen device ka scene describe karo (jaise smart oven ya smart fridge). <br />
                        2. Phir us device ko cooking ke saath integrate karo (jaise oven apne aap pakode fry kar raha hai). <br />
                        3. Aur last mein pura scene ko rewrite karo ek funny Hinglish recipe style mein jisme IoT device chef ban jaata hai.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Write your Boss Mode Hinglish Smart Kitchen prompt here..."
                            className="w-full p-4 border rounded resize-none h-32"
                        />
                        <button
                            type="submit"
                            className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition"
                        >
                            Submit Prompt
                        </button>
                    </form>

                    {response && (
                        <div className="mt-6 bg-orange-50 p-4 rounded text-orange-800">
                            <strong>AI Feedback:</strong>
                            <p className="mt-2">{response}</p>
                            <p className="mt-2 font-semibold">Score: {score}/100</p>
                        </div>
                    )}

                    {completed ? (
                        <div className="mt-6 text-green-600 font-semibold">
                            ✅ Boss Mode Complete! 🎉 You are now the Grandmaster Chef of Ignite.
                        </div>
                    ) : (
                        score !== null && (
                            <div className="mt-6 text-red-600 font-semibold">
                                ❌ Score below threshold ({THRESHOLD}). Try again with clearer IoT + Cooking + Funny Hinglish recipe instructions.
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