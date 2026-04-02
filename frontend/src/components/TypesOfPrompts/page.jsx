import { promptTypes } from "@/data/content";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import ContentCard from "@/components/shared/ContentCard";

const TypesOfPrompts = () => (
    <Section>
        <SectionHeader
            tag="Prompt Categories"
            title="Types of Prompts"
            description="Not all prompts are created equal. Understanding the different types helps you pick the right approach for every situation."
        />
        <div className="grid mx-auto max-w-7xl sm:grid-cols-2 gap-4">
            {promptTypes.map((t, i) => (
                <ContentCard
                    key={t.title}
                    title={t.title}
                    description={t.desc}
                    delay={80 + i * 70}
                />
            ))}
        </div>
    </Section>
);

export default TypesOfPrompts;