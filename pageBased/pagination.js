// ServerPagination.js
import React, { useState, useEffect } from 'react';

function ServerPagination() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(`/api/items?page=${page}&limit=${limit}`)
      .then(res => res.json())
      .then(data => {
        setItems(data.data);
        setTotalPages(data.totalPages);
      });
  }, [page]);

  return (
    <div>
      <ul>
        {items.map(item => <li key={item._id}>{item.title}</li>)}
      </ul>
      <div>
        {[...Array(totalPages).keys()].map(num => (
          <button key={num} onClick={() => setPage(num + 1)}>
            {num + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
export default ServerPagination;
