import AppError from 'errors/AppError';
import { Request, Response } from 'express';
import { typeSessionRepository } from '../repositories/typeSessionRepository';

export class TypeSessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, discount_percentage } = request.body;

    const typeSessionAlreadyExists = await typeSessionRepository.findOneBy({
      name,
    });

    if (typeSessionAlreadyExists) {
      throw new AppError('type session already exists', 400);
    }

    const typeSession = typeSessionRepository.create({
      name,
      discount_percentage,
    });

    await typeSessionRepository.save(typeSession);

    return response.status(201).json(typeSession);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params;

    const typeSession = await typeSessionRepository.findOneBy(id);

    if (!typeSession) {
      throw new AppError('Type session not found', 404);
    }

    return response.json(typeSession);
  }

  public async showAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const typeSessions = await typeSessionRepository.find();

    return response.json(typeSessions);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params;
    const typeSession = await typeSessionRepository.findOneBy(id);

    if (!typeSession) {
      throw new AppError('Type session not found', 404);
    }

    await typeSessionRepository.remove(typeSession);

    return response.status(204).send();
  }
}
