import { Book, Genre, PrismaClient } from '@prisma/client';

class BookService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Add a new book with genres
  addBook = async (book: Omit<Book, 'id'> & { genres: string[] }): Promise<Book & { genres: string[] }> => {
    const createdBook = await this.prisma.book.create({
      data: {
        title: book.title,
        author: book.author,
        publishedYear: book.publishedYear,
        stock: book.stock,
        genres: {
          create: book.genres.map((genre) => ({
            genre: {
              connectOrCreate: {
                where: { name: genre },
                create: { name: genre },
              },
            },
          })),
        },
      },
      include: {
        genres: {
          include: {
            genre: true,
          },
        },
      },
    });

    return {
      ...createdBook,
      genres: createdBook.genres.map((bg) => bg.genre.name),
    };
  };

  // Get all books with optional filters and pagination
  getBooks = async (
    search?: string,
    page?: number,
    limit?: number
  ): Promise<{ books: (Book & { genres: string[] })[]; total: number }> => {
    const skip = page && limit ? (page - 1) * limit : undefined;
    const take = limit || undefined;

    const prismaFilters: any = {};

    if (search) {
      prismaFilters.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { author: { contains: search, mode: 'insensitive' } },
        { genres: {
          some: {
              genre: {
                name: { equals: search, mode: 'insensitive' },
              },
            },
          } 
        },
      ];
    }

    const total = await this.prisma.book.count({ where: prismaFilters });
    const books = await this.prisma.book.findMany({
      where: prismaFilters,
      skip,
      take,
      include: {
        genres: {
          include: {
            genre: true,
          },
        },
      },
    });

    const booksWithGenres = books.map((book) => ({
      ...book,
      genres: book.genres.map((bg) => bg.genre.name),
    }));

    return { books: booksWithGenres, total };
  };

  // Get a single book by ID with genres
  getBook = async (id: string): Promise<Book & { genres: Genre[] } | null> => {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: {
        genres: {
          include: {
            genre: true, // Include genre details in the response
          },
        },
      },
    });

    if (!book) return null;

    // Transform genres to return only the genre details
    return {
      ...book,
      genres: book.genres.map((bg) => bg.genre),
    };
  };

  // Update a book by ID with genres
  updateBook = async (
    id: string,
    bookData: Partial<Book> & { genres?: string[] }
  ): Promise<Book & { genres: String[] }> => {
    const updatedData: any = {
      ...bookData,
    };

    if (bookData.genres) {
      updatedData.genres = {
        deleteMany: {},
        create: bookData.genres.map((genre) => ({
          genre: {
            connectOrCreate: {
              where: { name: genre },
              create: { name: genre },
            },
          },
        })),
      };
    }

    const updatedBook = await this.prisma.book.update({
      where: { id },
      data: updatedData,
      include: {
        genres: {
          include: {
            genre: true,
          },
        },
      },
    });

    return {
      ...updatedBook,
      genres: updatedBook.genres.map((bg) => bg.genre.name),
    };
  };

  // Soft delete a book by ID
  deleteBook = async (id: string): Promise<Book> => {
    await this.prisma.bookGenre.deleteMany({
      where: { bookId: id },
    });

    // Then delete the book
    return this.prisma.book.delete({
      where: { id },
    });
  };
}

export default BookService;