'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";

const SignIn = () => {
    const { login, userData, authReady } = useAppContext();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (authReady && userData) {
            router.replace("/my-orders");
        }
    }, [authReady, userData, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const success = login(email.trim(), password);
        if (success) {
            toast.success("Logged in successfully");
            router.push("/my-orders");
        } else {
            toast.error("Invalid email or password");
        }

        setLoading(false);
    };

    if (authReady && userData) {
        return null;
    }

    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row items-center justify-between gap-10 min-h-[70vh]">
                <form onSubmit={handleSubmit} className="w-full max-w-md">
                    <p className="text-2xl md:text-3xl text-gray-500">
                        Sign in to your <span className="font-semibold text-orange-600">Account</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        Demo: admin@example.com / password123
                    </p>
                    <div className="space-y-3 mt-8">
                        <input
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-6 bg-orange-600 text-white py-3 hover:bg-orange-700 uppercase disabled:opacity-60"
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>
                <Image
                    className="md:mr-16"
                    src={assets.my_location_image}
                    alt="sign in illustration"
                />
            </div>
            <Footer />
        </>
    );
};

export default SignIn;
