const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findAll({
      include: [
        {
        model: Category,
        attributes: ['category_name']
        },
        {
        model: Tag,
        attributes: ['tag_name']
        }
        ]
       });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{
        model: Category,
        attributes: ['id', 'category_name']
        },
        {
        model: Tag,
        attributes: ['id','tag_name']
        }
      ]
    });

    if (!productData) {
      res.status(404).json({ message: 'No category found with that id' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  // create a new category
  try {
    const productData = await Product.create({
      product_name: req.body.product_name,
      product_price: req.body.product_price
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update product
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Product.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(productData => {
    if(!productData) {
      res.status(404).json({message: 'No product found matching this id'});
      return;
    }
    res.json(productData);
  });
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
