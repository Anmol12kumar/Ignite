"use client";
import { Button } from "@/components/ui/Button";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
});

const Login = () => {
    const router = useRouter();

    const loginForm = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            try {
                const res = await axios.post("http://localhost:5000/user/login", values);
                
                if (res.status === 200) {
                    toast.success("Login successful");

                    // 1. Backend se Token, Role aur User Data nikalna
                    const { token, role } = res.data;

                    // 2. LocalStorage mein values store karna
                    localStorage.setItem("token", token);
                    localStorage.setItem("role", role); // UI logic ke liye (Admin vs User)
                    localStorage.setItem("userEmail", values.email); // isAdmin middleware ke headers ke liye

                    // 3. Role ke basis par redirection
                    if (role === "admin") {
                        router.push("/admin-dashboard"); // Agar admin page alag hai
                    } else {
                        router.push("/Challenges");
                    }
                }
            } catch (error) {
                // Backend se aane wala specific error message dikhayein
                const errorMsg = error.response?.data?.message || "Login failed";
                toast.error(errorMsg);
            }
        },
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
                    <h1 className="text-2xl font-bold text-white text-center mb-1">Welcome back</h1>
                    <p className="text-sm text-gray-400 text-center mb-8">
                        Log in to continue learning
                    </p>

                    <form onSubmit={loginForm.handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-1.5">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={loginForm.values.email}
                                onChange={loginForm.handleChange}
                                placeholder="you@example.com"
                                className="w-full h-10 px-3 rounded-md border border-gray-700 bg-gray-800 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                            />
                            {loginForm.errors.email && loginForm.touched.email && (
                                <p className="text-xs text-red-500 mt-1">{loginForm.errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-1.5">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={loginForm.values.password}
                                onChange={loginForm.handleChange}
                                placeholder="••••••••"
                                className="w-full h-10 px-3 rounded-md border border-gray-700 bg-gray-800 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                            />
                            {loginForm.errors.password && loginForm.touched.password && (
                                <p className="text-xs text-red-500 mt-1">{loginForm.errors.password}</p>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <Link href="/forgot-password" className="text-xs text-emerald-400 hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            variant="hero"
                            size="lg"
                            className="w-full mt-2 bg-emerald-500 text-black font-semibold hover:bg-emerald-600 shadow-md"
                        >
                            Login
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-400">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-emerald-400 font-medium hover:underline">
                            Sign up
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

export default Login;