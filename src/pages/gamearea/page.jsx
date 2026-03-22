"use client";
import { useEffect, useRef, useState } from "react";

export default function GamePage() {
    // One-time reveal hook
    function useScrollReveal() {
        const ref = useRef(null);
        const [visible, setVisible] = useState(false);

        useEffect(() => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.disconnect(); // reveal only once
                    }
                },
                { threshold: 0.2 }
            );

            if (ref.current) observer.observe(ref.current);
            return () => observer.disconnect();
        }, []);

        return [ref, visible];
    }

    function RevealSection({ children, delay = 0 }) {
        const [ref, visible] = useScrollReveal();
        return (
            <div
                ref={ref}
                className={`transition-all duration-700 transform ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                style={{ transitionDelay: `${delay}ms` }}
            >
                {children}
            </div>
        );
    }

    // Levels data
    const levels = [
        { id: 1, title: "Level 1: Gatekeeper → AI Introduction", unlocked: true, completed: false },
        { id: 2, title: "Level 2: Librarian → Summarization Task", unlocked: false, completed: false },
        { id: 3, title: "Level 3: Translator’s Cave → Hinglish Translation", unlocked: false, completed: false },
        { id: 4, title: "Level 4: Teacher’s Challenge → Role-based Prompt", unlocked: false, completed: false },
        { id: 5, title: "Level 5: Puzzle Room → Multi-step Prompt", unlocked: false, completed: false },
        { id: 6, title: "Level 6: Ethics Guardian → Spot Unsafe Prompts", unlocked: false, completed: false },
        { id: 7, title: "Level 7: Creative Forge → Creative Writing Prompt", unlocked: false, completed: false },
        { id: 8, title: "Level 8: Debugger’s Dungeon → Coding Help Prompt", unlocked: false, completed: false },
        { id: 9, title: "Level 9: Interview Chamber → AI as Interviewer", unlocked: false, completed: false },
        { id: 10, title: "Level 10: Real-World Arena → Resume/Project Explanation", unlocked: false, completed: false },
        { id: 11, title: "Final Boss: Grand Engineer → Complex Chained Prompt", unlocked: false, completed: false },
    ];

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
            <header className="text-center py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <h1 className="text-4xl font-extrabold mb-4">🎮 Game Levels</h1>
                <p className="text-lg max-w-2xl mx-auto">
                    Progress through each challenge to master AI skills and earn badges!
                </p>
            </header>

            {/* Levels Grid */}
            <main className="flex-grow p-10 max-w-6xl mx-auto">
                <RevealSection delay={200}>
                    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {levels.map((level) => (
                            <div
                                key={level.id}
                                className={`p-6 rounded shadow text-center ${level.unlocked ? "bg-white" : "bg-gray-200"
                                    }`}
                            >
                                <h2 className="text-lg font-bold text-indigo-600 mb-2">
                                    {level.title}
                                </h2>
                                {level.unlocked ? (
                                    <a
                                        href={`/game/level${level.id}`}
                                        className="inline-block bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
                                    >
                                        {level.completed ? "✅ Completed" : "▶️ Play"}
                                    </a>
                                ) : (
                                    <p className="text-gray-500">🔒 Locked</p>
                                )}
                            </div>
                        ))}
                    </section>
                </RevealSection>

                {/* Progress Overview */}
                <RevealSection delay={400}>
                    <section className="mt-10 bg-white shadow rounded p-6">
                        <h2 className="text-xl font-bold text-indigo-600 mb-4">Progress</h2>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                                className="bg-indigo-600 h-4 rounded-full"
                                style={{ width: "10%" }} // Example: 1 of 11 levels completed
                            ></div>
                        </div>
                        <p className="mt-2 text-gray-600">1 of 11 levels completed (9%)</p>
                    </section>
                </RevealSection>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white text-center py-6 mt-8">
                <p>Built by Anmol © 2026</p>
            </footer>
        </div>
    );
}