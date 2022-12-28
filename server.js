const express = require('express');
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 4000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DB connection successfull'))
    .catch((e) => {
        console.log(e);
    });

app.use(express.json());
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/carts', cartRoutes)
app.use('/api/orders', orderRoutes)

// app.use(cors({
//     origin: 'http://localhost:3000',
//     //origin: ' * '
// }));

app.use(cors({
    origin: ' http://localhost:3000 ',
}))


app.get('/solo', (req, res) => {
    res.status(200).json('wellcome to home page')
    console.log('beckend server running ')
})



app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }
    console.log(`server running on port ${PORT}`)
})