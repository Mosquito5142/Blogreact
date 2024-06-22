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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading post: {error.message}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      {post.image && <img src={post.image} alt={`${post.title} image`} />}
      <ReactQuill value={post.content} readOnly={true} theme={"bubble"} />
      <p><strong>Author:</strong> {post.author}</p>
      <p><strong>Created at:</strong> {new Date(post.created_at).toLocaleDateString()}</p>
      <p><strong>Updated at:</strong> {new Date(post.updated_at).toLocaleDateString()}</p>
      <p><strong>Category:</strong> {post.category}</p>
      <p><strong>Status:</strong> {post.status}</p>
      <p><strong>Tags:</strong> {post.tags}</p>
      <br/>
    </div>
  );
}
