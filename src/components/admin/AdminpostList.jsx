import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AdminpostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/posts`)
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

  const deletePost = (postId) => {
    if (window.confirm("คุณต้องการลบโพสต์นี้จริงหรือไม่?")) {
      fetch(`${import.meta.env.VITE_API}/posts/${postId}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            setPosts(posts.filter((post) => post.id !== postId));
          } else {
            console.error("Error deleting post:", res.statusText);
          }
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
        });
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">จัดการบทความ</h1>
          <div className="newspaper-divider max-w-xs mx-auto"></div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/"
            className="text-base-content/60 hover:text-accent transition-colors"
          >
            ← กลับหน้าหลัก
          </Link>
          <Link to="/addposts" className="vintage-btn">
            + เพิ่มบทความ
          </Link>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <span className="text-4xl">📰</span>
            <p className="mt-4 text-base-content/60 italic">กำลังโหลด...</p>
          </div>
        ) : (
          /* Posts Table */
          <div className="newspaper-card bg-base-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-base-200 border-b border-base-300">
                  <th className="text-left p-4 section-label">บทความ</th>
                  <th className="text-left p-4 section-label hidden md:table-cell">
                    ผู้เขียน
                  </th>
                  <th className="text-left p-4 section-label hidden lg:table-cell">
                    วันที่
                  </th>
                  <th className="text-left p-4 section-label hidden md:table-cell">
                    หมวดหมู่
                  </th>
                  <th className="text-right p-4 section-label">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-300">
                {posts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-base-200 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-16 h-12 object-cover grayscale border border-base-300"
                        />
                        <div className="min-w-0">
                          <h3 className="font-bold truncate max-w-[200px]">
                            {post.title}
                          </h3>
                          <p className="text-sm text-base-content/60 md:hidden">
                            {post.author}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell text-base-content/70">
                      {post.author}
                    </td>
                    <td className="p-4 hidden lg:table-cell text-base-content/70">
                      {new Date(post.updated_at).toLocaleDateString("th-TH", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="section-label text-accent">
                        {post.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/editpost/${post.id}`}
                          className="px-3 py-1 text-sm border border-current hover:bg-base-content hover:text-base-100 transition-colors"
                        >
                          แก้ไข
                        </Link>
                        <button
                          onClick={() => deletePost(post.id)}
                          className="px-3 py-1 text-sm border border-accent text-accent hover:bg-accent hover:text-base-100 transition-colors"
                        >
                          ลบ
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {posts.length === 0 && !loading && (
              <div className="text-center py-20">
                <span className="text-6xl">📝</span>
                <h3 className="text-xl font-bold mt-4 mb-2">ยังไม่มีบทความ</h3>
                <p className="text-base-content/60 italic mb-6">
                  เริ่มต้นสร้างบทความแรกของคุณ
                </p>
                <Link to="/addposts" className="vintage-btn inline-block">
                  + เพิ่มบทความ
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
