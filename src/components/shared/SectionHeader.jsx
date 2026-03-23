import ScrollReveal from "@/components/ScrollReveal/page";

const SectionHeader = ({ tag, title, description, tagColor = "text-primary" }) => (
    <div className="mb-14">
        <ScrollReveal>
            <span className={`font-mono text-[11px] tracking-[0.25em] uppercase ${tagColor} mb-4 block`}>
                {tag}
            </span>
        </ScrollReveal>
        <ScrollReveal delay={100}>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                {title}
            </h2>
        </ScrollReveal>
        {description && (
            <ScrollReveal delay={200}>
                <p className="text-secondary-foreground max-w-lg">
                    {description}
                </p>
            </ScrollReveal>
        )}
    </div>
);

export default SectionHeader;