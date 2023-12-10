import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, TextField, Button } from '@mui/material';
import './App.css'; // Import a CSS file for additional styles

function App() {
  const [books, setBooks] = useState([]);
  const [newBookTitle, setNewBookTitle] = useState('');
  const [updatedBook, setUpdatedBook] = useState({ id: null, title: '' });

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = async () => {
    if (newBookTitle.trim() === '') return;

    try {
      const response = await axios.post('http://localhost:3000/api/books', {
        title: newBookTitle,
      });

      setBooks((prevBooks) => [...prevBooks, response.data]);
      setNewBookTitle('');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleUpdateBook = async () => {
    if (updatedBook.title.trim() === '' || updatedBook.id === null) return;

    try {
      const response = await axios.put(
        `http://localhost:3000/api/books/${updatedBook.id}`,
        updatedBook
      );

      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === updatedBook.id ? response.data : book
        )
      );

      setUpdatedBook({ id: null, title: '' });
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      console.log('Deleting book with ID:', id);
      await axios.delete(`http://localhost:3000/api/books/${id}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <Container className="app-container" maxWidth="md">
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        Book Library
      </Typography>
      <List className="book-list">
        {books.map((book) => (
          <ListItem key={book.id} className="book-item">
            <Typography>{book.title}</Typography>
            <Button 
              className="action-button update-button"
              onClick={() => setUpdatedBook({ id: book.id, title: book.title })}
            >
              Update
            </Button>
            <Button
              className="action-button delete-button"
              onClick={() => handleDeleteBook(book.id)}
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
      <div className="add-book-container">
        <TextField
          type="text"
          placeholder="New Book Title"
          value={newBookTitle}
          onChange={(e) => setNewBookTitle(e.target.value)}
          InputProps={{
            className: 'custom-input', // Apply custom styles to the input
          }}

        />
        <Button className="action-button add-button" onClick={handleAddBook}>
          Add Book
        </Button>
      </div>
      {updatedBook.id !== null && (
        <div className="update-book-container">
          <TextField
            type="text"
            placeholder="Updated Book Title"
            value={updatedBook.title}
            onChange={(e) =>
              setUpdatedBook((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <Button
            className="action-button update-button"
            onClick={handleUpdateBook}
          >
            Update Book
          </Button>
        </div>
      )}
    </Container>
  );
}

export default App;
