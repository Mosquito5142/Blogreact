import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Postlist() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(import.meta.env.VITE_API + "/posts")
      .then((res) => res.json())
      .then((result) => {
        setPosts(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="inline-block animate-pulse">
          <span className="text-4xl">📰</span>
          <p className="mt-4 text-base-content/60 italic">กำลังโหลดข่าว...</p>
        </div>
      </div>
    );
  }

  return (
    <section id="articles" className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="section-label text-base-content/60 mb-2">บทความ</h2>
          <h3 className="text-3xl md:text-4xl font-bold">ข่าวสารล่าสุด</h3>
          <div className="newspaper-divider-thick max-w-xs mx-auto mt-4"></div>
        </div>

        {/* Featured Article (First Post) */}
        {posts.length > 0 && (
          <Link to={`/posts/${posts[0].id}`} className="block mb-10">
            <article className="newspaper-card bg-base-100 p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={posts[0].image}
                    alt={posts[0].title}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="section-label text-accent mb-2">
                    {posts[0].category}
                  </span>
                  <h4 className="text-2xl md:text-3xl font-bold mb-4 leading-tight hover:text-accent transition-colors">
                    {posts[0].title}
                  </h4>
                  <p className="byline text-base-content/60 mb-4">
                    โดย {posts[0].author} •{" "}
                    {new Date(posts[0].updated_at).toLocaleDateString("th-TH", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <span className="text-sm uppercase tracking-widest hover:text-accent transition-colors">
                    อ่านต่อ →
                  </span>
                </div>
              </div>
            </article>
          </Link>
        )}

        {/* Divider */}
        <div className="newspaper-divider"></div>

        {/* Other Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(1).map((post, index) => (
            <Link to={`/posts/${post.id}`} key={post.id} className="group">
              <article className="newspaper-card bg-base-100 h-full">
                {/* Image */}
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <span className="section-label text-accent">
                    {post.category}
                  </span>
                  <h4 className="text-lg font-bold mt-2 mb-3 leading-tight group-hover:text-accent transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="byline text-base-content/60 text-sm">
                    {post.author} •{" "}
                    {new Date(post.updated_at).toLocaleDateString("th-TH", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-20 border border-base-300">
            <span className="text-6xl">📰</span>
            <h3 className="text-2xl font-bold mt-4 mb-2">ยังไม่มีบทความ</h3>
            <p className="text-base-content/60 italic">
              บทความจะปรากฏที่นี่เมื่อมีการเพิ่ม
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
