"use client";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

// Helper function to decode JWT payload safely
function parseJwt (token) {
    try {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch(e) {
        return null;
    }
}

const StatCard = ({ label, value, sub }) => (
    <div className="rounded-lg border border-gray-700 bg-gray-900 p-5 text-center shadow-lg">
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-xs text-gray-400 mt-1">{label}</p>
        {sub && <p className="text-[10px] text-emerald-400 font-mono mt-1">{sub}</p>}
    </div>
);

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            const decoded = parseJwt(token);
            if (decoded && decoded._id) {
                try {
                    const res = await axios.get(`http://localhost:5000/user/getbyid/${decoded._id}`);
                    setUser(res.data);
                } catch (err) {
                    console.error("Failed to fetch user data:", err);
                }
            }
            setLoading(false);
        };
        fetchUserData();
    }, []);

    if (loading) {
        return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading Profile...</div>;
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white gap-4">
                <p>You must be logged in to view your profile.</p>
                <Link href="/login">
                    <Button variant="hero" className="bg-emerald-500 text-black">Log In</Button>
                </Link>
            </div>
        );
    }

    // Default calculations if fields are missing in DB
    const xp = user.xp || 0;
    const level = user.level || 1;
    const streak = user.streak || 0;
    const badgesTotal = Math.floor(xp / 2000); 
    const xpToNext = level * 1000;
    const xpPercent = Math.min(100, Math.round((xp / xpToNext) * 100));

    // Dynamic join date
    const joinDate = new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

    return (
        <div className="min-h-screen bg-black">
            {/* Top bar */}
            <nav className="border-b px-30 border-gray-700 bg-black/80 backdrop-blur-xl">
                <div className="container flex h-14 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-6 w-6 bg-emerald-500 rounded-md flex items-center justify-center">
                            <span className="text-white font-bold text-s font-mono">I</span>
                        </div>
                        <span className="font-semibold tracking-tight text-white">Ignite</span>
                    </Link>
                    <div className="flex gap-4 items-center">
                        <Link href="/leaderboard">
                            <span className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">Leaderboard</span>
                        </Link>
                        <Link href="/login" onClick={() => localStorage.removeItem("token")}>
                            <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">Log Out</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="container items-center justify-center mx-auto max-w-4xl py-12 px-4 space-y-10">
                {/* ── User Info ── */}
                <section className="flex flex-col sm:flex-row sm:items-start gap-6">
                    <div className="h-20 w-20 rounded-full bg-emerald-400/15 border-2 border-emerald-400/40 flex shrink-0">
                        <span className="text-3xl font-bold items-center justify-center m-auto text-emerald-400 uppercase">
                            {user.name ? user.name.charAt(0) : "U"}
                        </span>
                    </div>
                    <div className="text-center sm:text-left pt-2">
                        <h1 className="text-2xl font-bold text-white mb-1">{user.name || "Anonymous User"}</h1>
                        <p className="text-sm text-gray-400">{user.email}</p>
                        <p className="text-xs text-gray-500 mt-2">
                            Member since <span className="text-gray-300">{joinDate}</span>
                        </p>
                    </div>
                </section>

                {/* ── XP & Level ── */}
                <section className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 space-y-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="font-mono text-[13px] tracking-[0.25em] uppercase text-emerald-500 block mb-1">
                                Progress Profile
                            </span>
                            <h2 className="text-xl font-bold text-white">Level {level}</h2>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-400">
                                <span className="text-white font-semibold">{xp.toLocaleString()}</span> / {xpToNext.toLocaleString()} XP
                            </p>
                        </div>
                    </div>

                    {/* XP Bar */}
                    <div className="w-full h-3 rounded-full bg-gray-800 overflow-hidden">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.4)] transition-all duration-1000 ease-out"
                            style={{ width: `${xpPercent}%` }}
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4">
                        <StatCard label="Total Earned XP" value={xp.toLocaleString()} />
                        <StatCard label="Unlocked Badges" value={badgesTotal} />
                        <StatCard label="Current Streak" value={`${streak} 🔥`} />
                    </div>
                </section>

                {/* ── Call to action ── */}
                <section className="mt-8 flex justify-center">
                    <Link href="/Challenges">
                        <Button className="bg-emerald-500 text-black hover:bg-emerald-600 px-10 py-6 text-lg font-bold">
                            Continue Masterclass 🚀
                        </Button>
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default Profile;