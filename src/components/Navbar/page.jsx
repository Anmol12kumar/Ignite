import { navLinks } from "@/data/content";
import { Button } from "@/components/ui/Button";

const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-14 items-center justify-between">
            <a href="#" className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-xs font-mono">I</span>
                </div>
                <span className="font-semibold tracking-tight">Ignite</span>
            </a>

            <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
                {navLinks.map((l) => (
                    <a key={l.href} href={l.href} className="hover:text-foreground transition-colors duration-200">
                        {l.label}
                    </a>
                ))}
            </div>

            <Button variant="hero" size="sm">Start Learning</Button>
        </div>
    </nav>
);

export default Navbar;