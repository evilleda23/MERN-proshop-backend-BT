import dotenv from 'dotenv';
dotenv.config();

import colors from 'colors'; //* Do not remove this line

import express from 'express';

//middlewares
import cors from 'cors';
import morgan from 'morgan';

import {
  errorHandler,
  notFoundHandler,
} from './src/middleware/error-handler.js';

//routes
import indexRoute from './src/routes/index.js';
import productRoute from './src/routes/product.route.js';
import seedRoute from './src/routes/seed.route.js';
import userRoute from './src/routes/user.route.js';

const app = express();

//settings
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api', indexRoute);
app.use('/api/products', productRoute);
app.use('/api/seed', seedRoute);
app.use('/api/users', userRoute);

//error handlers (middlewares)
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
