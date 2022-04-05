const router = require('express').Router();
const {
  Tag,
  Product,
  ProductTag
} = require('../../models');

// The `/api/tags` endpoint

// Get all tags and their associated products
router.get('/', (req, res) => {
  Tag.findAll({
      include: [{
        model: Product,
        as: 'productTag'
      }]
    })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

// Get specific tag and its associated products
router.get('/:id', (req, res) => {
  Tag.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: Product,
        as: 'productTag'
      }]
    })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({
          message: 'No tag found with this id!'
        });
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

// Create a new tag
router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
      tag_name: req.body.tag_name
    })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update a tag
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({
          message: 'No tag found with this id!'
        });
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete a tag
router.delete('/:id', (req, res) => {
  Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({
          message: 'No tag found with this id!'
        });
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;