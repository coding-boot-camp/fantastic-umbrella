const router = require('express').Router();
const {
  Product,
  Category,
  Tag,
  ProductTag
} = require('../../models');

// The `/api/products` endpoint

// Get all products and their associated Category and Tag data
router.get('/', (req, res) => {
  Product.findAll({
      include: [{
          model: Category
        },
        {
          model: Tag,
          as: 'productTag'
        }
      ]
    })
    .then(dbProductData => res.json(dbProductData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

// Get one product and its associated Category and Tag data
router.get('/:id', (req, res) => {
  Product.findOne({
      where: {
        id: req.params.id
      },
      include: [{
          model: Category
        },
        {
          model: Tag,
          as: 'productTag'
        }
      ]
    })
    .then(dbProductData => {
      if (!dbProductData) {
        res.status(404).json({
          message: 'No product found with this id!'
        });
        return;
      }
      res.json(dbProductData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

// Create a new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Update product tags
router.put('/:id', (req, res) => {
  Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({
        where: {
          product_id: req.params.id
        }
      });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({
        tag_id
      }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({
          tag_id
        }) => !req.body.tagIds.includes(tag_id))
        .map(({
          id
        }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({
          where: {
            id: productTagsToRemove
          }
        }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Delete a product
router.delete('/:id', (req, res) => {
  Product.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(dbProductData => {
      if (!dbProductData) {
        res.status(404).json({
          message: 'No product found with this id!'
        });
        return;
      }
      res.json(dbProductData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;