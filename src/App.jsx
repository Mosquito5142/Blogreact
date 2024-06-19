import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Postlist from './components/Postlist';
import PostDetail from './components/PostDetail';

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
        </Routes>
      </Router>
    </div>
  );
}
