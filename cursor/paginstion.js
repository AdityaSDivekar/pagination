import React, { useState, useEffect } from 'react';

function CursorPagination() {
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const limit = 10; // Adjust as needed

  // Fetch items from the backend
  const fetchItems = async (currentCursor = null) => {
    setLoading(true);
    let url = `/api/items?limit=${limit}`;
    if (currentCursor) url += `&cursor=${currentCursor}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setItems(prev => currentCursor ? [...prev, ...data.data] : data.data);
      setNextCursor(data.nextCursor);
    } catch (err) {
      alert('Failed to fetch items');
    }
    setLoading(false);
  };

  // Initial fetch
  useEffect(() => {
    fetchItems();
  }, []);

  // Handler for loading next page
  const handleLoadMore = () => {
    if (nextCursor) {
      setCursor(nextCursor);
      fetchItems(nextCursor);
    }
  };

  return (
    <div>
      <h2>Cursor-Based Pagination Example</h2>
      <ul>
        {items.map(item => (
          <li key={item._id}>{item.title || item.name || item._id}</li>
        ))}
      </ul>
      {nextCursor && (
        <button onClick={handleLoadMore} disabled={loading}>
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
      {!nextCursor && !loading && items.length > 0 && (
        <div>No more items.</div>
      )}
    </div>
  );
}

export default CursorPagination;
