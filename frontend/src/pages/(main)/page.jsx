import Navbar from "@/components/Navbar/page";
import Hero from "@/components/Hero/page";
import WhatIsSection from "@/components/WhatIsSection/page";
import TypesOfPrompts from "@/components/TypesOfPrompts/page";
import TechniquesSection from "@/components/TechniquesSection/page";
import ApplicationsSection from "@/components/ApplicationsSection/page";
import ChallengesSection from "@/components/ChallengesSection/page";
import BestPracticesSection from "@/components/BestPracticesSection/page";
import HistorySection from "@/components/HistorySection/page";
import FutureSection from "@/components/FutureSection/page";
import HowWeHelpSection from "@/components/HowWeHelpSection/page";
import Footer from "@/components/Footer/page";
import ScrollReveal from "@/components/ScrollReveal/page";

export const metadata = {
    title: "Prompt Engineering",
    description: "Learn about prompt engineering",
};

export default function Home() {
    return (
    <div className="min-h-screen">
        <Navbar />
        <Hero />
        <WhatIsSection />
        <TypesOfPrompts />
        <TechniquesSection />
        <ApplicationsSection />
        <ChallengesSection />
        <BestPracticesSection />
        <HistorySection />
        <FutureSection />
        <HowWeHelpSection />
        <Footer />
        <ScrollReveal /> 
    </div>
    );
}