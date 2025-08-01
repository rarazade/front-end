
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Games from "./pages/Games";
import GameDetail from "./pages/GameDetail";
import SectionGamePage from "./pages/SectionGamepage";
import NewsPage from "./pages/NewsPage";
import NewsDetail from "./pages/NewsDetail";


export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/:id" element={<GameDetail />} />
        <Route path="/games/platform/:platform" element={<SectionGamePage />} />
        <Route path="/games/category/:category" element={<SectionGamePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsDetail />} />

      </Routes>
    </>
  );
}
