import ScrollReveal from "@/components/ScrollReveal/page";

const SectionHeader = ({ tag, title, description, tagColor = "text-emerald-500" }) => (
    <div className="mb-8">
        <ScrollReveal>
            <span className={`font-mono text-[13px] tracking-[0.25em] uppercase ${tagColor} mb-4 block`}>
                {tag}
            </span>
        </ScrollReveal>
        <ScrollReveal delay={100}>
            <h2 className="text-5xl sm:text-5xl font-bold tracking-tight mb-3">
                {title}
            </h2>
        </ScrollReveal>
        {description && (
            <ScrollReveal delay={200}>
                <p className="text-lg text-gray-400 max-w-lg">
                    {description}
                </p>
            </ScrollReveal>
        )}
    </div>
);

export default SectionHeader;