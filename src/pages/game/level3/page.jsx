"use client";
import { useState } from "react";

export default function Level3Page() {
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

        if (input.trim().length < 8) {
            simulatedScore = 40;
            feedback = "Your translation is too short. Try covering the full sentence.";
        } else if (!input.toLowerCase().includes("ai") || !input.toLowerCase().includes("future")) {
            simulatedScore = 60;
            feedback = "Good attempt, but make sure to mention both 'AI' and 'future' in your translation.";
        } else {
            simulatedScore = 85;
            feedback = "Excellent! You captured both ideas clearly in Hinglish.";
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
            <header className="text-center py-16 bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
                <h1 className="text-4xl font-extrabold mb-4">🌐 Level 3: Translator’s Cave</h1>
                <p className="text-lg max-w-2xl mx-auto">
                    Translate the given Hindi sentence into Hinglish (mix of Hindi + English).
                </p>
            </header>

            {/* Challenge */}
            <main className="flex-grow p-10 max-w-3xl mx-auto">
                <section className="bg-white shadow rounded p-6">
                    <h2 className="text-xl font-bold text-yellow-600 mb-4">Challenge</h2>
                    <p className="text-gray-700 mb-4">
                        Translate this sentence: <br />
                        <em>"AI ke bina toh aaj kal kaam karna mushkil ho gaya hai, jaise bina bijli ke ghar andhera."</em>
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Write your Hinglish translation here..."
                            className="w-full p-4 border rounded resize-none h-32"
                        />
                        <button
                            type="submit"
                            className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700 transition"
                        >
                            Submit Translation
                        </button>
                    </form>

                    {response && (
                        <div className="mt-6 bg-yellow-50 p-4 rounded text-yellow-800">
                            <strong>AI Feedback:</strong>
                            <p className="mt-2">{response}</p>
                            <p className="mt-2 font-semibold">Score: {score}/100</p>
                        </div>
                    )}

                    {completed ? (
                        <div className="mt-6 text-green-600 font-semibold">
                            ✅ Challenge Complete! Level 4 Unlocked.
                        </div>
                    ) : (
                        score !== null && (
                            <div className="mt-6 text-red-600 font-semibold">
                                ❌ Score below threshold ({THRESHOLD}). Try again with a better translation.
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
