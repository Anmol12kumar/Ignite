"use client";

export function Button({ children, variant = "default", size = "md", className = "", ...props }) {
    const baseStyles =
        "rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 active:scale-95";

    const variants = {
        default: "bg-gray-800 text-white hover:bg-gray-700 hover:-translate-y-0.5 hover:shadow-lg",
        hero: "bg-emerald-500 text-black hover:bg-emerald-600 shadow-md hover:shadow-2xl hover:shadow-emerald-500/30 hover:-translate-y-1",
        heroOutline: "border border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-black hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/20",
        outline: "px-3 py-1 text-sm border border-gray-700 text-gray-300 hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300",
        secondary: "bg-gray-700 text-gray-200 hover:bg-gray-600 hover:-translate-y-0.5 hover:shadow-lg",
        destructive: "bg-red-600 text-white hover:bg-red-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/20",
        ghost: "bg-transparent text-foreground hover:bg-gray-700 hover:-translate-y-0.5",
    };

    const sizes = {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-base",
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
