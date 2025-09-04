import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const getAbout = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/about`);
    return res.data.length > 0 ? res.data[0] : null;
  } catch (err) {
    console.error("Error fetching about:", err);
    throw err;
  }
};
