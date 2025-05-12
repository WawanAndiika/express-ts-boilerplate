import request from 'supertest';
import app from '../app';

describe('Book Endpoints', () => {
  let bookId: string;

  describe('GET /api/v1/books', () => {
    it('should return a list of books', async () => {
      const response = await request(app).get('/api/v1/books');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('POST /api/v1/books', () => {
    it('should create a new book', async () => {
      const newBook = {
        "title": "Book 2",
        "author": "Author 1",
        "publishedYear": 2025,
        "genres": [
            "Dark",
            "Light"
        ],
        "stock": 10
      };

      const response = await request(app)
        .post('/api/v1/books')
        .send(newBook)
        .set('Content-Type', 'application/json');

      bookId = response.body.id;

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe(newBook.title);
      expect(response.body.author).toBe(newBook.author);
      expect(response.body.publishedYear).toBe(newBook.publishedYear);
      expect(response.body.genres[0]).toBe(newBook.genres[0]);
      expect(response.body.genres[1]).toBe(newBook.genres[1]);
      expect(response.body.stock).toBe(newBook.stock);
    });
  });

  describe('PUT /api/v1/books/:id', () => {
    it('should update an existing book', async () => {
      const updatedBook = {
        title: 'Updated Book Title',
        author: 'Updated Author',
        publishedYear: 2026,
        genres: ['Updated Genre'],
        stock: 15,
      };

      const response = await request(app)
        .put(`/api/v1/books/${bookId}`)
        .send(updatedBook)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', bookId);
      expect(response.body.title).toBe(updatedBook.title);
      expect(response.body.author).toBe(updatedBook.author);
      expect(response.body.publishedYear).toBe(updatedBook.publishedYear);
      expect(response.body.genres[0]).toBe(updatedBook.genres[0]);
      expect(response.body.stock).toBe(updatedBook.stock);
    });

    it('should return 404 if the book to update is not found', async () => {
      const invalidBookId = 9999;
      const updatedBook = {
        title: 'Non-existent Book',
        author: 'Non-existent Author',
        publishedYear: 2026,
        genres: ['Non-existent Genre'],
        stock: 0,
      };

      const response = await request(app)
        .put(`/api/v1/books/${invalidBookId}`)
        .send(updatedBook)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(404);
    });
  });

  describe('GET /api/v1/books/:id', () => {
    
    it('should return a single book by ID', async () => {
      const response = await request(app).get(`/api/v1/books/${bookId}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', bookId);
    });

    it('should return 404 if the book is not found', async () => {
      const invalidBookId = 9999;
      const response = await request(app).get(`/api/v1/books/${invalidBookId}`);
      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/v1/books/:id', () => {
    it('should delete an existing book', async () => {
      const response = await request(app)
        .delete(`/api/v1/books/${bookId}`)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Book deleted successfully');
    });

    it('should return 404 if the book to delete is not found', async () => {
      const invalidBookId = 9999;

      const response = await request(app)
        .delete(`/api/v1/books/${invalidBookId}`)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(404);
    });
  });
});