import { useEffect } from "react";

/** Scroll Reveal: adiciona .is-in quando elementos .reveal entram na tela. */
export function useReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const root = document.documentElement;
    root.classList.add("motion-ready");

    const showAll = () => elements.forEach((element) => element.classList.add("is-in"));
    const reduceMotionOnCompactScreen = matchMedia("(prefers-reduced-motion: reduce) and (max-width: 760px)").matches;
    if (reduceMotionOnCompactScreen) {
      showAll();
      return () => root.classList.remove("motion-ready");
    }

    if (!("IntersectionObserver" in window)) {
      const revealVisible = () => elements.forEach((element) => {
        if (element.classList.contains("is-in")) return;
        const rect = element.getBoundingClientRect();
        if (rect.top < innerHeight * 0.85 && rect.bottom > innerHeight * 0.15) element.classList.add("is-in");
      });
      revealVisible();
      addEventListener("scroll", revealVisible, { passive: true });
      addEventListener("resize", revealVisible);
      return () => {
        removeEventListener("scroll", revealVisible);
        removeEventListener("resize", revealVisible);
        root.classList.remove("motion-ready");
      };
    }

    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }),
      { threshold: 0.15 },
    );
    elements.filter((element) => !element.classList.contains("is-in")).forEach((element) => io.observe(element));

    const syncVisibleItems = () => {
      if (document.visibilityState !== "visible") return;
      elements.forEach((element) => {
        if (element.classList.contains("is-in")) return;
        const rect = element.getBoundingClientRect();
        if (rect.top < innerHeight * 0.85 && rect.bottom > innerHeight * 0.15) {
          element.classList.add("is-in");
          io.unobserve(element);
        }
      });
    };
    document.addEventListener("visibilitychange", syncVisibleItems);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", syncVisibleItems);
      root.classList.remove("motion-ready");
    };
  }, []);
}
