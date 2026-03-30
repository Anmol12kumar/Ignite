import ScrollReveal from "@/components/ScrollReveal/page";
import { whyItMatters } from "@/data/content";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";

const WhatIsSection = () => (
    <Section id="what">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
                <SectionHeader tag="The Foundation" title="What is Prompt Engineering?" />
                <ScrollReveal delay={200}>
                    <p className="text-secondary-foreground px-30 leading-relaxed mb-5">
                        Prompt engineering is the practice of designing and refining inputs — called prompts —
                        to get the best possible outputs from AI language models. It's the bridge between
                        human intent and machine understanding.
                    </p>
                </ScrollReveal>
                <ScrollReveal delay={300}>
                    <p className="text-secondary-foreground px-30 leading-relaxed">
                        Think of it as learning a new language — not a programming language, but
                        the language of clear, structured communication with AI systems. The better
                        your prompts, the more powerful, accurate, and useful the AI becomes.
                    </p>
                </ScrollReveal>
            </div>

            <ScrollReveal delay={150}>
                <div className="border border-border/60 rounded-lg p-8 bg-card">
                    <h3 className="font-semibold mb-5 text-lg">Why It Matters</h3>
                    <div className="space-y-4">
                        {whyItMatters.map((item) => (
                            <div key={item.n} className="flex gap-4">
                                <span className="font-mono text-xs text-primary mt-1 shrink-0">{item.n}</span>
                                <p className="text-sm text-secondary-foreground leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>
        </div>
    </Section>
);

export default WhatIsSection;