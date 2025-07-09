import React, { useState, useEffect } from 'react';

function KeysetPagination() {
  const [items, setItems] = useState([]);
  const [sinceId, setSinceId] = useState(null);
  const [nextSinceId, setNextSinceId] = useState(null);
  const [loading, setLoading] = useState(false);
  const limit = 10; // Adjust as needed

  // Fetch items from the backend
  const fetchItems = async (cursor = null) => {
    setLoading(true);
    let url = `/api/items?limit=${limit}`;
    if (cursor) url += `&since_id=${cursor}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      // For "Load More" pattern (append new items)
      setItems(prev => cursor ? [...prev, ...data.data] : data.data);
      setNextSinceId(data.nextSinceId);
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
    if (nextSinceId) {
      setSinceId(nextSinceId);
      fetchItems(nextSinceId);
    }
  };

  return (
    <div>
      <h2>Keyset Pagination Example</h2>
      <ul>
        {items.map(item => (
          <li key={item._id}>{item.title || item.name || item._id}</li>
        ))}
      </ul>
      {nextSinceId && (
        <button onClick={handleLoadMore} disabled={loading}>
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
      {!nextSinceId && !loading && items.length > 0 && (
        <div>No more items.</div>
      )}
    </div>
  );
}

export default KeysetPagination;
