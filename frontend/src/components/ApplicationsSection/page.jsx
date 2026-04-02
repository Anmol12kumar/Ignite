import ContentCard from "@/components/shared/ContentCard";
import { applications } from "@/data/content";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";

const ApplicationsSection = () => (
    <Section>
        <SectionHeader
            tag="Real-World Use"
            title="Applications across industries"
            description="Prompt engineering isn't just for developers. It's transforming how professionals work across every field."
        />
        <div className="grid text-emerald-500 max-w-7xl mx-auto sm:grid-cols-2 md:grid-cols-3 gap-4">
            {applications.map((a, i) => (
                <ContentCard
                    key={a.field}
                    title={a.field}
                    description={a.example}
                    delay={80 + i * 70}
                    titleClassName="text-sm text-primary"
                />
            ))}
        </div>
    </Section>
);

export default ApplicationsSection;