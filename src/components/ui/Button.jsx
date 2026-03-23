const variants = {
    hero: "bg-primary text-primary-foreground shadow-[0_0_24px_-6px_hsl(162,55%,42%,0.3)] hover:brightness-110 active:scale-[0.97]",
    heroOutline: "border border-border text-foreground hover:bg-secondary/60 active:scale-[0.97]",
    default: "bg-primary text-primary-foreground hover:brightness-110 active:scale-[0.97]",
    outline: "border border-border text-foreground hover:bg-secondary/60 active:scale-[0.97]",
    ghost: "text-foreground hover:bg-secondary/60 active:scale-[0.97]",
};

const sizes = {
    sm: "h-8 px-3 text-xs rounded-md",
    default: "h-10 px-5 text-sm rounded-md",
    lg: "h-11 px-7 text-sm rounded-md",
};

const Button = ({
    children,
    variant = "default",
    size = "default",
    className = "",
    ...props
}) => (
    <button
        className={`inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer select-none ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`}
        {...props}
    >
        {children}
    </button>
);

export { Button };
export default Button;