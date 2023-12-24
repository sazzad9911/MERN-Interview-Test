import sharp from "sharp";
import { v1 } from "uuid";
import path from "path";
import { fileURLToPath } from "url";
import { StatusCodes } from "http-status-codes";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

 const uploadImage = async (req, res) => {
  
    if (!req.file) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid file" });
    }
  
    try {
      const name=v1()
      await sharp(req.file.buffer)
        .png()
        .toFile(__dirname + `/../images/${name}-${req.file.originalname}`);
      return { path: `/images/${name}-${req.file.originalname}` };
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  };
  export default uploadImage