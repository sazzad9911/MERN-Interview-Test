import { StatusCodes } from "http-status-codes";
import { Drawings } from "../functions/mongoConnection.js";

export const createDrawing = async (req, res) => {
  const { models } = req.body;
  if (!Array.isArray(models)) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid models" });
  }
  try {
    const drawing =await new Drawings({
      models: models,
    }).save();
    res.status(StatusCodes.OK).json(JSON.parse(drawing));
  } catch (error) {
    res.status(StatusCodes.BAD_GATEWAY).json({ error: error.message });
  }
};
export const updateDrawing = async (req, res) => {
  const { models, id } = req.body;
  if (!Array.isArray(models)) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid models" });
  }
  if (!id) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid id" });
  }
  try {
    const drawing =await Drawings.updateOne(
      { _id: id },
      {
        updateAt: new Date(),
        models: models,
      }
    );
    res.status(StatusCodes.OK).json(drawing);
  } catch (error) {
    res.status(StatusCodes.BAD_GATEWAY).json({ error: error.message });
  }
};
export const getDrawings = async (req, res) => {
  try {
    const drawing =await Drawings.find();
   
    res.status(StatusCodes.OK).json(drawing);
  } catch (error) {
    res.status(StatusCodes.BAD_GATEWAY).json({ error: error.message });
  }
};
export const getDrawingById = async (req, res) => {
  const { id } = req.params;
  try {
    const drawing =await Drawings.findById(id);
    res.status(StatusCodes.OK).json(drawing);
  } catch (error) {
    res.status(StatusCodes.BAD_GATEWAY).json({ error: error.message });
  }
};
export const deleteDrawing = async (req, res) => {
  const { id } = req.params;
  try {
    const drawing =await Drawings.deleteOne({
      _id: id,
    });
    res.status(StatusCodes.OK).json(drawing);
  } catch (error) {
    res.status(StatusCodes.BAD_GATEWAY).json({ error: error.message });
  }
};
