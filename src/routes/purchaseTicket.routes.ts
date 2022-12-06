import { Router } from 'express';

import { PurchaseTicketController } from '../controllers/PurchaseTicketController';

const purchaseTicketsRouter = Router();

purchaseTicketsRouter.post('/', new PurchaseTicketController().add);
purchaseTicketsRouter.get('/:id', new PurchaseTicketController().show);
purchaseTicketsRouter.put(
  '/:id',
  new PurchaseTicketController().updateToPurchase,
);
purchaseTicketsRouter.delete('/:id', new PurchaseTicketController().remove);

export default purchaseTicketsRouter;
