"use client";
import { useState } from "react";

export default function Level4Page() {
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

        if (input.trim().length < 10) {
            simulatedScore = 40;
            feedback = "Your explanation is too short. Try adding more details.";
        } else if (!input.toLowerCase().includes("photosynthesis")) {
            simulatedScore = 60;
            feedback = "Good attempt, but make sure to include the word 'photosynthesis'.";
        } else if (!input.toLowerCase().includes("plants") && !input.toLowerCase().includes("sunlight")) {
            simulatedScore = 70;
            feedback = "Better, but mention how plants use sunlight in photosynthesis.";
        } else {
            simulatedScore = 90;
            feedback = "Excellent! Your teacher-style explanation is clear and beginner-friendly.";
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
            <header className="text-center py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <h1 className="text-4xl font-extrabold mb-4">🎓 Level 4: Teacher’s Challenge</h1>
                <p className="text-lg max-w-2xl mx-auto">
                    Imagine you are a teacher. Write a prompt that explains photosynthesis in simple words.
                </p>
            </header>

            {/* Challenge */}
            <main className="flex-grow p-10 max-w-3xl mx-auto">
                <section className="bg-white shadow rounded p-6">
                    <h2 className="text-xl font-bold text-blue-600 mb-4">Challenge</h2>
                    <p className="text-gray-700 mb-4">
                        Write a teacher-style explanation of photosynthesis that a beginner can understand.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Photosynthesis is the process by which plants..."
                            className="w-full p-4 border rounded resize-none h-32"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Submit Explanation
                        </button>
                    </form>

                    {response && (
                        <div className="mt-6 bg-blue-50 p-4 rounded text-blue-800">
                            <strong>AI Feedback:</strong>
                            <p className="mt-2">{response}</p>
                            <p className="mt-2 font-semibold">Score: {score}/100</p>
                        </div>
                    )}

                    {completed ? (
                        <div className="mt-6 text-green-600 font-semibold">
                            ✅ Challenge Complete! Level 5 Unlocked.
                        </div>
                    ) : (
                        score !== null && (
                            <div className="mt-6 text-red-600 font-semibold">
                                ❌ Score below threshold ({THRESHOLD}). Try again with a clearer teacher-style explanation.
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