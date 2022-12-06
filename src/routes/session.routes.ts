import { Router } from 'express';

import { SessionController } from '../controllers/SessionController';

const sessionsRouter = Router();

sessionsRouter.post('/', new SessionController().create);
sessionsRouter.get('/', new SessionController().showAll);
sessionsRouter.get('/:id', new SessionController().show);
sessionsRouter.put('/:id', new SessionController().updateSessionRoom);
sessionsRouter.delete('/:id', new SessionController().delete);

export default sessionsRouter;
