import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AddEditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: '',
    content: '',
    author: '',
    category: '',
    tags: '',
    image: ''
  });

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API+`/posts/${id}`);
      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = id ? 'PUT' : 'POST';
      const endpoint = id ? `/api/posts/${id}` : '/api/posts/addposts';
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      });

      if (response.ok) {
        navigate('/');
      } else {
        console.error('Error saving post');
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Post' : 'Add Post'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <textarea
          name="content"
          value={post.content}
          onChange={handleChange}
          placeholder="Content"
        />
        <input
          type="text"
          name="author"
          value={post.author}
          onChange={handleChange}
          placeholder="Author"
        />
        <input
          type="text"
          name="category"
          value={post.category}
          onChange={handleChange}
          placeholder="Category"
        />
        <input
          type="text"
          name="tags"
          value={post.tags}
          onChange={handleChange}
          placeholder="Tags"
        />
        <input
          type="text"
          name="image"
          value={post.image}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddEditPost;
