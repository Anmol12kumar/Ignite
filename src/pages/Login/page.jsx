"use client";
import { useState, useEffect, useRef } from "react";

export default function LoginPage() {
    
    function useScrollReveal() {
        const ref = useRef(null);
        const [visible, setVisible] = useState(false);

        useEffect(() => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.disconnect(); // reveal only once
                    }
                },
                { threshold: 0.2 }
            );

            if (ref.current) observer.observe(ref.current);
            return () => observer.disconnect();
        }, []);

        return [ref, visible];
    }

    function RevealSection({ children, delay = 0 }) {
        const [ref, visible] = useScrollReveal();
        return (
            <div
                ref={ref}
                className={`transition-all duration-700 transform ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                style={{ transitionDelay: `${delay}ms` }}
            >
                {children}
            </div>
        );
    }

    // Blank inputs by default
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRevealed, setIsRevealed] = useState(false);

    useEffect(() => {
        setIsRevealed(true);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        
        if(email && password){
            router.push('/userdashboard');
        }else{
            alert("Please enter valid credentials");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Navbar */}
            <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between sticky top-0 z-50">
                <span className="font-bold text-xl">Ignite</span>
                <div className="space-x-6">
                    <a href="/">Home</a>
                    <a href="/login">Login</a>
                </div>
            </nav>

            {/* Hero */}
            <header className="text-center py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <h1 className="text-5xl font-extrabold mb-6">🔑 Login</h1>
                <p className="mb-8 text-lg max-w-3xl mx-auto">
                    Access your Ignite account and continue your learning journey.
                </p>
            </header>

            {/* Login Form */}
            <main className="flex-grow flex items-center justify-center p-10">
                <div
                    className={`transition-all duration-700 transform ${
                        isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: "200ms" }}
                >
                    <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
                            Welcome Back
                        </h2>

                        <form onSubmit={handleLogin} autoComplete="off">
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-indigo-300"
                                    placeholder="Enter your email"
                                    autoComplete="off"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 mb-2">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-indigo-300"
                                    placeholder="Enter your password"
                                    autoComplete="new-password"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
                            >
                                Login
                            </button>
                        </form>

                        <p className="mt-4 text-center text-gray-600">
                            Don't have an account?{" "}
                            <a href="/Signup" className="text-indigo-600 font-semibold">
                                Sign Up
                            </a>
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white text-center py-6 mt-8">
                <p>Built by Anmol © 2026</p>
            </footer>
        </div>
    );
}