import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { getTasks, createTask, updateTask, deleteTask } from "./src/tasks.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/tasks", getTasks);
app.post("/tasks", createTask);
app.patch("/task/:taskId", updateTask);
app.delete("/tasks/:taskId", deleteTask);

export const api = functions.https.onRequest(app);
