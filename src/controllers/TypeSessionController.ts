import { Request, Response } from 'express';
import { typeSessionRepository } from '../repositories/typeSessionRepository';

export class TypeSessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, discount_percentage } = request.body;

    const typeSessionAlreadyExists = await typeSessionRepository.findOneBy({
      name,
    });

    if (typeSessionAlreadyExists) {
      return response
        .status(400)
        .json({ error: 'type session already exists' });
    }

    try {
      const typeSession = typeSessionRepository.create({
        name,
        discount_percentage,
      });

      await typeSessionRepository.save(typeSession);

      return response.status(201).json(typeSession);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params;

    const typeSession = await typeSessionRepository.findOneBy(id);

    if (!typeSession) {
      return response.status(400).json({ error: 'typeSession not found' });
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
      return response.status(400).json({ error: 'typeSession not found' });
    }

    await typeSessionRepository.remove(typeSession);

    return response.status(204).send();
  }
}
