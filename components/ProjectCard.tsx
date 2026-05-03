"use client";

import { motion } from "framer-motion";
import { ExternalLink, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      whileHover={{ scale: 1.06, y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="group relative min-w-[250px] overflow-hidden rounded bg-zinc-900 shadow-2xl shadow-black/50 sm:min-w-[310px]"
    >
      <Link href={`/projects/${project.id}`} className="focus-ring block">
        <div className="relative aspect-video overflow-hidden bg-zinc-800">
          <Image
            src={project.assets.thumbnail}
            alt={`${project.title} thumbnail`}
            fill
            sizes="(max-width: 640px) 250px, 310px"
            className="object-cover transition duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/5 to-transparent opacity-80" />
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black">
              <Play size={16} fill="currentColor" />
            </span>
            <span className="rounded bg-black/70 px-2 py-1 text-xs font-bold text-white">
              {project.status}
            </span>
          </div>
        </div>
        <div className="space-y-2 p-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-black text-white">{project.title}</h3>
            <ExternalLink size={17} className="mt-1 shrink-0 text-zinc-500 transition group-hover:text-white" />
          </div>
          <p className="line-clamp-2 text-sm leading-6 text-zinc-300">{project.description}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded bg-white/10 px-2 py-1 text-xs text-zinc-200">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
