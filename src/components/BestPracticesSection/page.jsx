import ContentCard from "@/components/shared/ContentCard";
import { bestPractices } from "@/data/content";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";

const BestPracticesSection = () => (
    <Section>
        <SectionHeader tag="Playbook" title="Best practices" />
        <div className="grid sm:grid-cols-2 gap-4">
            {bestPractices.map((p, i) => (
                <ContentCard
                    key={p.rule}
                    title={p.rule}
                    description={p.detail}
                    delay={80 + i * 60}
                    hoverBorder
                />
            ))}
        </div>
    </Section>
);

export default BestPracticesSection;