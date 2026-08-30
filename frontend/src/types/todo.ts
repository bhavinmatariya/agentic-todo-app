export type Priority = "LOW" | "MEDIUM" | "HIGH";
export type TodoStatus = "PENDING" | "COMPLETED";

export interface Todo {
  id: number;
  title: string;
  description: string | null;
  scheduledDate: string | null;
  scheduledTime: string | null;
  priority: Priority;
  status: TodoStatus;
  createdAt: string;
  updatedAt: string;
}
