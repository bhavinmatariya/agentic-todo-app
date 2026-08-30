import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
