import axios from "axios";

export const url = "https://important-tuna-kit.cyclic.app";
//export const url = "http://localhost:3001";
export const createDrawing = async (models, image) => {

  const res = await axios.post(`${url}/api/v3/create-drawing`, {
    models:models,
    thumbnail:image
  });
  return res;
};
export const updateDrawing = async (models, image, id) => {
  
  return await axios.put(`${url}/api/v3/update-drawing`, {
    models:models,
    thumbnail:image,
    id:id
  });
};
export const getDrawings = async () => {
  const res = await axios.get(`${url}/api/v3/get-drawings`);
  return res;
};
export const getDrawingsById = async (id) => {
  const res = await axios.get(`${url}/api/v3/get-drawing-by/${id}`);
  return res;
};
export const deleteDrawingById = async (id) => {
    const res = await axios.delete(`${url}/api/v3/delete-drawing/${id}`);
    return res;
  };
