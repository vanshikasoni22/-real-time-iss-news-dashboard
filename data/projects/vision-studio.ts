import type { Project } from "./types";

export const visionStudio: Project = {
  id: "vision-studio",
  title: "Vision Studio",
  tagline: "A lightweight interface for inspecting image model outputs.",
  description:
    "A visual evaluation surface for comparing generated outputs, prompts, labels, and quality notes in one place.",
  categories: ["AI / RL Projects", "Ongoing Projects"],
  tags: ["Computer Vision", "Evaluation", "Interface"],
  status: "In Progress",
  year: "2026",
  assets: {
    thumbnail:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    banner:
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1800&q=80"
  },
  videos: {
    main: {
      label: "Evaluation Pass",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      poster:
        "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1200&q=80"
    },
    clips: []
  },
  links: {
    demo: "https://example.com/demo",
    code: "https://github.com/"
  },
  episodes: [
    {
      title: "Problem",
      summary: "Model output review was slow because images, prompts, and notes were split across tools.",
      runtime: "4 min"
    },
    {
      title: "Solution",
      summary: "Created a visual board for comparing outputs and attaching evaluation context quickly.",
      runtime: "6 min"
    },
    {
      title: "Architecture",
      summary: "Uses normalized evaluation objects, media cards, and tag-based comparison views.",
      runtime: "7 min"
    },
    {
      title: "Demo Walkthrough",
      summary: "Reviews a batch, marks quality issues, and compares prompt variants.",
      runtime: "5 min"
    },
    {
      title: "Results / Impact",
      summary: "Improves repeatability and makes subjective review criteria easier to discuss.",
      runtime: "3 min"
    }
  ],
  metrics: [
    { label: "Complexity", value: "High" },
    { label: "Performance", value: "Batched media" },
    { label: "Domain", value: "AI" },
    { label: "Custom Stat", value: "5 label types" }
  ],
  testimonials: [
    {
      quote: "The interface makes evaluation feel deliberate instead of improvised.",
      author: "Research Collaborator",
      role: "ML Engineer"
    }
  ],
  developerNotes: [
    "The hardest part is making qualitative judgment structured without making it rigid.",
    "Future versions can support side-by-side model comparisons."
  ],
  relatedProjectIds: ["rl-lab", "portfolio-studio"]
};
