import React from 'react';
import { Link } from 'react-router-dom'; 

export default function SearchResults({ results, input }) {
  if (!input) return null; // ถ้าไม่มีค่าการค้นหาจะไม่แสดงผลลัพธ์

  return (
    <div className="search-results w-full absolute bg-white shadow-lg rounded-lg mt-2 z-10">
      {results.length > 0 ? (
        <ul className="p-4">
          {results.map((post) => (
            <li key={post.id} className="border-b last:border-none">
              <Link to={`/posts/${post.id}`} className="flex items-center py-2">
                <img src={`${post.image}`} alt={`${post.title} image`} className='w-5 h-5 mr-2' />
                <span>{post.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="p-4">No results found</p>
      )}
    </div>
  );
}
