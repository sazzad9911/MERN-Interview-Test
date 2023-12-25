import { StatusCodes } from "http-status-codes";
import { Drawings } from "../functions/mongoConnection.js";
import uploadImage from "../functions/uploadImage.js";

export const createDrawing = async (req, res) => {
  try {
    const { models, thumbnail } = req.body;

    if (!Array.isArray(models) || !thumbnail) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid models" });
    }

    const drawing = await new Drawings({
      models: models,
      thumbnail: thumbnail,
    }).save();
    return res.status(StatusCodes.OK).json(drawing);
  } catch (error) {
    return res.status(StatusCodes.BAD_GATEWAY).json({ error: error.message });
  }
};
export const updateDrawing = async (req, res) => {
  try {
    const { models, id, thumbnail } = req.body;

    if (!Array.isArray(models) || !thumbnail) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid models" });
    }
    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid id" });
    }
    
    const drawing = await Drawings.updateOne(
      { _id: id },
      {
        updateAt: new Date(),
        models: models,
        thumbnail: thumbnail,
      }
    );
    res.status(StatusCodes.OK).json(drawing);
  } catch (error) {
    res.status(StatusCodes.BAD_GATEWAY).json({ error: error.message });
  }
};
export const getDrawings = async (req, res) => {
  try {
    const drawing = await Drawings.find().sort({ updateAt: -1 });

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
