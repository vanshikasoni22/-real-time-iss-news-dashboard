"use client";

import { motion } from "framer-motion";
import { Code2, Play } from "lucide-react";
import Link from "next/link";

export function ProfileGate() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#090909] px-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-5xl text-center"
      >
        <h1 className="text-4xl font-medium tracking-tight sm:text-6xl">Who's Watching?</h1>
        <div className="mt-12 flex flex-col items-center justify-center gap-8 sm:flex-row">
          <Link href="/browse" className="group focus-ring rounded">
            <motion.div
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="flex h-36 w-36 items-center justify-center rounded bg-gradient-to-br from-[#e50914] via-[#751016] to-[#1d1d1d] ring-2 ring-transparent transition group-hover:ring-white sm:h-44 sm:w-44">
                <Code2 size={72} strokeWidth={1.6} />
              </div>
              <span className="text-xl text-zinc-400 transition group-hover:text-white">
                Vanshika (Developer)
              </span>
            </motion.div>
          </Link>
        </div>
        <Link
          href="/browse"
          className="focus-ring mt-12 inline-flex items-center gap-2 border border-zinc-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-zinc-300 transition hover:border-white hover:text-white"
        >
          <Play size={16} />
          Skip
        </Link>
      </motion.div>
    </main>
  );
}
