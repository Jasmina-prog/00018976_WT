const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const validateBook = require('../middleware/bookValidation'); 


// Route: Get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.render('books', { books }); 
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch books', error });
    }
});

// Route: Render Add book form
router.get('/add', (req, res) => {
    res.render('add', { errors: [] });
});

// Route: Render Edit book form
router.get('/edit/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.render('edit', { book }); 
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch book', error });
    }
});

// Route: Create a new book
router.post('/', validateBook, async (req, res) => {
    console.log('Received Data:', req.body); 
    try {
    const { title, author, review } = req.body;
    if (!title || !author || !review) {
        return res.status(400).json({ message: "All fields are required." });
    }
        const newBook = new Book({ title, author, review });
        await newBook.save();
        console.log('Book added successfully');
        res.redirect('/books'); 
    } catch (err) {
        console.error('Error adding book:', error);
        res.status(500).json({ message: err.message });
    }
});

// Route: Update a book
router.put('/:id', validateBook, async (req, res) => {
    try {
        const { title, author, review } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { title, author, review },
            { new: true } 
        );
        console.log("Updated book:", updatedBook);
        res.redirect('/books'); 
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(400).json({ message: "Update failed", error });
    }
});



// Route: Delete a book
router.post('/delete/:id', async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.redirect('/books'); 
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book', error });
    }
});

// Route: Render about page
router.get('/', (req, res) => {
    res.render('about');
  });

  
module.exports = router;
