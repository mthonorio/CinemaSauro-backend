import { Router } from 'express';

import { MovieController } from '../controllers/MovieController';

const moviesRouter = Router();

moviesRouter.post('/', new MovieController().create);
moviesRouter.post('/:id/create', new MovieController().createActor);
moviesRouter.post('/:id/actor', new MovieController().addActorToMovie);
moviesRouter.get('/', new MovieController().showAll);
moviesRouter.get('/lists', new MovieController().listAllCast);
moviesRouter.get('/:id/show-cast', new MovieController().showCast);
moviesRouter.get('/:id', new MovieController().show);
moviesRouter.put('/:id', new MovieController().update);
moviesRouter.delete('/:id', new MovieController().delete);

export default moviesRouter;
