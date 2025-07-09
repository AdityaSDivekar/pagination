// Pagination.js
import React, { useState } from 'react';

function Pagination({ items }) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div>
      <ul>
        {currentPosts.map(item => <li key={item.id}>{item.title}</li>)}
      </ul>
      <div>
        {[...Array(Math.ceil(items.length / postsPerPage)).keys()].map(num => (
          <button key={num} onClick={() => setCurrentPage(num + 1)}>
            {num + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
export default Pagination;
