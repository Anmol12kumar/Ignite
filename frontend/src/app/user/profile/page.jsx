"use client";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

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

const PROFESSION_ICONS = {
    student: "🎓", teacher: "📚", developer: "💻", marketer: "📣",
    researcher: "🔬", healthcare: "🏥", "legal-finance": "⚖️", other: "🌐",
};
const EXPERIENCE_COLORS = {
    beginner: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
    intermediate: "text-orange-400 bg-orange-400/10 border-orange-400/30",
    advanced: "text-purple-400 bg-purple-400/10 border-purple-400/30",
};

const StatCard = ({ label, value }) => (
    <div className="rounded-lg border border-gray-700 bg-gray-900 p-5 text-center shadow-lg">
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-xs text-gray-400 mt-1">{label}</p>
    </div>
);

const PROFESSIONS = [
    { value: "student", label: "Student", icon: "🎓" },
    { value: "teacher", label: "Teacher", icon: "📚" },
    { value: "developer", label: "Developer", icon: "💻" },
    { value: "marketer", label: "Marketer", icon: "📣" },
    { value: "researcher", label: "Researcher", icon: "🔬" },
    { value: "healthcare", label: "Healthcare", icon: "🏥" },
    { value: "legal-finance", label: "Legal / Finance", icon: "⚖️" },
    { value: "other", label: "Other", icon: "🌐" },
];
const DOMAINS_ALL = ["general", "science", "technology", "engineering", "business", "education", "healthcare", "arts", "law", "finance", "marketing", "other"];
const EXPERIENCE_LEVELS = [
    { value: "beginner", label: "Beginner", icon: "🌱" },
    { value: "intermediate", label: "Intermediate", icon: "🔥" },
    { value: "advanced", label: "Advanced", icon: "⚡" },
];

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editingProfile, setEditingProfile] = useState(false);
    const [editData, setEditData] = useState({ profession: "", domain: "", experienceLevel: "" });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (!token) { setLoading(false); return; }
            const decoded = parseJwt(token);
            if (decoded && decoded._id) {
                try {
                    const res = await axios.get(`http://localhost:5000/user/getbyid/${decoded._id}`);
                    setUser(res.data);
                    setEditData({
                        profession: res.data.profession || "student",
                        domain: res.data.domain || "general",
                        experienceLevel: res.data.experienceLevel || "beginner",
                    });
                } catch (err) {
                    console.error("Failed to fetch user data:", err);
                }
            }
            setLoading(false);
        };
        fetchUserData();
    }, []);

    const handleSaveProfile = async () => {
        setSaving(true);
        try {
            const token = localStorage.getItem("token");
            const decoded = parseJwt(token);
            await axios.put(`http://localhost:5000/user/update-profile/${decoded._id}`, editData);
            localStorage.setItem("profession", editData.profession);
            localStorage.setItem("domain", editData.domain);
            localStorage.setItem("experienceLevel", editData.experienceLevel);
            setUser(prev => ({ ...prev, ...editData }));
            setEditingProfile(false);
            toast.success("✨ Profile personalization updated! Challenges will adapt.");
        } catch (err) {
            toast.error("Failed to save profile: " + (err.response?.data?.message || err.message));
        } finally {
            setSaving(false);
        }
    };

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

    const xp = user.xp || 0;
    const level = user.level || 1;
    const streak = user.streak || 0;
    const badgesTotal = user.badges ? user.badges.length : 0;
    const xpToNext = level * 1000;
    const xpPercent = Math.min(100, Math.round((xp / xpToNext) * 100));
    const joinDate = new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    const professionIcon = PROFESSION_ICONS[user.profession] || "🌐";
    const expColor = EXPERIENCE_COLORS[user.experienceLevel] || EXPERIENCE_COLORS.beginner;

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
                        <Link href="/login" onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("profession");
                            localStorage.removeItem("domain");
                            localStorage.removeItem("experienceLevel");
                        }}>
                            <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">Log Out</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="container items-center justify-center mx-auto max-w-4xl py-12 px-4 space-y-8">
                {/* ── User Info ── */}
                <section className="flex flex-col sm:flex-row sm:items-start gap-6">
                    <div className="h-20 w-20 rounded-full bg-emerald-400/15 border-2 border-emerald-400/40 flex shrink-0">
                        <span className="text-3xl font-bold items-center justify-center m-auto text-emerald-400 uppercase">
                            {user.name ? user.name.charAt(0) : "U"}
                        </span>
                    </div>
                    <div className="text-center sm:text-left pt-2 flex-1">
                        <h1 className="text-2xl font-bold text-white mb-1">{user.name || "Anonymous User"}</h1>
                        <p className="text-sm text-gray-400">{user.email}</p>
                        <p className="text-xs text-gray-500 mt-2">
                            Member since <span className="text-gray-300">{joinDate}</span>
                        </p>
                        {/* Personalization pills */}
                        <div className="flex flex-wrap gap-2 mt-3">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-300">
                                {professionIcon} {user.profession || "student"}
                            </span>
                            {user.domain && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-xs text-gray-300">
                                    📌 {user.domain}
                                </span>
                            )}
                            {user.experienceLevel && (
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs ${expColor}`}>
                                    {user.experienceLevel === "beginner" ? "🌱" : user.experienceLevel === "intermediate" ? "🔥" : "⚡"} {user.experienceLevel}
                                </span>
                            )}
                        </div>
                    </div>
                </section>

                {/* ── Personalization Editor ── */}
                <section className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <span className="font-mono text-[13px] tracking-[0.25em] uppercase text-indigo-400 block mb-1">✨ Personalization</span>
                            <h2 className="text-lg font-bold text-white">Your Learning Profile</h2>
                            <p className="text-xs text-gray-400 mt-0.5">Challenges and AI feedback adapt to your role, domain, and level.</p>
                        </div>
                        <button
                            onClick={() => setEditingProfile(!editingProfile)}
                            className="px-4 py-2 rounded-lg border border-indigo-500/40 text-sm text-indigo-300 hover:bg-indigo-500/20 transition-all"
                        >
                            {editingProfile ? "Cancel" : "Edit Profile"}
                        </button>
                    </div>

                    {!editingProfile ? (
                        <div className="grid grid-cols-3 gap-4">
                            <div className="p-4 rounded-lg border border-gray-800 bg-gray-900 text-center">
                                <span className="text-2xl block mb-1">{PROFESSION_ICONS[user.profession] || "🌐"}</span>
                                <p className="text-xs text-gray-400">Role</p>
                                <p className="text-sm font-semibold text-white capitalize mt-0.5">{user.profession || "student"}</p>
                            </div>
                            <div className="p-4 rounded-lg border border-gray-800 bg-gray-900 text-center">
                                <span className="text-2xl block mb-1">📌</span>
                                <p className="text-xs text-gray-400">Domain</p>
                                <p className="text-sm font-semibold text-white capitalize mt-0.5">{user.domain || "general"}</p>
                            </div>
                            <div className="p-4 rounded-lg border border-gray-800 bg-gray-900 text-center">
                                <span className="text-2xl block mb-1">{user.experienceLevel === "beginner" ? "🌱" : user.experienceLevel === "intermediate" ? "🔥" : "⚡"}</span>
                                <p className="text-xs text-gray-400">Experience</p>
                                <p className="text-sm font-semibold text-white capitalize mt-0.5">{user.experienceLevel || "beginner"}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-5 animate-in fade-in duration-300">
                            {/* Role */}
                            <div>
                                <label className="text-xs font-semibold text-gray-300 mb-2 block">Role</label>
                                <div className="flex flex-wrap gap-2">
                                    {PROFESSIONS.map(p => (
                                        <button
                                            key={p.value}
                                            onClick={() => setEditData(prev => ({ ...prev, profession: p.value }))}
                                            className={`px-3 py-1.5 rounded-full text-xs border transition-all ${editData.profession === p.value ? "border-indigo-400 bg-indigo-400/15 text-indigo-300" : "border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600"}`}
                                        >
                                            {p.icon} {p.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {/* Domain */}
                            <div>
                                <label className="text-xs font-semibold text-gray-300 mb-2 block">Domain / Subject Area</label>
                                <div className="flex flex-wrap gap-2">
                                    {DOMAINS_ALL.map(d => (
                                        <button
                                            key={d}
                                            onClick={() => setEditData(prev => ({ ...prev, domain: d }))}
                                            className={`px-3 py-1.5 rounded-full text-xs border transition-all ${editData.domain === d ? "border-emerald-400 bg-emerald-400/15 text-emerald-300" : "border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600"}`}
                                        >
                                            {d.charAt(0).toUpperCase() + d.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {/* Experience level */}
                            <div>
                                <label className="text-xs font-semibold text-gray-300 mb-2 block">Experience with AI Prompting</label>
                                <div className="flex gap-3">
                                    {EXPERIENCE_LEVELS.map(l => (
                                        <button
                                            key={l.value}
                                            onClick={() => setEditData(prev => ({ ...prev, experienceLevel: l.value }))}
                                            className={`flex-1 px-3 py-3 rounded-lg text-xs border text-center transition-all ${editData.experienceLevel === l.value ? "border-purple-400 bg-purple-400/15 text-purple-300" : "border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600"}`}
                                        >
                                            <span className="block text-lg mb-0.5">{l.icon}</span>
                                            {l.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <Button
                                onClick={handleSaveProfile}
                                disabled={saving}
                                className="w-full bg-indigo-500 text-white hover:bg-indigo-600 font-semibold"
                            >
                                {saving ? "Saving..." : "✨ Save & Apply Personalization"}
                            </Button>
                        </div>
                    )}
                </section>

                {/* ── XP & Level ── */}
                <section className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 space-y-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="font-mono text-[13px] tracking-[0.25em] uppercase text-emerald-500 block mb-1">Progress Profile</span>
                            <h2 className="text-xl font-bold text-white">Level {level}</h2>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-400">
                                <span className="text-white font-semibold">{xp.toLocaleString()}</span> / {xpToNext.toLocaleString()} XP
                            </p>
                        </div>
                    </div>
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