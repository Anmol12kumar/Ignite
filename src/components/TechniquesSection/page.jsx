import ScrollReveal from "@/components/ScrollReveal/page";
import { techniques } from "@/data/content";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";

const TechniquesSection = () => (
    <Section id="techniques">
        <SectionHeader
            tag="Core Techniques"
            title="Techniques that actually work"
            description="These are the proven methods used by researchers and practitioners. Each technique unlocks a different capability of AI language models."
        />
        <div className="grid md:grid-cols-2 gap-px bg-border/40 rounded-lg overflow-hidden border border-border/40">
            {techniques.map((t, i) => (
                <ScrollReveal key={t.number} delay={80 + i * 60}>
                    <div className="bg-card p-7 sm:p-8 hover:bg-secondary/30 transition-colors duration-300 group h-full">
                        <span className="font-mono text-xs text-muted-foreground mb-4 block">{t.number}</span>
                        <h3 className="text-base font-semibold mb-2 group-hover:text-primary transition-colors duration-200">
                            {t.title}
                        </h3>
                        <p className="text-sm text-secondary-foreground leading-relaxed">{t.desc}</p>
                    </div>
                </ScrollReveal>
            ))}
        </div>
    </Section>
);

export default TechniquesSection;