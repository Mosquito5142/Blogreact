import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_API + `/posts/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((result) => {
        setPost(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen py-20 text-center">
        <div className="inline-block animate-pulse">
          <span className="text-4xl">📖</span>
          <p className="mt-4 text-base-content/60 italic">กำลังโหลดบทความ...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-20 text-center">
        <span className="text-6xl">⚠</span>
        <h2 className="text-2xl font-bold mt-4 mb-2">เกิดข้อผิดพลาด</h2>
        <p className="text-base-content/60 mb-6 italic">{error.message}</p>
        <button onClick={() => navigate("/")} className="vintage-btn">
          กลับหน้าหลัก
        </button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen py-20 text-center">
        <span className="text-6xl">🔍</span>
        <h2 className="text-2xl font-bold mt-4 mb-2">ไม่พบบทความ</h2>
        <p className="text-base-content/60 mb-6 italic">
          บทความที่คุณกำลังค้นหาอาจถูกลบหรือย้ายไปแล้ว
        </p>
        <button onClick={() => navigate("/")} className="vintage-btn">
          กลับหน้าหลัก
        </button>
      </div>
    );
  }

  return (
    <article className="py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center text-sm uppercase tracking-widest text-base-content/60 hover:text-accent transition-colors mb-8"
        >
          ← กลับหน้าหลัก
        </Link>

        {/* Category */}
        <div className="text-center mb-6">
          <span className="section-label text-accent">{post.category}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Byline */}
        <div className="text-center mb-8">
          <p className="byline text-base-content/60">
            โดย <strong>{post.author}</strong>
          </p>
          <p className="date-badge text-base-content/50 mt-2">
            {new Date(post.created_at).toLocaleDateString("th-TH", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Decorative Line */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px bg-base-content/30 w-16"></div>
          <span className="text-xl">❦</span>
          <div className="h-px bg-base-content/30 w-16"></div>
        </div>

        {/* Featured Image */}
        {post.image && (
          <figure className="mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full max-h-[500px] object-cover border border-base-300"
            />
            <figcaption className="text-center text-sm text-base-content/50 mt-2 italic">
              ภาพประกอบบทความ
            </figcaption>
          </figure>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <ReactQuill value={post.content} readOnly={true} theme={"bubble"} />
        </div>

        {/* Footer Divider */}
        <div className="newspaper-divider-thick mt-12"></div>

        {/* Article Footer */}
        <div className="text-center py-8">
          <p className="text-base-content/50 italic mb-6">— จบบทความ —</p>

          {post.updated_at !== post.created_at && (
            <p className="text-sm text-base-content/50 mb-4">
              แก้ไขล่าสุด:{" "}
              {new Date(post.updated_at).toLocaleDateString("th-TH", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}

          <Link to="/" className="vintage-btn inline-block">
            ← กลับหน้าหลัก
          </Link>
        </div>
      </div>
    </article>
  );
}
