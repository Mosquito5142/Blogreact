import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ setResults, setInput }) {
  const [localInput, setLocalInput] = useState(""); // ใช้ localInput แทน input

  const fetchData = (value) => {
    fetch(import.meta.env.VITE_API + "/posts")
      .then((res) => res.json())
      .then((json) => {
        const results = json.filter((post) => {
          return (
            value &&
            post.title &&
            post.title.toLowerCase().includes(value.toLowerCase())
          );
        });
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setLocalInput(value); // อัพเดตค่าใน local state
    setInput(value); // อัพเดตค่าใน parent state
    fetchData(value);
  };

  // use theme from local storage if available or set light theme
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  // update state on toggle
  const handleToggle = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // set theme state in localstorage on mount & also update localstorage on state change
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const [isMenuOpen, setIsMenuOpen] = useState(false); // เพิ่ม state เพื่อตรวจสอบสถานะการเปิด/ปิดเมนู

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // สลับสถานะการเปิด/ปิดเมนู
  };
  return (
      <nav className="navbar bg-base-100 relative flex flex-wrap items-center justify-between p-4">
      <div className="flex items-center flex-shrink-0 mr-6">
        <Link to={`/`} className="text-lg font-semibold">
          Vachiravit_Blog
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
          onClick={toggleMenu} // เรียกใช้งานฟังก์ชัน toggleMenu เมื่อคลิกที่ปุ่ม
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      {/* เงื่อนไขการแสดงเมนู */}
      <div className={`lg:flex lg:items-center lg:w-auto ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="text-sm lg:flex-grow p-3">
          <Link
            to={`https://github.com/Mosquito5142`}
            target="_blank"
            className="text-lg"
          >
            GitHub
          </Link>
        </div>
        <div className="relative px-5">
          <label className="swap swap-rotate mr-4">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              className="theme-controller"
              checked={theme === "dark"}
              onChange={handleToggle}
            />
            {/* sun icon */}
            <svg
              className="swap-off fill-current w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            {/* moon icon */}
            <svg
              className="swap-on fill-current w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full md:w-auto"
            value={localInput}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
      </div>
    </nav>
  );
}
