import { Router } from 'express';
import actorsRouter from './actor.routes';
import clientsRouter from './client.routes';
import moviesRouter from './movie.routes';
import roomsRouter from './room.routes';
import sessionsRouter from './session.routes';
import ticketsRouter from './ticket.routes';
import snacksRouter from './snack.routes';
import typeSessionsRouter from './typeSession.routes';

const routes = Router();

routes.use('/actors', actorsRouter);
routes.use('/clients', clientsRouter);
routes.use('/movies', moviesRouter);
routes.use('/rooms', roomsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/tickets', ticketsRouter);
routes.use('/typeSessions', typeSessionsRouter);
routes.use('/snacks', snacksRouter);

export default routes;
