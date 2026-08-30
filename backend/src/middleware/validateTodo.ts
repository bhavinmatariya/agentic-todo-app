import { Request, Response, NextFunction } from "express";

export const PRIORITY_VALUES = ["LOW", "MEDIUM", "HIGH"] as const;
export const STATUS_VALUES = ["PENDING", "COMPLETED"] as const;

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const isValidDate = (value: unknown): boolean => {
  if (typeof value !== "string") return false;
  const parsed = new Date(value);
  return !Number.isNaN(parsed.getTime());
};

const isValidTime = (value: unknown): boolean =>
  typeof value === "string" && /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);

// Validates the request body for creating a new Todo.
export const validateCreateTodo = (req: Request, res: Response, next: NextFunction) => {
  const errors: string[] = [];
  const { title, description, scheduledDate, scheduledTime, priority, status } = req.body;

  if (!isNonEmptyString(title)) {
    errors.push("title is required and must be a non-empty string");
  }

  if (description !== undefined && description !== null && typeof description !== "string") {
    errors.push("description must be a string");
  }

  if (scheduledDate !== undefined && scheduledDate !== null && !isValidDate(scheduledDate)) {
    errors.push("scheduledDate must be a valid date string");
  }

  if (scheduledTime !== undefined && scheduledTime !== null && !isValidTime(scheduledTime)) {
    errors.push("scheduledTime must be a valid time string in HH:MM format");
  }

  if (priority !== undefined && !PRIORITY_VALUES.includes(priority)) {
    errors.push(`priority must be one of: ${PRIORITY_VALUES.join(", ")}`);
  }

  if (status !== undefined && !STATUS_VALUES.includes(status)) {
    errors.push(`status must be one of: ${STATUS_VALUES.join(", ")}`);
  }

  if (errors.length > 0) {
    return res.status(400).json({ status: "error", message: "Validation failed", errors });
  }

  next();
};

// Validates the request body for updating an existing Todo. All fields are optional,
// but when present they must satisfy the same constraints as on creation.
export const validateUpdateTodo = (req: Request, res: Response, next: NextFunction) => {
  const errors: string[] = [];
  const { title, description, scheduledDate, scheduledTime, priority, status } = req.body;

  if (title !== undefined && !isNonEmptyString(title)) {
    errors.push("title must be a non-empty string");
  }

  if (description !== undefined && description !== null && typeof description !== "string") {
    errors.push("description must be a string");
  }

  if (scheduledDate !== undefined && scheduledDate !== null && !isValidDate(scheduledDate)) {
    errors.push("scheduledDate must be a valid date string");
  }

  if (scheduledTime !== undefined && scheduledTime !== null && !isValidTime(scheduledTime)) {
    errors.push("scheduledTime must be a valid time string in HH:MM format");
  }

  if (priority !== undefined && !PRIORITY_VALUES.includes(priority)) {
    errors.push(`priority must be one of: ${PRIORITY_VALUES.join(", ")}`);
  }

  if (status !== undefined && !STATUS_VALUES.includes(status)) {
    errors.push(`status must be one of: ${STATUS_VALUES.join(", ")}`);
  }

  if (errors.length > 0) {
    return res.status(400).json({ status: "error", message: "Validation failed", errors });
  }

  next();
};

// Validates that the :id route param is a positive integer.
export const validateIdParam = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ status: "error", message: "id must be a positive integer" });
  }

  next();
};
