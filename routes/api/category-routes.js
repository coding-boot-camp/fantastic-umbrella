const router = require('express').Router();
const { Category, Product } = require('../../models');
const { json } = require('express');
const { update } = require('../../models/Category');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({ include: [{model: Product}]})
  // be sure to include its associated Products
  .then(categoryData => res.json(categoryData)).catch(err => { console.log(err);res.status(500).json(err)})
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({ where: { id: req.params.id }, include: [{model: Product}]
  })
    .then(categoryData => { if (!categoryData) { res.status(404).json({ message: `No category found with an ID of ${req.params.id}` })
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
  })
});

router.post('/', (req, res) => {
  // create a new category
  const categoryTitle = req.body.category_name.charAt(0).toUpperCase() + req.body.category_name.slice(1).toLowerCase();
  Category.findOne({
    where: { category_name: categoryTitle }
  })
  .then(checkData => {
    if (checkData) {
      res.status(400).json({ message: 'This category name already exists!' });
      return true
    }
    return false;
  })
  .then(exists => {

    if (exists) {
      return;
    }

    Category.create({ category_name: categoryTitle })
      .then(createData => res.json(createData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
  })

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  const categoryTitle = req.body.category_name.charAt(0).toUpperCase() + req.body.category_name.slice(1).toLowerCase();

  Category.findOne({
    where: { category_name: categoryTitle}
  })
    .then(checkData => {
      if (checkData) {
        res.status(400).json({ message: 'This category name already exists!' });
        return true
      }
      return false;
    })
    .then(exists => {

      if (exists) {
        return;
      }

      Category.update({
        category_name: categoryTitle
      },
        {
        where: {id: req.params.id}
        })
      .then(updateData => {
          if (updateData[0] === 0) {
            res.status(404).json({ message: "No category found with this ID!" })
            return;
          }
        res.json({ message: "The category successfully updated" });
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {id: req.params.id}
  })
    .then(destroyData => {
      if (!destroyData) {
        res.status(404).json({ message: "No category found with this ID" });
        return;
      }
      res.json({ message: "Category successfully deleted" });
  })
});

module.exports = router;
