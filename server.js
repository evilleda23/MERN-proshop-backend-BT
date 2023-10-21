import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import connectDB from './src/config/db.config.js';

import http from 'http';
const server = http.Server(app);

async function connect() {
  await connectDB();
  console.log('Connection to database successful');
}

async function main() {
  //Database
  await connect();
  const port = process.env.PORT || 5000;
  //Express App
  await server.listen(port);
  console.log(`Server on port ${port}: Connected`);
}

main();
