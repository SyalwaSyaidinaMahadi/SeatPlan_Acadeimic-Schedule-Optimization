import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { getSchedule, uploadSchedule, optimizeSchedule, getOptimizationStatus } from "./routes/schedule";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // Schedule API routes
  app.get("/api/schedule/:semester", getSchedule);
  app.post("/api/schedule/upload", uploadSchedule);
  app.post("/api/schedule/optimize", optimizeSchedule);
  app.get("/api/optimization/status", getOptimizationStatus);

  return app;
}
