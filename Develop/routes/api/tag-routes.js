const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  const all_tags = Category.findAll({
  // be sure to include its associated Product data
  include: [{ model: Product}],
  })
  .then((all_tags=>{res.json(all_tags)}));
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  const single_tag = Category.findByPk(req.params.id,{
  // be sure to include its associated Product data
    include: [{ model: Product}],
  })
  .then((single_tag=>{res.json(single_tag)}));
});

router.post('/', (req, res) => {
  // create a new tag
  const new_tag = Tag.create({
    tag_name: req.body.tag_name
  })
  .then((new_tag => {res.json(new_tag)}));
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  const updated_tag = Tag.update({
    where:{id: req.params.id} 
  })
  .then((updated_tag=>{res.json(updated_tag)}));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  const delete_tag = Tag.destroy({
    where:{id: req.params.id} 
  })
  .then((delete_tag=>{res.json(delete_tag)}));
});

module.exports = router;
