import AppError from 'errors/AppError';
import { Request, Response } from 'express';
import { roomRepository } from '../repositories/roomRepository';

export class RoomController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { number, capacity } = request.body;

    const roomAlreadyExists = await roomRepository.findOneBy({ number });

    if (roomAlreadyExists) {
      throw new AppError('This room is already exist', 400);
    }

    const room = roomRepository.create({
      number,
      capacity,
    });

    await roomRepository.save(room);

    return response.status(201).json(room);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params;

    const room = await roomRepository.findOneBy(id);

    if (!room) {
      throw new AppError('room not found', 404);
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
      throw new AppError('room not found', 404);
    }

    const roomAlreadyExists = await roomRepository.findOneBy({ number });

    if (roomAlreadyExists && roomAlreadyExists.id !== room.id) {
      throw new AppError('This room is already registered', 400);
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
      throw new AppError('room not found', 404);
    }

    await roomRepository.remove(room);

    return response.status(204).send();
  }
}
