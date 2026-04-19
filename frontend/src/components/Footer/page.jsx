import { Button } from "@/components/ui/Button";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal/page";

const Footer = () => (
    <>
        <section className="py-24 border-t border-gray-700">
            <div className="container text-center">
                <ScrollReveal>
                    <div className="max-w-xl mx-auto animate-fadeInScale">
                        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-600 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradientFlow">
                            Ready to Ignite your AI skills?
                        </h2>
                        <p className="text-gray-400 mb-8 hover:text-gray-300 transition-colors duration-300">
                            Sign up, log in, and start playing — it's free to begin.
                        </p>
                        <Link href="/signup">
                            <Button variant="hero" size="lg" className="animate-ctaPulse">
                                Start Playing Free
                            </Button>
                        </Link>
                    </div>
                </ScrollReveal>
            </div>
        </section>

        <footer className="border-t border-gray-700 py-8 hover:border-emerald-400/30 transition-colors duration-300">
            <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
                <div className="flex px-20 items-center gap-2 group hover:-translate-y-0.5 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20">
                    <div className="h-7 w-7 rounded-md bg-emerald-500 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-emerald-500/40 transition-all duration-300">
                        <span className="text-black font-bold text-[18px] font-mono">I</span>
                    </div>
                    <span className="font-md font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">Ignite</span>
                </div>
                <p>© 2026 Ignite. Learn smarter, prompt better.</p>
            </div>
        </footer>
    </>
);

export default Footer;