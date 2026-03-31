import { navLinks } from "@/data/content";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const Navbar = () => (
    // Added z-50 to ensure it stays on top of all page content
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 bg-gray-950/90 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
            
            {/* Logo - Removed px-30 which was blocking other elements */}
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="h-8 w-8 rounded-md bg-emerald-500 flex items-center justify-center shadow-md">
                    <span className="text-black font-bold text-lg font-mono">I</span>
                </div>
                <span className="font-bold tracking-tight text-white text-xl">Ignite</span>
            </Link>

            {/* Nav links - Centered or spaced correctly */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
                {navLinks.map((l) => (
                    <Link
                        key={l.href}
                        href={l.href}
                        className="hover:text-emerald-400 transition-colors duration-200"
                    >
                        {l.label}
                    </Link>
                ))}
            </div>

            {/* Login button - Corrected nesting with asChild */}
            <div className="flex items-center bg-emerald-500 shadow-lg">
                <Button asChild className="bg-emerald-500 text-black shadow-lg">
                    <Link href="/login">
                        Log In
                    </Link>
                </Button>
            </div>

        </div>
    </nav>
);

export default Navbar;