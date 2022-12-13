const Oder = require('../models/Order');
const { verifyToken, verifyTokenAuthoriztion, verifyTokenAndAdmin } = require('./verifyToken');

const router = require('express').Router()

// CREATE 
router.post('/', verifyToken, async (req, res) => {
    const newOder = new Oder(req.body)

    try {
        const savedOder = await newOder.save()
        res.status(200).json(savedOder);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE 

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {


    try {
        const updatedOder = await Oder.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            },
            {
                new: true
            }
        );
        res.status(201).json(updatedOder)
    } catch (err) {
        res.status(500).json(err)
    }
})



//DELETE 

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const oder = await Oder.findByIdAndDelete(req.params.id)
        res.status(200).json('Oder has been deleted....')
        res.status(201).json(oder)

    } catch (err) {
        res.status(500).json(err)
    }
})


//GET USER Oder

router.get('/find/:useriId', verifyTokenAuthoriztion, async (req, res) => {
    try {
        const Oders = await Oder.find({ userId: req.params.userId });
        res.status(200).json(Oders)

    } catch (err) {
        res.status(500).json(err)
    }
});

//GET ALL 

router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const Oders = await Oder.find();
        res.status(200).json(Oders);
    } catch (err) {
        res.status(500).json(err)
    }
});

//GET MONTHLY INCOME

router.get('/income', verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: '$createdAt' },
                },
            },
        ]);
        res.status(200).json(income)
    } catch (err) {
        res.status(500).json(err)
    }
})



module.exports = router;

