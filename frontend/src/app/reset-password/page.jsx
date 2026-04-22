"use client";
import { Button } from "@/components/ui/Button";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

const resetPasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], "Passwords must match")
        .required("Confirm password is required"),
});

const ResetPasswordForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Validate token and email on component mount
    useEffect(() => {
        if (!token || !email) {
            toast.error("Invalid reset link");
            router.push("/login");
        }
        setIsLoading(false);
    }, [token, email, router]);

    const resetForm = useFormik({
        initialValues: {
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: resetPasswordSchema,
        onSubmit: async (values) => {
            setIsSubmitting(true);
            try {
                const res = await axios.post("http://localhost:5000/user/reset-password", {
                    token,
                    email,
                    newPassword: values.newPassword,
                });

                if (res.status === 200) {
                    toast.success("Password reset successfully! Redirecting to login...");
                    setTimeout(() => {
                        router.push("/login");
                    }, 2000);
                }
            } catch (error) {
                const errorMsg = error.response?.data?.message || "Failed to reset password";
                toast.error(errorMsg);
            } finally {
                setIsSubmitting(false);
            }
        },
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-950">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

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
                    <h1 className="text-2xl font-bold text-white text-center mb-1">Reset Password</h1>
                    <p className="text-sm text-gray-400 text-center mb-8">
                        Enter your new password below
                    </p>

                    <form onSubmit={resetForm.handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-1.5">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={resetForm.values.newPassword}
                                onChange={resetForm.handleChange}
                                onBlur={resetForm.handleBlur}
                                placeholder="••••••••"
                                className={`w-full h-10 px-3 rounded-md border ${resetForm.errors.newPassword && resetForm.touched.newPassword ? 'border-red-500' : 'border-gray-700'} bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all`}
                            />
                            {resetForm.errors.newPassword && resetForm.touched.newPassword && (
                                <p className="text-[10px] text-red-500 mt-1">{resetForm.errors.newPassword}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-1.5">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={resetForm.values.confirmPassword}
                                onChange={resetForm.handleChange}
                                onBlur={resetForm.handleBlur}
                                placeholder="••••••••"
                                className={`w-full h-10 px-3 rounded-md border ${resetForm.errors.confirmPassword && resetForm.touched.confirmPassword ? 'border-red-500' : 'border-gray-700'} bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all`}
                            />
                            {resetForm.errors.confirmPassword && resetForm.touched.confirmPassword && (
                                <p className="text-[10px] text-red-500 mt-1">{resetForm.errors.confirmPassword}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            variant="hero"
                            size="lg"
                            className="w-full mt-2 bg-emerald-500 text-black font-semibold hover:bg-emerald-600 shadow-md disabled:opacity-50"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Resetting..." : "Reset Password"}
                        </Button>
                    </form>

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

const ResetPassword = () => {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">Loading...</div>}>
            <ResetPasswordForm />
        </Suspense>
    );
};

export default ResetPassword;
