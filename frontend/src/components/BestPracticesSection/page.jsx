import ContentCard from "@/components/shared/ContentCard";
import { bestPractices } from "@/data/content";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";

const BestPracticesSection = () => (
    <Section>
        <SectionHeader tag="Playbook" title="Best practices" />
        <div className="max-w-7xl mx-auto grid group-first hover:caret-gray-700 sm:grid-cols-2 gap-4">
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