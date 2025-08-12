import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Games from "./pages/Games/Games";
import GameDetail from "./pages/Games/GameDetail";
import NewsPage from "./pages/News/NewsPage";
import NewsDetail from "./pages/News/NewsDetail";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import BackToTopButton from "./components/common/BackToTopButton";

export default function App() {
  const location = useLocation();

  return (
      <>
      {/* Navbar selalu tampil */}
      <Navbar />

      <main className="flex-grow">
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/platform/:platform" element={<Games />} />
          <Route path="/games/:id" element={<GameDetail />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsDetail />} />
        </Routes>
      </main>

      {/* Footer & Back to Top */}
      <Footer />
      <BackToTopButton />
    </>
  );
}
