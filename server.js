import dotenv from 'dotenv';
dotenv.config();

import http from 'http';

import app from './app.js';
import connectDB from './src/config/db.config.js';
import defaultData from './src/data/default.data.js';

const server = http.Server(app);

async function connect() {
  await connectDB();
  console.log('Connection to database successful');
}

async function main() {
  //Database
  await connect();
  await defaultData();
  const port = process.env.PORT || 5000;
  //Express App
  await server.listen(port);
  console.log(`Server on port ${port}: Connected`);
}

main();
