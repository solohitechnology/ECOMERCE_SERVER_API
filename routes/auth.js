
const router = require('express').Router();
const User = require('../models/User');
//const CryptoJS = require('cripto-js');
const jwt = require('jsonwebtoken');

//REGISTER

//https://loom.com/share/bc783b82d621498baf6ce113865374d9

router.post('/register', async (req, res) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        password: CriptoJS.AES.encript(req.body.password,
            process.env.PASS_SEC
        ).toString(),
    })
    try {

        const savedUser = await newUser.save()
        res.status(201).send('successfully registered')
    } catch (err) {
        console.log(err)
    }
});


//LOGIN

router.post('/login', async (req, res) => {

    try {

        const user = await User.findOne({
            username: req.body.username
        });
        !user && res.status(401).json('Wrong credentials!')

        const hashedPassword = CriptoJS.AES.decript(
            user.password,
            process.env.PASS_SEC
        );
        const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        Originalpassword !== req.body.password &&
            res.status(401).json('Wrong credentials!');

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: '3d' }
        );

        const { password, ...orthers } = user._doc;

        res.status(200).json({ orthers, accessToken })

    } catch (err) {
        res.status(500).json(err)
    }

})


module.exports = router;