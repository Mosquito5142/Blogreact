import React from "react";
import { Link } from "react-router-dom";

export default function SearchResults({ results, input }) {
  if (!input) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-4">
      <div className="newspaper-card bg-base-100 overflow-hidden">
        {/* Header */}
        <div className="bg-base-200 px-4 py-2 border-b border-base-300">
          <span className="section-label">ผลการค้นหา: "{input}"</span>
        </div>

        {results.length > 0 ? (
          <ul className="divide-y divide-base-300">
            {results.slice(0, 5).map((post) => (
              <li key={post.id}>
                <Link
                  to={`/posts/${post.id}`}
                  className="flex items-center p-4 hover:bg-base-200 transition-colors"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-16 h-12 object-cover grayscale mr-4 border border-base-300"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold truncate hover:text-accent">
                      {post.title}
                    </h4>
                    <p className="text-sm text-base-content/60">
                      {post.category}
                    </p>
                  </div>
                  <span className="text-base-content/40 ml-2">→</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-6 text-center">
            <p className="text-base-content/60 italic">
              ไม่พบผลลัพธ์สำหรับ "{input}"
            </p>
          </div>
        )}

        {results.length > 5 && (
          <div className="p-3 bg-base-200 text-center text-sm text-base-content/60 border-t border-base-300">
            แสดง 5 จาก {results.length} ผลลัพธ์
          </div>
        )}
      </div>
    </div>
  );
}
