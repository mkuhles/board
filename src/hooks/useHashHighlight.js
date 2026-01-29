import { useEffect } from "react";

export function useHashHighlight({
  className = "highlight",
  durationMs = 2000,
  scrollIntoView = true,
} = {}) {
  useEffect(() => {
    function run() {
      const raw = window.location.hash || "";
      const id = raw.startsWith("#") ? decodeURIComponent(raw.slice(1)) : "";
      if (!id) return;

      const el = document.getElementById(id);
      if (!el) return;

      if (scrollIntoView) {
        el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      }

      // restart animation reliably
      el.classList.remove(className);
      // force reflow
      void el.offsetWidth;
      el.classList.add(className);

      window.setTimeout(() => el.classList.remove(className), durationMs);
    }

    // initial (page load / first render)
    run();

    // subsequent hash changes
    window.addEventListener("hashchange", run);
    return () => window.removeEventListener("hashchange", run);
  }, [className, durationMs, scrollIntoView]);
}
