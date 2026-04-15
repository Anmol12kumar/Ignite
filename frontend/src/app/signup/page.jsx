"use client";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
<<<<<<< HEAD
import { useRouter } from "next/navigation"; // Router import kiya
=======
import { useRouter } from "next/navigation";
>>>>>>> 8324a786df1c0e537daeccb65dcfbb6a3a04e050

const signupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name can't exceed 50 characters")
        .required("Name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Must contain an uppercase letter")
        .matches(/[a-z]/, "Must contain a lowercase letter")
        .matches(/[0-9]/, "Must contain a number")
        .matches(/[@$!%*?&]/, "Must contain a special character")
        .required("Password is required"),
});

const Signup = () => {
<<<<<<< HEAD
    const router = useRouter(); // Router initialize kiya
=======
    const router = useRouter();
>>>>>>> 8324a786df1c0e537daeccb65dcfbb6a3a04e050

    const signupForm = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: ""
        },
        validationSchema: signupSchema,
<<<<<<< HEAD
        onSubmit: async (values) => {
            try {
                const res = await axios.post("http://localhost:5000/user/add", values);
                if (res.status === 200) {
                    toast.success("Signup successful! Please login.");
                    router.push("/login"); // Login page par bheja
=======
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
>>>>>>> 8324a786df1c0e537daeccb65dcfbb6a3a04e050
                }
            } catch (error) {
                const errorMsg = error.response?.data?.message || error.message;
                toast.error("Signup failed: " + errorMsg);
            }
        }
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 relative overflow-hidden">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-105 h-65 bg-emerald-500/30 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />

            <div className="relative z-10 w-full max-w-md px-6">
                <Link href="/" className="flex items-center gap-2 justify-center mb-10">
                    <div className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-md">
                        <span className="text-black font-bold text-sm font-mono">I</span>
                    </div>
                    <span className="text-xl font-semibold tracking-tight text-white">Ignite</span>
                </Link>

                <div className="rounded-xl border border-gray-700 bg-gray-900 p-8 shadow-lg">
                    <h1 className="text-2xl font-bold text-white text-center mb-1">Create your account</h1>
                    <p className="text-sm text-gray-400 text-center mb-8">
                        Start your prompt engineering journey
                    </p>

                    <form onSubmit={signupForm.handleSubmit} className="space-y-4">
                        {/* Name Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-1.5">Full Name</label>
                            <input
                                type="text"
                                id="name"
<<<<<<< HEAD
                                name="name" // name attribute zaroori hai
=======
                                name="name"
>>>>>>> 8324a786df1c0e537daeccb65dcfbb6a3a04e050
                                value={signupForm.values.name}
                                onChange={signupForm.handleChange}
                                onBlur={signupForm.handleBlur}
                                placeholder="Your name"
                                className={`w-full h-10 px-3 rounded-md border ${signupForm.errors.name && signupForm.touched.name ? 'border-red-500' : 'border-gray-700'} bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all`}
                            />
                            {signupForm.errors.name && signupForm.touched.name && (
<<<<<<< HEAD
                                <p className="text-[10px] text-red-500 mt-1">{signupForm.errors.name}</p>
=======
                                <p className="text-xs text-red-500 mt-1">{signupForm.errors.name}</p>
>>>>>>> 8324a786df1c0e537daeccb65dcfbb6a3a04e050
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-1.5">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={signupForm.values.email}
                                onChange={signupForm.handleChange}
                                onBlur={signupForm.handleBlur}
                                placeholder="you@example.com"
                                className={`w-full h-10 px-3 rounded-md border ${signupForm.errors.email && signupForm.touched.email ? 'border-red-500' : 'border-gray-700'} bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all`}
                            />
                            {signupForm.errors.email && signupForm.touched.email && (
<<<<<<< HEAD
                                <p className="text-[10px] text-red-500 mt-1">{signupForm.errors.email}</p>
=======
                                <p className="text-xs text-red-500 mt-1">{signupForm.errors.email}</p>
>>>>>>> 8324a786df1c0e537daeccb65dcfbb6a3a04e050
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-1.5">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={signupForm.values.password}
                                onChange={signupForm.handleChange}
                                onBlur={signupForm.handleBlur}
                                placeholder="••••••••"
                                className={`w-full h-10 px-3 rounded-md border ${signupForm.errors.password && signupForm.touched.password ? 'border-red-500' : 'border-gray-700'} bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all`}
                            />
                            {signupForm.errors.password && signupForm.touched.password && (
<<<<<<< HEAD
                                <p className="text-[10px] text-red-500 mt-1">{signupForm.errors.password}</p>
=======
                                <p className="text-xs text-red-500 mt-1">{signupForm.errors.password}</p>
>>>>>>> 8324a786df1c0e537daeccb65dcfbb6a3a04e050
                            )}
                        </div>

                        <Button
                            type="submit"
                            variant="hero"
                            size="lg"
                            className="w-full mt-2 bg-emerald-500 text-black font-semibold hover:bg-emerald-600 shadow-md"
                            disabled={signupForm.isSubmitting}
                        >
                            {signupForm.isSubmitting ? "Creating..." : "Create Account"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-400">
                        Already have an account?{" "}
                        <Link href="/login" className="text-emerald-400 font-medium hover:underline">
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;