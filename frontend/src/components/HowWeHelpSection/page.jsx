import ScrollReveal from "@/components/ScrollReveal/page";
import { howWeHelpSteps } from "@/data/content";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import Link from "next/link";

const HowWeHelpSection = () => (
    <Section id="how-we-help">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
                <SectionHeader tag="How Ignite Works" />
                <ScrollReveal delay={100}>
                    <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight">
                        We teach you by<br />making you play
                    </h2>
                </ScrollReveal>
                <ScrollReveal delay={200}>
                    <p className="text-gray-400 leading-relaxed mb-5">
                        Ignite isn't a course with boring videos. It's a gamified quiz platform
                        where every concept you just read about becomes an interactive challenge.
                    </p>
                </ScrollReveal>
                <ScrollReveal delay={300}>
                    <p className="text-gray-400 leading-relaxed mb-8">
                        When you sign up and log in, you'll enter a world of prompt engineering
                        quizzes — from beginner fundamentals to advanced techniques. Each correct
                        answer earns XP, unlocks new levels, and builds your mastery score.
                        Compete on leaderboards, earn badges, and track your progress across
                        every concept.
                    </p>
                </ScrollReveal>
                <ScrollReveal delay={400}>
                    <Link href="/signup">
                        <button
                            className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-6 py-3 shadow-emerald-700 shadow-xl rounded-lg transition-all duration-200"
                        >
                            Sign Up & Start Playing
                        </button>
                    </Link>
                </ScrollReveal>
            </div>

            <div className="space-y-4">
                {howWeHelpSteps.map((s, i) => (
                    <ScrollReveal key={s.step} delay={150 + i * 100} direction="left">
                        <div className="flex gap-5 p-5 rounded-lg border border-gray-700 bg-gray-900 group hover:border-emerald-400 transition-colors duration-300">
                            <span className="font-mono text-2xl font-bold text-emerald-500 shrink-0">{s.step}</span>
                            <div>
                                <h3 className="font-semibold mb-1 text-base">{s.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    </Section>
);

export default HowWeHelpSection;