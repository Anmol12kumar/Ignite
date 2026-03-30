import { navLinks } from "@/data/content";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 rounded-lg border border-gray-800 bg-gray-950/90 backdrop-blur-md">
        <div className="container flex h-14 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center px-30 gap-2">
                <div className="h-6 w-6 rounded-md bg-emerald-500 flex items-center justify-center shadow-md">
                    <span className="text-black font-bold text-m font-mono">I</span>
                </div>
                <span className="font-semibold tracking-tight text-white">Ignite</span>
            </Link>

            {/* Nav links */}
            <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
                {navLinks.map((l) => (
                    <Link
                        key={l.href}
                        href={l.href}
                        className="hover:text-white transition-colors duration-200"
                    >
                        {l.label}
                    </Link>
                ))}
            </div>

            {/* Login button */}
            <Link href="/login" className="px-30">
                <Button className="px-2 py-1 bg-emerald-500 text-black font-semibold hover:bg-emerald-600 shadow-lg">
                    Log In
                </Button>
            </Link>

        </div>
    </nav>
);

export default Navbar;