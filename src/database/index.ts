import { AppDataSource } from '../data-source';
import express from 'express';

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());

  app.get('/', (req, res) => {
    return res.json({ message: 'OK' });
  });

  return app.listen(process.env.PORT);
});
