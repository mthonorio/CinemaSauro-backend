import { Router } from 'express';

import { ClientController } from '../controllers/ClientController';

const clientsRouter = Router();

clientsRouter.post('/', new ClientController().create);
clientsRouter.get('/', new ClientController().showAll);
clientsRouter.get('/:id', new ClientController().show);
clientsRouter.put('/:id', new ClientController().update);
clientsRouter.delete('/:id', new ClientController().delete);

export default clientsRouter;
