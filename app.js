import dotenv from 'dotenv';
dotenv.config();

import colors from 'colors'; //* Do not remove this line

import express from 'express';

//middlewares
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import {
  errorHandler,
  notFoundHandler,
} from './src/middleware/error-handler.js';

//routes
import indexRoute from './src/routes/index.js';
import productRoute from './src/routes/product.route.js';
import seedRoute from './src/routes/seed.route.js';
import userRoute from './src/routes/user.route.js';
import orderRoute from './src/routes/order.route.js';

const app = express();

//settings
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use('/api', indexRoute);
app.use('/api/products', productRoute);
app.use('/api/seed', seedRoute);
app.use('/api/users', userRoute);
app.use('/api/orders', orderRoute);

//paypal configuration
app.get('/api/config/paypal', (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});
//error handlers (middlewares)
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
