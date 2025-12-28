import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import dotenv from 'dotenv';
import apiRoutes from './routes';
import { ApiResponse } from './utils/response.util';
import { AppError, ValidationError } from './utils/errors.util';

dotenv.config();

const app: Application = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  })
);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 login attempts per 15 minutes
  message: 'Too many login attempts, please try again later.',
  skipSuccessfulRequests: true,
});

app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

app.use(compression());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use((req: Request, _res: Response, next: NextFunction) => {
  req.headers['x-request-id'] =
    req.headers['x-request-id'] ||
    `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  next();
});

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Expense GST Backend API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

app.get('/api', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Expense GST API v1.0',
    documentation: '/api/docs',
    endpoints: {
      auth: '/api/auth',
      businesses: '/api/businesses',
      vendors: '/api/vendors',
      categories: '/api/categories',
      expenses: '/api/expenses',
      reports: '/api/reports',
      dashboard: '/api/dashboard',
    },
  });
});

app.use('/api', apiRoutes);

app.use((req: Request, res: Response) => {
  ApiResponse.notFound(res, `Route ${req.originalUrl} not found`);
});

app.use(
  (
    err: Error | AppError | ValidationError,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ Error:', err);
    }

    // Handle ValidationError with field-level errors
    if (err instanceof ValidationError) {
      return ApiResponse.badRequest(res, err.message, err.errors);
    }

    // Handle AppError (custom errors with status codes)
    if (err instanceof AppError) {
      return ApiResponse.error(
        res,
        err.message,
        err.statusCode,
        undefined,
        err.stack
      );
    }

    // Handle generic errors
    return ApiResponse.internalError(
      res,
      err.message || 'Internal server error',
      err.stack
    );
  }
);

export default app;
