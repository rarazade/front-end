import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AdminAddNews = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const imageInputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith("image/")) {
      setError("File harus berupa gambar!");
      return;
    }
    setError("");
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Anda belum login sebagai admin.");
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("date", date);
      formData.append("excerpt", excerpt);
      formData.append("content", content);
      formData.append("image", image);

      const res = await fetch("http://localhost:3000/api/news", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal menambahkan berita");

      setSuccess("Berita berhasil ditambahkan!");
      setTitle("");
      setDate("");
      setExcerpt("");
      setContent("");
      setImage(null);
      imageInputRef.current.value = ""; // reset file input
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#1f242b] text-white p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Tambah Berita</h1>
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Kembali ke Dashboard
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-xl"
        encType="multipart/form-data"
      >
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <input
          type="text"
          placeholder="Judul Berita"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded bg-[#292F36] text-white border border-gray-400"
          required
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 rounded bg-[#292F36] text-white border border-gray-400"
          required
        />

        <textarea
          placeholder="Excerpt (ringkasan berita)"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="w-full p-2 rounded bg-[#292F36] text-white border border-gray-400"
          rows={2}
          required
        />

        <textarea
          placeholder="Konten lengkap berita"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 rounded bg-[#292F36] text-white border border-gray-400"
          rows={6}
          required
        />

        <div>
          <label className="block font-semibold mb-1">Gambar Utama:</label>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
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

export default AdminAddNews;
