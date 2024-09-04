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
    <div className='pb-3'>
      <p>โพสล่าสุด</p>
      <br />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map(post => (
           <Link to={`/posts/${post.id}`} className="block mt-4">
          <div key={post.id} className="shadow-md rounded-lg overflow-hidden h-72">
            <img src={post.image} alt={`${post.title} image`} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="font-semibold text-lg">{post.title}</h2>
              <p className="text-gray-600 text-sm mb-2">ผู้สร้าง: {post.author}</p>
              <p className="text-gray-600 text-sm mb-2">วันที่อัพเดต: {new Date(post.updated_at).toLocaleDateString()}</p>
              <p className="text-gray-600 text-sm">ประเภท: {post.category}</p>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
