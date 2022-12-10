import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import { ClientController } from '../controllers/ClientController';

const clientsRouter = Router();

clientsRouter.post('/', new ClientController().create);
clientsRouter.post('/login', new ClientController().login);
clientsRouter.get('/', new ClientController().showAll);
clientsRouter.get('/:id', new ClientController().show);

clientsRouter.use(ensureAuthenticated);

clientsRouter.put('/:id', new ClientController().update);
clientsRouter.delete('/:id', new ClientController().delete);

export default clientsRouter;
