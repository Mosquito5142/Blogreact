import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillComponent = () => {
  const [content, setContent] = useState('');
  const counterRef = useRef();

  const handleChange = (content, delta, source, editor) => {
    setContent(editor.getHTML());
  };

  useEffect(() => {
    if (counterRef.current) {
      counterRef.current.innerText = content.split(/\s+/).length;
    }
  }, [content]);

  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }], 
      [{ 'size': [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['code-block'],  // Add code block here
      ['clean']
    ]
  };

  return (
    <div>

        <ReactQuill 
          value={content} 
          onChange={handleChange} 
          modules={modules}
        />
        <div ref={counterRef} />
      <div style={{ marginTop: 20 }}>
        <h2>Editor Content:</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        {content}
      </div>
    </div>
  );
};

export default QuillComponent;
