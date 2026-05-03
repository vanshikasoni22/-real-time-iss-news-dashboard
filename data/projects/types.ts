export type ProjectCategory =
  | "AI / RL Projects"
  | "Web Apps"
  | "Experiments"
  | "Ongoing Projects";

export type ProjectEpisode = {
  title: string;
  summary: string;
  runtime: string;
};

export type ProjectMetric = {
  label: string;
  value: string;
};

export type ProjectTestimonial = {
  quote: string;
  author: string;
  role: string;
};

export type ProjectVideo = {
  label: string;
  url: string;
  poster?: string;
};

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  categories: ProjectCategory[];
  tags: string[];
  status: "Live" | "Prototype" | "In Progress";
  year: string;
  assets: {
    thumbnail: string;
    banner: string;
  };
  videos: {
    main: ProjectVideo;
    clips: ProjectVideo[];
  };
  links: {
    demo?: string;
    code?: string;
    caseStudy?: string;
  };
  episodes: ProjectEpisode[];
  metrics: ProjectMetric[];
  testimonials: ProjectTestimonial[];
  developerNotes: string[];
  relatedProjectIds: string[];
};
