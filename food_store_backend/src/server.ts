import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import FoodRouter from './routes/food.router';

import { dbConnect } from './database/database.config';
dbConnect();

const app = express();

// Midlewares
app.use( express.json() );

// TODO: Change localhost to deploy
app.use( cors({
    credentials: true,
    origin: ['http://localhost:4200']
}) );

app.use('/api/foods', FoodRouter );

const port = 5000;

app.listen( port, () => {
    console.log(`Server listening on port ${ port }`);
});