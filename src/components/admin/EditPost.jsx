import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize";

// Register ImageResize module
Quill.register("modules/imageResize", ImageResize);

const EditPost = () => {
  const { id } = useParams(); // Assuming you're using React Router for routing
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    created_at: "",
    updated_at: new Date().toISOString().slice(0, 16), // Default to current date and time
    category: "",
    tags: "",
    image: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API + `/posts/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const postData = await response.json();
        setFormData(postData); // Populate form fields with fetched data
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleContentChange = (content, delta, source, editor) => {
    setFormData((prevState) => ({
      ...prevState,
      content: editor.getHTML(),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["code-block"],
      [{ align: [] }],
      ["clean"],
    ],
    imageResize: {
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(import.meta.env.VITE_API + `/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();
      console.log(data);
      alert("Post updated successfully");
    } catch (error) {
      console.error(error);
      alert("Error updating post");
    }
  };

  return (
    <div>
      <h2 className="text-3xl py-1 font-bold">แก้ไขข้อมูล</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-semibold">หัวเรื่อง</span>
            </div>
            <input
              type="text"
              placeholder="หัวข้อเรื่อง"
              className="input input-bordered w-full max-w-xs"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <div className="label">
            <span className="label-text font-semibold">เนื้อหา</span>
          </div>
          <ReactQuill
            value={formData.content}
            onChange={handleContentChange}
            modules={modules}
          />
        </div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text font-semibold">ผู้เขียน</span>
          </div>
          <input
            type="text"
            placeholder="ผู้เขียน"
            className="input input-bordered w-full max-w-xs py-1"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            required
          />
        </label>
        <div className="py-1">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-semibold">เขียนวันที่</span>
            </div>
            <p
              name="created_at"
              className="w-full max-w-xs"
              onChange={handleInputChange}
              required
            >{formData.created_at}</p>
          </label>
        </div>
        <div className="py-1">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-semibold">ประเภท</span>
            </div>
            <input
              type="text"
              name="category"
              placeholder="ประเภท"
              className="input input-bordered w-full max-w-xs"
              value={formData.category}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className="py-1">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-semibold">แท็ก</span>
            </div>
            <input
              type="text"
              name="tags"
              placeholder="แท็ก"
              className="input input-bordered w-full max-w-xs"
              value={formData.tags}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="py-1">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-semibold">รูปปก</span>
            </div>
            <input
              type="text"
              name="image"
              placeholder="ลิงค์รูปภาพ"
              className="input input-bordered w-full max-w-xs"
              value={formData.image}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
