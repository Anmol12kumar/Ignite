import { Button } from "@/components/ui/Button";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal/page";

const Hero = () => (
    <section className="relative min-h-[90vh] flex items-center pt-14 overflow-hidden">

        <div className="container px-[200px] relative z-10">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
                <div className="max-w-2xl">
                    <ScrollReveal delay={100}>
                        <span className="font-mono text-[13px] text-emerald-500 tracking-[0.25em] uppercase text-primary mb-5 block">
                            Learn Prompt Engineering — The Fun Way
                        </span>
                    </ScrollReveal>

                    <ScrollReveal delay={200}>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
                            Master the art of
                            <br />
                            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">talking to AI</span>
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal delay={350}>
                        <p className="text-base text-gray-400 sm:text-lg max-w-lg mb-8 leading-relaxed">
                            From zero to expert — learn every concept of prompt engineering
                            through interactive quizzes, real challenges, and a gamified
                            progression system. Log in, play, and level up.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={500}>
                        <div className="flex flex-wrap gap-3">
                            <Link href="/signup">
                                <Button variant="hero" size="lg">
                                    Start Playing Free
                                </Button>
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>

                <ScrollReveal delay={300} direction="left" className="flex items-center h-full">
                    <div className="flex justify-center lg:justify-end w-full mt-10 lg:mt-0">
                        {/* Parent box strictly controls the circle's bounding dimensions */}
                        <div className="relative flex justify-center items-center w-[320px] h-[320px] lg:w-[450px] lg:h-[450px]">
                            {/* Synchronized Hover Reverse Glow Behind the Brain */}
                            <div className="absolute inset-0 w-full h-full bg-emerald-500/15 rounded-full blur-[80px] animate-brainPopReverse pointer-events-none" />
                            
                            <img 
                            src="/images/hero-prompt-engineering.png" 
                            alt="Prompt Engineering"
                            className="relative z-10 w-[95%] lg:w-full object-contain animate-brain3dPop drop-shadow-2xl" 
                            />
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    </section>
);

export default Hero;