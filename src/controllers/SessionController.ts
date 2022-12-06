import { Request, Response } from 'express';
import { movieRepository } from '../repositories/movieRepository';
import { roomRepository } from '../repositories/roomRepository';
import { sessionRepository } from '../repositories/sessionRepository';

export class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { timetable, date_start, date_end } = request.body;
    const { room_id } = request.params;

    try {
      const session = sessionRepository.create({
        timetable,
        date_start,
        date_end,
        room: { id: room_id },
      });

      await sessionRepository.save(session);

      return response.status(201).json(session);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params;

    const session = await sessionRepository.find({
      where: id,
      relations: ['movie', 'ticket', 'room'],
    });

    if (!session) {
      return response.status(400).json({ error: 'session not found' });
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

  public async updateSessionRoom(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { room_id } = request.body;
    const id = request.params;

    try {
      const session = await sessionRepository.findOneBy(id);

      if (!session) {
        return response.status(400).json({ error: 'session not found' });
      }

      const room = await roomRepository.findOneBy({ id: room_id });

      if (!room) {
        return response.status(404).json({ error: 'room not found' });
      }

      const sessionUpdated = {
        ...session,
        room: room,
      };

      await sessionRepository.save(sessionUpdated);

      return response.status(204).send();
    } catch (err) {
      console.log(err);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async updateSessionMovie(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { movie_id } = request.body;
    const id = request.params;

    try {
      const session = await sessionRepository.findOneBy(id);

      if (!session) {
        return response.status(400).json({ error: 'session not found' });
      }

      const movie = await movieRepository.findOneBy({ id: movie_id });

      if (!movie) {
        return response.status(404).json({ error: 'movie not found' });
      }

      const sessionUpdated = {
        ...session,
        movie: movie,
      };

      await sessionRepository.save(sessionUpdated);

      return response.status(204).send();
    } catch (err) {
      console.log(err);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params;
    const session = await sessionRepository.findOneBy(id);

    if (!session) {
      return response.status(400).json({ error: 'session not found' });
    }

    await sessionRepository.remove(session);

    return response.status(204).send();
  }
}
