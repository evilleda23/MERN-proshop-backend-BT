import dotenv from 'dotenv';
dotenv.config();

import colors from 'colors';

import express from 'express';

//middlewares
import cors from 'cors';
import morgan from 'morgan';

//routes
import indexRoute from './src/routes/index.js';
import productRoute from './src/routes/product.route.js';
import seedRoute from './src/routes/seed.route.js';

const app = express();

//settings
app.use(cors());
app.use(morgan('dev'));

//routes
app.use('/api', indexRoute);
app.use('/api', productRoute);
app.use('/api', productRoute);
app.use('/api', seedRoute);

export default app;
