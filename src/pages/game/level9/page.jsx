"use client";
import { useState } from "react";

export default function Level9Page() {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");
    const [score, setScore] = useState(null);
    const [completed, setCompleted] = useState(false);

    const THRESHOLD = 90;

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulated scoring logic
        let simulatedScore = 0;
        let feedback = "";

        if (input.trim().length < 20) {
            simulatedScore = 40;
            feedback = "Prompt bahut short hai. Multi-step instructions clearly likho.";
        } else if (!input.toLowerCase().includes("riddle")) {
            simulatedScore = 60;
            feedback = "Good attempt, but pehle step mein 'number riddle' mention karo.";
        } else if (!input.toLowerCase().includes("explain") && !input.toLowerCase().includes("answer")) {
            simulatedScore = 70;
            feedback = "Better, but second step mein 'answer explain' mention karo.";
        } else if (!input.toLowerCase().includes("funny") || !input.toLowerCase().includes("hinglish")) {
            simulatedScore = 80;
            feedback = "Almost there! Third step mein 'funny Hinglish rewrite' mention karo.";
        } else {
            simulatedScore = 95;
            feedback = "Excellent! Tumhara Puzzle Prompt Hinglish challenge clear aur imaginative hai.";
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
            <header className="text-center py-16 bg-gradient-to-r from-green-600 to-teal-600 text-white">
                <h1 className="text-4xl font-extrabold mb-4">🧩 Level 9: Puzzle Prompt Challenge</h1>
                <p className="text-lg max-w-2xl mx-auto">
                    Ek Hinglish prompt likho jo AI ko bole: Pehle ek number riddle banao, phir uska answer step by step explain karo, aur last mein us riddle ko funny Hinglish style mein rewrite karo.
                </p>
            </header>

            {/* Challenge */}
            <main className="flex-grow p-10 max-w-3xl mx-auto">
                <section className="bg-white shadow rounded p-6">
                    <h2 className="text-xl font-bold text-green-600 mb-4">Challenge</h2>
                    <p className="text-gray-700 mb-4">
                        Ek Hinglish prompt likho jo AI ko bole: <br />
                        1. Pehle is riddle ko fill karo jo numbers ke logic pe based ho (jaise 2, 4, 8, ?, ?, ?). <br />
                        2. Phir us riddle ka answer explain karo step by step. <br />
                        3. Aur last mein us riddle ko rewrite karo ek funny Hinglish style mein.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Write your multi-step Hinglish puzzle prompt here..."
                            className="w-full p-4 border rounded resize-none h-32"
                        />
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                        >
                            Submit Prompt
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
                            ✅ Challenge Complete! Level 10 Unlocked.
                        </div>
                    ) : (
                        score !== null && (
                            <div className="mt-6 text-red-600 font-semibold">
                                ❌ Score below threshold ({THRESHOLD}). Try again with clearer multi-step Hinglish instructions.
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