import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import prisma from "../lib/prisma";

const ALLOWED_SORT_FIELDS = ["scheduledDate", "priority", "createdAt", "updatedAt"] as const;
type SortableField = (typeof ALLOWED_SORT_FIELDS)[number];

// POST /api/todos
export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description, scheduledDate, scheduledTime, priority, status } = req.body;

    const todo = await prisma.todo.create({
      data: {
        title,
        description: description ?? null,
        scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
        scheduledTime: scheduledTime ?? null,
        priority: priority ?? "MEDIUM",
        status: status ?? "PENDING",
      },
    });

    return res.status(201).json({ status: "success", data: todo });
  } catch (error) {
    console.error("Error creating todo:", error);
    return res.status(500).json({ status: "error", message: "Failed to create todo" });
  }
};

// GET /api/todos?status=PENDING&sortBy=priority&order=asc
export const getTodos = async (req: Request, res: Response) => {
  try {
    const { status, sortBy, order } = req.query;

    const where: Record<string, string> = {};
    if (status !== undefined) {
      if (status !== "PENDING" && status !== "COMPLETED") {
        return res.status(400).json({
          status: "error",
          message: "status filter must be PENDING or COMPLETED",
        });
      }
      where.status = status;
    }

    const sortField: SortableField = ALLOWED_SORT_FIELDS.includes(sortBy as SortableField)
      ? (sortBy as SortableField)
      : "createdAt";
    const sortOrder: Prisma.SortOrder = order === "asc" ? "asc" : "desc";

    const todos = await prisma.todo.findMany({
      where: where as Prisma.TodoWhereInput,
      orderBy: { [sortField]: sortOrder } as Prisma.TodoOrderByWithRelationInput,
    });

    return res.status(200).json({ status: "success", data: todos });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return res.status(500).json({ status: "error", message: "Failed to fetch todos" });
  }
};

// GET /api/todos/:id
export const getTodoById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const todo = await prisma.todo.findUnique({ where: { id } });

    if (!todo) {
      return res.status(404).json({ status: "error", message: `Todo with id ${id} not found` });
    }

    return res.status(200).json({ status: "success", data: todo });
  } catch (error) {
    console.error("Error fetching todo:", error);
    return res.status(500).json({ status: "error", message: "Failed to fetch todo" });
  }
};

// PUT /api/todos/:id
export const updateTodo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const existing = await prisma.todo.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({ status: "error", message: `Todo with id ${id} not found` });
    }

    const { title, description, scheduledDate, scheduledTime, priority, status } = req.body;

    const todo = await prisma.todo.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(scheduledDate !== undefined && {
          scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
        }),
        ...(scheduledTime !== undefined && { scheduledTime }),
        ...(priority !== undefined && { priority }),
        ...(status !== undefined && { status }),
      },
    });

    return res.status(200).json({ status: "success", data: todo });
  } catch (error) {
    console.error("Error updating todo:", error);
    return res.status(500).json({ status: "error", message: "Failed to update todo" });
  }
};

// DELETE /api/todos/:id
export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const existing = await prisma.todo.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({ status: "error", message: `Todo with id ${id} not found` });
    }

    await prisma.todo.delete({ where: { id } });

    return res.status(200).json({ status: "success", message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return res.status(500).json({ status: "error", message: "Failed to delete todo" });
  }
};

// PATCH /api/todos/:id/toggle
export const toggleTodoStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const existing = await prisma.todo.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({ status: "error", message: `Todo with id ${id} not found` });
    }

    const nextStatus = existing.status === "COMPLETED" ? "PENDING" : "COMPLETED";

    const todo = await prisma.todo.update({
      where: { id },
      data: { status: nextStatus },
    });

    return res.status(200).json({ status: "success", data: todo });
  } catch (error) {
    console.error("Error toggling todo status:", error);
    return res.status(500).json({ status: "error", message: "Failed to toggle todo status" });
  }
};
