import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-[#292F36] text-[#4ECDC4] text-xl shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="font-bold text-[#FF8000]">
          <NavLink to="/">WGG</NavLink>
        </div>

        <ul className="flex gap-6 font-semibold items-center">
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Games", path: "/games" },
            { name: "News", path: "/news" },
          ].map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `relative hover:text-[#FF8000] transition ${
                    isActive ? "active-link" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .active-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 100%;
          height: 2px;
          background-color: currentColor; /* mengikuti warna teks */
        }
      `}</style>
    </nav>
  );
}
