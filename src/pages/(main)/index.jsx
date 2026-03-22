import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ConceptsGrid from "@/components/ConceptsGrid";
import LevelProgression from "@/components/LevelProgression";
import MethodSection from "@/components/MethodSection";
import Footer from "@/components/Footer";

const Index = () => (
    <div className="min-h-screen">
        <Navbar />
        <Hero />
        <ConceptsGrid />
        <LevelProgression />
        <MethodSection />
        <Footer />
    </div>
);

export default Index;