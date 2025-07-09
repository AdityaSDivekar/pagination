// Concept: Similar to cursor-based, but uses a unique, sequential field (like an auto-incrementing ID).

// Pros: Fast, consistent for large datasets.

// Cons: Cannot skip to arbitrary pages.

// GET /api/items?since_id=12345&limit=10
const sinceId = req.query.since_id;
const limit = parseInt(req.query.limit) || 10;

let query = {};
if (sinceId) {
  query._id = { $gt: sinceId };
}

const items = await Item.find(query).limit(limit);

res.json({
  nextSinceId: items.length ? items[items.length - 1]._id : null,
  data: items
});
