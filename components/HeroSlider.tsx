"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Slide = { src: string; alt: string };

export function HeroSlider({
  slides,
  interval = 5200,
  className = "",
  showControls = true,
  eager = false,
  objectPosition = "50% 48%",
}: {
  slides: Slide[];
  interval?: number;
  className?: string;
  showControls?: boolean;
  eager?: boolean;
  objectPosition?: string;
}) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);
  const count = slides.length;

  const move = useCallback(
    (delta: number) => {
      setCurrent((value) => (value + delta + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (
      paused ||
      count < 2 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const timer = window.setInterval(
      () => setCurrent((value) => (value + 1) % count),
      interval,
    );
    return () => window.clearInterval(timer);
  }, [paused, count, interval]);

  const positioned = /(^|\s)(absolute|fixed|sticky|relative)(\s|$)/.test(className);

  return (
    <div
      className={`${positioned ? "" : "relative"} isolate overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const start = touchStart.current;
        const end = event.changedTouches[0]?.clientX ?? null;
        if (start !== null && end !== null && Math.abs(end - start) > 40) {
          move(end < start ? 1 : -1);
        }
        touchStart.current = null;
      }}
    >
      {slides.map((slide, index) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          aria-hidden={index !== current}
          loading={eager && index === 0 ? "eager" : "lazy"}
          decoding="async"
          style={{ objectPosition }}
          fetchPriority={eager && index === 0 ? "high" : "auto"}
          className={`absolute inset-0 h-full w-full object-cover will-change-[opacity] transition-opacity duration-700 ease-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {showControls && count > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Photo ${index + 1}`}
              onClick={() => setCurrent(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === current ? "w-7 bg-primary" : "w-2.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
