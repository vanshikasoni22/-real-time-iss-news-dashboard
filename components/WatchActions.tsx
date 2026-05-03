"use client";

import { BookOpen, Code2, Play } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/data/projects";
import { VideoModal } from "./VideoModal";

export function WatchActions({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="focus-ring inline-flex items-center gap-2 rounded bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-zinc-200"
        >
          <Play size={18} fill="currentColor" />
          Watch Demo
        </button>
        {project.links.code ? (
          <Link
            href={project.links.code}
            target="_blank"
            className="focus-ring inline-flex items-center gap-2 rounded bg-zinc-700/80 px-6 py-3 text-sm font-bold text-white transition hover:bg-zinc-600"
          >
            <Code2 size={18} />
            View Code
          </Link>
        ) : null}
        {project.links.caseStudy ? (
          <Link
            href={project.links.caseStudy}
            target="_blank"
            className="focus-ring inline-flex items-center gap-2 rounded border border-white/25 px-6 py-3 text-sm font-bold text-white transition hover:border-white"
          >
            <BookOpen size={18} />
            Case Study
          </Link>
        ) : null}
      </div>
      <VideoModal video={project.videos.main} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
