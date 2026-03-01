const express = require('express');
const app = express();
app.use(express.json());

const userRouter = require('./routes/userRouter');
const orderRouter = require('./routes/orderRouter');
const productRouter = require('./routes/productRouter');
const authrouter = require('./routes/authRouter');

app.use('/api/v1/auth', authrouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/products', productRouter);

module.exports = app;