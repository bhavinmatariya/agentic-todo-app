"use client";

import { useCallback, useEffect, useState } from "react";
import TodoForm from "@/components/TodoForm";
import { deleteTodo, getTodos, toggleTodoStatus } from "@/lib/api";
import type { Priority, Todo, TodoStatus } from "@/types/todo";

type StatusFilter = "ALL" | TodoStatus;
type SortField = "scheduledDate" | "priority" | "createdAt" | "updatedAt";
type SortOrder = "asc" | "desc";

const PRIORITY_LABELS: Record<Priority, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

const PRIORITY_STYLES: Record<Priority, string> = {
  LOW: "bg-green-100 text-green-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  HIGH: "bg-red-100 text-red-700",
};

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getTodos({
        status: statusFilter === "ALL" ? undefined : statusFilter,
        sortBy: sortField,
        order: sortOrder,
      });
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load todos");
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter, sortField, sortOrder]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddClick = () => {
    setEditingTodo(null);
    setActionError(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (todo: Todo) => {
    setEditingTodo(todo);
    setActionError(null);
    setIsFormOpen(true);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingTodo(null);
  };

  const handleFormSaved = () => {
    setIsFormOpen(false);
    setEditingTodo(null);
    fetchTodos();
  };

  const handleDelete = async (todo: Todo) => {
    if (typeof window !== "undefined" && !window.confirm(`Delete "${todo.title}"?`)) {
      return;
    }

    setActionError(null);
    try {
      await deleteTodo(todo.id);
      fetchTodos();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to delete todo");
    }
  };

  const handleToggle = async (todo: Todo) => {
    setActionError(null);
    try {
      const updated = await toggleTodoStatus(todo.id);
      setTodos((current) => current.map((item) => (item.id === updated.id ? updated : item)));
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to update todo status");
    }
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <label htmlFor="status-filter" className="text-sm font-medium text-gray-600">
            Filter by status
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="ALL">All</option>
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-600">Sort by</span>
          <div className="flex gap-2">
            <select
              aria-label="Sort field"
              value={sortField}
              onChange={(event) => setSortField(event.target.value as SortField)}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="scheduledDate">Scheduled date</option>
              <option value="priority">Priority</option>
              <option value="createdAt">Created date</option>
              <option value="updatedAt">Updated date</option>
            </select>
            <select
              aria-label="Sort order"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value as SortOrder)}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddClick}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Add Todo
        </button>
      </div>

      {isFormOpen && (
        <TodoForm todo={editingTodo} onSaved={handleFormSaved} onCancel={handleFormCancel} />
      )}

      {actionError && (
        <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {actionError}
        </p>
      )}

      {isLoading && (
        <p className="rounded-md border border-gray-200 p-6 text-center text-gray-500">
          Loading todos...
        </p>
      )}

      {!isLoading && error && (
        <p className="rounded-md border border-red-200 bg-red-50 p-6 text-center text-red-600">
          {error}
        </p>
      )}

      {!isLoading && !error && todos.length === 0 && (
        <p className="rounded-md border border-gray-200 p-6 text-center text-gray-500">
          No todos found. Create one to get started.
        </p>
      )}

      {!isLoading && !error && todos.length > 0 && (
        <ul className="flex flex-col gap-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex flex-col gap-2 rounded-lg border border-gray-200 p-4 shadow-sm sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-400">#{todo.id}</span>
                  <h2 className="text-lg font-semibold text-gray-800">{todo.title}</h2>
                </div>
                {todo.description && (
                  <p className="text-sm text-gray-600">{todo.description}</p>
                )}
                <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                  <span>
                    Scheduled:{" "}
                    {todo.scheduledDate
                      ? new Date(todo.scheduledDate).toLocaleDateString()
                      : "—"}
                    {todo.scheduledTime ? ` at ${todo.scheduledTime}` : ""}
                  </span>
                  <span>Created: {new Date(todo.createdAt).toLocaleString()}</span>
                  <span>Updated: {new Date(todo.updatedAt).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${PRIORITY_STYLES[todo.priority]}`}
                  >
                    {PRIORITY_LABELS[todo.priority]}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      todo.status === "COMPLETED"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {todo.status === "COMPLETED" ? "Completed" : "Pending"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggle(todo)}
                    className="rounded-md border border-gray-300 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50"
                  >
                    {todo.status === "COMPLETED" ? "Mark pending" : "Mark completed"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEditClick(todo)}
                    className="rounded-md border border-gray-300 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(todo)}
                    className="rounded-md border border-red-300 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
