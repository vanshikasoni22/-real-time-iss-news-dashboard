import { Info, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { ProjectRow } from "@/components/ProjectRow";
import { getProjectsByCategory, projects } from "@/data/projects";

export default function BrowsePage() {
  const featured = projects[0];

  return (
    <main className="min-h-screen bg-[#050505]">
      <Navbar />
      <section className="relative min-h-[88vh] overflow-hidden">
        <Image
          src={featured.assets.banner}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="hero-vignette absolute inset-0" />
        <div className="relative z-10 flex min-h-[88vh] max-w-4xl flex-col justify-center px-5 pb-24 pt-28 sm:px-10 lg:px-16">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.38em] text-[#e50914]">
            Vanshika Originals
          </p>
          <h1 className="max-w-3xl text-5xl font-black leading-none text-white sm:text-7xl lg:text-8xl">
            Vanshika
          </h1>
          <p className="mt-4 max-w-2xl text-xl font-semibold text-white sm:text-2xl">
            Developer building AI systems, polished web apps, and practical experiments.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-200 sm:text-lg">
            A cinematic portfolio where each project unfolds like a title: the problem, solution,
            architecture, demo, and measurable impact.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#projects"
              className="focus-ring inline-flex items-center gap-2 rounded bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-zinc-200"
            >
              <Play size={18} fill="currentColor" />
              View Projects
            </Link>
            <Link
              href="#about"
              className="focus-ring inline-flex items-center gap-2 rounded bg-zinc-500/60 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-zinc-500/80"
            >
              <Info size={18} />
              About Me
            </Link>
          </div>
        </div>
      </section>

      <section id="projects" className="-mt-20 space-y-10 px-5 pb-16 sm:px-10 lg:px-16">
        <ProjectRow title="AI / RL Projects" projects={getProjectsByCategory("AI / RL Projects")} />
        <ProjectRow title="Web Apps" projects={getProjectsByCategory("Web Apps")} />
        <ProjectRow title="Experiments" projects={getProjectsByCategory("Experiments")} />
        <ProjectRow title="Ongoing Projects" projects={getProjectsByCategory("Ongoing Projects")} />
      </section>

      <section id="about" className="border-t border-white/10 px-5 py-14 sm:px-10 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#e50914]">About</p>
            <h2 className="mt-3 text-3xl font-black text-white sm:text-5xl">Built like a portfolio. Watched like a series.</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">
              Replace the example content with your own projects in the data folder. The UI will
              automatically pick up categories, metrics, episodes, testimonials, videos, and related
              titles without touching page components.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {["AI", "React", "RL", "Next.js", "UX", "Systems"].map((skill) => (
              <div key={skill} className="rounded border border-white/10 bg-white/[0.04] p-5">
                <span className="text-2xl font-black text-white">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
