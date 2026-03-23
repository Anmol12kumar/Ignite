import ScrollReveal from "@/components/ScrollReveal/page";
import Section from "@/components/shared/Section";
import { challenges, beginnerMistakes } from "@/data/content";

const ListColumn = ({ tag, tagColor, title, icon, iconColor, items, direction = "up" }) => (
    <div>
        <ScrollReveal>
            <span className={`font-mono text-[11px] tracking-[0.25em] uppercase ${tagColor} mb-4 block`}>
                {tag}
            </span>
        </ScrollReveal>
        <ScrollReveal delay={100}>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">{title}</h2>
        </ScrollReveal>
        <div className="space-y-3">
            {items.map((item, i) => (
                <ScrollReveal key={i} delay={120 + i * 60} direction={direction}>
                    <div className="flex gap-3 p-4 rounded-lg border border-border/30 bg-card">
                        <span className={`${iconColor} font-mono text-xs mt-0.5 flex-shrink-0`}>{icon}</span>
                        <p className="text-sm text-secondary-foreground leading-relaxed">{item}</p>
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
                tagColor="text-primary"
                title="Challenges you'll face"
                icon="✕"
                iconColor="text-primary"
                items={challenges}
            />
            <ListColumn
                tag="Common Pitfalls"
                tagColor="text-destructive"
                title="Mistakes beginners make"
                icon="!"
                iconColor="text-destructive"
                items={beginnerMistakes}
                direction="left"
            />
        </div>
    </Section>
);

export default ChallengesSection;