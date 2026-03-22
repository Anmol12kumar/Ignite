"use client";
import { useEffect, useRef, useState } from "react";

export default function LeaderboardPage() {
    
    // 🔥 Scroll reveal hook
    function useScrollReveal() {
        const ref = useRef(null);
        const [visible, setVisible] = useState(false);

        useEffect(() => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.unobserve(entry.target);
                    }
                },
                { threshold: 0.2 }
            );

            if (ref.current) observer.observe(ref.current);
            return () => observer.disconnect();
        }, []);

        return [ref, visible];
    }

    // 🔥 Reveal wrapper
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

    // ✅ Leaderboard data
    const leaderboard = [
        { rank: 1, name: "Aarav", xp: 1200, badge: "🚀 Innovator" },
        { rank: 2, name: "Meera", xp: 1100, badge: "🌐 Explorer" },
        { rank: 3, name: "Rohan", xp: 950, badge: "⭐ Beginner" },
        { rank: 4, name: "Ishita", xp: 900, badge: "🧊 Learner" },
        { rank: 5, name: "Kabir", xp: 850, badge: "🎯 Challenger" },
    ];

    // 🔍 Search state
    const [searchTerm, setSearchTerm] = useState("");

    const filteredLeaderboard = leaderboard.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.badge.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between sticky top-0 z-50">
                <span className="font-bold text-xl">Ignite</span>
                <div className="space-x-6">
                    <a href="/">Home</a>
                    <a href="/leaderboard">Leaderboard</a>
                    <a href="#">Login</a>
                </div>
            </nav>

            {/* Hero */}
            <header className="text-center py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <h1 className="text-5xl font-extrabold mb-6">🏆 Leaderboard</h1>
                <p className="mb-8 text-lg max-w-3xl mx-auto">
                    Track your progress and see how you rank among other learners.
                </p>
            </header>

            {/* Leaderboard Section */}
            <main className="p-10 max-w-5xl mx-auto">
                <RevealSection delay={200}>
                    <section className="p-10 bg-white shadow rounded">
                        <h2 className="text-2xl font-bold mb-6 text-center">Top Learners</h2>

                        {/* Search Bar */}
                        <div className="mb-6 text-center">
                            <input
                                type="text"
                                placeholder="Search by name or badge..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="px-4 py-2 w-full max-w-md border rounded shadow-sm focus:outline-none focus:ring focus:border-indigo-300"
                            />
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full table-fixed text-left border-collapse">
                                <thead className="bg-indigo-600 text-white">
                                    <tr>
                                        <th className="w-1/6 px-6 py-3">Rank</th>
                                        <th className="w-1/3 px-6 py-3">Name</th>
                                        <th className="w-1/3 px-6 py-3">XP</th>
                                        <th className="w-1/3 px-6 py-3">Badge</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredLeaderboard.length > 0 ? (
                                        filteredLeaderboard.map((user, i) => (
                                            <tr key={i} className="border-b hover:bg-indigo-50 transition">
                                                <td className="px-6 py-3 font-bold text-indigo-600">{user.rank}</td>
                                                <td className="px-6 py-3">{user.name}</td>
                                                <td className="px-6 py-3">{user.xp}</td>
                                                <td className="px-6 py-3">{user.badge}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-6 text-center text-gray-500">
                                                No matching learners found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
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