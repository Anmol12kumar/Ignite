import { Button } from "@/components/ui/Button";
import ScrollReveal from "@/components/ScrollReveal/page";

const Footer = () => (
    <>
        <section className="py-24 border-t border-border/40">
            <div className="container text-center">
                <ScrollReveal>
                    <div className="max-w-xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
                            Ready to <span className="text-gradient-brand">ignite</span> your AI skills?
                        </h2>
                        <p className="text-secondary-foreground mb-8">
                            Sign up, log in, and start playing — it's free to begin.
                        </p>
                        <Button variant="hero" size="lg">
                            Start Playing Free
                        </Button>
                    </div>
                </ScrollReveal>
            </div>
        </section>

        <footer className="border-t border-border/40 py-8">
            <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-md bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-[10px] font-mono">I</span>
                    </div>
                    <span className="font-medium text-foreground">Ignite</span>
                </div>
                <p>© 2026 Ignite. Learn smarter, prompt better.</p>
            </div>
        </footer>
    </>
);

export default Footer;