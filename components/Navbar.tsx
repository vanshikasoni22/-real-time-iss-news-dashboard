"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition duration-300 ${
        scrolled ? "bg-[#050505]" : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <nav className="flex h-20 items-center justify-between px-5 sm:px-10 lg:px-16">
        <div className="flex items-center gap-7">
          <Link href="/browse" className="text-2xl font-black uppercase tracking-tight text-[#e50914]">
            VFlix
          </Link>
          <div className="hidden items-center gap-5 text-sm text-zinc-200 md:flex">
            <Link href="/browse" className="transition hover:text-white">
              Home
            </Link>
            <a href="/browse#projects" className="transition hover:text-white">
              Projects
            </a>
            <a href="/browse#about" className="transition hover:text-white">
              About
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Search size={19} className="text-zinc-200" />
          <div className="flex h-8 w-8 items-center justify-center rounded bg-[#e50914] text-xs font-black">
            VD
          </div>
        </div>
      </nav>
    </header>
  );
}
