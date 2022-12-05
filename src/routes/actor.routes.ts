import { Router } from 'express';

import { ActorController } from '../controllers/ActorController';

const actorsRouter = Router();

actorsRouter.post('/', new ActorController().create);
actorsRouter.get('/', new ActorController().showAll);
actorsRouter.get('/:id', new ActorController().show);
actorsRouter.put('/:id', new ActorController().update);
actorsRouter.delete('/:id', new ActorController().delete);

export default actorsRouter;
