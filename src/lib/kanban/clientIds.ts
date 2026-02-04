// Helpers for per-session client IDs (_cid)
// Keep these IDs out of persisted JSON if you want; they're mainly for stable React keys / DnD.

import type { Item, Project } from "../models";

/**
 * Ensures every item has a stable client id `_cid`.
 * `nextCid` must return a new unique cid string.
 */
export function ensureClientIds(loadedProject: Project, nextCid: () => string): Project {
  const items = (loadedProject?.items ?? []).map((it: Item) =>
    it?._cid ? it : { ...it, _cid: nextCid() }
  );

  return { ...loadedProject, items };
}

/**
 * Tiny cid factory: returns a function that yields c1, c2, c3...
 * You can also keep this in a useRef in the hook.
 */
export function createCidFactory(startAt = 1): () => string {
  let n = startAt;
  return () => `c${n++}`;
}
