"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    setEnabled(true);
    document.documentElement.classList.add("cursor-none-root");

    const mouse = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };

    const onMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    let frame = 0;
    const tick = () => {
      ring.x += (mouse.x - ring.x) * 0.14;
      ring.y += (mouse.y - ring.y) * 0.14;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.x - 4}px,${mouse.y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x - 17}px,${ring.y - 17}px)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("cursor-none-root");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-primary"
        style={{ boxShadow: "0 0 14px rgba(0,232,122,0.9)" }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-[34px] w-[34px] rounded-full"
        style={{ border: "1px solid rgba(0,232,122,0.35)" }}
      />
    </>
  );
}
