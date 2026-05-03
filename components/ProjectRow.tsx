import type { Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectRow({ title, projects }: { title: string; projects: Project[] }) {
  if (!projects.length) {
    return null;
  }

  return (
    <section>
      <h2 className="mb-4 text-xl font-black text-white sm:text-2xl">{title}</h2>
      <div className="scrollbar-hide flex gap-4 overflow-x-auto overflow-y-visible pb-8 pt-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
