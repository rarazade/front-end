import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditGame() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [platform, setPlatform] = useState("PC");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  const token = localStorage.getItem("token");
  const defaultPlatforms = ["PC", "Mobile", "Console"];

  useEffect(() => {
    axios.get(`http://localhost:3000/api/games/${id}`).then((res) => {
      const gameData = res.data;
      setTitle(gameData.title);
      setDescription(gameData.description);
      setReleaseDate(gameData.releaseDate?.split("T")[0] || "");
      setPlatform(gameData.platforms || "PC");
      setSelectedCategories(
        gameData.categories?.map((catObj) => catObj.category.id) || []
      );
      setPreviewImg(`http://localhost:3000/uploads/${gameData.img}`);
    });

    axios.get("http://localhost:3000/api/categories").then((res) => {
      setCategories(res.data);
    });
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImg(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("releaseDate", releaseDate);
    formData.append("platforms", platform);

    selectedCategories.forEach((catId) =>
      formData.append("categoryIds", Number(catId))
    );

    if (image) {
      formData.append("img", image);
    }

    try {
      await axios.put(`http://localhost:3000/api/games/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 text-white">
      <h2 className="text-2xl font-bold mb-4">Edit Game</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-[#292F36] border border-gray-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            className="w-full p-2 rounded bg-[#292F36] border border-gray-400"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1">Release Date</label>
          <input
            type="date"
            className="w-full p-2 rounded bg-[#292F36] border border-gray-400"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Platform:</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full p-2 rounded bg-[#292F36] text-white border border-gray-400"
          >
            {defaultPlatforms.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Kategori:</label>
          <div className="flex gap-4 flex-wrap">
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value={cat.id}
                  checked={selectedCategories.includes(cat.id)}
                  onChange={(e) => {
                    const selectedId = Number(e.target.value);
                    if (e.target.checked) {
                      setSelectedCategories([...selectedCategories, selectedId]);
                    } else {
                      setSelectedCategories(
                        selectedCategories.filter((id) => id !== selectedId)
                      );
                    }
                  }}
                  className="accent-[#4ECDC4]"
                />
                {cat.name}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1">Image</label>
          {previewImg && (
            <img
              src={previewImg}
              alt="Preview"
              className="w-32 h-32 object-cover mb-2 border border-gray-500"
            />
          )}
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 bg-[#292F36] border border-gray-400"
            onChange={handleImageChange}
          />
        </div>

        <button
          type="submit"
          className="bg-[#4ECDC4] text-black font-semibold py-2 px-6 rounded hover:bg-[#3fb8b3] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          Update Game
        </button>
      </form>
    </div>
  );
}
