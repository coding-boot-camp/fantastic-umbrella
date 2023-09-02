const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const TagsData = await Tag.findAll();
    res.status(200).json(TagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const TagData = await Tag.findByPk(req.params.id, {
   
      include: [{ model: Product, through: ProductTag}]
    });

    if (!TagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const NewTagData = await Tag.create(req.body);
    res.status(200).json(NewTagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const UpdatedTagData = await Tag.update(req.body, { where: { id: req.params.id } });
    res.status(200).json(UpdatedTagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const TagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!TagData) {
      res.status(404).json({ message: 'No Tag found with this id!' });
      return;
    }

    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
