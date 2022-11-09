const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'tagged_products'
      }
    ]
  })
    .then(result => res.json(result))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'tagged_products'
      }
    ]
  })
    .then(result => {
      if (!result) {
        res.status(404).json({ message: "No tag found with this id" });
        return
      }
      res.json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  const tagName = req.body.tag_name.charAt(0).toUpperCase() + req.body.tag_name.slice(1).toLowerCase();
  // create a new tag
  Tag.findOrCreate({
    where: { tag_name: tagName },
    defaults: {
      tag_name: tagName
    }
  })
    .then(result => {
      if (!result[1]) {
        res.status(400).json({ message: "This tag already exists!" })
        return;
      }
      res.json({message: "Tag successfully added"});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  const tagName = req.body.tag_name.charAt(0).toUpperCase() + req.body.tag_name.slice(1).toLowerCase();

  Tag.findOne({
    where: { tag_name: tagName}
  })
    .then(checkData => {
      if (checkData) {
        res.status(400).json({ message: 'This Tag name already exists!' });
        return true
      }
      return false;
    })
    .then(exists => {

      if (exists) {
        return;
      }

      Tag.update({
        tag_name: tagName
      },
        {
        where: {id: req.params.id}
        })
      .then(updateData => {
          if (updateData[0] === 0) {
            res.status(404).json({ message: "No tag exists with this id!" })
            return;
          }
        res.json({ message: "The tag name has been successfully updated" });
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {id: req.params.id}
  })
    .then(destroyData => {
      if (!destroyData) {
        res.status(404).json({ message: "No tag can be found with this id" });
        return;
      }
      res.json({ message: "Tag has been successfully deleted" });
  })
});

module.exports = router;
