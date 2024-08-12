import express from 'express';
import { Book } from '../models/bookModels.js';

const router = express.Router();

// Route to CREATE a new book
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
           return response.status(400).send({
            message: 'Send all required fields: title, author, publishYear',

           }) 
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message });
    }
});

// Route to GET ALL books from database
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({}); // Passing empty object makes it find all
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

// Route to GET ONE book by id from database
// : is used to tag a parameter in the route
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

// Route to UPDATE a book by id from database
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
           return response.status(400).send({
            message: 'Send all required fields: title, author, publishYear',
           }) 
        }

        const { id } = request.params;
        
        // Use variable result to check if function worked properly or if there is no book matching the id
        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result){
            return response.status(404).json({ message : `Book not found`})
        }
        return response.status(200).send({ message : `Book updated successfully`})
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to DELETE a book by id from database
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

         // Use variable result to check if function worked properly or if there is no book matching the id
        const result = await Book.findByIdAndDelete(id);

        if (!result){
            return response.status(404).json({ message : `Book not found`})
        }
        return response.status(200).send({ message : `Book deleted successfully`})

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;