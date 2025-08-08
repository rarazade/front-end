import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddNews = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [img, setImage] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅

  const navigate = useNavigate();
  const imageRef = useRef(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !date || !excerpt || !content || !img) {
      setError("Semua field wajib diisi.");
      setSuccess("");
      return;
    }

    setIsSubmitting(true); // ✅ Disable tombol saat submit

    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    formData.append("excerpt", excerpt);
    formData.append("content", content);
    formData.append("img", img); // ✅ sesuai backend

    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:3000/api/news", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Berita berhasil dibuat.");
      setError("");
      setTimeout(() => navigate("/admin/dashboard"), 1500);
    } catch (err) {
      console.error("Gagal membuat berita:", err);
      setError("Gagal membuat berita.");
      setSuccess("");
    } finally {
      setIsSubmitting(false); // ✅ Aktifkan tombol kembali
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

        <div>
          <label className="block font-semibold mb-1">Tanggal Publikasi:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 rounded bg-[#292F36] text-white border border-gray-400"
            required
          />
        </div>

        <textarea
          placeholder="Ringkasan Berita"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="w-full p-2 rounded bg-[#292F36] text-white border border-gray-400"
          rows="2"
          required
        />

        <textarea
          placeholder="Isi Lengkap Berita"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 rounded bg-[#292F36] text-white border border-gray-400"
          rows="6"
          required
        />

        <div>
          <label className="block font-semibold mb-1">Gambar Utama:</label>
          <input
            ref={imageRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-gray-300"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting} // ✅ Disable tombol
          className="bg-[#4ECDC4] text-black font-semibold py-2 px-6 rounded hover:bg-[#3fb8b3]"
        >
          {isSubmitting ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
};

export default AddNews;
