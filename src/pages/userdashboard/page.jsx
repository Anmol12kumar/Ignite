"use client";
import { useEffect, useRef, useState } from "react";

export default function DashboardPage() {
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
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-white text-indigo-600 font-bold text-3xl flex items-center justify-center mb-4">
                        A
                    </div>
                    <h1 className="text-4xl font-extrabold mb-2">Welcome, Anmol 👋</h1>
                    <p className="text-lg max-w-2xl mx-auto">
                        Here's your progress and quick access to Ignite features.
                    </p>
                </div>
            </header>

            {/* Dashboard Content */}
            <main className="flex-grow p-10 max-w-5xl mx-auto">
                {/* Stats */}
                <RevealSection delay={200}>
                    <section className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white shadow rounded p-6 text-center">
                            <h2 className="text-xl font-bold text-indigo-600">Your XP</h2>
                            <p className="text-3xl font-extrabold mt-2">1200</p>
                        </div>
                        <div className="bg-white shadow rounded p-6 text-center">
                            <h2 className="text-xl font-bold text-indigo-600">Badges</h2>
                            <p className="mt-2">🚀 Innovator, 🌍 Explorer</p>
                        </div>
                        <div className="bg-white shadow rounded p-6 text-center">
                            <h2 className="text-xl font-bold text-indigo-600">Leaderboard Rank</h2>
                            <p className="text-3xl font-extrabold mt-2">#5</p>
                        </div>
                    </section>
                </RevealSection>

                {/* Progress Tracker */}
                <RevealSection delay={300}>
                    <section className="mt-10 bg-white shadow rounded p-6">
                        <h2 className="text-xl font-bold text-indigo-600 mb-4">Progress Tracker</h2>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div className="bg-indigo-600 h-4 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                        <p className="mt-2 text-gray-600">65% completed in current module</p>
                    </section>
                </RevealSection>

                {/* Quick Actions */}
                <RevealSection delay={400}>
                    <section className="mt-10 grid md:grid-cols-3 gap-6">
                        <a
                            href="/challenges"
                            className="bg-green-600 text-white p-6 rounded shadow text-center hover:bg-green-700 transition"
                        >
                            🏆 Join Weekly Challenge
                        </a>
                        {/* ✅ New Start Learning Button */}
                        <a
                            href="/gamearea"
                            className="bg-blue-600 text-white p-6 rounded shadow text-center hover:bg-blue-700 transition"
                        >
                            🚀 Start Learning
                        </a>
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