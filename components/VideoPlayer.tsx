import type { ProjectVideo } from "@/data/projects/types";

export function VideoPlayer({ video }: { video: ProjectVideo }) {
  return (
    <video
      className="aspect-video w-full rounded bg-black object-cover"
      src={video.url}
      poster={video.poster}
      controls
      preload="metadata"
      playsInline
    />
  );
}
