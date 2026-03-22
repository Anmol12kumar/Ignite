"use client";
import { useState } from "react";

export default function Level8Page() {
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
        } else if (!input.toLowerCase().includes("description") && !input.toLowerCase().includes("song")) {
            simulatedScore = 60;
            feedback = "Good attempt, but pehle step mein 'song description' mention karo.";
        } else if (!input.toLowerCase().includes("rap")) {
            simulatedScore = 70;
            feedback = "Better, but second step mein 'rap verse' mention karo.";
        } else if (!input.toLowerCase().includes("funny") || !input.toLowerCase().includes("hinglish")) {
            simulatedScore = 80;
            feedback = "Almost there! Third step mein 'funny Hinglish rewrite' mention karo.";
        } else {
            simulatedScore = 95;
            feedback = "Excellent! Tumhara music remix Hinglish prompt clear aur imaginative hai.";
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
            <header className="text-center py-16 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
                <h1 className="text-4xl font-extrabold mb-4">🎤 Level 8: Music Remix Challenge</h1>
                <p className="text-lg max-w-2xl mx-auto">
                    Ek Hinglish prompt likho jo AI ko bole ki ek song ko remix kare teen steps mein.
                </p>
            </header>

            {/* Challenge */}
            <main className="flex-grow p-10 max-w-3xl mx-auto">
                <section className="bg-white shadow rounded p-6">
                    <h2 className="text-xl font-bold text-pink-600 mb-4">Challenge</h2>
                    <p className="text-gray-700 mb-4">
                        Ek Hinglish prompt likho jo AI ko bole: <br />
                        1. Pehle ek song ka simple description do. <br />
                        2. Phir usko expand karo ek short rap verse mein. <br />
                        3. Aur last mein us rap ko rewrite karo ek funny Hinglish style mein.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Write your multi-step Hinglish music prompt here..."
                            className="w-full p-4 border rounded resize-none h-32"
                        />
                        <button
                            type="submit"
                            className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition"
                        >
                            Submit Prompt
                        </button>
                    </form>

                    {response && (
                        <div className="mt-6 bg-pink-50 p-4 rounded text-pink-800">
                            <strong>AI Feedback:</strong>
                            <p className="mt-2">{response}</p>
                            <p className="mt-2 font-semibold">Score: {score}/100</p>
                        </div>
                    )}

                    {completed ? (
                        <div className="mt-6 text-green-600 font-semibold">
                            ✅ Challenge Complete! Level 9 Unlocked.
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