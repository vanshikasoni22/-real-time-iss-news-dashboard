import type { Project } from "./types";

export const signalNotes: Project = {
  id: "signal-notes",
  title: "Signal Notes",
  tagline: "Turning scattered research into structured decisions.",
  description:
    "A note-taking experiment that organizes research snippets, decisions, and follow-up tasks into a clean review flow.",
  categories: ["Web Apps", "Experiments"],
  tags: ["React", "Productivity", "UX"],
  status: "Live",
  year: "2025",
  assets: {
    thumbnail:
      "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=900&q=80",
    banner:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1800&q=80"
  },
  videos: {
    main: {
      label: "Research Flow Demo",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      poster:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80"
    },
    clips: []
  },
  links: {
    demo: "https://example.com/demo",
    code: "https://github.com/",
    caseStudy: "https://example.com/case-study"
  },
  episodes: [
    {
      title: "Problem",
      summary: "Research notes often lose context before they become decisions or implementation tasks.",
      runtime: "3 min"
    },
    {
      title: "Solution",
      summary: "Designed a compact workspace that ties notes to decisions, questions, and next actions.",
      runtime: "5 min"
    },
    {
      title: "Architecture",
      summary: "Client-first React state with typed note entities and filterable review lanes.",
      runtime: "6 min"
    },
    {
      title: "Demo Walkthrough",
      summary: "Captures a note, promotes it into a decision, and reviews follow-up work.",
      runtime: "4 min"
    },
    {
      title: "Results / Impact",
      summary: "Reduced friction between learning, deciding, and building.",
      runtime: "2 min"
    }
  ],
  metrics: [
    { label: "Complexity", value: "Medium" },
    { label: "Performance", value: "Instant filters" },
    { label: "Domain", value: "Productivity" },
    { label: "Custom Stat", value: "3 review modes" }
  ],
  testimonials: [
    {
      quote: "This turns project thinking into something you can revisit without losing the original thread.",
      author: "Beta User",
      role: "Student Builder"
    }
  ],
  developerNotes: [
    "This was a design systems exercise as much as a productivity app.",
    "The next version should support import and export flows."
  ],
  relatedProjectIds: ["portfolio-studio", "vision-studio"]
};
