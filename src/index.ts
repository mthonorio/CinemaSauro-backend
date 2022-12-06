import { AppDataSource } from './data-source';
import express from 'express';
import routes from './routes/index';
import cors from 'cors';

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(routes);

  return app.listen(process.env.PORT);
});
