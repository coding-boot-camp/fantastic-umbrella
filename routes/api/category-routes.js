const router = require('express').Router();
const {
  Category,
  Product
} = require('../../models');

// Get all categories and show their related products
router.get('/', (req, res) => {
  Category.findAll({
      include: [{
        model: Product
      }]
    })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

// Get specific category and show their related products
router.get('/:id', (req, res) => {
  Category.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: Product
      }]
    })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({
          message: 'No category found with this id!'
        });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

// Create a new category
router.post('/', (req, res) => {
  Category.create({
      category_name: req.body.category_name
    })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update a category name
router.put('/:id', (req, res) => {
  Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({
          message: 'No category found with this id!'
        });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete a category
router.delete('/:id', (req, res) => {
  Category.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({
          message: 'No category found with this id!'
        });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;