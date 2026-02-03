import React from "react";
import { RelatedToInput } from "./RelatedToInput";
import { Field } from "./Field";

export function RelatesToSection({
  allItems,
  relatesToIds,
  setRelatesToIds,
  excludeId,
}) {
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
