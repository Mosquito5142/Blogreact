import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Postlist() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API + '/posts')
      .then(res => res.json())
      .then(result => {
        setPosts(result);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <div className="overflow-x-auto">
      <div className="w-full overflow-hidden rounded-lg shadow-md">
        <table className="w-full table-auto">
          <thead>
            <tr >
              <th className="px-4 py-2 sm:px-6 sm:py-3">รูปภาพ</th>
              <th className="px-4 py-2 sm:px-6 sm:py-3">เรื่อง</th>
              <th className="px-4 py-2 sm:px-6 sm:py-3">ผู้สร้าง</th>
              <th className="px-4 py-2 sm:px-6 sm:py-3">วันที่อัพเดต</th>
              <th className="px-4 py-2 sm:px-6 sm:py-3">ประเภท</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {posts.map(post => (
              <tr key={post.id} className="transition-colors duration-200">
                <td className="px-4 py-2 sm:px-6 sm:py-3">
                  <Link to={`/posts/${post.id}`} className="block">
                    <div className="flex items-center">
                      <div className="w-12 h-12 overflow-hidden rounded-full">
                        <img src={`${post.image}`} alt={`${post.title} image`} className="object-cover w-full h-full" />
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-2 sm:px-6 sm:py-3 text-lg font-medium">
                  <Link to={`/posts/${post.id}`} className="block">
                    {post.title}
                  </Link>
                </td>
                <td className="px-4 py-2 sm:px-6 sm:py-3">{post.author}</td>
                <td className="px-4 py-2 sm:px-6 sm:py-3">{new Date(post.updated_at).toLocaleDateString()}</td>
                <td className="px-4 py-2 sm:px-6 sm:py-3">{post.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
