import ScrollReveal from "@/components/ScrollReveal/page";

const SectionHeader = ({ tag, title, description, tagColor = "text-primary" }) => (
    <div className="mb-14 px-30">
        <ScrollReveal>
            <span className={`font-mono text-[13px] text-emerald-500 tracking-[0.25em] uppercase ${tagColor} mb-4 block`}>
                {tag}
            </span>
        </ScrollReveal>
        <ScrollReveal delay={100}>
            <h2 className="text-5xl sm:text-4xl font-bold tracking-tight mb-3">
                {title}
            </h2>
        </ScrollReveal>
        {description && (
            <ScrollReveal delay={200}>
                <p className="text-secondary-foreground text-lg text-gray-400 max-w-lg">
                    {description}
                </p>
            </ScrollReveal>
        )}
    </div>
);

export default SectionHeader;