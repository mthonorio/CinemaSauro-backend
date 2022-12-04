import { Router } from 'express';

import { RoomController } from '../controllers/RoomController';

const roomsRouter = Router();

roomsRouter.post('/', new RoomController().create);
roomsRouter.get('/', new RoomController().showAll);
roomsRouter.get('/:id', new RoomController().show);
roomsRouter.put('/:id', new RoomController().update);
roomsRouter.delete('/:id', new RoomController().delete);

export default roomsRouter;
