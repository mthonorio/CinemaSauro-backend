import { Router } from 'express';

import { TypeSessionController } from '../controllers/TypeSessionController';

const typeSessionsRouter = Router();

typeSessionsRouter.post('/', new TypeSessionController().create);
typeSessionsRouter.get('/', new TypeSessionController().showAll);
typeSessionsRouter.get('/:id', new TypeSessionController().show);
typeSessionsRouter.delete('/:id', new TypeSessionController().delete);

export default typeSessionsRouter;
