import { Button } from "@/components/ui/Button";
import ScrollReveal from "@/components/ScrollReveal/page";

const Hero = () => (
    <section className="relative min-h-[90vh] flex items-center pt-14 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-75 bg-primary/6 rounded-full blur-[100px] animate-pulse-glow pointer-events-none" />

        <div className="container px-30 relative z-10">
            <div className="max-w-2xl">
                <ScrollReveal delay={100}>
                    <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-primary mb-5 block">
                        Learn Prompt Engineering — The Fun Way
                    </span>
                </ScrollReveal>

                <ScrollReveal delay={200}>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
                        Master the art of
                        <br />
                        <span className="text-gradient-brand">talking to AI</span>
                    </h1>
                </ScrollReveal>

                <ScrollReveal delay={350}>
                    <p className="text-base sm:text-lg text-secondary-foreground max-w-lg mb-8 leading-relaxed">
                        From zero to expert — learn every concept of prompt engineering
                        through interactive quizzes, real challenges, and a gamified
                        progression system. Log in, play, and level up.
                    </p>
                </ScrollReveal>

                <ScrollReveal delay={500}>
                    <div className="flex flex-wrap gap-3">
                        <Button variant="hero" size="lg">
                            Start Playing Free
                        </Button>
                        <Button variant="heroOutline" size="lg">
                            Explore Concepts
                        </Button>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    </section>
);

export default Hero;