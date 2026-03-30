import ScrollReveal from "@/components/ScrollReveal/page";
import { timeline } from "@/data/content";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";

const HistorySection = () => (
    <Section maxWidth="max-w-3xl">
        <SectionHeader tag="Timeline" title="A brief history" />
        <div className="relative">
            <div className="absolute left-1.75 top-2 bottom-2 w-px bg-border/60" />
            <div className="space-y-8">
                {timeline.map((t, i) => (
                    <ScrollReveal key={t.year} delay={80 + i * 80}>
                        <div className="flex gap-6 relative">
                            <div className="w-3.75 shrink-0 relative z-10 flex items-start justify-center pt-1.5">
                                <div className="w-1.75 h-1.75 rounded-full bg-primary" />
                            </div>
                            <div>
                                <span className="font-mono text-sm font-semibold text-primary">{t.year}</span>
                                <p className="text-sm text-secondary-foreground leading-relaxed mt-1">{t.event}</p>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    </Section>
);

export default HistorySection;