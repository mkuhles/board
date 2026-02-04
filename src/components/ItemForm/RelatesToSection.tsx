import React from "react";
import { RelatedToInput } from "./RelatedToInput";
import { Field } from "./Field";
import type { Item } from "../../lib/models";
import { useI18n } from "../../i18n";

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
  const { t } = useI18n();
  return (
    <Field label={t("fields.relatesTo")} inputId="item-relates" wide>
      <RelatedToInput
        allItems={allItems}
        valueIds={relatesToIds}
        onChangeIds={setRelatesToIds}
        excludeId={excludeId}
        placeholder={t("fields.relatesToPlaceholder")}
      />
    </Field>
  );
}
