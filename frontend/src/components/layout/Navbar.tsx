"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  
  // Check if user is logged in by checking for token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/');
    router.refresh();
  };

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="border-b border-white/5 bg-[#0B1220]/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-white"
          >
            <span className="text-lg text-red-500">🩸</span>
            <span className="text-base font-semibold tracking-wide">
              LifeLink
            </span>
          </Link>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/about"
              className="text-sm text-slate-300 transition hover:text-white"
            >
              About
            </Link>

            <Link
              href="/how-it-works"
              className="text-sm text-slate-300 transition hover:text-white"
            >
              How It Works
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm text-slate-300 transition hover:text-white"
                >
                  Dashboard
                </Link>
                <Link
                  href="/notifications"
                  className="text-sm text-slate-300 transition hover:text-white relative"
                >
                  Notifications
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </Link>
                <Link href="/profile">
                  <Button
                    variant="outline"
                    className="
                      h-9
                      rounded-lg
                      border-white/20
                      px-4
                      text-sm
                      text-white
                      hover:bg-white/10
                      hover:text-white
                    "
                  >
                    Profile
                  </Button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="
                    h-9
                    rounded-lg
                    border border-white/20
                    px-4
                    text-sm
                    text-white
                    hover:bg-white/10
                    hover:text-white
                  "
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="
                      h-9
                      rounded-lg
                      border-white/20
                      px-4
                      text-sm
                      text-white
                      hover:bg-white/10
                      hover:text-white
                    "
                  >
                    Login
                  </Button>
                </Link>

                <Link href="/signup">
                  <Button
                    className="
                      h-9
                      rounded-lg
                      bg-red-600
                      px-4
                      text-sm
                      text-white
                      shadow-sm
                      hover:bg-red-700
                    "
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}