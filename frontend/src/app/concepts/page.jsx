"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const CONCEPTS = [
    {
        id: "zero-shot",
        title: "Zero-Shot Prompting",
        icon: "🎯",
        description: "Asking the model a question or giving a task without any previous examples.",
        example: "User: Explain quantum physics to a 5-year-old.",
        proTip: "Best for simple tasks where the model already has extensive training data.",
        details: "Zero-shot prompting relies on the LLM's internal knowledge base to generate responses. It's the most common way users interact with AI, but can be limited for highly specific or niche tasks."
    },
    {
        id: "few-shot",
        title: "Few-Shot Prompting",
        icon: "📚",
        description: "Providing a few examples (shots) to the model to guide its response style or logic.",
        example: "User: Apple -> Fruit\nCarrot -> Vegetable\nChicken ->",
        proTip: "Use 3-5 high-quality examples for best results.",
        details: "Few-shot prompting is powerful for teaching the model new patterns, specialized formatting, or specific classification tasks without fine-tuning."
    },
    {
        id: "cot",
        title: "Chain of Thought (CoT)",
        icon: "🧠",
        description: "Encouraging the model to explain its reasoning step-by-step before giving the final answer.",
        example: "User: Solve this math problem step-by-step: 12 * 5 + 7.",
        proTip: "Add 'Let's think step by step' to your prompt to trigger this behavior.",
        details: "CoT significantly improves performance on complex reasoning, mathematical, and logic tasks by breaking down the problem into manageable cognitive steps."
    },
    {
        id: "persona",
        title: "Role / Persona Prompting",
        icon: "🎭",
        description: "Assigning a specific identity or expertise to the model to influence its tone and knowledge depth.",
        example: "User: Act as a Senior Software Architect with 20 years of experience...",
        proTip: "The more specific the persona, the more tailored the output.",
        details: "Defining a persona sets the constraints for the model's vocabulary, expertise level, and professional perspective."
    },
    {
        id: "delimiters",
        title: "Delimiters & Structure",
        icon: "📐",
        description: "Using special characters like triple quotes, backticks, or XML tags to separate instructions from content.",
        example: "User: Summarize the text below enclosed in triple quotes: \"\"\"[TEXT]\"\"\"",
        proTip: "Use XML tags like <content></content> for very complex prompts.",
        details: "Delimiters prevent 'prompt injection' where the AI might confuse instructions with the text it's supposed to process."
    },
    {
        id: "negative-prompting",
        title: "Negative Prompting",
        icon: "🚫",
        description: "Explicitly telling the model what NOT to include in its response.",
        example: "User: Describe a sunset but do not use the word 'orange' or 'sun'.",
        proTip: "Be specific about constraints to avoid unwanted default behaviors.",
        details: "Negative constraints help in creative writing, brand-voice alignment, and avoiding common AI clichés."
    }
];

const ConceptCard = ({ concept, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 group relative overflow-hidden ${
                isActive 
                    ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/20" 
                    : "border-gray-800 bg-gray-900/40 hover:border-gray-700 hover:bg-gray-900/60"
            }`}
        >
            {isActive && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10" />
            )}
            <div className="flex items-start gap-4">
                <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{concept.icon}</span>
                <div>
                    <h3 className={`font-bold mb-1 transition-colors ${isActive ? "text-emerald-400" : "text-white"}`}>
                        {concept.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                        {concept.description}
                    </p>
                </div>
            </div>
        </button>
    );
};

const ConceptsPage = () => {
    const [activeId, setActiveId] = useState(CONCEPTS[0].id);
    const activeConcept = CONCEPTS.find(c => c.id === activeId);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            {/* Background Accents */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px]" />
            </div>

            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 bg-black/80 backdrop-blur-xl">
                <div className="container px-6 sm:px-20 flex h-16 items-center justify-between">
                    <Link href="/Challenges" className="flex items-center gap-2 group">
                        <div className="h-8 w-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <span className="text-white font-bold text-sm">I</span>
                        </div>
                        <span className="font-bold tracking-tight text-white">Ignite <span className="text-emerald-500 font-mono text-xs ml-1">Docs</span></span>
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link href="/Challenges" className="text-sm text-gray-400 hover:text-white transition-colors">Challenges</Link>
                        <Link href="/user/profile" className="text-sm text-gray-400 hover:text-white transition-colors">Profile</Link>
                    </div>
                </div>
            </nav>

            <main className="container flex-1 pt-28 pb-20 px-6 sm:px-20 relative z-10">
                <div className="mb-12">
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-500 mb-2 block">Knowledge Base</span>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Prompt Engineering <span className="text-emerald-500">Concepts</span></h1>
                    <p className="text-gray-400 max-w-2xl leading-relaxed">
                        Master the fundamental patterns and advanced techniques used to communicate effectively with Large Language Models.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left - Navigation Sidebar */}
                    <div className="lg:col-span-4 space-y-3">
                        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-4 ml-2">Fundamentals</p>
                        {CONCEPTS.map(concept => (
                            <ConceptCard 
                                key={concept.id} 
                                concept={concept} 
                                isActive={activeId === concept.id}
                                onClick={() => setActiveId(concept.id)}
                            />
                        ))}
                    </div>

                    {/* Right - Content View */}
                    <div className="lg:col-span-8 bg-gray-900/40 border border-gray-800 rounded-3xl p-8 sm:p-12 min-h-[600px] backdrop-blur-sm animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-5xl">{activeConcept.icon}</span>
                            <div>
                                <h2 className="text-3xl font-bold text-white">{activeConcept.title}</h2>
                                <p className="text-emerald-500 font-mono text-xs uppercase tracking-widest mt-1">Key Technique</p>
                            </div>
                        </div>

                        <div className="space-y-10">
                            {/* Definition */}
                            <section>
                                <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Deep Dive</h4>
                                <p className="text-gray-300 leading-relaxed text-lg italic">
                                    "{activeConcept.details}"
                                </p>
                            </section>

                            {/* Example Box */}
                            <section>
                                <div className="rounded-2xl bg-black/60 border border-gray-700 p-6 relative group overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                                    <h4 className="text-xs font-mono text-emerald-500 uppercase mb-4 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        Interactive Example
                                    </h4>
                                    <pre className="font-mono text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                                        {activeConcept.example}
                                    </pre>
                                </div>
                            </section>

                            {/* Pro Tip Card */}
                            <section className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6">
                                <div className="flex gap-4">
                                    <span className="text-2xl mt-0.5">💡</span>
                                    <div>
                                        <h4 className="font-bold text-emerald-400 mb-1">Ignite Pro-Tip</h4>
                                        <p className="text-sm text-emerald-100/70 leading-relaxed">
                                            {activeConcept.proTip}
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Navigation Footer */}
                        <div className="mt-16 pt-8 border-t border-gray-800 flex justify-between items-center">
                            <p className="text-xs text-gray-500">Concept {CONCEPTS.findIndex(c => c.id === activeId) + 1} of {CONCEPTS.length}</p>
                            <Button 
                                variant="hero"
                                className="bg-emerald-600 hover:bg-emerald-500 text-white px-6"
                                onClick={() => {
                                    const idx = CONCEPTS.findIndex(c => c.id === activeId);
                                    if (idx < CONCEPTS.length - 1) setActiveId(CONCEPTS[idx + 1].id);
                                    else setActiveId(CONCEPTS[0].id);
                                }}
                            >
                                Next Concept →
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-10 border-t border-gray-900 px-6 sm:px-20 flex flex-col sm:flex-row justify-between items-center gap-6 text-gray-600 text-xs">
                <p>© 2026 Ignite Prompt Engineering platform. All rights reserved.</p>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-emerald-500 transition-colors">Documentation</a>
                    <a href="#" className="hover:text-emerald-500 transition-colors">API Reference</a>
                    <a href="#" className="hover:text-emerald-500 transition-colors">Support</a>
                </div>
            </footer>
        </div>
    );
};

export default ConceptsPage;
