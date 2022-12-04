import { Router } from 'express';
import clientsRouter from './client.routes';
import moviesRouter from './movie.routes';

const routes = Router();

//routes.use('/appointments', appointmentsRouter);
routes.use('/clients', clientsRouter);
routes.use('/movies', moviesRouter);

export default routes;
