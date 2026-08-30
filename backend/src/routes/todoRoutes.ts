import { Router } from "express";
import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  toggleTodoStatus,
} from "../controllers/todoController";
import { validateCreateTodo, validateUpdateTodo, validateIdParam } from "../middleware/validateTodo";

const router = Router();

router.post("/", validateCreateTodo, createTodo);
router.get("/", getTodos);
router.get("/:id", validateIdParam, getTodoById);
router.put("/:id", validateIdParam, validateUpdateTodo, updateTodo);
router.delete("/:id", validateIdParam, deleteTodo);
router.patch("/:id/toggle", validateIdParam, toggleTodoStatus);

export default router;
