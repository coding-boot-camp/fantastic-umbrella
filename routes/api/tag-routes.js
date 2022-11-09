const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({ include: { model: Product } })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(500).json(err));
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: { id: req.params.id },
    include: { model: Product },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(500).json(err));
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => {
      if (req.body.productIds.length) {
        const tagTagArr = req.body.productIds.map((product_id) => {
          return { tag_id: tag.id, product_id };
        });
        return ProductTag.bulkCreate(tagTagArr);
      }
      res.status(200).json(tag);
    })
    .then((ids) => res.status(200).json(ids))
    .catch((err) => res.status(400).json(err));
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, { where: { id: req.params.id } })
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;