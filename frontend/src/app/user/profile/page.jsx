import { Button } from "@/components/ui/Button";
import Link from "next/link";

const mockUser = {
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    avatar: null,
    joinDate: "Jan 15, 2026",
    level: 12,
    xp: 2840,
    xpToNext: 3500,
    streak: 7,
};

const mockBadges = [
    { id: 1, icon: "🎯", title: "First Prompt", description: "Crafted your first prompt", earned: true },
    { id: 2, icon: "🔥", title: "7-Day Streak", description: "Practiced 7 days in a row", earned: true },
    { id: 3, icon: "🧠", title: "Chain Master", description: "Completed 10 chain-of-thought prompts", earned: true },
    { id: 4, icon: "⚡", title: "Speed Crafter", description: "Solved 5 challenges under 2 minutes", earned: true },
    { id: 5, icon: "🏆", title: "Top 10%", description: "Ranked in top 10% of users", earned: false },
    { id: 6, icon: "💎", title: "Diamond Tier", description: "Reached level 25", earned: false },
    { id: 7, icon: "🌟", title: "All-Rounder", description: "Completed all prompt categories", earned: false },
    { id: 8, icon: "🚀", title: "Prompt Pioneer", description: "Published 3 community prompts", earned: false },
];

const mockActivity = [
    { id: 1, action: "Completed challenge", detail: "Zero-Shot Classification", xp: 120, time: "2 hours ago" },
    { id: 2, action: "Earned badge", detail: "7-Day Streak 🔥", xp: 200, time: "5 hours ago" },
    { id: 3, action: "Completed challenge", detail: "Chain-of-Thought Reasoning", xp: 150, time: "1 day ago" },
    { id: 4, action: "Leveled up", detail: "Reached Level 12", xp: 0, time: "1 day ago" },
    { id: 5, action: "Completed challenge", detail: "Few-Shot Summarization", xp: 100, time: "2 days ago" },
    { id: 6, action: "Completed challenge", detail: "Role-Based Prompt Design", xp: 130, time: "3 days ago" },
];

const StatCard = ({ label, value, sub }) => (
    <div className="rounded-lg border border-border/40 bg-card p-5 text-center">
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground mt-1">{label}</p>
        {sub && <p className="text-[10px] text-primary font-mono mt-1">{sub}</p>}
    </div>
);

const Profile = () => {
    const xpPercent = Math.round((mockUser.xp / mockUser.xpToNext) * 100);

    return (
        <div className="min-h-screen bg-background">
            {/* Top bar */}
            <nav className="border-b border-border/40 bg-background/80 backdrop-blur-xl">
                <div className="container flex h-14 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-xs font-mono">I</span>
                        </div>
                        <span className="font-semibold tracking-tight text-foreground">Ignite</span>
                    </Link>
                    <Link href="/login">
                        <Button variant="outline" size="sm">Log Out</Button>
                    </Link>
                </div>
            </nav>

            <div className="container max-w-4xl py-12 px-4 space-y-10">
                {/* ── User Info ── */}
                <section className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="h-20 w-20 rounded-full bg-primary/15 border-2 border-primary/40 flex items-center justify-center shrink-0">
                        <span className="text-3xl font-bold text-primary">
                            {mockUser.name.charAt(0)}
                        </span>
                    </div>
                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl font-bold text-foreground">{mockUser.name}</h1>
                        <p className="text-sm text-muted-foreground mt-0.5">{mockUser.email}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Member since <span className="text-secondary-foreground">{mockUser.joinDate}</span>
                        </p>
                    </div>
                </section>

                {/* ── XP & Level ── */}
                <section className="rounded-xl border border-border/40 bg-card p-6 space-y-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-primary block mb-1">
                                Progress
                            </span>
                            <h2 className="text-xl font-bold text-foreground">Level {mockUser.level}</h2>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-muted-foreground">
                                <span className="text-foreground font-semibold">{mockUser.xp.toLocaleString()}</span> / {mockUser.xpToNext.toLocaleString()} XP
                            </p>
                        </div>
                    </div>

                    {/* XP Bar */}
                    <div className="w-full h-3 rounded-full bg-secondary overflow-hidden">
                        <div
                            className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
                            style={{ width: `${xpPercent}%` }}
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <StatCard label="Total XP" value={mockUser.xp.toLocaleString()} />
                        <StatCard label="Current Level" value={mockUser.level} />
                        <StatCard label="Day Streak" value={`${mockUser.streak} 🔥`} />
                    </div>
                </section>

                {/* ── Badges & Achievements ── */}
                <section>
                    <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-primary mb-4 block">
                        Badges & Achievements
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {mockBadges.map((b) => (
                            <div
                                key={b.id}
                                className={`rounded-lg border p-4 text-center transition-colors duration-200 ${b.earned
                                        ? "border-primary/30 bg-card hover:border-primary/50"
                                        : "border-border/30 bg-card/40 opacity-45"
                                    }`}
                            >
                                <span className="text-3xl block mb-2">{b.icon}</span>
                                <p className="text-xs font-semibold text-foreground mb-0.5">{b.title}</p>
                                <p className="text-[10px] text-muted-foreground leading-snug">{b.description}</p>
                                {b.earned && (
                                    <span className="inline-block mt-2 text-[9px] font-mono tracking-wider text-primary uppercase">
                                        Earned
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Activity History ── */}
                <section>
                    <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-primary mb-4 block">
                        Recent Activity
                    </span>
                    <div className="rounded-xl border border-border/40 bg-card divide-y divide-border/30">
                        {mockActivity.map((a) => (
                            <div key={a.id} className="flex items-center justify-between px-5 py-4">
                                <div>
                                    <p className="text-sm font-medium text-foreground">{a.action}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">{a.detail}</p>
                                </div>
                                <div className="text-right shrink-0 ml-4">
                                    {a.xp > 0 && (
                                        <span className="text-xs font-semibold text-primary">+{a.xp} XP</span>
                                    )}
                                    <p className="text-[10px] text-muted-foreground mt-0.5">{a.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Profile;