import { useEffect, useState } from "react";
import { getAllNews, getNewsById } from "../../services/news";

export default function useNewsDetail(id) {
  const [newsItem, setNewsItem] = useState(null);
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const detail = await getNewsById(id);
        setNewsItem(detail);

        const allNews = await getAllNews();
        const latest = allNews.filter((n) => n.id !== parseInt(id)).slice(0, 4);
        setLatestNews(latest);
      } catch (err) {
        setError(err);
        setNewsItem(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  return { newsItem, latestNews, loading, error };
}
