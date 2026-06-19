"use client"
import React from "react";
import { assets} from "@/assets/assets";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";

const Navbar = () => {

  const { isSeller, userData, logout } = useAppContext();
  const router = useRouter();

  const handleAccountClick = () => {
    if (userData) {
      router.push("/my-orders");
    } else {
      router.push("/sign-in");
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const accountButton = userData ? (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={handleAccountClick}
        className="flex items-center gap-2 hover:text-gray-900 transition"
      >
        <Image src={assets.user_icon} alt="user icon" />
        Account
      </button>
      <button
        type="button"
        onClick={handleLogout}
        className="text-xs border px-3 py-1.5 rounded-full hover:bg-gray-50 transition"
      >
        Logout
      </button>
    </div>
  ) : (
    <Link
      href="/sign-in"
      className="flex items-center gap-2 hover:text-gray-900 transition"
    >
      <Image src={assets.user_icon} alt="user icon" />
      Login
    </Link>
  );

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push('/')}
        src={assets.logo}
        alt="logo"
      />
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          Contact
        </Link>

        {isSeller && userData && <button type="button" onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}

      </div>

      <ul className="hidden md:flex items-center gap-4 ">
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
        {accountButton}
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && userData && <button type="button" onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}
        {accountButton}
      </div>
    </nav>
  );
};

export default Navbar;
