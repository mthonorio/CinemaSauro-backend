import { Request, Response } from 'express';
import { roomRepository } from '../repositories/roomRepository';

export class RoomController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { number, capacity } = request.body;

    const roomAlreadyExists = await roomRepository.findOneBy({ number });

    if (roomAlreadyExists) {
      return response.status(400).json({ error: 'This room is already exist' });
    }

    try {
      const room = roomRepository.create({
        number,
        capacity,
      });

      await roomRepository.save(room);

      return response.status(201).json(room);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params;

    const room = await roomRepository.findOneBy(id);

    if (!room) {
      return response.status(400).json({ error: 'room not found' });
    }

    return response.json(room);
  }

  public async showAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const rooms = await roomRepository.find();

    return response.json(rooms);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { number, capacity } = request.body;
    const id = request.params;

    const room = await roomRepository.findOneBy(id);

    if (!room) {
      return response.status(400).json({ error: 'room not found' });
    }

    const roomAlreadyExists = await roomRepository.findOneBy({ number });

    if (roomAlreadyExists && roomAlreadyExists.id !== room.id) {
      return response
        .status(400)
        .json({ error: 'This room is already registered' });
    }

    room.number = number;
    room.capacity = capacity;

    await roomRepository.save(room);

    return response.json(room);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params;
    const room = await roomRepository.findOneBy(id);

    if (!room) {
      return response.status(400).json({ error: 'room not found' });
    }

    await roomRepository.remove(room);

    return response.status(204).send();
  }
}
