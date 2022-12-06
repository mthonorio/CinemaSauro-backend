import { Request, Response } from 'express';
import { snackRepository } from '../repositories/snackRepository';

export class SnackController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price } = request.body;

    const snackAlreadyExists = await snackRepository.findOneBy({
      name,
    });

    if (snackAlreadyExists) {
      return response.status(400).json({ error: 'snack already exists' });
    }

    try {
      const snack = snackRepository.create({
        name,
        price,
      });

      await snackRepository.save(snack);

      return response.status(201).json(snack);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price } = request.body;
    const id = request.params;

    const snack = await snackRepository.findOneBy(id);

    if (!snack) {
      return response.status(400).json({ error: 'Snack not found' });
    }

    const snackAlreadyExists = await snackRepository.findOneBy({ name });

    if (snackAlreadyExists && snackAlreadyExists.id !== snack.id) {
      return response
        .status(400)
        .json({ error: 'This snack is already registered' });
    }

    snack.name = name;
    snack.price = price;

    await snackRepository.save(snack);

    return response.json(snack);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params;

    const snack = await snackRepository.findOneBy(id);

    if (!snack) {
      return response.status(400).json({ error: 'snack not found' });
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
      return response.status(400).json({ error: 'snack not found' });
    }

    await snackRepository.remove(snack);

    return response.status(204).send();
  }
}
