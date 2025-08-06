import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddGame = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [platform, setPlatform] = useState("PC");
  const [releaseDate, setReleaseDate] = useState("");
  const [category, setCategory] = useState([]);
  const [img, setMainImage] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const imageRef = useRef(null);
  const screenshotRef = useRef(null);

  const defaultPlatforms = ["PC", "Mobile", "Console"];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/categories");
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Gagal mengambil kategori");
        setCategories(data);
      } catch (err) {
        console.error("Kategori gagal dimuat:", err);
        setError("Gagal memuat kategori");
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    const id = Number(value);
    if (checked) {
      setCategory((prev) => [...prev, id]);
    } else {
      setCategory((prev) => prev.filter((c) => c !== id));
    }
  };

  const handleMainImageChange = (e) => {
    setMainImage(e.target.files[0]);
  };

  const handleScreenshotsChange = (e) => {
    setScreenshots([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !releaseDate || !platform || !category.length || !img) {
      setError("Semua field wajib diisi.");
      setSuccess("");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("releaseDate", releaseDate);
    formData.append("platforms", JSON.stringify([platform]));
    formData.append("categoryIds", JSON.stringify(category));
    formData.append("img", img);

    screenshots.forEach((ss) => {
      formData.append("screenshots", ss);
    });

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:3000/api/games", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Game berhasil dibuat");
      setError("");
      setTimeout(() => navigate("/admin/dashboard"), 1500);
    } catch (error) {
      console.error("Error creating game:", error);
      setError("Gagal membuat game");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen bg-[#1f242b] text-white p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Tambah Game</h1>
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Kembali ke Dashboard
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl" encType="multipart/form-data">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <input
          type="text"
          placeholder="Judul Game"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded bg-[#292F36] text-white border border-gray-400"
          required
        />

        <textarea
          placeholder="Deskripsi Game"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 rounded bg-[#292F36] text-white border border-gray-400"
          required
        />

        <div>
          <label className="block font-semibold mb-1">Platform:</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full p-2 rounded bg-[#292F36] text-white border border-gray-400"
          >
            {defaultPlatforms.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Tanggal Rilis:</label>
          <input
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            className="w-full p-2 rounded bg-[#292F36] text-white border border-gray-400"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Kategori:</label>
          <div className="flex gap-4 flex-wrap">
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value={cat.id}
                  checked={category.includes(cat.id)}
                  onChange={handleCategoryChange}
                  className="accent-[#4ECDC4]"
                />
                {cat.name}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">Gambar Utama:</label>
          <input
            ref={imageRef}
            type="file"
            accept="image/*"
            onChange={handleMainImageChange}
            className="w-full text-gray-300"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-[#4ECDC4] text-black font-semibold py-2 px-6 rounded hover:bg-[#3fb8b3]"
        >
          Simpan
        </button>
      </form>
    </div>
  );
};

export default AddGame;
