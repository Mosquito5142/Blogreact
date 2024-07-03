import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css'


export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_API+`/posts/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(result => {
        setPost(result);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-6xl"></span>
      </div>
    );
  }

  if (error) {
    return <div>Error loading post: {error.message}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className='py-3'>
      <h1 className='text-3xl py-7 font-bold'>{post.title}</h1>
      {post.image && 
        <div className="flex justify-center mb-4 h-80">
          <img src={post.image} alt={`${post.title} image`} className="max-w-full h-auto" />
        </div>
      }
      <ReactQuill value={post.content} readOnly={true} theme={"bubble"} />
      <p><strong>ผู้เขียน : </strong> {post.author}</p>
      <p><strong>วันที่เขียน : </strong> {new Date(post.created_at).toLocaleDateString()}</p>
      <p><strong>วันที่แก้ไข : </strong> {new Date(post.updated_at).toLocaleDateString()}</p>
      <br/>
    </div>
  );
}
