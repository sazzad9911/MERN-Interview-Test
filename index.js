import express from "express";
import { mongoConnection } from "./middleware/mongoConnection.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";
import {
  createDrawing,
  deleteDrawing,
  getDrawingById,
  getDrawings,
  updateDrawing,
} from "./controller/drawingController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
mongoConnection();
app.use(express.static(path.join(__dirname, "/frontend/build/index.html")));
app.post("/api/v3/create-drawing", createDrawing);
app.put("/api/v3/update-drawing", updateDrawing);
app.get("/api/v3/get-drawings", getDrawings);
app.get("/api/v3/get-drawing-by/:id", getDrawingById);
app.delete("/api/v3/delete-drawing/:id", deleteDrawing);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
