import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllNews = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/news`);
    return res.data;
  } catch (err) {
    console.error("Error fetching news:", err);
    throw err;
  }
};

export const getNewsById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/api/news/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching news detail:", err);
    throw err;
  }
};
