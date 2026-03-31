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
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-px rounded-lg overflow-hidden border border-gray-700">
            {techniques.map((t, i) => (
                <ScrollReveal key={t.number} delay={80 + i * 60}>
                    <div className="bg-gray-800 border p-7 sm:p-8 hover:bg-gray-900 transition-colors group duration-300 h-full">
                        <span className="font-mono text-xs text-gray-400 mb-4 block">{t.number}</span>
                        <h3 className="text-base font-semibold mb-2 group-hover:text-emerald-400 transition-colors duration-200">
                            {t.title}
                        </h3>
                        <p className="text-m text-gray-300 leading-relaxed">{t.desc}</p>
                    </div>
                </ScrollReveal>
            ))}
        </div>
    </Section>
);

export default TechniquesSection;