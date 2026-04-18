"use client";
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email.trim()) {
            toast.error("Please enter your email");
            return;
        }

        setIsSending(true);
        try {
            const res = await axios.post("http://localhost:5000/user/forgot-password", { email });
            
            if (res.status === 200) {
                toast.success("Password reset link has been sent to your email!");
                setEmailSent(true);
                setEmail("");
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Something went wrong. Please try again!";
            toast.error(errorMsg);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 relative overflow-hidden">
            {/* Ambient glow accent */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-105 h-65 bg-emerald-500/30 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />

            <div className="relative z-10 w-full max-w-md px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 justify-center mb-10">
                    <div className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-md">
                        <span className="text-black font-bold text-sm font-mono">I</span>
                    </div>
                    <span className="text-xl font-semibold tracking-tight text-white">Ignite</span>
                </Link>

                {/* Card */}
                <div className="rounded-xl border border-gray-700 bg-gray-900 p-8 shadow-lg">
                    <h1 className="text-2xl font-bold text-white text-center mb-1">Forgot Password?</h1>
                    <p className="text-sm text-gray-400 text-center mb-8">
                        {emailSent 
                            ? "Reset link sent! Check your email to continue" 
                            : "Enter your email address and we'll send you a link to reset your password"
                        }
                    </p>

                    {!emailSent ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-1.5">Email Address</label>
                                <input 
                                    type="email" 
                                    placeholder="example@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full h-10 px-3 rounded-md border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                                    required
                                />
                            </div>
                            <Button 
                                type="submit" 
                                disabled={isSending}
                                className="w-full bg-emerald-500 text-black font-semibold hover:bg-emerald-600 shadow-md disabled:opacity-50"
                            >
                                {isSending ? "Sending..." : "Send Reset Link"}
                            </Button>
                        </form>
                    ) : (
                        <div className="bg-emerald-500/10 border border-emerald-500/40 rounded-lg p-4 mb-6 text-center">
                            <p className="text-sm text-emerald-400">✓ Email sent successfully!</p>
                            <p className="text-xs text-gray-400 mt-2">The reset link will expire in 15 minutes</p>
                        </div>
                    )}

                    <div className="mt-6 text-center text-sm text-gray-400">
                        Remember your password?{" "}
                        <Link href="/login" className="text-emerald-400 font-medium hover:underline">
                            Back to login
                        </Link>
                    </div>
                </div>

                <p className="text-xs text-gray-500 text-center mt-6">
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;