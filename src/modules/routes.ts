import { Express } from 'express';
import bookModule from './book/book.module';

export default (app: Express): void => {
  app.use('/api/v1/books', bookModule.router);
};