import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}`)
      .then(res => res.json())
      .then(result => {
        setPost(result);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <img src={`http://localhost:3000/images/${post.image}`} alt={`${post.title} image`} />
      <p>{post.content}</p>
      <p><strong>Author:</strong> {post.author}</p>
      <p><strong>Created at:</strong> {new Date(post.created_at).toLocaleDateString()}</p>
      <p><strong>Updated at:</strong> {new Date(post.updated_at).toLocaleDateString()}</p>
      <p><strong>Category:</strong> {post.category}</p>
      <p><strong>Status:</strong> {post.status}</p>
      <p><strong>Tags:</strong> {post.tags}</p>
    </div>
  );
}
