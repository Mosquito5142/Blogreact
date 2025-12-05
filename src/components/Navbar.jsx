import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ setResults, setInput }) {
  const [localInput, setLocalInput] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const fetchData = (value) => {
    fetch(import.meta.env.VITE_API + "/posts")
      .then((res) => res.json())
      .then((json) => {
        const results = json.filter(
          (post) =>
            value &&
            post.title &&
            post.title.toLowerCase().includes(value.toLowerCase())
        );
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setLocalInput(value);
    setInput(value);
    fetchData(value);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleToggle = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  // Get current date in Thai format
  const currentDate = new Date().toLocaleDateString("th-TH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* Top bar with date */}
      <div className="bg-base-200 border-b border-base-300 py-2 text-center">
        <span className="date-badge text-base-content/60">{currentDate}</span>
      </div>

      {/* Main Masthead */}
      <header className="bg-base-100 border-b-2 border-base-content py-6">
        <div className="max-w-6xl mx-auto px-4">
          {/* Masthead Title */}
          <div className="text-center mb-4">
            <Link to="/" className="inline-block">
              <h1 className="masthead text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider">
                The Vachiravit
              </h1>
              <p className="text-sm text-base-content/60 mt-1 tracking-widest uppercase">
                บันทึกความรู้และประสบการณ์
              </p>
            </Link>
          </div>

          {/* Navigation Bar */}
          <nav className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-base-300">
            <Link
              to="/"
              className={`section-label px-4 py-1 transition-colors ${
                location.pathname === "/"
                  ? "border-b-2 border-current"
                  : "hover:text-accent"
              }`}
            >
              หน้าแรก
            </Link>
            <span className="text-base-content/30">|</span>
            <a
              href="https://github.com/Mosquito5142"
              target="_blank"
              rel="noopener noreferrer"
              className="section-label px-4 py-1 hover:text-accent transition-colors"
            >
              GitHub
            </a>
            <span className="text-base-content/30">|</span>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                className="vintage-input w-48 text-sm"
                placeholder="ค้นหาบทความ..."
                value={localInput}
                onChange={(e) => handleChange(e.target.value)}
              />
            </div>

            <span className="text-base-content/30">|</span>

            {/* Theme Toggle */}
            <button
              onClick={handleToggle}
              className="section-label px-4 py-1 hover:text-accent transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? "☽ Dark" : "☀ Light"}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex justify-center mt-4">
            <button className="vintage-btn text-xs" onClick={toggleMenu}>
              {isMenuOpen ? "ปิดเมนู ✕" : "เมนู ☰"}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              isMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
            }`}
          >
            <div className="border-t border-base-300 pt-4 space-y-3 text-center">
              <Link
                to="/"
                className="block section-label py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                หน้าแรก
              </Link>
              <a
                href="https://github.com/Mosquito5142"
                target="_blank"
                rel="noopener noreferrer"
                className="block section-label py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                GitHub
              </a>
              <input
                type="text"
                className="vintage-input w-full text-sm"
                placeholder="ค้นหาบทความ..."
                value={localInput}
                onChange={(e) => handleChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
