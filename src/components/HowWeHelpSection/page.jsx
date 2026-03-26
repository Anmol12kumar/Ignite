import { Button } from "@/components/ui/Button";
import ScrollReveal from "@/components/ScrollReveal/page";
import { howWeHelpSteps } from "@/data/content";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";

const HowWeHelpSection = () => (
    <Section id="how-we-help">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
                <SectionHeader tag="How Ignite Works" title="" />
                <ScrollReveal delay={100}>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 leading-tight -mt-10">
                        We teach you by<br />making you play
                    </h2>
                </ScrollReveal>
                <ScrollReveal delay={200}>
                    <p className="text-secondary-foreground leading-relaxed mb-5">
                        Ignite isn't a course with boring videos. It's a gamified quiz platform
                        where every concept you just read about becomes an interactive challenge.
                    </p>
                </ScrollReveal>
                <ScrollReveal delay={300}>
                    <p className="text-secondary-foreground leading-relaxed mb-8">
                        When you sign up and log in, you'll enter a world of prompt engineering
                        quizzes — from beginner fundamentals to advanced techniques. Each correct
                        answer earns XP, unlocks new levels, and builds your mastery score.
                        Compete on leaderboards, earn badges, and track your progress across
                        every concept.
                    </p>
                </ScrollReveal>
                <ScrollReveal delay={400}>
                    <Button variant="hero" size="lg">
                        Sign Up & Start Playing
                    </Button>
                </ScrollReveal>
            </div>

            <div className="space-y-4">
                {howWeHelpSteps.map((s, i) => (
                    <ScrollReveal key={s.step} delay={150 + i * 100} direction="left">
                        <div className="flex gap-5 p-5 rounded-lg border border-border/40 bg-card group hover:border-primary/30 transition-colors duration-300">
                            <span className="font-mono text-2xl font-bold text-primary/30 shrink-0">{s.step}</span>
                            <div>
                                <h3 className="font-semibold mb-1 text-sm">{s.title}</h3>
                                <p className="text-sm text-secondary-foreground leading-relaxed">{s.desc}</p>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    </Section>
);

export default HowWeHelpSection;