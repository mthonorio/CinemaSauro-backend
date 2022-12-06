import { Router } from 'express';

import { SnackController } from '../controllers/SnackController';

const snacksRouter = Router();

snacksRouter.post('/', new SnackController().create);
snacksRouter.get('/', new SnackController().showAll);
snacksRouter.get('/:id', new SnackController().show);
snacksRouter.put('/:id', new SnackController().update);
snacksRouter.delete('/:id', new SnackController().delete);

export default snacksRouter;
