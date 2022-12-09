import { Request, Response } from 'express';
import { movieRepository } from '../repositories/movieRepository';
import { actorRepository } from '../repositories/actorRepository';
import AppError from '../errors/AppError';

export class MovieController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      title,
      description,
      censorship,
      category,
      duration,
      production_company,
      imageUrl,
      isPremiere,
      isNational,
    } = request.body;

    const movieAlreadyExists = await movieRepository.findOneBy({ title });

    if (movieAlreadyExists) {
      throw new AppError('This movie is already exist', 404);
    }
    const movie = movieRepository.create({
      title,
      description,
      censorship,
      category,
      duration,
      production_company,
      imageUrl,
      isPremiere,
      isNational,
    });

    await movieRepository.save(movie);

    return response.status(201).json(movie);
  }

  public async addMovieDescription(request: Request, response: Response) {
    const { description } = request.body;
    const id = request.params;
    const movie = await movieRepository.findOneBy(id);

    if (!movie) {
      throw new AppError('movie not found', 404);
    }

    const movieUpdated = {
      ...movie,
      description,
    };

    await movieRepository.save(movieUpdated);

    return response.status(204).send();
  }

  public async createActorAndAddCast(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name } = request.body;
    const id = request.params;

    const movie = await movieRepository.findOneBy(id);

    if (!movie) {
      throw new AppError('movie not found', 404);
    }

    const actor = actorRepository.create({
      name,
      movies: [movie],
    });

    await actorRepository.save(actor);

    return response.status(201).json(actor);
  }

  public async addActorToMovie(request: Request, response: Response) {
    const { actor_id } = request.body;
    const id = request.params;
    const movie = await movieRepository.findOneBy(id);

    if (!movie) {
      throw new AppError('movie not found', 404);
    }

    const actor = await actorRepository.findOneBy({ id: actor_id });

    if (!actor) {
      throw new AppError('actor not found', 404);
    }

    const movieUpdated = {
      ...movie,
      actors: [actor],
    };

    await movieRepository.save(movieUpdated);

    return response.status(204).send();
  }

  public async listAllCast(request: Request, response: Response) {
    const movies = await movieRepository.find({
      relations: {
        actors: true,
      },
    });

    return response.json(movies);
  }

  public async listMovieCast(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const id = request.params;

    const movie = await movieRepository.find({
      where: id,
      relations: ['actors'],
    });

    if (!movie) {
      throw new AppError('movie not found', 404);
    }

    return response.json(movie);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params;

    const movie = await movieRepository.findOneBy(id);

    if (!movie) {
      throw new AppError('movie not found', 404);
    }

    return response.json(movie);
  }

  public async showAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const movies = await movieRepository.find();

    return response.json(movies);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      title,
      censorship,
      category,
      duration,
      production_company,
      imageUrl,
      isPremiere,
      isNational,
    } = request.body;
    const id = request.params;

    const movie = await movieRepository.findOneBy(id);

    if (!movie) {
      throw new AppError('movie not found', 404);
    }

    const movieAlreadyExists = await movieRepository.findOneBy({ title });

    if (movieAlreadyExists && movieAlreadyExists.id !== movie.id) {
      throw new AppError('This CPF movie is already registered', 404);
    }

    movie.title = title;
    movie.censorship = censorship;
    movie.category = category;
    movie.duration = duration;
    movie.production_company = production_company;
    movie.imageUrl = imageUrl;
    movie.isPremiere = isPremiere;
    movie.isNational = isNational;

    await movieRepository.save(movie);

    return response.json(movie);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params;
    const movie = await movieRepository.findOneBy(id);

    if (!movie) {
      throw new AppError('movie not found', 404);
    }

    await movieRepository.remove(movie);

    return response.status(204).send();
  }
}
