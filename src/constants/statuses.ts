export type StatusOption = {
  id: string;
  title: string;
};

export const STATUSES: StatusOption[] = [
  { id: "backlog", title: "Backlog" },
  { id: "todo", title: "ToDo"},
  { id: "doing", title: "Doing" },
  { id: "done", title: "Done" },
  { id: "archived", title: "Archived" },
];

export const DEFAULT_STATUS = "backlog";
