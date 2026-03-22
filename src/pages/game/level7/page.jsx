"use client";
import { useState } from "react";

export default function Level7Page() {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");
    const [score, setScore] = useState(null);
    const [completed, setCompleted] = useState(false);

    const THRESHOLD = 75;

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulated scoring logic
        let simulatedScore = 0;
        let feedback = "";

        if (input.trim().length < 20) {
            simulatedScore = 40;
            feedback = "Prompt bahut short hai. Multi-step instructions clearly likho.";
        } else if (!input.toLowerCase().includes("fridge")) {
            simulatedScore = 60;
            feedback = "Good attempt, but pehle step mein 'smart fridge' mention karo.";
        } else if (!input.toLowerCase().includes("light")) {
            simulatedScore = 70;
            feedback = "Better, but second step mein 'smart light' mention karo.";
        } else if (!input.toLowerCase().includes("watch")) {
            simulatedScore = 80;
            feedback = "Almost there! Third step mein 'smart watch' reminder mention karo.";
        } else {
            simulatedScore = 90;
            feedback = "Excellent! Tumhara IoT multi-step Hinglish prompt clear aur imaginative hai.";
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
            <header className="text-center py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <h1 className="text-4xl font-extrabold mb-4">📡 Level 7: IoT Collaboration Challenge</h1>
                <p className="text-lg max-w-2xl mx-auto">
                    Ek Hinglish prompt likho jo AI ko multiple IoT devices ke role play karne ko bole.
                </p>
            </header>

            {/* Challenge */}
            <main className="flex-grow p-10 max-w-3xl mx-auto">
                <section className="bg-white shadow rounded p-6">
                    <h2 className="text-xl font-bold text-indigo-600 mb-4">Challenge</h2>
                    <p className="text-gray-700 mb-4">
                        Ek Hinglish prompt likho jo AI ko bole: <br />
                        1. Pehle ek smart fridge ka role play karo jo human ko doodh khatam hone ki warning deta hai. <br />
                        2. Phir ek smart light ka role play karo jo fridge ke message ke baad blink karta hai. <br />
                        3. Aur last mein ek smart watch ka role play karo jo human ko reminder bhejta hai doodh kharidne ka.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Write your IoT multi-step Hinglish prompt here..."
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
                            ✅ Challenge Complete! Level 8 Unlocked.
                        </div>
                    ) : (
                        score !== null && (
                            <div className="mt-6 text-red-600 font-semibold">
                                ❌ Score below threshold ({THRESHOLD}). Try again with clearer IoT multi-step Hinglish instructions.
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