"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const PROFESSIONS = [
    { value: "student", label: "Student", icon: "🎓", desc: "Academic learning & skill building" },
    { value: "teacher", label: "Teacher", icon: "📚", desc: "Education & classroom applications" },
    { value: "developer", label: "Developer", icon: "💻", desc: "Software & systems engineering" },
    { value: "marketer", label: "Marketer", icon: "📣", desc: "Campaigns, copy & brand content" },
    { value: "researcher", label: "Researcher", icon: "🔬", desc: "Analysis, papers & methodology" },
    { value: "healthcare", label: "Healthcare", icon: "🏥", desc: "Clinical docs & patient comms" },
    { value: "legal-finance", label: "Legal / Finance", icon: "⚖️", desc: "Contracts, compliance & analysis" },
    { value: "other", label: "Other", icon: "🌐", desc: "Any other professional role" },
];

const DOMAINS = {
    student: ["science", "technology", "engineering", "arts", "business", "medicine", "law", "general"],
    teacher: ["science", "technology", "mathematics", "humanities", "arts", "physical education", "general"],
    developer: ["web development", "mobile development", "AI/ML", "cloud", "cybersecurity", "data engineering", "general"],
    marketer: ["digital marketing", "brand strategy", "content marketing", "SEO/SEM", "social media", "e-commerce", "general"],
    researcher: ["natural sciences", "social sciences", "technology", "medicine", "economics", "humanities", "general"],
    healthcare: ["clinical medicine", "nursing", "pharmacy", "mental health", "public health", "dentistry", "general"],
    "legal-finance": ["corporate law", "compliance", "investment banking", "accounting", "insurance", "real estate", "general"],
    other: ["general", "arts", "science", "technology", "business", "education", "other"],
};

const EXPERIENCE_LEVELS = [
    { value: "beginner", label: "Beginner", icon: "🌱", desc: "New to AI prompting" },
    { value: "intermediate", label: "Intermediate", icon: "🔥", desc: "Some experience with AI tools" },
    { value: "advanced", label: "Advanced", icon: "⚡", desc: "Proficient with LLMs & prompting" },
];

function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

const Onboarding = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        profession: "",
        domain: "",
        experienceLevel: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const name = localStorage.getItem("userName");
        if (!token) {
            toast.error("Please login to complete setup");
            router.push("/login");
            return;
        }
        if (name) setUserName(name.split(" ")[0]);
    }, [router]);

    const handleSave = async () => {
        if (!formData.profession || !formData.domain || !formData.experienceLevel) {
            toast.error("Please complete all sections");
            return;
        }

        setIsSubmitting(true);
        try {
            const token = localStorage.getItem("token");
            const decoded = parseJwt(token);
            if (!decoded?._id) throw new Error("User session expired");

            const res = await axios.put(`http://localhost:5000/user/update-profile/${decoded._id}`, formData);
            if (res.status === 200) {
                // Update local storage
                localStorage.setItem("profession", formData.profession);
                localStorage.setItem("domain", formData.domain);
                localStorage.setItem("experienceLevel", formData.experienceLevel);
                localStorage.setItem("profileComplete", "true");

                toast.success("✨ Journey personalized! Welcome aboard.");
                router.push("/Challenges");
            }
        } catch (error) {
            toast.error("Setup failed: " + (error.response?.data?.message || error.message));
        } finally {
            setIsSubmitting(false);
        }
    };

    const availableDomains = DOMAINS[formData.profession] || [];

    return (
        <div className="min-h-screen bg-gray-950 flex flex-col relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

            <main className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 py-12">
                <div className="w-full max-w-2xl">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono uppercase tracking-[0.2em] mb-4 animate-in fade-in slide-in-from-top-4 duration-700">
                            Onboarding Phase
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                            {userName ? `Welcome, ${userName}!` : "Welcome to Ignite"}
                        </h1>
                        <p className="text-gray-400 text-sm sm:text-base">
                            Let's personalize your learning experience in under a minute.
                        </p>
                    </div>

                    {/* Progress Indicator */}
                    <div className="flex justify-center gap-2 mb-12">
                        {[1, 2, 3].map(i => (
                            <div 
                                key={i} 
                                className={`h-1.5 rounded-full transition-all duration-500 ${
                                    step === i ? "w-12 bg-emerald-500" : 
                                    step > i ? "w-6 bg-emerald-500/40" : "w-6 bg-gray-800"
                                }`} 
                            />
                        ))}
                    </div>

                    {/* Steps Container */}
                    <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl relative">
                        
                        {/* Step 1: Profession */}
                        {step === 1 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-mono italic">01</span>
                                    What is your current role?
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {PROFESSIONS.map((p) => (
                                        <button
                                            key={p.value}
                                            onClick={() => setFormData(prev => ({ ...prev, profession: p.value }))}
                                            className={`p-4 rounded-xl border text-left transition-all group ${
                                                formData.profession === p.value
                                                    ? "border-emerald-500 bg-emerald-500/10 ring-1 ring-emerald-500/30"
                                                    : "border-gray-800 bg-gray-900/50 hover:border-gray-700"
                                            }`}
                                        >
                                            <span className="text-2xl block mb-2">{p.icon}</span>
                                            <span className={`text-xs font-bold block mb-1 ${formData.profession === p.value ? "text-emerald-400" : "text-white"}`}>{p.label}</span>
                                            <span className="text-[10px] text-gray-500 leading-tight block">{p.desc}</span>
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-10 flex justify-end">
                                    <Button 
                                        disabled={!formData.profession}
                                        onClick={() => setStep(2)}
                                        className="bg-emerald-500 text-black px-8 py-2 font-bold hover:bg-emerald-400 disabled:opacity-50 transition-all"
                                    >
                                        Next Component →
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Domain */}
                        {step === 2 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                                <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-mono italic">02</span>
                                    Select your primary domain
                                </h2>
                                <p className="text-gray-500 text-xs mb-8 ml-11">This helps us frame prompting scenarios in your field of interest.</p>
                                
                                <div className="flex flex-wrap gap-2.5">
                                    {availableDomains.map((d) => (
                                        <button
                                            key={d}
                                            onClick={() => setFormData(prev => ({ ...prev, domain: d }))}
                                            className={`px-5 py-2.5 rounded-full text-xs font-semibold border transition-all ${
                                                formData.domain === d
                                                    ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                                                    : "border-gray-800 bg-gray-900 text-gray-400 hover:border-gray-600"
                                            }`}
                                        >
                                            {d.charAt(0).toUpperCase() + d.slice(1)}
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-10 flex justify-between">
                                    <button onClick={() => setStep(1)} className="text-gray-500 hover:text-white text-sm font-medium transition-colors">← Back</button>
                                    <Button 
                                        disabled={!formData.domain}
                                        onClick={() => setStep(3)}
                                        className="bg-emerald-500 text-black px-8 py-2 font-bold hover:bg-emerald-400 disabled:opacity-50 transition-all"
                                    >
                                        Next Component →
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Experience */}
                        {step === 3 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                                <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-mono italic">03</span>
                                    AI Proficiency Level
                                </h2>
                                <p className="text-gray-500 text-xs mb-8 ml-11">We'll adjust the AI's feedback and challenge difficulty accordingly.</p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {EXPERIENCE_LEVELS.map((lvl) => (
                                        <button
                                            key={lvl.value}
                                            onClick={() => setFormData(prev => ({ ...prev, experienceLevel: lvl.value }))}
                                            className={`p-6 rounded-2xl border text-center transition-all ${
                                                formData.experienceLevel === lvl.value
                                                    ? "border-emerald-500 bg-emerald-500/10"
                                                    : "border-gray-800 bg-gray-900/50 hover:border-gray-700"
                                            }`}
                                        >
                                            <span className="text-3xl block mb-3">{lvl.icon}</span>
                                            <span className={`text-sm font-bold block mb-1 ${formData.experienceLevel === lvl.value ? "text-emerald-400" : "text-white"}`}>{lvl.label}</span>
                                            <span className="text-[11px] text-gray-500 leading-tight block">{lvl.desc}</span>
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-10 flex justify-between items-center">
                                    <button onClick={() => setStep(2)} className="text-gray-500 hover:text-white text-sm font-medium transition-colors">← Back</button>
                                    <Button 
                                        disabled={!formData.experienceLevel || isSubmitting}
                                        onClick={handleSave}
                                        className="bg-indigo-600 text-white px-10 py-3 font-bold hover:bg-indigo-500 disabled:opacity-50 transition-all shadow-lg shadow-indigo-600/30"
                                    >
                                        {isSubmitting ? "Finalizing..." : "⚡ Finish Setup & Begin"}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Footer help */}
            <footer className="p-8 text-center relative z-10">
                <p className="text-gray-600 text-[10px] uppercase tracking-widest">
                    Ignite Prompt Engineering Platform · Secure Environment
                </p>
            </footer>
        </div>
    );
};

export default Onboarding;
