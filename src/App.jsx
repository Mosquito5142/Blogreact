import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Postlist from './components/Postlist';
import PostDetail from './components/PostDetail';
import Addposts from './components/Addposts';
import Test from './components/Test';
import AddEditPost from './components/admin/AddEditPost';
import PostList from './components/admin/PostList';
import Footer from './components/Footer';
import SearchResults from "./components/SearchResults";

export default function App() {
  const [results, setResults] = useState([]);

  return (
    <Router>
      <Navbar setResults={setResults} />
      <SearchResults results={results} />
      <div className="container mx-auto">
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
          <Route path="/test" element={<Test />} />
          <Route path="/editpost" element={<PostList />} />
          <Route path="/editpost/:id" element={<AddEditPost />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
