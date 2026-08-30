// Shared Todo domain types used across frontend components.

export type Priority = "LOW" | "MEDIUM" | "HIGH";

export type TodoStatus = "PENDING" | "COMPLETED";

export type SortField = "scheduledDate" | "priority" | "createdAt" | "updatedAt";

export type SortOrder = "asc" | "desc";

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

export interface GetTodosParams {
  status?: TodoStatus;
  sortBy?: SortField;
  order?: SortOrder;
}

export interface ApiSuccessResponse<T> {
  status: "success";
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  status: "error";
  message: string;
  errors?: string[];
}
