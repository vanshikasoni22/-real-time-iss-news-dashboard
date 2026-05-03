import { portfolioStudio } from "./portfolio-studio";
import { rlLab } from "./rl-lab";
import { signalNotes } from "./signal-notes";
import type { Project, ProjectCategory } from "./types";
import { visionStudio } from "./vision-studio";

export const projects: Project[] = [rlLab, portfolioStudio, signalNotes, visionStudio];

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id);
}

export function getProjectsByCategory(category: ProjectCategory) {
  return projects.filter((project) => project.categories.includes(category));
}

export function getRelatedProjects(project: Project) {
  return project.relatedProjectIds
    .map((id) => getProjectById(id))
    .filter((related): related is Project => Boolean(related));
}

export type { Project };
