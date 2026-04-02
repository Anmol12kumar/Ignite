import { Button } from "@/components/ui/Button";
import ScrollReveal from "@/components/ScrollReveal/page";

const Footer = () => (
    <>
        <section className="py-24 border-t border-gray-700">
            <div className="container text-center">
                <ScrollReveal>
                    <div className="max-w-xl mx-auto">
                        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">
                            Ready to{" "} <span className="bg-linear-to-r bg-emerald-600 bg-clip-text text-transparent">Ignite</span>{" "} your AI skills?
                        </h2>
                        <p className="text-gray-400 mb-8">
                            Sign up, log in, and start playing — it's free to begin.
                        </p>
                        <Button variant="hero" size="lg">
                            Start Playing Free
                        </Button>
                    </div>
                </ScrollReveal>
            </div>
        </section>

        <footer className="border-t border-gray-700 py-8">
            <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
                <div className="flex px-20 items-center gap-2">
                    <div className="h-7 w-7 rounded-md bg-emerald-500 flex items-center justify-center">
                        <span className="text-black font-bold text-[18px] font-mono">I</span>
                    </div>
                    <span className="font-md font-bold text-white">Ignite</span>
                </div>
                <p>© 2026 Ignite. Learn smarter, prompt better.</p>
            </div>
        </footer>
    </>
);

export default Footer;