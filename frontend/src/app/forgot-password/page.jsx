"use client";
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);
        try {
            const res = await axios.post("http://localhost:5000/user/forgot-password", { email });
            toast.success("Password aapke email par bhej diya gaya hai!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Kuch galat hua!");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white p-6">
            <div className="w-full max-w-md bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-2xl">
                <h2 className="text-2xl font-bold text-emerald-500 mb-2">Forgot Password?</h2>
                <p className="text-gray-400 text-sm mb-6">Apna registered email dalein, hum aapko password bhej denge.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="email" 
                        placeholder="example@gmail.com"
                        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button 
                        type="submit" 
                        disabled={isSending}
                        className="w-full bg-emerald-500 text-black font-bold py-3 rounded-lg hover:bg-emerald-600 transition-all disabled:opacity-50"
                    >
                        {isSending ? "Bhej rahe hain..." : "Send Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;