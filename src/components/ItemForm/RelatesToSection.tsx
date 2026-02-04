import React from "react";
import { RelatedToInput } from "./RelatedToInput";
import { Field } from "./Field";
import type { Item } from "../../lib/models";

type RelatesToSectionProps = {
  allItems?: Item[];
  relatesToIds: string[];
  setRelatesToIds: (value: string[]) => void;
  excludeId?: string;
};

export function RelatesToSection({
  allItems,
  relatesToIds,
  setRelatesToIds,
  excludeId,
}: RelatesToSectionProps) {
  return (
    <Field label="Relates to" inputId="item-relates" wide>
      <RelatedToInput
        allItems={allItems}
        valueIds={relatesToIds}
        onChangeIds={setRelatesToIds}
        excludeId={excludeId}
      />
    </Field>
  );
}
