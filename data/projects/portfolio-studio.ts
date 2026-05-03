import type { Project } from "./types";

export const portfolioStudio: Project = {
  id: "portfolio-studio",
  title: "Portfolio Studio",
  tagline: "A cinematic project library for personal work.",
  description:
    "A maintainable web portfolio with streaming-inspired browsing, project pages, reusable sections, and CMS-ready content objects.",
  categories: ["Web Apps", "Ongoing Projects"],
  tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
  status: "In Progress",
  year: "2026",
  assets: {
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    banner:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=80"
  },
  videos: {
    main: {
      label: "Interface Tour",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      poster:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
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
      summary: "Traditional portfolios flatten projects into cards and miss the story behind each build.",
      runtime: "3 min"
    },
    {
      title: "Solution",
      summary: "Created a browsing experience that treats projects as browsable titles with deeper watch pages.",
      runtime: "5 min"
    },
    {
      title: "Architecture",
      summary: "Next.js routes, typed project data, reusable media components, and category-driven rows.",
      runtime: "7 min"
    },
    {
      title: "Demo Walkthrough",
      summary: "Shows profile entry, project discovery, video modal, episodes, metrics, and related work.",
      runtime: "4 min"
    },
    {
      title: "Results / Impact",
      summary: "Makes the portfolio easier to update while giving recruiters a richer first impression.",
      runtime: "3 min"
    }
  ],
  metrics: [
    { label: "Complexity", value: "Medium" },
    { label: "Performance", value: "Lazy media" },
    { label: "Domain", value: "Web" },
    { label: "Custom Stat", value: "CMS-ready" }
  ],
  testimonials: [
    {
      quote: "It feels memorable immediately, but the structure still stays practical and editable.",
      author: "Peer Developer",
      role: "Frontend Engineer"
    }
  ],
  developerNotes: [
    "The key decision was separating project storytelling from project rendering.",
    "Each new project should be a data addition first, with UI changes only when the content model evolves."
  ],
  relatedProjectIds: ["signal-notes", "rl-lab"]
};
