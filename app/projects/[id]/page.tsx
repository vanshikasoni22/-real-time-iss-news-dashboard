import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { ProjectRow } from "@/components/ProjectRow";
import { VideoPlayer } from "@/components/VideoPlayer";
import { WatchActions } from "@/components/WatchActions";
import { getProjectById, getRelatedProjects, projects } from "@/data/projects";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return {
      title: "Project Not Found | Vanshika"
    };
  }

  return {
    title: `${project.title} | Vanshika`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.assets.banner]
    }
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(project);

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <section className="relative min-h-[84vh] overflow-hidden">
        <Image
          src={project.assets.banner}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="hero-vignette absolute inset-0" />
        <div className="relative z-10 flex min-h-[84vh] max-w-5xl flex-col justify-center px-5 pb-20 pt-28 sm:px-10 lg:px-16">
          <Link
            href="/browse"
            className="focus-ring mb-8 inline-flex w-fit items-center gap-2 text-sm font-bold text-zinc-300 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to Browse
          </Link>
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm font-bold">
            <span className="text-[#46d369]">{project.status}</span>
            <span>{project.year}</span>
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded border border-white/25 px-2 py-1 text-xs">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="max-w-4xl text-5xl font-black leading-none sm:text-7xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-3xl text-xl font-semibold text-zinc-100 sm:text-2xl">
            {project.tagline}
          </p>
          <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-200 sm:text-lg">
            {project.description}
          </p>
          <div className="mt-8">
            <WatchActions project={project} />
          </div>
        </div>
      </section>

      <div className="-mt-12 space-y-14 px-5 pb-20 sm:px-10 lg:px-16">
        <section>
          <h2 className="mb-5 text-2xl font-black">Episodes</h2>
          <div className="divide-y divide-white/10 rounded border border-white/10 bg-white/[0.04]">
            {project.episodes.map((episode, index) => (
              <article key={episode.title} className="grid gap-4 p-5 sm:grid-cols-[140px_1fr_80px] sm:items-center">
                <div className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-500">
                  Episode {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">{episode.title}</h3>
                  <p className="mt-2 leading-7 text-zinc-300">{episode.summary}</p>
                </div>
                <div className="text-sm font-bold text-zinc-400 sm:text-right">{episode.runtime}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <h2 className="mb-5 text-2xl font-black">Video</h2>
            <VideoPlayer video={project.videos.main} />
            {project.videos.clips.length ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {project.videos.clips.map((clip) => (
                  <div key={clip.label}>
                    <VideoPlayer video={clip} />
                    <p className="mt-2 text-sm font-bold text-zinc-300">{clip.label}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <h2 className="mb-5 text-2xl font-black">Metrics</h2>
            <div className="grid gap-3">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="rounded border border-white/10 bg-white/[0.04] p-5">
                  <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">{metric.label}</p>
                  <p className="mt-2 text-2xl font-black text-white">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-5 text-2xl font-black">Testimonials</h2>
            <div className="space-y-4">
              {project.testimonials.map((testimonial) => (
                <figure key={testimonial.quote} className="rounded border border-white/10 bg-white/[0.04] p-5">
                  <blockquote className="text-lg leading-8 text-zinc-200">"{testimonial.quote}"</blockquote>
                  <figcaption className="mt-4 text-sm text-zinc-400">
                    <span className="font-bold text-white">{testimonial.author}</span> / {testimonial.role}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-5 text-2xl font-black">Developer Notes</h2>
            <div className="space-y-4">
              {project.developerNotes.map((note) => (
                <p key={note} className="rounded border border-white/10 bg-white/[0.04] p-5 leading-7 text-zinc-300">
                  {note}
                </p>
              ))}
            </div>
          </div>
        </section>

        <ProjectRow title="More Like This" projects={relatedProjects} />
      </div>
    </main>
  );
}
