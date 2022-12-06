import { Router } from 'express';

import { PurchaseController } from '../controllers/PurchaseController';

const purchasesRouter = Router();

purchasesRouter.post('/', new PurchaseController().create);
purchasesRouter.get('/', new PurchaseController().showAll);
purchasesRouter.get('/:id', new PurchaseController().show);
purchasesRouter.delete('/:id', new PurchaseController().delete);

export default purchasesRouter;
