"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, EyeOff, Eye, Loader } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Login2 = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    // const [termsAccepted, setTermsAccepted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { login, isLogin } = useAuthStore();
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateUser = () => {
        if (!formData.email || !formData.password) {
            toast.error("Please fill all fields");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error("Please enter a valid email");
            return false;
        }
        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return false;
        }
        // if (!termsAccepted) {
        //     toast.error("You must accept the terms and privacy policy.");
        //     return false;
        // }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = validateUser();
        if (!isValid) return;
        const success = await login(formData);
        if (success) {
        
           window.location.href = "/";
        }else{
            toast.error("Cant Login")
        }

    };

    return (
        <main className="w-full sm:w-full bg-white flex flex-col items-center justify-center pt-16">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full sm:w-1/2 gap-4 bg-[#FAFAFA] py-4 px-4 sm:px-12"
            >
                <h1 className="text-xl sm:text-2xl font-semibold items-center">
                    🤝 Welcome Back to Easy Lab
                </h1>
                <p className="font-semibold">Login</p>
                <div className="flex flex-col gap-4">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="p-3 w-full bg-white border-gray-200 border-[1px] rounded-md"
                    />
                </div>

                <div className="relative flex flex-col gap-4">
                    <label htmlFor="password">Password</label>
                    <input
                        className="p-3 w-full bg-white border-gray-200 border-[1px] rounded-md"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button
                        type="button"
                        className="absolute top-14 right-0 flex items-center pr-3"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeOff className="w-5 h-5 text-gray-400" />
                        ) : (
                            <Eye className="w-5 h-5 text-gray-400" />
                        )}
                    </button>
                </div>

                <div className="flex items-center w-full justify-center">
                    <button
                        type="submit"
                        disabled={isLogin}
                        className={`bg-[#01368B] w-1/2 flex items-center justify-center gap-3 text-white p-4 rounded-md ${isLogin && "opacity-50 cursor-not-allowed"
                            }`}
                    >
                        {isLogin ? (
                            <Loader size={20} className="animate-spin" />
                        ) : (
                            <>
                                <p className="text-[0.9rem]">Continue</p>
                                <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </div>

                <div className="flex flex-col items-center justify-center text-sm">
{/*                     <div className="flex gap-2 items-center"> */}
{/*                         <input
                            type="checkbox"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                        />
                        <p>
                            By signing in, you agree to our{" "}
                            <span className="text-[#01368B]">Terms of Service</span>
                        </p>
                    </div>
                    <p>
                        and <span className="text-[#01368B]">Privacy Policy</span>
                    </p> */}
                    <p>
                        Don't have an account?{" "}
                        <Link href="/register" className="text-[#01368B]">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </form>
        </main>
    );
};

export default Login2;
