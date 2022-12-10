import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import validateAndCreateTickets from '../middlewares/validateAndCreateTickets';
import { PurchaseController } from '../controllers/PurchaseController';

const purchasesRouter = Router();

purchasesRouter.use(ensureAuthenticated);

purchasesRouter.post(
  '/',
  validateAndCreateTickets,
  new PurchaseController().create,
);
purchasesRouter.get('/', new PurchaseController().showAll);
purchasesRouter.get('/:id', new PurchaseController().show);
purchasesRouter.delete('/:id', new PurchaseController().delete);

export default purchasesRouter;
