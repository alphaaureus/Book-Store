import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose";
import { Book } from './models/bookModels.js';
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware to handle CORS Policy
// Option 1: Allow All Origins with Default of cors(*)
// app.use(cors()) // Empty parentheses has a default value of a star which accepts everything
// Option 2: Allow Custom Origins
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

// () => {} is a callback function that receives request and response.
app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send(`Welcome to Book Store.`)
});

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => { //success
        console.log('App connected to database');
        // Have to use `` for console.log or the PORT variable won't work.
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`); 
        });
    })
    .catch((error) => { //failure
        console.log(error);
    });