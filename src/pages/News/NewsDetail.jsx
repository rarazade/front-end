import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import useNewsDetail from "../../hooks/news/usenewsDetail";

export default function NewsDetail() {
  const { id } = useParams();
  const { newsItem, latestNews, loading } = useNewsDetail(id);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="bg-black text-white py-20 text-center">
          <p className="text-2xl">Loading...</p>
        </div>
      </>
    );
  }

  if (!newsItem) {
    return (
      <>
        <Navbar />
        <div className="bg-black text-white py-20 text-center">
          <p className="text-2xl">News not found.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-stone-100 text-black">
        <div className="max-w-7xl mx-auto px-6 py-16 md:flex gap-8">
          {/* LEFT SIDEBAR */}
          <div className="md:w-1/4 mt-7">
            <h3 className="text-lg font-bold text-[#FF8000] mb-4">LATEST NEWS</h3>
            {latestNews.map((news) => (
              <Link to={`/news/${news.id}`} key={news.id}>
                <div className="mb-6 border-b border-black pb-3 hover:text-[#FF8000] transition flex gap-4 items-start">
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${news.image}`}
                    alt={news.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="text-md font-medium">{news.title}</p>
                    <p className="text-sm text-gray-800 mt-1">
                      {(news.date || news.createdAt || "").slice(0, 10)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* RIGHT CONTENT */}
          <div className="md:w-2/3 mt-5">
            <h2 className="text-4xl font-bold mb-2">{newsItem.title}</h2>
            <div className="flex flex-row">
              <p className="text-sm font-bold text-[#FF8000] mb-4">
                {newsItem.source || "WGG Studio"}
              </p>
              <p className="text-sm text-black mb-4 pl-2">
                {(newsItem.date || newsItem.createdAt || "").slice(0, 10)}
              </p>
            </div>

            <p className="text-sm text-black border-b border-black pb-2">
              {newsItem.excerpt || ""}
            </p>

            {newsItem.image && (
              <div className="mt-6 w-full h-[400px] rounded overflow-hidden">
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${newsItem.image}`}
                  alt={newsItem.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="mt-4 text-sm text-black space-y-3 leading-relaxed">
              <p>{newsItem.fullText || newsItem.content || ""}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Link to="/news">
            <button className="mt-10 bg-[#FF8000] text-black font-semibold px-4 py-2 rounded mb-6 text-sm hover:bg-[#3dc0b9]">
              &lt; BACK
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
