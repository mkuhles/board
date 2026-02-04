export type StatusOption = {
  id: string;
  title: string;
  color: string;
  textColor?: string;
};

export const STATUSES: StatusOption[] = [
  { id: "backlog", title: "Backlog", color: "#6d58d9" },
  { id: "todo", title: "ToDo", color: "#2f6ce0" },
  { id: "doing", title: "Doing", color: "#1f9f93" },
  { id: "done", title: "Done", color: "#2f8f4e" },
  { id: "archived", title: "Archived", color: "#4b5563" },
];

export const DEFAULT_STATUS = "backlog";
