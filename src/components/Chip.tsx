import React from "react";
import css from "./Chip.module.css";


type ChipProps = {
  label: string;
  title?: string;
  variant?: "filled" | "outline";
  color?: string;
};

function getTextColor(hex: string): string {
  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) return "#fff";
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#0f172a" : "#ffffff";
}

export function Chip({ label, title, variant = "filled", color }: ChipProps) {
  const style =
    color && variant === "filled"
      ? { backgroundColor: color, borderColor: color, color: getTextColor(color) }
      : color && variant === "outline"
        ? { borderColor: color, color }
        : undefined;
  return (
    <div
      className={`${css.chip} ${variant === "outline" ? css.outline : css.filled}`}
      title={title}
      style={style}
    >
      {label}
    </div>
  );
}
