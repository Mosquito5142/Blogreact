import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Postlist from './components/Postlist';
import PostDetail from './components/PostDetail';
import Addposts from './components/Addposts';

export default function App() {
  return (
    <div className="container mx-auto">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
          <Hero />
          <Postlist /> 
          </>
          } />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/addposts" element={<Addposts />} />
        </Routes>
      </Router>
    </div>
  );
}
