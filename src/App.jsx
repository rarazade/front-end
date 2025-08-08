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
import AdminLogin from "./pages/Admin/AdminLogin";
import PrivateRoute from "./routes/PrivateRoute";
import AdminDashboard from './pages/Admin/AdminDashboard';
import AddGame from "./pages/Admin/AddGame";
import AddNews from "./pages/Admin/AddNews";
import AddCategory from "./pages/Admin/AddCategory";
import EditGame from "./pages/Admin/EditGame";
import EditNews from "./pages/Admin/EditNews";

export default function App() {
  const location = useLocation();

  // Hilangkan Navbar & Footer di semua halaman admin, kecuali halaman login
  const isAdminPage = location.pathname.startsWith("/admin") && location.pathname !== "/admin/login";

  return (
    <div className="flex flex-col min-h-screen bg-[#1f242b] text-white">
      {!isAdminPage && <Navbar />}

      <main className="flex-grow">
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/:id" element={<GameDetail />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ADMIN ROUTES (via PrivateRoute) */}
          <Route
            path="/admin/dashboard"element={<PrivateRoute><AdminDashboard /></PrivateRoute>}
          />
          <Route
            path="/admin/add-game"element={<PrivateRoute><AddGame /></PrivateRoute>}
          />
          <Route
            path="/admin/add-news"element={<PrivateRoute><AddNews /></PrivateRoute>}
          />
          <Route
            path="/admin/add-category"element={<PrivateRoute><AddCategory /></PrivateRoute>}
          />
         <Route path="/admin/edit-game/:id" element={<EditGame />} />
         <Route path="/admin/edit-news/:id" element={<EditNews />} />


        </Routes>
      </main>

      {!isAdminPage && <Footer />}
      {!isAdminPage && <BackToTopButton />}
    </div>
  );
}
