import React from "react";
import css from "./AreaChip.module.css";

/**
 * Props:
 * - area: { id, title, number } | null
 * - variant: "filled" | "outline" (optional)
 * - showNumber: boolean (optional, default true)
 */
export function AreaChip({ area, variant = "filled", showNumber = false }) {
  if (!area) return null;

  const number = Number.isFinite(area.number) ? area.number : null;
  const label = showNumber && number !== null ? `${area.title} (${number})` : area.title;

  return (
    <div className={`${css.chip} ${variant === "outline" ? css.outline : css.filled}`} title={area.id}>
      {label}
    </div>
  );
}
