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
    router.route('/:id').get(this.bookController.getBook);
    router.route('/').get(this.bookController.getBooks);
    router.route('/').post(createBookValidation, validate, this.bookController.createBook);
    router.route('/:id').put(updateBookValidation, validate, this.bookController.updateBook);
    router.route('/:id').delete(this.bookController.deleteBook);
    return router;
  }
}

export default BookRouter;