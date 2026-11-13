"use client";

import { useCallback, useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/components/LanguageProvider";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "@/components/icons";
import { site } from "@/lib/data";

type Photo = { src: string; alt: string };

function Lightbox({
  photos,
  index,
  onClose,
  onIndex,
}: {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onIndex: (index: number) => void;
}) {
  const { t } = useLang();
  const open = index !== null;

  const move = useCallback(
    (delta: number) => {
      if (index === null) return;
      onIndex((index + delta + photos.length) % photos.length);
    },
    [index, onIndex, photos.length],
  );

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    };
    document.addEventListener("keydown", onKey);

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose, move]);

  if (index === null) return null;
  const photo = photos[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      onClick={onClose}
      className="lightbox-backdrop fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
    >
      <img
        src={photo.src}
        alt={photo.alt}
        onClick={(event) => event.stopPropagation()}
        className="lightbox-panel max-h-[82vh] max-w-full rounded-xl object-contain shadow-2xl"
      />
      <button
        type="button"
        aria-label={t("gallery.close")}
        onClick={onClose}
        className="pressable glass absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full text-white"
      >
        <CloseIcon />
      </button>
      <button
        type="button"
        aria-label={t("gallery.prev")}
        onClick={(event) => {
          event.stopPropagation();
          move(-1);
        }}
        className="pressable glass absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full text-white"
      >
        <ChevronLeftIcon />
      </button>
      <button
        type="button"
        aria-label={t("gallery.next")}
        onClick={(event) => {
          event.stopPropagation();
          move(1);
        }}
        className="pressable glass absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full text-white"
      >
        <ChevronRightIcon />
      </button>
      <p className="absolute bottom-5 left-1/2 max-w-[90%] -translate-x-1/2 text-center text-xs text-white/80">
        {index + 1} / {photos.length} · {photo.alt}
      </p>
    </div>
  );
}

export function GalleryPage() {
  const { t, tx } = useLang();
  const alts = tx("gallery.alts") as Record<string, string>;
  const photos = site.images.gallery.map((src) => ({
    src,
    alt: alts[src] ?? site.business.name,
  }));
  const [index, setIndex] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
      <Reveal>
        <span className="eyebrow">{t("gallery.eyebrow")}</span>
        <h1 className="mt-2 text-4xl md:text-5xl">{t("gallery.title")}</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">{t("gallery.text")}</p>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, photoIndex) => (
          <Reveal key={photo.src} delay={(photoIndex % 3) * 60}>
            <button
              type="button"
              onClick={() => setIndex(photoIndex)}
              className="hover-lift group block w-full overflow-hidden rounded-2xl border border-border"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                width={1280}
                height={853}
                loading={photoIndex < 3 ? "eager" : "lazy"}
                decoding="async"
                className="aspect-[3/2] w-full object-cover transition-transform duration-200 ease-[var(--ease-out)] group-hover:scale-[1.04]"
              />
            </button>
          </Reveal>
        ))}
      </div>

      <Lightbox
        photos={photos}
        index={index}
        onClose={() => setIndex(null)}
        onIndex={setIndex}
      />
    </section>
  );
}
