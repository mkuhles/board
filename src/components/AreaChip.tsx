import React from "react";
import {Chip} from "./Chip";
import type { Area } from "../lib/models";

/**
 * Props:
 * - area: { id, title, number } | null
 * - variant: "filled" | "outline" (optional)
 * - showNumber: boolean (optional, default true)
 */
type AreaChipProps = {
  area: Area | null;
  variant?: "filled" | "outline";
  showNumber?: boolean;
};

export function AreaChip({ area, variant = "filled", showNumber = false }: AreaChipProps) {
  if (!area) return null;

  const number = Number.isFinite(area.number) ? area.number : null;
  const label = showNumber && number !== null ? `${area.title} (${number})` : area.title;

  return (
    <Chip variant={variant} title={area.id} label={label} />
  );
}
