"use client";

import { useState, type FormEvent } from "react";
import { ApiError, createTodo, updateTodo } from "@/lib/api";
import type { Priority, Todo, TodoStatus } from "@/types/todo";

interface TodoFormProps {
  todo?: Todo | null;
  onSaved: (todo: Todo) => void;
  onCancel: () => void;
}

interface FormState {
  title: string;
  description: string;
  scheduledDate: string;
  scheduledTime: string;
  priority: Priority;
  status: TodoStatus;
}

const TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)$/;

// Converts an ISO date string (or null) into the yyyy-MM-dd format expected
// by a native <input type="date">.
const toDateInputValue = (value: string | null | undefined): string => {
  if (!value) return "";
  return value.slice(0, 10);
};

const buildInitialState = (todo?: Todo | null): FormState => ({
  title: todo?.title ?? "",
  description: todo?.description ?? "",
  scheduledDate: toDateInputValue(todo?.scheduledDate),
  scheduledTime: todo?.scheduledTime ?? "",
  priority: todo?.priority ?? "MEDIUM",
  status: todo?.status ?? "PENDING",
});

export default function TodoForm({ todo, onSaved, onCancel }: TodoFormProps) {
  const [form, setForm] = useState<FormState>(() => buildInitialState(todo));
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = Boolean(todo);

  const validate = (): string[] => {
    const errors: string[] = [];

    if (form.title.trim().length === 0) {
      errors.push("Title is required.");
    }

    if (form.scheduledTime && !TIME_PATTERN.test(form.scheduledTime)) {
      errors.push("Scheduled time must be in HH:MM format.");
    }

    return errors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validate();
    setFieldErrors(errors);
    setFormError(null);

    if (errors.length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim() ? form.description.trim() : null,
        scheduledDate: form.scheduledDate ? form.scheduledDate : null,
        scheduledTime: form.scheduledTime ? form.scheduledTime : null,
        priority: form.priority,
        status: form.status,
      };

      const saved =
        isEditMode && todo ? await updateTodo(todo.id, payload) : await createTodo(payload);

      onSaved(saved);
    } catch (err) {
      if (err instanceof ApiError && err.errors) {
        setFieldErrors(err.errors);
      }
      setFormError(err instanceof Error ? err.message : "Failed to save todo");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-lg border border-gray-200 p-4 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-gray-800">
        {isEditMode ? "Edit Todo" : "Add Todo"}
      </h2>

      {formError && (
        <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {formError}
        </p>
      )}

      {fieldErrors.length > 0 && (
        <ul className="list-inside list-disc rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {fieldErrors.map((fieldError) => (
            <li key={fieldError}>{fieldError}</li>
          ))}
        </ul>
      )}

      <div className="flex flex-col gap-1">
        <label htmlFor="todo-title" className="text-sm font-medium text-gray-600">
          Title
        </label>
        <input
          id="todo-title"
          type="text"
          value={form.title}
          onChange={(event) => setForm({ ...form, title: event.target.value })}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="todo-description" className="text-sm font-medium text-gray-600">
          Description
        </label>
        <textarea
          id="todo-description"
          value={form.description}
          onChange={(event) => setForm({ ...form, description: event.target.value })}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          rows={3}
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="todo-date" className="text-sm font-medium text-gray-600">
            Scheduled date
          </label>
          <input
            id="todo-date"
            type="date"
            value={form.scheduledDate}
            onChange={(event) => setForm({ ...form, scheduledDate: event.target.value })}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="todo-time" className="text-sm font-medium text-gray-600">
            Scheduled time
          </label>
          <input
            id="todo-time"
            type="time"
            value={form.scheduledTime}
            onChange={(event) => setForm({ ...form, scheduledTime: event.target.value })}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="todo-priority" className="text-sm font-medium text-gray-600">
            Priority
          </label>
          <select
            id="todo-priority"
            value={form.priority}
            onChange={(event) => setForm({ ...form, priority: event.target.value as Priority })}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="todo-status" className="text-sm font-medium text-gray-600">
            Status
          </label>
          <select
            id="todo-status"
            value={form.status}
            onChange={(event) => setForm({ ...form, status: event.target.value as TodoStatus })}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 sm:w-auto"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60 sm:w-auto"
        >
          {isSubmitting ? "Saving..." : isEditMode ? "Save changes" : "Add Todo"}
        </button>
      </div>
    </form>
  );
}
