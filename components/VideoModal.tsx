"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import type { ProjectVideo } from "@/data/projects/types";

export function VideoModal({
  video,
  open,
  onClose
}: {
  video?: ProjectVideo;
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  return (
    <AnimatePresence>
      {open && video ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, y: 18 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 18 }}
            transition={{ duration: 0.22 }}
            className="relative w-full max-w-5xl overflow-hidden rounded bg-black shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close video"
              className="focus-ring absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-white transition hover:bg-white hover:text-black"
            >
              <X size={20} />
            </button>
            <video
              className="aspect-video w-full bg-black"
              src={video.url}
              poster={video.poster}
              controls
              autoPlay
              playsInline
            />
            <div className="border-t border-white/10 p-4">
              <p className="font-bold text-white">{video.label}</p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
