"use client";
import { useEffect, useRef, useState } from "react";

export default function UserProfilePage() {
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

    // Example user data (replace with backend later)
    const [username, setUsername] = useState("Anmol");
    const [email, setEmail] = useState("anmol@example.com");
    const [xp, setXp] = useState(1200);
    const [rank, setRank] = useState(5);
    const [badges, setBadges] = useState(["🚀 Innovator", "🌍 Explorer"]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Navbar */}
            <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between sticky top-0 z-50">
                <span className="font-bold text-xl">Ignite</span>
                <div className="space-x-6">
                    <a href="/userdashboard">Dashboard</a>
                    <a href="/leaderboard">Leaderboard</a>
                </div>
            </nav>

            {/* Hero */}
            <header className="text-center py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-white text-indigo-600 font-bold text-4xl flex items-center justify-center mb-4">
                        {username.charAt(0)}
                    </div>
                    <h1 className="text-4xl font-extrabold mb-2">{username}’s Profile</h1>
                    <p className="text-lg max-w-2xl mx-auto">Your identity, stats, and achievements in Ignite.</p>
                </div>
            </header>

            {/* Profile Content */}
            <main className="flex-grow p-10 max-w-4xl mx-auto space-y-10">
                {/* User Info */}
                <RevealSection delay={200}>
                    <section className="bg-white shadow rounded p-6">
                        <h2 className="text-xl font-bold text-indigo-600 mb-4">User Info</h2>
                        <p className="text-gray-700"><strong>Username:</strong> {username}</p>
                        <p className="text-gray-700"><strong>Email:</strong> {email}</p>
                    </section>
                </RevealSection>

                {/* Stats */}
                <RevealSection delay={200}>
                    <section className="bg-white shadow rounded p-6 grid md:grid-cols-2 gap-6 text-center">
                        <div>
                            <h2 className="text-xl font-bold text-indigo-600">XP</h2>
                            <p className="text-3xl font-extrabold mt-2">{xp}</p>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-indigo-600">Leaderboard Rank</h2>
                            <p className="text-3xl font-extrabold mt-2">#{rank}</p>
                        </div>
                    </section>
                </RevealSection>

                {/* Badges */}
                <RevealSection delay={200}>
                    <section className="bg-white shadow rounded p-6">
                        <h2 className="text-xl font-bold text-indigo-600 mb-4">Badges</h2>
                        <div className="flex flex-wrap gap-4">
                            {badges.map((badge, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full font-semibold"
                                >
                                    {badge}
                                </span>
                            ))}
                        </div>
                    </section>
                </RevealSection>

                {/* Recent Activity */}
                <RevealSection delay={200}>
                    <section className="bg-white shadow rounded p-6">
                        <h2 className="text-xl font-bold text-indigo-600 mb-4">Recent Activity</h2>
                        <ul className="text-gray-700 space-y-2">
                            <li>✅ Completed Quiz: Arrays & Loops</li>
                            <li>📘 Viewed Lesson: JavaScript Variables</li>
                            <li>🎖 Earned Badge: Explorer</li>
                        </ul>
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