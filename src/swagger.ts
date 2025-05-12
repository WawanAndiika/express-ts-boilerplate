import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Express API',
      version: '1.0.0',
      description: 'API documentation',
    },
  },
  apis: ['./src/modules/book/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
