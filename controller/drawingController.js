import { StatusCodes } from "http-status-codes";
import { Drawings } from "../functions/mongoConnection.js";
import uploadImage from "../functions/uploadImage.js";

export const createDrawing = async (req, res) => {
  try {
    const { models } = req.body;
    const m = JSON.parse(models);
    if (!Array.isArray(m)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid models" });
    }
    
    const { path } = await uploadImage(req, res);
    const drawing = await new Drawings({
      models: m,
      thumbnail: path,
    }).save();
    return res.status(StatusCodes.OK).json(drawing);
  } catch (error) {
    return res.status(StatusCodes.BAD_GATEWAY).json({ error: error.message });
  }
};
export const updateDrawing = async (req, res) => {
  const { models, id } = req.body;
  const m = JSON.parse(models);
  if (!Array.isArray(m)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Invalid models" });
  }
  if (!id) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid id" });
  }
  try {
    const { path } = await uploadImage(req, res);
    const drawing = await Drawings.updateOne(
      { _id: id },
      {
        updateAt: new Date(),
        models: m,
        thumbnail: path,
      },
    );
    res.status(StatusCodes.OK).json(drawing);
  } catch (error) {
    res.status(StatusCodes.BAD_GATEWAY).json({ error: error.message });
  }
};
export const getDrawings = async (req, res) => {
  try {
    const drawing = await Drawings.find();

    res.status(StatusCodes.OK).json(drawing);
  } catch (error) {
    res.status(StatusCodes.BAD_GATEWAY).json({ error: error.message });
  }
};
export const getDrawingById = async (req, res) => {
  const { id } = req.params;
  try {
    const drawing = await Drawings.findById(id);
    res.status(StatusCodes.OK).json(drawing);
  } catch (error) {
    res.status(StatusCodes.BAD_GATEWAY).json({ error: error.message });
  }
};
export const deleteDrawing = async (req, res) => {
  const { id } = req.params;
  try {
    const drawing = await Drawings.deleteOne({
      _id: id,
    });
    res.status(StatusCodes.OK).json(drawing);
  } catch (error) {
    res.status(StatusCodes.BAD_GATEWAY).json({ error: error.message });
  }
};
