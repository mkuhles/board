import type { Area, Item, Sprint, TypeCode } from "../lib/models";
import type { TimeEntry } from "../lib/time";

export type ItemProp = {
  item: Item;
};

export type StatusOption = {
  id: string;
  title: string;
};

export type ItemFormLookups = {
  typeCodes?: Record<string, TypeCode>;
  areas?: Area[];
  statuses: StatusOption[];
  sprints?: Sprint[];
};

export type BeforeSubmitFn = () => TimeEntry | null;

export type RegisterBeforeSubmit = (fn: BeforeSubmitFn) => void;
