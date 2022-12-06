import { Router } from 'express';

import { TicketController } from '../controllers/TicketController';

const ticketsRouter = Router();

ticketsRouter.post('/:id', new TicketController().create);
ticketsRouter.get('/seats/:id', new TicketController().allSeats);
ticketsRouter.get('/', new TicketController().showAll);
ticketsRouter.get('/:id', new TicketController().show);
ticketsRouter.delete('/:id', new TicketController().delete);

export default ticketsRouter;
