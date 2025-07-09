import React, { useState } from 'react';

function EventTimePagination() {
  const [startTime, setStartTime] = useState('2023-01-01T00:00:00Z');
  const [endTime, setEndTime] = useState('2023-01-31T23:59:59Z');
  const [limit, setLimit] = useState(10);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        start_time: startTime,
        end_time: endTime,
        limit: limit.toString(),
      });
      const response = await fetch(`/api/events?${params}`);
      const data = await response.json();
      setEvents(data.data);
    } catch (err) {
      setEvents([]);
      alert('Failed to fetch events');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Time-based Event Pagination</h2>
      <div>
        <label>
          Start Time:
          <input
            type="datetime-local"
            value={startTime.slice(0, 16)}
            onChange={e => setStartTime(new Date(e.target.value).toISOString())}
          />
        </label>
        <label>
          End Time:
          <input
            type="datetime-local"
            value={endTime.slice(0, 16)}
            onChange={e => setEndTime(new Date(e.target.value).toISOString())}
          />
        </label>
        <label>
          Limit:
          <input
            type="number"
            value={limit}
            min={1}
            onChange={e => setLimit(Number(e.target.value))}
          />
        </label>
        <button onClick={fetchEvents} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Events'}
        </button>
      </div>
      <ul>
        {events.map(event => (
          <li key={event._id}>
            <strong>{event.name}</strong> — {new Date(event.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
      {events.length === 0 && !loading && <div>No events found for this range.</div>}
    </div>
  );
}

export default EventTimePagination;
