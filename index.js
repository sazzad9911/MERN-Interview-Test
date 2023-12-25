import express from "express";
import { mongoConnection } from "./functions/mongoConnection.js";
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
import upload from "./lib/upload.js";
import bodyParser from 'body-parser'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(bodyParser.json())
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(express.static(path.join(__dirname, "frontend/build")));
app.post("/api/v3/create-drawing", createDrawing);
app.put("/api/v3/update-drawing", updateDrawing);
app.get("/api/v3/get-drawings", getDrawings);
app.get("/api/v3/get-drawing-by/:id", getDrawingById);
app.delete("/api/v3/delete-drawing/:id", deleteDrawing);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build/index.html"));
});
mongoConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
