"use client";

export function Button({ children, variant = "default", size = "md", className = "", ...props }) {
    const baseStyles =
        "rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50";

    const variants = {
        default: "bg-gray-800 text-white hover:bg-gray-700",
        hero: "bg-emerald-500 text-black hover:bg-emerald-600 shadow-md",
        heroOutline: "border border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-black",
    };

    const sizes = {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
