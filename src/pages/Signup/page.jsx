"use client";
import { useState, useEffect, useRef } from "react";

export default function SignUpPage() {

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

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isRevealed, setIsRevealed] = useState(false);

    // Trigger reveal only once on mount
    useEffect(() => {
        setIsRevealed(true);
    }, []);

    const evaluateStrength = (pwd) => {
        let score = 0;
        if (pwd.length >= 8) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if (/[a-z]/.test(pwd)) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[^A-Za-z0-9]/.test(pwd)) score++;

        if (score <= 2) return "Weak";
        if (score === 3 || score === 4) return "Medium";
        if (score === 5) return "Strong";
        return "";
    };

    const handlePasswordChange = (e) => {
        const pwd = e.target.value;
        setPassword(pwd);
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        
        const strength = evaluateStrength(password);

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        if (strength === "Weak") {
            setError("Password is too weak. Please make it stronger.");
            return;
        }

        setError("");
        alert(`Signing up with Name: ${name}, Email: ${email}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">

            {/* Navbar */}
            <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between sticky top-0 z-50">
                <span className="font-bold text-xl">Ignite</span>
                <div className="space-x-6">
                    <a href="/">Home</a>
                    <a href="/Login">Login</a>
                    <a href="/Signup">Sign Up</a>
                </div>
            </nav>

            {/* Hero */}
            <header className="text-center py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <h1 className="text-5xl font-extrabold mb-6">📝 Sign Up</h1>
                <p className="mb-8 text-lg max-w-3xl mx-auto">
                    Create your Ignite account and start your learning adventure.
                </p>
            </header>

            {/* Sign Up Form */}
            <main className="flex-grow flex items-center justify-center p-10">
                <div
                    className={`transition-all duration-700 transform ${
                        isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: "200ms" }}
                >
                    <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
                            Join Ignite
                        </h2>

                        <form onSubmit={handleSignUp}>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-indigo-300"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-indigo-300"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-indigo-300"
                                    placeholder="Create a password"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 mb-2">Confirm Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-indigo-300"
                                    placeholder="Re-enter your password"
                                    required
                                />
                            </div>

                            {error && (
                                <p className="text-red-600 mb-4 text-center font-semibold">{error}</p>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
                            >
                                Sign Up
                            </button>
                        </form>

                        <p className="mt-4 text-center text-gray-600">
                            Already have an account?{" "}
                            <a href="/Login" className="text-indigo-600 font-semibold">
                                Login
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