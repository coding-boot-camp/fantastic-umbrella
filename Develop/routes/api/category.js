const router = require('express').Router();

// DON'T FORGET TO IMPORT THE MODELS YOU'LL WORK WITH

// GET /api/categories to retrieve all categories from database, include associated Product data
router.get('/', (req, res) => {});

// GET /api/categories/:id to retrieve one category's data by it's `id` value, include associated Product data
router.get('/:id', (req, res) => {});

// POST /api/categories to create data in Category model provided in req.body
router.post('/', (req, res) => {});

// PUT /api/categories/:id to update category by its `id` value
router.put('/:id', (req, res) => {});

// DELETE /api/categories/:id to delete a category by its `id` value
router.delete('/:id', (req, res) => {});

module.exports = router;
