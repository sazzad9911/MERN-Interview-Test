import axios from "axios";

const uploadToServer = async (image) => {
  try {
    const f = new FormData();
    f.append("image", image);
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=b459e4b6a434a3340fb8be41cf4f3399`,
      f
    );
    
    return { path: res.data.data.display_url };
  } catch (error) {
    console.log(error.response.data);
  }
};
export default uploadToServer;
