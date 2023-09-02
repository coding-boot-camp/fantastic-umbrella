const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const CategoriesData = await Category.findAll({include:[{model: Product}]});
    res.status(200).json(CategoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const CategoryData = await Category.findByPk(req.params.id, { include: [{ model: Product }] });

    if (!CategoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const NewCategoryData = await Category.create(req.body);
    res.status(200).json(NewCategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const UpdatedCategoryData = await Category.update(req.body, { where: { id: req.params.id } });
    res.status(200).json(UpdatedCategoryData);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const DeletedCategoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!DeletedCategoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(DeletedCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
