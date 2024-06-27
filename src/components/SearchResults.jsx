import React from 'react';
import { Link } from 'react-router-dom'; 

export default function SearchResults({ results }) {

  return (
    <div className="search-results w-10vw ">
      {results.length > 0 ? (
        <ul>
          {results.map((post) => (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`} className="flex items-center">
                <img src={`${post.image}`} alt={`${post.title} image`} className='w-5 h-5 mr-2' />
                <span>{post.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}
