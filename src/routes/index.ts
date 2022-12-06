import { Router } from 'express';
import actorsRouter from './actor.routes';
import clientsRouter from './client.routes';
import moviesRouter from './movie.routes';
import roomsRouter from './room.routes';
import sessionsRouter from './session.routes';
import ticketsRouter from './ticket.routes';
import snacksRouter from './snack.routes';
import typeSessionsRouter from './typeSession.routes';
import purchasesRouter from './purchase.routes';
import purchaseTicketsRouter from './purchaseTicket.routes';
import purchaseSnacksRouter from './purchaseSnack.routes';

const routes = Router();

routes.use('/actors', actorsRouter);
routes.use('/clients', clientsRouter);
routes.use('/movies', moviesRouter);
routes.use('/purchases', purchasesRouter);
routes.use('/purchase-tickets', purchaseTicketsRouter);
routes.use('/purchase-snacks', purchaseSnacksRouter);
routes.use('/rooms', roomsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/snacks', snacksRouter);
routes.use('/tickets', ticketsRouter);
routes.use('/type-sessions', typeSessionsRouter);

export default routes;
