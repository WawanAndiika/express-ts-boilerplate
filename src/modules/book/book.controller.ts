import { Request, Response } from 'express';
import BookService from './book.service';
import logger from '../../config/logger';

class BookController {
  private bookService: BookService;

  constructor(bookService: BookService) {
    this.bookService = bookService;
  }

  // Create a new book
  createBook = async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, author, publishedYear, genres, stock } = req.body;

      const bookData = {
        title,
        author,
        publishedYear: Number(publishedYear), 
        genres: Array.isArray(genres) ? genres : [genres],
        stock: Number(stock),
      };

      const book = await this.bookService.addBook(bookData);
      res.status(201).send(book);
    } catch (error) {
      logger.error('Error creating book:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // Get all books
  getBooks = async (req: Request, res: Response): Promise<void> => {
    try {
      const { page , limit, search } = req.query;
      const books = await this.bookService.getBooks(search ? String(search) : undefined, Number(page), Number(limit));

      res.status(200).send((page || limit) ? books : books.books);
    } catch (error) {
      logger.error('Error creating book:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // Get a single book by ID
  getBook = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const book = await this.bookService.getBook(id);
      if (!book) {
        res.status(404).json({ error: 'Book not found' });
        return;
      }
      res.status(200).send(book);
    } catch (error) {
      logger.error('Error creating book:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // Update a book by ID
  updateBook = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const book = await this.bookService.getBook(id);
      if (!book) {
        res.status(404).json({ error: 'Book not found' });
        return;
      }

      const { title, author, publishedYear, genres, stock } = req.body;

      const bookData = {
        title,
        author,
        publishedYear: Number(publishedYear), 
        genres: Array.isArray(genres) ? genres : [genres],
        stock: Number(stock),
      };

      const updatedBook = await this.bookService.updateBook(id, bookData);
      res.status(200).send(updatedBook);
    } catch (error) {
      logger.error('Error creating book:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // Delete a book by ID
  deleteBook = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const book = await this.bookService.getBook(id);
      if (!book) {
        res.status(404).json({ error: 'Book not found' });
        return;
      }

      const deletedBook = await this.bookService.deleteBook(id);

      if(!deletedBook){
        res.status(500).json({ message: 'Book deletion failed' });
        return;
      }

      res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
      logger.error('Error creating book:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}

export default BookController;