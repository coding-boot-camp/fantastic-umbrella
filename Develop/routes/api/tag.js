const router = require('express').Router();

// DON'T FORGET TO IMPORT THE MODELS YOU'LL WORK WITH

// GET /api/tags to retrieve all tags from database, include associated Product data through ProductTag
router.get('/', (req, res) => {});

// GET /api/tags/:id to retrieve a tag from database by its `id`, include associated Product data through ProductTag
router.get('/:id', (req, res) => {});

// POST /api/tags to create a tag
router.post('/', (req, res) => {});

// PUT /api/tags/:id to update a tag's information by its `id`
router.put('/:id', (req, res) => {});

// DELETE /api/tags/:id to delete a tag by its `id`
router.delete('/:id', (req, res) => {});

module.exports = router;
