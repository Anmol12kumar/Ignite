import ContentCard from "@/components/shared/ContentCard";
import { futureTrends } from "@/data/content";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";

const FutureSection = () => (
    <Section>
        <SectionHeader
            tag="What's Next"
            title="The future of prompt engineering"
            description="The field is evolving fast. Here's where it's headed — and why learning the fundamentals now gives you an unfair advantage."
        />
        <div className="grid sm:grid-cols-2 gap-4">
            {futureTrends.map((t, i) => (
                <ContentCard
                    key={t.title}
                    title={t.title}
                    description={t.desc}
                    delay={100 + i * 80}
                />
            ))}
        </div>
    </Section>
);

export default FutureSection;