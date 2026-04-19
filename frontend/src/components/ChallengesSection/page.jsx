import ScrollReveal from "@/components/ScrollReveal/page";
import { challenges, beginnerMistakes } from "@/data/content";
import Section from "@/components/shared/Section";

const ListColumn = ({ tag, tagColor, title, icon, iconColor, items, direction = "up" }) => (
    <div>
        <ScrollReveal>
            <span className={`font-mono text-[13px] tracking-[0.25em] uppercase ${tagColor} mb-4 block`}>
                {tag}
            </span>
        </ScrollReveal>
        <ScrollReveal delay={100}>
            <h2 className="text-4xl font-bold tracking-tight mb-8">{title}</h2>
        </ScrollReveal>
        <div className="space-y-4">
            {items.map((item, i) => (
                <ScrollReveal key={i} delay={120 + i * 60} direction={direction}>
                    <div className="flex gap-4 p-5 rounded-lg border border-gray-700 bg-gray-900 transition-all duration-300 hover:bg-gray-800/80 hover:translate-y-[-4px] hover:shadow-lg hover:shadow-emerald-500/10 hover:border-emerald-400/50 group animate-fadeInScale">
                        <span className={`${iconColor} font-mono text-lg mt-0.5 shrink-0 group-hover:animate-spinSlow transition-all duration-300`}>{icon}</span>
                        <p className="text-m text-gray-300 leading-relaxed group-hover:text-gray-100 transition-colors duration-300">{item}</p>
                    </div>
                </ScrollReveal>
            ))}
        </div>
    </div>
);

const ChallengesSection = () => (
    <Section>
        <div className="grid lg:grid-cols-2 gap-16">
            <ListColumn 
                tag="Be Aware"
                tagColor="text-emerald-500"
                title="Challenges you'll face"
                icon="✕"
                iconColor="text-emerald-500"
                items={challenges}
            />
            <ListColumn
                tag="Common Pitfalls"
                tagColor="text-red-500"
                title="Mistakes beginners make"
                icon="!"
                iconColor="text-red-500"
                items={beginnerMistakes}
                direction="left"
            />
        </div>
    </Section>
);

export default ChallengesSection;