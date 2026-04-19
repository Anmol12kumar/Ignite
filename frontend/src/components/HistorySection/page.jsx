import ScrollReveal from "@/components/ScrollReveal/page";
import { timeline } from "@/data/content";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";

const HistorySection = () => (
    <Section maxWidth="max-w-3xl">
        <SectionHeader tag="Timeline" title="A brief history" />
        <div className="relative">
            <div className="absolute left-2 top-2 bottom-2 w-px bg-gray-700" />
            <div className="space-y-8">
                {timeline.map((t, i) => (
                    <ScrollReveal key={t.year} delay={80 + i * 80}>
                        <div className="flex gap-6 relative group hover:translate-x-1 transition-transform duration-300 animate-fadeInScale">
                            <div className="w-4 shrink-0 relative z-10 flex items-start justify-center pt-1.5">
                                <div className="w-3 h-3 rounded-full bg-emerald-500 group-hover:scale-150 group-hover:shadow-lg group-hover:shadow-emerald-500/50 transition-all duration-300" />
                            </div>
                            <div className="group-hover:translate-x-2 transition-transform duration-300">
                                <span className="font-mono text-m font-semibold text-emerald-500 group-hover:text-emerald-300 transition-colors duration-300">{t.year}</span>
                                <p className="text-base text-gray-300 leading-relaxed mt-1 group-hover:text-gray-100 transition-colors duration-300">{t.event}</p>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    </Section>
);

export default HistorySection;