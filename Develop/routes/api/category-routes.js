const router = require('express').Router();
const { Category, Product } = require('../../models');


// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({   
  // be sure to include its associated Products
    include: [{ model: Product}],
  })
  .then((data=>{res.json(data)}));


});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  const data = Category.findByPk(req.params.id,{  
  // be sure to include its associated Products
    include: [{ model: Product }],
  })
  .then((data=>{res.json(data)}));
});

router.post('/', (req, res) => {
  // create a new category
  const new_category = Category.create({
    category_name: req.body.category_name,
  })
  .then((new_category=>{res.json(new_category)}));
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  const updated_category = Category.update({
    where:{id: req.params.id} 
  })
  .then((updated_category=>{res.json(updated_category)}));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  const delete_category = Category.destroy({
    where:{id: req.params.id} 
  })
  .then((delete_category=>{res.json(delete_category)}));
});

module.exports = router;


