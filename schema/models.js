import mongoose from "mongoose";
const { Schema } = mongoose;
import { v1 } from "uuid";

const model = new Schema({
  //_id: mongoose.Types.UUID,
  id: String,
  x: { type: Number, default: 100 },
  y: { type: Number, default: 100 },
  isDragging: { type: Boolean, default: false },
  points: { type: Array, default: [1, 1, 100, 1, 100, 100] },
  type: { type: String, default: "triangle" },
  color: { type: String, default: "orange" },
  width: { type: Number, default: 100 },
  height: { type: Number, default: 100 },
  text: { type: String, default: "This is demo text" },
  fontSize: { type: Number, default: 15 },
});

const drawings = new Schema({
  //_id: mongoose.Types.UUID,
  title: { type: String, unique: true,default:v1() },
  updateAt: { type: Date, default: Date.now },
  models: [model],
  date: { type: Date, default: Date.now },
  thumbnail: String,
});

export { drawings };
