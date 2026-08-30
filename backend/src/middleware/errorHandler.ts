import { Request, Response, NextFunction } from "express";

// Handles requests to routes that don't exist
export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ status: "error", message: `Route ${req.originalUrl} not found` });
}

// Centralized error handler - catches any errors passed via next(err)
// or thrown/rejected inside route handlers
export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  console.error("Unhandled error:", err);
  res.status(500).json({ status: "error", message: "Internal server error" });
}
