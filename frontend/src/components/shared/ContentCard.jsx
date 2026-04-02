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
        <div className="p-6 rounded-lg border border-gray-700 h-full group transition-colors duration-300 hover:bg-gray-800">
            {prefix && (
                <span className="font-mono text-xs text-gray-400 mb-4 block">{prefix}</span>
            )}
            <h3
                className={`text-lg font-semibold mb-2 group-hover:text-emerald-400 transition-colors duration-200 ${titleClassName}`}
            >
                {title}
            </h3>
            <p className="text-m text-gray-400 text-secondary-foreground leading-relaxed">{description}</p>
        </div>
    </ScrollReveal>
);

export default ContentCard;