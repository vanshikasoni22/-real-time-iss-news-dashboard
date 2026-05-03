import type { Project } from "./types";

export const rlLab: Project = {
  id: "rl-lab",
  title: "RL Strategy Lab",
  tagline: "Training agents to make better decisions under uncertainty.",
  description:
    "A reinforcement learning dashboard for visualizing policies, rewards, and environment behavior across experimental agent runs.",
  categories: ["AI / RL Projects", "Experiments"],
  tags: ["Reinforcement Learning", "Python", "Visualization"],
  status: "Prototype",
  year: "2026",
  assets: {
    thumbnail:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=900&q=80",
    banner:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1800&q=80"
  },
  videos: {
    main: {
      label: "Policy Training Demo",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      poster:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80"
    },
    clips: [
      {
        label: "Reward Curve Pass",
        url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      }
    ]
  },
  links: {
    demo: "https://example.com/demo",
    code: "https://github.com/",
    caseStudy: "https://example.com/case-study"
  },
  episodes: [
    {
      title: "Problem",
      summary: "Experiment runs were difficult to compare because reward traces and policy changes lived in separate notebooks.",
      runtime: "4 min"
    },
    {
      title: "Solution",
      summary: "Built a focused interface that groups runs, policy snapshots, and metric deltas into one scan-friendly view.",
      runtime: "6 min"
    },
    {
      title: "Architecture",
      summary: "Structured run metadata, visualization adapters, and lightweight state management around repeatable experiment sessions.",
      runtime: "8 min"
    },
    {
      title: "Demo Walkthrough",
      summary: "Walks through comparing two agents, inspecting reward changes, and surfacing policy behavior over time.",
      runtime: "5 min"
    },
    {
      title: "Results / Impact",
      summary: "Reduced manual comparison time and made experiment failures easier to explain during review.",
      runtime: "3 min"
    }
  ],
  metrics: [
    { label: "Complexity", value: "High" },
    { label: "Performance", value: "60 FPS charts" },
    { label: "Domain", value: "AI / RL" },
    { label: "Custom Stat", value: "42% faster review" }
  ],
  testimonials: [
    {
      quote: "The project makes model behavior understandable without forcing every review back into notebooks.",
      author: "Project Reviewer",
      role: "AI Mentor"
    }
  ],
  developerNotes: [
    "The main challenge was designing a visual language that made uncertainty feel inspectable instead of abstract.",
    "Next step: add richer environment playback with synchronized metric markers."
  ],
  relatedProjectIds: ["vision-studio", "signal-notes"]
};
