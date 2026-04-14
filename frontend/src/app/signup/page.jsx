"use client";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const signupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name can't exceed 50 characters")
        .required("Name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required")
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email must be a valid format"),
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

    const signupForm = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: ""
        },
        validationSchema: signupSchema,
            onSubmit: async (values) => {
                console.log("Form values:", values);
                
                try {
                    const res = await axios.post("http://localhost:5000/user/add", values);
                    if (res.status === 200) {
                        toast.success("Signup successful");
                        router.push("/login");
                    } else {
                        toast.error("Signup failed");
                    }
                } catch (error) {
                    toast.error("Signup failed: " + error.message);
                }
            }
    });

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
                    <h1 className="text-2xl font-bold text-white text-center mb-1">Create your account</h1>
                    <p className="text-sm text-gray-400 text-center mb-8">
                        Start your prompt engineering journey
                    </p>

                    <form onSubmit={signupForm.handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-1.5">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={signupForm.values.name}
                                onChange={signupForm.handleChange}
                                placeholder="Your name"
                                className="w-full h-10 px-3 rounded-md border border-gray-700 bg-gray-800 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                            />
                            {signupForm.errors.name && signupForm.touched.name && (
                                <p className="text-xs text-red-500 mt-1">{signupForm.errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-1.5">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={signupForm.values.email}
                                onChange={signupForm.handleChange}
                                placeholder="you@example.com"
                                className="w-full h-10 px-3 rounded-md border border-gray-700 bg-gray-800 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                            />
                            {signupForm.errors.email && signupForm.touched.email && (
                                <p className="text-xs text-red-500 mt-1">{signupForm.errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-1.5">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={signupForm.values.password}
                                onChange={signupForm.handleChange}
                                placeholder="••••••••"
                                className="w-full h-10 px-3 rounded-md border border-gray-700 bg-gray-800 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                            />
                            {signupForm.errors.password && signupForm.touched.password && (
                                <p className="text-xs text-red-500 mt-1">{signupForm.errors.password}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            variant="hero"
                            size="lg"
                            className="w-full mt-2 bg-emerald-500 text-black font-semibold hover:bg-emerald-600 shadow-md"
                        >
                            Create Account
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-400">
                        Already have an account?{" "}
                        <Link href="/login" className="text-emerald-400 font-medium hover:underline">
                            Log in
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

export default Signup;