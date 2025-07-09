// GET /api/items?page=3&limit=10
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 10;
const skip = (page - 1) * limit;

const items = await Item.find().skip(skip).limit(limit);
const total = await Item.countDocuments();

res.json({
  totalPages: Math.ceil(total / limit),
  currentPage: page,
  data: items
});
