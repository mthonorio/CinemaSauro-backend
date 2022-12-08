import AppError from 'errors/AppError';
import { Request, Response } from 'express';
import { actorRepository } from '../repositories/actorRepository';

export class ActorController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const actorAlreadyExists = await actorRepository.findOneBy({ name });

    if (actorAlreadyExists) {
      throw new AppError('This actor is already exist', 404);
    }

    try {
      const actor = actorRepository.create({
        name,
      });

      await actorRepository.save(actor);

      return response.status(201).json(actor);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params;

    const actor = await actorRepository.findOneBy(id);

    if (!actor) {
      throw new AppError('actor not found', 404);
    }

    return response.json(actor);
  }

  public async showAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const actors = await actorRepository.find();

    return response.json(actors);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const id = request.params;

    const actor = await actorRepository.findOneBy(id);

    if (!actor) {
      throw new AppError('actor not found', 404);
    }

    const actorAlreadyExists = await actorRepository.findOneBy({ name });

    if (actorAlreadyExists && actorAlreadyExists.id !== actor.id) {
      return response
        .status(400)
        .json({ error: 'This actor is already registered' });
    }

    actor.name = name;

    await actorRepository.save(actor);

    return response.json(actor);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params;
    const actor = await actorRepository.findOneBy(id);

    if (!actor) {
      throw new AppError('actor not found', 404);
    }

    await actorRepository.remove(actor);

    return response.status(204).send();
  }
}
