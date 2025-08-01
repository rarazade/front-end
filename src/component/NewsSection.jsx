import { Link } from "react-router-dom";
import newsData from "../data/newsData";

export default function NewsSection() {
  const mainNews = newsData[0];
  const rightNews = newsData.slice(1, 6); // 5 berita untuk kanan

  return (
    <section className="bg-[#292F36] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Left / Main News */}
        <div className="lg:col-span-2 relative">
          <h2 className="text-4xl font-extrabold text-[#4ECDC4] mb-6">News</h2>
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              src={mainNews.image}
              alt={mainNews.title}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="text-2xl font-bold">{mainNews.title}</h3>
              <p className="text-sm text-gray-300 mt-2">{mainNews.excerpt}</p>
              <Link
                to={`/news/${mainNews.id}`}
                className="inline-block mt-4 text-[#4ECDC4] underline hover:text-white transition"
              >
                Read More →
              </Link>
            </div>
          </div>
        </div>

        {/* Right / News List */}
        <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2 
          scrollbar-thin scrollbar-thumb-[#4ECDC4]/60 scrollbar-track-[#292F36] bg-[#292F36] rounded-md">
          {rightNews.map((item) => (
            <Link
              to={`/news/${item.id}`}
              key={item.id}
              className="flex gap-4 items-start bg-[#1a1a1a] p-3 rounded-md hover:bg-[#2a2a2a] transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded"
              />
              <div>
                <h4 className="text-lg font-bold text-[#4ECDC4]">{item.title}</h4>
                <p className="text-sm text-gray-300 line-clamp-3">{item.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

     
    </section>
  );
}
