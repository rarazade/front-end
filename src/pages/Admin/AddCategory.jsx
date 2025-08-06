import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminAddCategory = () => {
  const [name, setName] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Anda belum login.");

      const res = await fetch("http://localhost:3000/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal menambah kategori");

      setSuccess("Kategori berhasil ditambahkan!");
      setName("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#1f242b] text-white p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Tambah Kategori Game</h1>
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Kembali ke Dashboard
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <input
          type="text"
          placeholder="Nama Kategori (contoh: Action)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded bg-[#292F36] text-white border border-gray-400"
          required
        />

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

export default AdminAddCategory;
