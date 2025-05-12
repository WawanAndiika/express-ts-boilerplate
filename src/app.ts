import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import httpStatus from 'http-status';
import express from "express";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';

import xss from './middlewares/xss';
import rateLimiter from './middlewares/rateLimiter';

import setupRoutes from './modules/routes';

const app = express()

// set security HTTP headers
app.use(helmet());

// Apply rate limiter to all requests
app.use(rateLimiter);

// parse json request body
app.use(express.json())

// sanitize request data
app.use(xss());

// enable cors
app.use(cors());

// gzip compression
app.use(compression());

// Example routes
app.get('/health', (req, res) => {
  res.send({ status: 'ok' });
});

// Module routes
setupRoutes(app); 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Handle 404 errors
app.use((req, res) => {
  res.status(httpStatus.NOT_FOUND).send({
    success: false,
    statusCode: httpStatus.NOT_FOUND,
    message: 'API not found',
    data: null,
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;