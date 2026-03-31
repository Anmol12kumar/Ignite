import ScrollReveal from "@/components/ScrollReveal/page";

const ContentCard = ({
    title,
    description,
    delay = 0,
    titleClassName = "",
    prefix,
    hoverBorder = false,
    direction = "up",
}) => (
    <ScrollReveal delay={delay} direction={direction}>
        <div
            className={`p-6 rounded-lg border border-border/40 bg-card h-full group transition-colors duration-300 ${hoverBorder ? "hover:border-primary/30" : "hover:bg-secondary/40"
                }`}
        >
            {prefix && (
                <span className="font-mono text-xs text-muted-foreground mb-4 block">{prefix}</span>
            )}
            <h3
                className={`font-semibold mb-2 group-hover:text-primary transition-colors duration-200 ${titleClassName}`}
            >
                {title}
            </h3>
            <p className="text-m text-gray-400 text-secondary-foreground leading-relaxed">{description}</p>
        </div>
    </ScrollReveal>
);

export default ContentCard;