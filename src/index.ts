require('express-async-errors');
import { AppDataSource } from './data-source';
import express, { Request, Response, NextFunction } from 'express';
import routes from './routes/index';
import cors from 'cors';
import AppError from './errors/AppError';

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(routes);

  app.use(
    (err: Error, request: Request, response: Response, _: NextFunction) => {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
          status: 'error',
          message: err.message,
        });
      }

      // eslint-disable-next-line no-console
      console.error(err);

      return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    },
  );

  return app.listen(process.env.PORT);
});
