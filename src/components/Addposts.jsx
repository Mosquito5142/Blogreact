import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddPost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    created_at: '',
    updated_at: '',
    category: '',
    tags: '',
    image: ''
  });

  const handleContentChange = (content, delta, source, editor) => {
    setFormData(prevState => ({
      ...prevState,
      content: editor.getHTML()
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }], 
      [{ 'size': [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['code-block'],[{ 'align': [] }],
      ['clean']
    ]
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(import.meta.env.VITE_API+'/posts/addposts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const data = await response.json();
      console.log(data);
      alert('Post added successfully');
    } catch (error) {
      console.error(error);
      alert('Error adding post');
    }
  };

  return (
    <div>
      <h2>Add New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Content:</label>
          <ReactQuill 
            value={formData.content} 
            onChange={handleContentChange} 
            modules={modules}
          />
        </div>
        <div>
          <label>Author:</label>
          <input type="text" name="author" value={formData.author} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Created At:</label>
          <input type="datetime-local" name="created_at" value={formData.created_at} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Updated At:</label>
          <input type="datetime-local" name="updated_at" value={formData.updated_at} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Category:</label>
          <input type="text" name="category" value={formData.category} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Tags:</label>
          <input type="text" name="tags" value={formData.tags} onChange={handleInputChange} />
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" name="image" value={formData.image} onChange={handleInputChange} />
        </div>
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default AddPost;
