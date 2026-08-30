// Typed API client for the Todo backend. Wraps `fetch` with JSON handling
// and consistent error reporting for use across frontend components.

import type {
  ApiSuccessResponse,
  CreateTodoInput,
  GetTodosParams,
  Todo,
  UpdateTodoInput,
} from "@/types/todo";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export class ApiError extends Error {
  status: number;
  errors?: string[];

  constructor(message: string, status: number, errors?: string[]) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    const message = body?.message ?? "Request failed";
    throw new ApiError(message, res.status, body?.errors);
  }

  return body as T;
}

// GET /api/todos
export const getTodos = async (params?: GetTodosParams): Promise<Todo[]> => {
  const query = new URLSearchParams();
  if (params?.status) query.set("status", params.status);
  if (params?.sortBy) query.set("sortBy", params.sortBy);
  if (params?.order) query.set("order", params.order);

  const qs = query.toString();
  const response = await request<ApiSuccessResponse<Todo[]>>(
    `/api/todos${qs ? `?${qs}` : ""}`
  );
  return response.data;
};

// GET /api/todos/:id
export const getTodoById = async (id: number): Promise<Todo> => {
  const response = await request<ApiSuccessResponse<Todo>>(`/api/todos/${id}`);
  return response.data;
};

// POST /api/todos
export const createTodo = async (input: CreateTodoInput): Promise<Todo> => {
  const response = await request<ApiSuccessResponse<Todo>>("/api/todos", {
    method: "POST",
    body: JSON.stringify(input),
  });
  return response.data;
};

// PUT /api/todos/:id
export const updateTodo = async (id: number, input: UpdateTodoInput): Promise<Todo> => {
  const response = await request<ApiSuccessResponse<Todo>>(`/api/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
  return response.data;
};

// DELETE /api/todos/:id
export const deleteTodo = async (id: number): Promise<void> => {
  await request<ApiSuccessResponse<null>>(`/api/todos/${id}`, {
    method: "DELETE",
  });
};

// PATCH /api/todos/:id/toggle
export const toggleTodoStatus = async (id: number): Promise<Todo> => {
  const response = await request<ApiSuccessResponse<Todo>>(`/api/todos/${id}/toggle`, {
    method: "PATCH",
  });
  return response.data;
};
