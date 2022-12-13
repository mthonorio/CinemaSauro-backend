import AppError from '../errors/AppError';
import { Request, Response } from 'express';
import { movieRepository } from '../repositories/movieRepository';
import { roomRepository } from '../repositories/roomRepository';
import { sessionRepository } from '../repositories/sessionRepository';

export class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { timetable, date_start, date_end } = request.body;
    const { room_id } = request.params;

    const session = sessionRepository.create({
      timetable,
      date_start,
      date_end,
      room: { id: room_id },
    });

    await sessionRepository.save(session);

    return response.status(201).json(session);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params;

    const session = await sessionRepository.find({
      where: id,
      relations: ['movie', 'ticket', 'room'],
    });

    if (!session) {
      throw new AppError('session not found', 404);
    }

    return response.json(session);
  }

  public async showAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const sessions = await sessionRepository.find({
      relations: ['movie', 'type_session', 'room'],
    });

    return response.json(sessions);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { timetable, date_start, date_end } = request.body;
    const id = request.params;

    const session = await sessionRepository.findOneBy(id);

    if (!session) {
      throw new AppError('session not found', 404);
    }

    const sessionUpdated = {
      ...session,
      timetable,
      date_start,
      date_end,
    };

    await sessionRepository.save(sessionUpdated);

    return response.status(204).send();
  }

  public async updateSessionRoom(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { room_id } = request.body;
    const id = request.params;

    const session = await sessionRepository.findOneBy(id);

    if (!session) {
      throw new AppError('session not found', 404);
    }

    const room = await roomRepository.findOneBy({ id: room_id });

    if (!room) {
      throw new AppError('room not found', 404);
    }

    const sessionUpdated = {
      ...session,
      room: room,
    };

    await sessionRepository.save(sessionUpdated);

    return response.status(204).send();
  }

  public async updateSessionMovie(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { movie_id } = request.body;
    const id = request.params;

    const session = await sessionRepository.findOneBy(id);

    if (!session) {
      throw new AppError('session not found', 404);
    }

    const movie = await movieRepository.findOneBy({ id: movie_id });

    if (!movie) {
      throw new AppError('movie not found', 404);
    }

    const sessionUpdated = {
      ...session,
      movie: movie,
    };

    await sessionRepository.save(sessionUpdated);

    return response.status(204).send();
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params;
    const session = await sessionRepository.findOneBy(id);

    if (!session) {
      throw new AppError('session not found', 404);
    }

    await sessionRepository.remove(session);

    return response.status(204).send();
  }
}
