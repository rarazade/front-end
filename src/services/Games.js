import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// ambil semua games
export async function getGames(params = {}) {
  const res = await axios.get(`${API_URL}/api/games`, { params });
  return res.data;
}

// ambil game by id
export async function getGameById(id) {
  const res = await axios.get(`${API_URL}/api/games/${id}`);
  return res.data;
}

// ambil meta (platforms + categories)
export async function getMeta() {
  const res = await axios.get(`${API_URL}/api/meta`);
  return res.data;
}

// ambil jumbotron
export async function getJumbotrons() {
  const res = await axios.get(`${API_URL}/api/jumbotrons`);
  return res.data;
}
