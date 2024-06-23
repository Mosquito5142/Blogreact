import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function Postlist() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API+'/posts')
      .then(res => res.json())
      .then(result => {
        setPosts(result);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th className='text-lg '>เรื่อง</th>
              <th className='text-lg '>ผู้สร้าง</th>
              <th className='text-lg '>วันที่อัพเดต</th>
              <th className='text-lg '>ประเภท</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-28">
                        <img src={`${post.image}`}  alt={`${post.title} image`} />
                      </div>
                    </div>
                  </div>
                </td>
                <td className='text-lg font-medium'>
                  {post.title}
                </td>
                <td>{post.author}</td>
                <td>{new Date(post.updated_at).toLocaleDateString()}</td>
                <td>{post.category}</td>
                <th>
                <Link to={`/posts/${post.id}`}>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
