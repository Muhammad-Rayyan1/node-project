const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Sample data
let books = [
  { id: 1, title: 'Book 1' },
  { id: 2, title: 'Book 2' },
];

// Middleware for logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Get all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// Get a specific book by ID
app.get('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bookId);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

// Add a new book
app.post('/api/books', (req, res) => {
  const newBook = req.body;
  newBook.id = books.length + 1; // Assign a new ID
  console.log('Added book:', newBook);
  books.push(newBook);
  res.status(201).json(newBook);
});

// Update a book by ID
app.put('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const updatedBook = req.body;
  const index = books.findIndex((b) => b.id === bookId);

  if (index !== -1) {
    books[index] = { ...books[index], ...updatedBook };
    console.log('Updated book:', books[index]);
    res.json(books[index]);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

// Delete a book by ID
app.delete('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  console.log('Deleting book with ID:', bookId);
  const deletedBook = books.find((b) => b.id === bookId);

  if (deletedBook) {
    books = books.filter((b) => b.id !== bookId);
    res.json({ message: 'Book deleted successfully', deletedBook });
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
