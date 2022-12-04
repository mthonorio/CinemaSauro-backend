import { Router } from 'express';

import { MovieController } from '../controllers/MovieController';

const moviesRouter = Router();

moviesRouter.post('/', new MovieController().create);
moviesRouter.post('/:id/create', new MovieController().createActor);
moviesRouter.get('/', new MovieController().showAll);
moviesRouter.get('/:id', new MovieController().show);
moviesRouter.put('/:id', new MovieController().update);
moviesRouter.delete('/:id', new MovieController().delete);

export default moviesRouter;
