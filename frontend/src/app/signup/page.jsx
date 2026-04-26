"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// ─── Validation schema ──────────────────────────────────────────────────────
const signupSchema = Yup.object().shape({
    name: Yup.string().min(2).max(50).required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Must contain an uppercase letter")
        .matches(/[a-z]/, "Must contain a lowercase letter")
        .matches(/[0-9]/, "Must contain a number")
        .matches(/[@$!%*?&]/, "Must contain a special character")
        .required("Password is required"),
});

const Signup = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formik = useFormik({
        initialValues: { name: "", email: "", password: "" },
        validationSchema: signupSchema,
        onSubmit: async (values) => {
            setIsSubmitting(true);
            try {
                // Step 1: Create Account
                const res = await axios.post("http://localhost:5000/user/add", values);
                if (res.status === 200) {
                    toast.success("Account created successfully! ✨");
                    
                    // Automatically log them in to proceed to onboarding
                    try {
                        const loginRes = await axios.post("http://localhost:5000/user/login", {
                            email: values.email,
                            password: values.password
                        });
                        
                        const { token, role, profession, domain, experienceLevel, name, profileComplete } = loginRes.data;
                        localStorage.setItem("token", token);
                        localStorage.setItem("role", role);
                        localStorage.setItem("userName", name);
                        localStorage.setItem("profileComplete", String(!!profileComplete));
                        
                        // Redirect to onboarding
                        router.push("/onboarding");
                    } catch (loginErr) {
                        console.error("Auto-login failed:", loginErr);
                        toast("Please log in to continue.", { icon: "🔑" });
                        router.push("/login");
                    }
                }
            } catch (error) {
                const errorMsg = error.response?.data?.message || error.message;
                toast.error("Signup failed: " + errorMsg);
            } finally {
                setIsSubmitting(false);
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 relative overflow-hidden py-8">
            {/* Background glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/20 rounded-full blur-[120px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-md px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 justify-center mb-8">
                    <div className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-md shadow-emerald-500/40">
                        <span className="text-black font-bold text-sm font-mono">I</span>
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-white">Ignite</span>
                </Link>

                <div className="rounded-xl border border-gray-700 bg-gray-900/80 backdrop-blur-xl p-8 shadow-2xl">
                    <h1 className="text-2xl font-bold text-white text-center mb-1">Create an account</h1>
                    <p className="text-sm text-gray-400 text-center mb-8">Join the elite prompt engineering masterclass</p>

                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-1.5">Full Name</label>
                            <input
                                type="text" id="name" name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Your name"
                                className={`w-full h-11 px-4 rounded-lg border ${formik.errors.name && formik.touched.name ? "border-red-500" : "border-gray-700"} bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all`}
                            />
                            {formik.errors.name && formik.touched.name && (
                                <p className="text-[10px] text-red-500 mt-1">{formik.errors.name}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-1.5">Email</label>
                            <input
                                type="email" id="email" name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="you@example.com"
                                className={`w-full h-11 px-4 rounded-lg border ${formik.errors.email && formik.touched.email ? "border-red-500" : "border-gray-700"} bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all`}
                            />
                            {formik.errors.email && formik.touched.email && (
                                <p className="text-[10px] text-red-500 mt-1">{formik.errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-1.5">Password</label>
                            <input
                                type="password" id="password" name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="••••••••"
                                className={`w-full h-11 px-4 rounded-lg border ${formik.errors.password && formik.touched.password ? "border-red-500" : "border-gray-700"} bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all`}
                            />
                            {formik.errors.password && formik.touched.password && (
                                <p className="text-[10px] text-red-500 mt-1">{formik.errors.password}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            variant="hero"
                            size="lg"
                            disabled={isSubmitting}
                            className="w-full mt-4 bg-emerald-500 text-black font-semibold hover:bg-emerald-600 shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
                        >
                            {isSubmitting ? "Creating account..." : "Create Account →"}
                        </Button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-400">
                        Already have an account?{" "}
                        <Link href="/login" className="text-emerald-400 font-medium hover:underline decoration-emerald-400/30 underline-offset-4">Log in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;