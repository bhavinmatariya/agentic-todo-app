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

export interface CreateTodoInput {
  title: string;
  description?: string | null;
  scheduledDate?: string | null;
  scheduledTime?: string | null;
  priority?: Priority;
  status?: TodoStatus;
}

export type UpdateTodoInput = Partial<CreateTodoInput>;

export interface ApiSuccessResponse<T> {
  status: "success";
  message?: string;
  data: T;
}

export interface GetTodosParams {
  status?: TodoStatus;
  sortBy?: "scheduledDate" | "priority" | "createdAt" | "updatedAt";
  order?: "asc" | "desc";
}
