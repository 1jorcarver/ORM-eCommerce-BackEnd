const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // finds all categories
  // includes its associated Products
  Category.findAll({
    attributes: ['id', 'category_name'],
    include: {
      model: Product
    }
  })
    .then(CategoryData => res.json(CategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // finds one category by its `id` value
  // includes its associated Products
  Category.findOne({
    where: { id: req.params.id },
    attributes: ['id', 'category_name'],
    include: {
      model: Product
    }
  })
    .then(CategoryData => {
      if (!CategoryData) {
        res.status(404).json({ message: 'No category with this ID'});
        return;
      }
      res.json(CategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // creates a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then(CategoryData => res.json(CategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.put('/:id', (req, res) => {
  // updates category by its `id` value
  Category.update(req.body, { where: { id: req.params.id } })
    .then(CategoryData => {
      if (!CategoryData) {
        res.status(404).json({ message: 'No category with this ID' });
        return;
      }
      res.json(CategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // deletes a category by its `id` value
  Category.destroy({ where: { id: req.params.id } })
    .then(CategoryData => {
      if (!CategoryData) {
        res.status(404).json({ message: 'No category with this ID' });
        return;
      }
      res.json(CategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
