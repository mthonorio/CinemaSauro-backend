import AppError from 'errors/AppError';
import { Request, Response } from 'express';
import { snackRepository } from '../repositories/snackRepository';

export class SnackController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, value, quantity } = request.body;

    const snackAlreadyExists = await snackRepository.findOneBy({
      name,
    });

    if (snackAlreadyExists) {
      throw new AppError('snack already exists', 400);
    }

    const snack = snackRepository.create({
      name,
      value,
      quantity,
    });

    await snackRepository.save(snack);

    return response.status(201).json(snack);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, value, quantity } = request.body;
    const id = request.params;

    const snack = await snackRepository.findOneBy(id);

    if (!snack) {
      throw new AppError('Snack not found', 404);
    }

    const snackAlreadyExists = await snackRepository.findOneBy({ name });

    if (snackAlreadyExists && snackAlreadyExists.id !== snack.id) {
      throw new AppError('This snack is already registered', 400);
    }

    snack.name = name;
    snack.value = value;
    snack.quantity = quantity;

    await snackRepository.save(snack);

    return response.json(snack);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params;

    const snack = await snackRepository.findOneBy(id);

    if (!snack) {
      throw new AppError('snack not found', 404);
    }

    return response.json(snack);
  }

  public async showAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const snacks = await snackRepository.find();

    return response.json(snacks);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params;
    const snack = await snackRepository.findOneBy(id);

    if (!snack) {
      throw new AppError('snack not found', 404);
    }

    await snackRepository.remove(snack);

    return response.status(204).send();
  }
}
