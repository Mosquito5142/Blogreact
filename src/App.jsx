import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Postlist from './components/Postlist';
import PostDetail from './components/PostDetail';
import Addposts from './components/admin/Addposts';
import Footer from './components/Footer';
import SearchResults from "./components/SearchResults";
// Admin
import AdminpostList from "./components/admin/AdminpostList"
import EditPost from './components/admin/EditPost';
import Login from "./components/admin/Login";

export default function App() {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState(""); // เปลี่ยน input เป็น string

  return (
    <Router>
      <div className="container mx-auto">
      <Navbar setResults={setResults} setInput={setInput} />
      {input && <SearchResults results={results} input={input} />} {/* ซ่อน SearchResults เมื่อไม่มี input */}
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Hero />
                <Postlist /> 
              </>
            } 
          />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/addposts" element={<Addposts />} />
          <Route path="/admin" element={<AdminpostList />}/>
          <Route path="/editpost/:id" element={<EditPost />} />
          <Route path="/login"  element={<Login />}    />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
