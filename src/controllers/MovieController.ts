import { Request, Response } from 'express';
import { movieRepository } from '../repositories/movieRepository';

export class MovieController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      title,
      censorship,
      category,
      duration,
      production_company,
      isPremiere,
      isNational,
    } = request.body;

    const movieAlreadyExists = await movieRepository.findOneBy({ title });

    if (movieAlreadyExists) {
      return response
        .status(400)
        .json({ error: 'This movie is already exist' });
    }

    try {
      const movie = movieRepository.create({
        title,
        censorship,
        category,
        duration,
        production_company,
        isPremiere,
        isNational,
      });

      await movieRepository.save(movie);

      return response.status(201).json(movie);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params;

    const movie = await movieRepository.findOneBy(id);

    if (!movie) {
      return response.status(400).json({ error: 'movie not found' });
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
      isPremiere,
      isNational,
    } = request.body;
    const id = request.params;

    const movie = await movieRepository.findOneBy(id);

    if (!movie) {
      return response.status(400).json({ error: 'movie not found' });
    }

    const movieAlreadyExists = await movieRepository.findOneBy(title);

    if (movieAlreadyExists && movieAlreadyExists.id !== movie.id) {
      return response
        .status(400)
        .json({ error: 'This CPF movie is already registered' });
    }

    movie.title = title;
    movie.censorship = censorship;
    movie.category = category;
    movie.duration = duration;
    movie.production_company = production_company;
    movie.isPremiere = isPremiere;
    movie.isNational = isNational;

    await movieRepository.save(movie);

    return response.json(movie);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params;
    const movie = await movieRepository.findOneBy(id);

    if (!movie) {
      return response.status(400).json({ error: 'movie not found' });
    }

    await movieRepository.remove(movie);

    return response.status(204).send();
  }
}
