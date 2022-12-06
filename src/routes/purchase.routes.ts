import { Router } from 'express';

import { PurchaseController } from '../controllers/PurchaseController';
import validateAndCreateTickets from '../middlewares/validateAndCreateTickets';

const purchasesRouter = Router();

purchasesRouter.post(
  '/',
  validateAndCreateTickets,
  new PurchaseController().create,
);
purchasesRouter.get('/', new PurchaseController().showAll);
purchasesRouter.get('/:id', new PurchaseController().show);
purchasesRouter.delete('/:id', new PurchaseController().delete);

export default purchasesRouter;
