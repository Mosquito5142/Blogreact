import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AdminpostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/posts`)
      .then(res => res.json())
      .then(result => {
        setPosts(result);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const deletePost = (postId) => {
    if (window.confirm('คุณต้องการลบโพสต์นี้จริงหรือไม่?')) {
      fetch(`${import.meta.env.VITE_API}/posts/${postId}`, {
        method: 'DELETE',
      })
        .then(res => {
          if (res.ok) {
            setPosts(posts.filter(post => post.id !== postId));
          } else {
            console.error('Error deleting post:', res.statusText);
          }
        })
        .catch(error => {
          console.error('Error deleting post:', error);
        });
    }
  };

  return (
    <div>
      <div>
        admin
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>เรื่อง</th>
              <th>ผู้สร้าง</th>
              <th>วันที่อัพเดต</th>
              <th>ประเภท</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-28">
                        <img src={`${post.image}`} alt={`${post.title} image`} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{post.title}</td>
                <td>{post.author}</td>
                <td>{new Date(post.updated_at).toLocaleDateString()}</td>
                <td>{post.category}</td>
                <th>
                  <Link to={`/editpost/${post.id}`}>
                    <button className="btn btn-ghost btn-xs">แก้ไข</button>
                  </Link>
                </th>
                <th>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => deletePost(post.id)}
                  >
                    ลบ
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
