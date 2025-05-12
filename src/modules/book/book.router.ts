import express from 'express';

import BookController from './book.controller';
import { createBookValidation, updateBookValidation } from './book.validation';
import { validate } from '../../middlewares/validation';

class BookRouter {
  private bookController: BookController;

  constructor(bookController: BookController) {
    this.bookController = bookController;
  }

  getRouter() {
    const router = express.Router();

    /**
     * @swagger
     * /api/v1/books/{id}:
     *   get:
     *     summary: Get a book by ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the book
     *     responses:
     *       200:
     *         description: A single book
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: string
     *                   example: "6d82f42e-8e55-49c5-8938-a229bebfaa09"
     *                 title:
     *                   type: string
     *                   example: "Book 1"
     *                 author:
     *                   type: string
     *                   example: "Author 1"
     *                 publishedYear:
     *                   type: integer
     *                   example: 2025
     *                 stock:
     *                   type: integer
     *                   example: 10
     *                 genres:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       id:
     *                         type: string
     *                         example: "6f8b89b1-ae67-48b4-83de-8b69976b54e0"
     *                       name:
     *                         type: string
     *                         example: "Dark"
     */
    router.route('/:id').get(this.bookController.getBook);

    /**
     * @swagger
     * /api/v1/books:
     *   get:
     *     summary: Get all books
     *     parameters:
     *       - in: query
     *         name: search
     *         schema:
     *           type: string
     *         description: Search term to filter books by title or author
     *       - in: query
     *         name: page
     *         schema:
     *           type: integer
     *           example: 1
     *         description: Page number for pagination
     *       - in: query
     *         name: limit
     *         schema:
     *           type: integer
     *           example: 10
     *         description: Number of books to return per page
     *     responses:
     *       200:
     *         description: A list of books with pagination
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 page:
     *                   type: integer
     *                   example: 1
     *                 totalPages:
     *                   type: integer
     *                   example: 1
     *                 totalBooks:
     *                   type: integer
     *                   example: 6
     *                 books:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       id:
     *                         type: string
     *                         example: "24c900d3-934e-4710-ae68-0d448eefd842"
     *                       title:
     *                         type: string
     *                         example: "Book 2"
     *                       author:
     *                         type: string
     *                         example: "Author 1"
     *                       publishedYear:
     *                         type: integer
     *                         example: 2025
     *                       stock:
     *                         type: integer
     *                         example: 10
     *                       genres:
     *                         type: array
     *                         items:
     *                           type: string
     *                         example: ["Dark", "Light"]
     */
    router.route('/').get(this.bookController.getBooks);

    /**
     * @swagger
     * /api/v1/books:
     *   post:
     *     summary: Create a new book
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *                 example: "The Great Gatsby"
     *               author:
     *                 type: string
     *                 example: "F. Scott Fitzgerald"
     *               publishedYear:
     *                 type: integer
     *                 example: 1925
     *               genres:
     *                 type: array
     *                 items:
     *                   type: string
     *                 example: ["Fiction", "Classic"]
     *               stock:
     *                 type: integer
     *                 example: 10
     *     responses:
     *       201:
     *         description: The created book
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: string
     *                   example: "9786fca9-01e7-4f09-89f9-74e99c9a9304"
     *                 title:
     *                   type: string
     *                   example: "The Great Gatsby"
     *                 author:
     *                   type: string
     *                   example: "F. Scott Fitzgerald"
     *                 publishedYear:
     *                   type: integer
     *                   example: 1925
     *                 stock:
     *                   type: integer
     *                   example: 10
     *                 genres:
     *                   type: array
     *                   items:
     *                     type: string
     *                   example: ["Fiction", "Classic"]
     */
    router.route('/').post(createBookValidation, validate, this.bookController.createBook);

    /**
     * @swagger
     * /api/v1/books/{id}:
     *   put:
     *     summary: Update a book by ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the book
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *                 example: "Updated Title"
     *               author:
     *                 type: string
     *                 example: "Updated Author"
     *               publishedYear:
     *                 type: integer
     *                 example: 2025
     *               genres:
     *                 type: array
     *                 items:
     *                   type: string
     *                 example: ["Updated Genre"]
     *               stock:
     *                 type: integer
     *                 example: 15
     *     responses:
     *       200:
     *         description: The updated book
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: string
     *                   example: "dab4bea5-e3f4-4b27-b037-914bdb3cd0c4"
     *                 title:
     *                   type: string
     *                   example: "Updated Title"
     *                 author:
     *                   type: string
     *                   example: "Updated Author"
     *                 publishedYear:
     *                   type: integer
     *                   example: 2025
     *                 stock:
     *                   type: integer
     *                   example: 15
     *                 genres:
     *                   type: array
     *                   items:
     *                     type: string
     *                   example: ["Updated Genre"]
     */
    router.route('/:id').put(updateBookValidation, validate, this.bookController.updateBook);

    /**
     * @swagger
     * /api/v1/books/{id}:
     *   delete:
     *     summary: Delete a book by ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the book
     *     responses:
     *       200:
     *         description: Book deleted successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Book deleted successfully"
     */
    router.route('/:id').delete(this.bookController.deleteBook);

    return router;
  }
}

export default BookRouter;