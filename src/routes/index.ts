import { Router } from 'express';
import clientsRouter from './client.routes';

const routes = Router();

//routes.use('/appointments', appointmentsRouter);
routes.use('/clients', clientsRouter);
//routes.use('/sessions', sessionsRouter);

export default routes;
