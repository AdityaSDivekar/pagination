// routes/items.js
const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// GET /api/items?page=2&limit=10
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Item.find().skip(skip).limit(limit),
    Item.countDocuments()
  ]);

  res.json({
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
    data: items
  });
});

module.exports = router;
