import { useParams, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect, useCallback, useMemo, memo } from "react";
import { RequirementsDetail } from "./RequirementsDetail";
import { useGameDetail } from "../../hooks/games/useGames";
import "../../style.css";
import background from "../../assets/13.jpg";
import { getYoutubeEmbedUrl, getYoutubeThumbnail } from "../../utils/youtubeUtils";

function GameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { game, loading, error } = useGameDetail(id);
  const [activeSection, setActiveSection] = useState(0);
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const [activeVideo, setActiveVideo] = useState(0);
  const sectionRefs = useRef([]);

  const videos = useMemo(() => game?.videos || [], [game]);

  const prevSlide = useCallback(() => {
    setActiveScreenshot((prev) =>
      prev === 0 ? game.screenshots.length - 1 : prev - 1
    );
  }, [game]);

  const nextSlide = useCallback(() => {
    setActiveScreenshot((prev) =>
      prev === game.screenshots.length - 1 ? 0 : prev + 1
    );
  }, [game]);

  const prevVideo = useCallback(
    () => setActiveVideo((prev) => (prev - 1 + videos.length) % videos.length),
    [videos.length]
  );

  const nextVideo = useCallback(
    () => setActiveVideo((prev) => (prev + 1) % videos.length),
    [videos.length]
  );

  const scrollToSection = useCallback((idx) => {
    sectionRefs.current[idx]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  useEffect(() => {
    if (!game) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target);
            if (idx !== -1) setActiveSection(idx);
          }
        });
      },
      { threshold: 0.6 }
    );

    sectionRefs.current
      .filter((section) => section)
      .forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [game]);

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error || !game) return <p className="text-white text-center">Game not found.</p>;

  return (
    <div
      className="text-white h-screen overflow-y-scroll snap-y snap-mandatory no-scrollbar relative"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, #292F36, #1f2a30, #1f242b, #1f2029, #0f2027)",
        }}
      ></div>

      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
        {sectionRefs.current
          .filter((section) => section)
          .map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSection(idx)}
              className="w-6 h-6 flex items-center justify-center group"
            >
              {activeSection === idx ? (
                <span className="w-5 h-5 border-2 border-[#4ECDC4] rounded-full flex items-center justify-center transition-all duration-300">
                  <span className="w-2 h-2 bg-[#4ECDC4] rounded-full animate-pulse"></span>
                </span>
              ) : (
                <span className="w-3 h-3 bg-[#4ECDC4] rounded-full opacity-70 group-hover:opacity-100 transition-all duration-300"></span>
              )}
            </button>
          ))}
      </div>

      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className="relative w-full h-screen snap-start flex flex-col justify-end p-6 bg-black/40"
      >
        <img
          src={
            game.img
              ? `http://localhost:3000/uploads/${game.img}`
              : "/placeholder.jpg"
          }
          alt={game.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#292F36]/90 via-transparent to-transparent"></div>
        <div className="relative bottom-6 left-0 flex flex-col md:flex-row gap-4 md:gap-8 items-start md:items-center z-10">
          <h1 className="text-3xl md:text-4xl text-[#4ECDC4] font-bold">
            {game.title}
          </h1>
        </div>
      </section>

      {videos.length > 0 && (
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          className="relative w-full h-screen snap-start py-12 px-6 md:px-12 flex flex-col md:flex-row gap-10 items-center justify-center bg-black/40"
        >
          <div className="relative flex-1 mt-5 z-10">
            <div className="relative max-w-6xl mx-auto">
              <iframe
                key={videos[activeVideo].id}
                src={getYoutubeEmbedUrl(videos[activeVideo].url)}
                title={`video-${videos[activeVideo].id}`}
                className="w-full aspect-video rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <button
                onClick={prevVideo}
                className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition"
              >
                ❮
              </button>
              <button
                onClick={nextVideo}
                className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition"
              >
                ❯
              </button>
            </div>
            <div className="justify-center mt-4 flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {videos.map((video, idx) => (
                <img
                  key={video.id}
                  src={getYoutubeThumbnail(video.url)}
                  alt={`thumb-${idx}`}
                  className={`w-28 h-20 object-cover rounded-lg cursor-pointer border-2 transition ${
                    activeVideo === idx
                      ? "border-[#4ECDC4]"
                      : "border-transparent hover:border-white/30"
                  }`}
                  onClick={() => setActiveVideo(idx)}
                />
              ))}
            </div>
          </div>

          <div className="relative flex-1 md:pl-5 z-10">
            <h2 className="text-3xl font-bold mb-6 text-[#4ECDC4] uppercase tracking-wide">
              About This Game
            </h2>
            <p className="text-gray-200 leading-relaxed text-lg">
              {game.description}
            </p>
          </div>
        </section>
      )}

      {game.screenshots?.length > 0 && (
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          className="relative w-full h-screen snap-start py-16 flex flex-col md:flex-row gap-8 items-center justify-center px-7 bg-black/40"
        >
          <div className="relative w-full h-full z-10">
            <div className="max-w-6xl mx-auto space-y-10">
              <h3 className="mt-6 text-3xl font-bold text-center text-[#4ECDC4] uppercase mb-10">
                Screenshots
              </h3>
              <div className="relative flex justify-center items-center h-[300px] sm:h-[400px] overflow-hidden max-w-full">
                {game.screenshots.map((s, idx) => {
                  let position = "hidden";
                  if (idx === activeScreenshot)
                    position =
                      "opacity-100 scale-100 z-20 translate-x-0";
                  else if (
                    idx ===
                    (activeScreenshot - 1 + game.screenshots.length) %
                      game.screenshots.length
                  )
                    position =
                      "opacity-100 scale-90 z-10 -translate-x-1/2";
                  else if (
                    idx === (activeScreenshot + 1) % game.screenshots.length
                  )
                    position =
                      "opacity-100 scale-90 z-10 translate-x-1/2";

                  return (
                    <div
                      key={s.id}
                      className={`absolute transition-all duration-200 ease-in-out ${position} w-[90%] sm:w-[600px]`}
                    >
                      <div className="relative overflow-hidden shadow-lg rounded-xl">
                        <img
                          src={s.url}
                          alt={`screenshot-${idx}`}
                          className="w-full h-[200px] sm:h-[300px] object-cover"
                        />
                      </div>
                    </div>
                  );
                })}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#4ECDC4]/50 hover:bg-[#4ECDC4]/80 p-2 sm:p-3 rounded-full z-30"
                >
                  ❮
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#4ECDC4]/50 hover:bg-[#4ECDC4]/80 p-2 sm:p-3 rounded-full z-30"
                >
                  ❯
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <section
        ref={(el) => (sectionRefs.current[3] = el)}
        className="relative text-white w-full min-h-screen snap-start flex flex-col items-center justify-center px-6 py-16 bg-black/40"
      >
        <div className="relative z-10 flex flex-col items-center justify-center w-full">
          <ul className="mt-8 flex flex-wrap justify-center gap-6 text-gray-300 bg-[#1f2029]/90 p-8 rounded-2xl shadow-xl max-w-4xl w-full border border-[#4ECDC4]/40">
            <li className="flex items-center gap-2 text-lg">
              <span className="text-[#4ECDC4] font-semibold">
                Platform:
              </span>{" "}
              {Array.isArray(game.platforms)
                ? game.platforms.join(", ")
                : game.platforms}
            </li>
            <li className="flex items-center gap-2 text-lg">
              <span className="text-[#4ECDC4] font-semibold">
                Category:
              </span>{" "}
              {Array.isArray(game.categories)
                ? game.categories
                    ?.map((e) => e.category.name)
                    .join(", ")
                : game.categories}
            </li>
            <li className="flex items-center gap-2 text-lg">
              <span className="text-[#4ECDC4] font-semibold">
                Release Date:
              </span>{" "}
              {new Date(game.releaseDate).toLocaleDateString()}
            </li>
          </ul>
          <div className="mt-6 w-full max-w-4xl">
            <RequirementsDetail requirements={game.requirements} />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-6">
            <button className="bg-[#4ECDC4] text-[#292F36] font-bold text-sm px-10 py-4 rounded-lg shadow-lg hover:bg-[#3dc0b9] hover:shadow-xl transition-all duration-300">
              DOWNLOAD NOW
            </button>
            <button className="bg-[#4ECDC4] text-[#292F36] font-bold text-sm px-10 py-4 rounded-lg shadow-lg hover:bg-[#3dc0b9] hover:shadow-xl transition-all duration-300">
              DOWNLOAD OUR PRESSKIT
            </button>
          </div>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="mt-10 bg-[#292F36] border-2 border-[#4ECDC4] text-[#4ECDC4] font-semibold px-6 py-3 rounded-lg hover:bg-[#1f2329] transition shadow-md"
            >
              ← Back
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default memo(GameDetail);
