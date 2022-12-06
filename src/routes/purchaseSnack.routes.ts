import { Router } from 'express';

import { PurchaseSnackController } from '../controllers/PurchaseSnackController';

const purchaseSnacksRouter = Router();

purchaseSnacksRouter.post('/', new PurchaseSnackController().add);
purchaseSnacksRouter.get('/:id', new PurchaseSnackController().show);
purchaseSnacksRouter.put('/:id', new PurchaseSnackController().sendToPurchase);
purchaseSnacksRouter.delete('/:id', new PurchaseSnackController().remove);

export default purchaseSnacksRouter;
