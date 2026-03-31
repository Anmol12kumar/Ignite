"use client";

import Navbar from "@/components/Navbar/page";
import Hero from "@/components/Hero/page";
import WhatIsSection from "@/components/WhatIsSection/page";
import TechniquesSection from "@/components/TechniquesSection/page";
import TypesOfPrompts from "@/components/TypesOfPrompts/page";
import ApplicationsSection from "@/components/ApplicationsSection/page";
import BestPracticesSection from "@/components/BestPracticesSection/page";
import ChallengesSection from "@/components/ChallengesSection/page";
import HowWeHelpSection from "@/components/HowWeHelpSection/page";
import HistorySection from "@/components/HistorySection/page";
import FutureSection from "@/components/FutureSection/page";
import Footer from "@/components/Footer/page";
import ScrollReveal from "@/components/ScrollReveal/page";

export default function Home() {
    return (
        <main>
            <Navbar />
            <Hero />
            <WhatIsSection />
            <TechniquesSection />
            <TypesOfPrompts />
            <ApplicationsSection />
            <BestPracticesSection />
            <ChallengesSection />
            <HowWeHelpSection />
            <HistorySection />
            <FutureSection />
            <Footer />
            <ScrollReveal />
        </main>
    );
}