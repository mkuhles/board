import { useEffect, useState } from "react";

export type RouteId = "app" | "imprint" | "privacy" | "guide";

function withBase(path = "") {
  const base = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
  const suffix = path.replace(/^\/+/, "");
  if (!suffix) return `${base}/`;
  return `${base}/${suffix}`;
}

function parseRoute(): RouteId {
  if (typeof window === "undefined") return "app";

  const hash = window.location.hash || "";
  const hashMatch = hash.match(/^#\/?(imprint|privacy|guide)(\/|$)/i);
  if (hashMatch?.[1]) {
    return hashMatch[1].toLowerCase() as RouteId;
  }

  const path = window.location.pathname.replace(/\/+$/, "");
  const lastSegment = path.split("/").filter(Boolean).pop() || "";
  if (
    lastSegment === "imprint" ||
    lastSegment === "privacy" ||
    lastSegment === "guide"
  ) {
    return lastSegment as RouteId;
  }

  return "app";
}

export function useRoute(): RouteId {
  const [route, setRoute] = useState<RouteId>(() => parseRoute());

  useEffect(() => {
    const handle = () => setRoute(parseRoute());
    window.addEventListener("hashchange", handle);
    window.addEventListener("popstate", handle);
    return () => {
      window.removeEventListener("hashchange", handle);
      window.removeEventListener("popstate", handle);
    };
  }, []);

  return route;
}

export function navigateTo(route: RouteId) {
  if (typeof window === "undefined") return;
  const nextPath = route === "app" ? withBase() : withBase(route);
  window.history.pushState({}, "", nextPath);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
