
const Cart = require('../models/Cart');
const { verifyToken, verifyTokenAuthoriztion, verifyTokenAndAdmin } = require('./verifyToken');

const router = require('express').Router()

// CREATE PRODUCT
router.post('/', verifyToken, async (req, res) => {
    const newCart = new Cart(req.body)

    try {
        const savedCart = await newCart.save()
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
    }
})

// UPDATE PRODUCT

router.put('/:id', verifyTokenAuthoriztion, async (req, res) => {


    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            },
            {
                new: true
            }
        );
        res.status(201).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});



//DELETE 

router.delete('/:id', verifyTokenAuthoriztion, async (req, res) => {
    try {
        const cart = await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json('Cart has been deleted....')
        res.status(201).json(cart)

    } catch (err) {
        res.status(500).json(err)
    }
})


//FIND USER CART
router.get('/find/:useriId', verifyTokenAuthoriztion, async (req, res) => {
    try {
        const cart = await Cart.findOne( { userId: req.params.useriId });
        res.status(200).json(cart);

    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL 

router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try{
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err)
    }
})



module.exports = router;

