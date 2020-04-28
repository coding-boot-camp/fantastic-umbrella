const router = require('express').Router();

// DON'T FORGET TO IMPORT THE MODELS YOU'LL WORK WITH

// GET /api/products to retrieve all products from database, include associated Category and Tag data (through ProductTag)
router.get('/', (req, res) => {});

// GET /api/products/:id to retrieve one product's data by it's `id` value, include associated Category and Tag data (through ProductTag)
router.get('/:id', (req, res) => {});

// POST /api/products to create data in Product model and associate any tags using the ProductTag through model
router.post('/', (req, res) => {
  console.log(req.body);

  Product.create(req.body)
    .then(product => {
      if (tagIds.length) {
        const productTagIdArr = tagIds.map(TagId => ({ ProductId: product.id, TagId }));
        console.log(productTagIdArr);
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    })
    .then(productTagIds => res.status(200).json(productTagIds))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

// PUT /api/products/:id to update a post by it's `id`, fill in the question marks!
router.put('/:id', (req, res) => {
  const tagIds = req.body.tagIds.split(',');
  // update product data
  Product.update(// ? , {
    where: {
      id: // ?
    }
  })
    .then(product => {
      // find all associated tags from producttag
      return ProductTag.findAll({ where: { ProductId: req.params.id }, raw: true });
    })
    .then(productTags => {
      console.log(productTags);
      console.log(`tag id ${req.body.tagIds}`)
      const [{ProductId, TagId}] = productTags.filter(({ TagId }) => {
        console.log(TagId);
        return tagIds.includes(TagId.toString()) === false;
      });
      
      return ProductTag.destroy({ where: { ProductId, TagId } });
    })
    .then(destroyedId => res.status(200).json(destroyedId))
    .catch(err => {
      console.log(err);
      res.status(404).json(err)
    });
});

// DELETE /api/products/:id to delete a product by its `id` value
router.delete('/:id', (req, res) => {});

module.exports = router;
