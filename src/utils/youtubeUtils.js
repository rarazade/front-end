// utils/youtubeUtils.js

// Ambil ID YouTube dari url / id mentah
export function getYoutubeId(video) {
  if (!video || typeof video !== "string") return null;

  // short url: https://youtu.be/ID
  if (video.includes("youtu.be/")) {
    const urlObj = new URL(video);
    return urlObj.pathname.replace("/", "");
  }

  // long url: https://www.youtube.com/watch?v=ID
  if (video.includes("youtube.com/watch?v=")) {
    const urlObj = new URL(video);
    return urlObj.searchParams.get("v");
  }

  // kalau sudah ID langsung
  if (!video.startsWith("http")) return video;

  return null;
}

// Buat url embed dari url / id mentah
export function getYoutubeEmbedUrl(video) {
  const videoId = getYoutubeId(video);
  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}`;
}

// Buat thumbnail url
export function getYoutubeThumbnail(video, quality = "hqdefault") {
  const videoId = getYoutubeId(video);
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}
