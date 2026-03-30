import { Button } from "@/components/ui/Button";
import Link from "next/link";

const levels = [
    { level: 1, name: "Gatekeeper", icon: "🚪", unlocked: true },
    { level: 2, name: "Librarian", icon: "📚", unlocked: false },
    { level: 3, name: "Translator's Cave", icon: "🗺️", unlocked: false },
    { level: 4, name: "Teacher's Challenge", icon: "🎓", unlocked: false },
    { level: 5, name: "Creative Prompt Crafter", icon: "🎨", unlocked: false },
    { level: 6, name: "Multi-Step Prompt Master", icon: "⚡", unlocked: false },
    { level: 7, name: "IoT Collaboration Challenge", icon: "🔗", unlocked: false },
    { level: 8, name: "Music Remix Challenge", icon: "🎵", unlocked: false },
    { level: 9, name: "Puzzle Prompt Challenge", icon: "🧩", unlocked: false },
    { level: 10, name: "Ultimate Combo Challenge", icon: "🏆", unlocked: false },
    { level: "Boss", name: "Smart Kitchen Showdown", icon: "🔥", unlocked: false, boss: true },
];

const LevelCard = ({ level, name, icon, unlocked, boss }) => (
    <div
        className={`relative rounded-xl border p-6 flex flex-col items-center text-center gap-3 transition-all duration-300 ${boss
                ? unlocked
                    ? "border-destructive/50 bg-destructive/5 hover:border-destructive hover:shadow-[0_0_30px_-8px_hsl(0,72%,51%,0.3)] cursor-pointer"
                    : "border-border/20 bg-card/40 opacity-50 cursor-not-allowed"
                : unlocked
                    ? "border-primary/40 bg-card hover:border-primary hover:shadow-[0_0_30px_-8px_hsl(162,55%,42%,0.25)] cursor-pointer group"
                    : "border-border/20 bg-card/40 opacity-50 cursor-not-allowed"
            }`}
    >
        {/* Lock overlay */}
        {!unlocked && (
            <div className="absolute inset-0 rounded-xl flex items-center justify-center z-10">
                <span className="text-3xl">🔒</span>
            </div>
        )}

        {/* Level badge */}
        <span
            className={`font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full ${boss
                    ? "bg-destructive/10 text-destructive"
                    : unlocked
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                }`}
        >
            {boss ? "Boss Level" : `Level ${level}`}
        </span>

        {/* Icon */}
        <span className={`text-4xl ${!unlocked ? "blur-[2px]" : ""}`}>{icon}</span>

        {/* Name */}
        <h3
            className={`font-semibold text-sm leading-tight ${!unlocked ? "blur-[1px] text-muted-foreground" : "text-foreground group-hover:text-primary transition-colors"
                }`}
        >
            {name}
        </h3>

        {/* Status */}
        {unlocked ? (
            <span className="text-[11px] font-mono text-primary mt-1">▶ Start</span>
        ) : (
            <span className="text-[11px] font-mono text-muted-foreground mt-1 blur-[1px]">Locked</span>
        )}
    </div>
);

const Challenges = () => (
    <div className="min-h-screen bg-background">
        {/* Top bar */}
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
            <div className="container flex h-14 items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-xs font-mono">I</span>
                    </div>
                    <span className="font-semibold tracking-tight text-foreground">Ignite</span>
                </Link>
                <Link href="/profile">
                    <Button variant="ghost" size="sm">Profile</Button>
                </Link>
            </div>
        </nav>

        <main className="container pt-28 pb-20">
            {/* Header */}
            <div className="text-center mb-14">
                <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-primary mb-3 block">
                    Challenge Arena
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                    Master the Art of Prompting
                </h1>
                <p className="text-secondary-foreground max-w-xl mx-auto text-sm sm:text-base">
                    Complete each challenge to unlock the next. Conquer all levels to face the Boss.
                </p>
            </div>

            {/* Progress bar */}
            <div className="max-w-md mx-auto mb-14">
                <div className="flex justify-between text-xs font-mono text-muted-foreground mb-2">
                    <span>Progress</span>
                    <span>1 / 11</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${(1 / 11) * 100}%` }}
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {levels.filter((l) => !l.boss).map((l) => (
                    <LevelCard key={l.level} {...l} />
                ))}
            </div>

            {/* Boss card */}
            <div className="max-w-sm mx-auto mt-10">
                {levels.filter((l) => l.boss).map((l) => (
                    <LevelCard key="boss" {...l} />
                ))}
            </div>
        </main>
    </div>
);

export default Challenges;