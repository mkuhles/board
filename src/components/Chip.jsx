import React from "react";
import css from "./Chip.module.css";

/**
 * Props:
 * - area: { id, title, number } | null
 * - variant: "filled" | "outline" (optional)
 * - showNumber: boolean (optional, default true)
 */
export function Chip({ label, title, variant = "filled" }) {
  return (
    <div className={`${css.chip} ${variant === "outline" ? css.outline : css.filled}`} title={title}>
      {label}
    </div>
  );
}
