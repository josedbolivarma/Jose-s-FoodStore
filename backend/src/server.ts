import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';

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

app.use(express.static('public'));
app.get('*', ( req, res ) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 5000;

app.listen( port, () => {
    console.log(`Server listening on port ${ port }`);
});