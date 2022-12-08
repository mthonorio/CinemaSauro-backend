import { Router } from 'express';

import { MovieController } from '../controllers/MovieController';

const moviesRouter = Router();

moviesRouter.post('/', new MovieController().create);
moviesRouter.post('/:id/create', new MovieController().createActorAndAddCast);
moviesRouter.post('/:id/actor', new MovieController().addActorToMovie);
moviesRouter.post(
  '/:id/description',
  new MovieController().addMovieDescription,
);
moviesRouter.get('/', new MovieController().showAll);
moviesRouter.get('/lists', new MovieController().listAllCast);
moviesRouter.get('/:id/cast', new MovieController().listMovieCast);
moviesRouter.get('/:id', new MovieController().show);
moviesRouter.put('/:id', new MovieController().update);
moviesRouter.delete('/:id', new MovieController().delete);

export default moviesRouter;
