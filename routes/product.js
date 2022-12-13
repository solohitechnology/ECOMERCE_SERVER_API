const Product = require('../models/Product');
const { verifyToken, verifyTokenAuthoriztion, verifyTokenAndAdmin } = require('./verifyToken');

const router = require('express').Router()

// CREATE PRODUCT
router.post('/', verifyTokenAndAdmin, async (req, res) => {
    const newproduct = new Product(req.body)

    try {
        const savedProduct = await newproduct.save()
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
})

// UPDATE PRODUCT

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {


    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            },
            {
                new: true
            }
        );
        res.status(201).json(updatedProduct)
    } catch (err) {
        res.status(500).json(err)
    }
})



//DELETE 

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const product = await Preduct.findByIdAndDelete(req.params.id)
        res.status(200).json('Product has been deleted....')
        res.status(201).json(product)

    } catch (err) {
        res.status(500).json(err)
    }
})


//FIND PRODUCT
router.get('/find/:id',  verifyToken, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product)

    } catch (err) {
        res.status(500).json(err)
    }
});

//GET ALL PRODUCT

router.get('/', async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.Category;

    try {

        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(5);
        } else if (qCategory) {
            products = await Product.find({ categories: { $in: [qCategory], }, });
        } else {
            products = await Product.find();
        }
        res.status(200).json(product);

    } catch (err) {
        res.status(500).json(err);

    }

});

module.exports = router;

