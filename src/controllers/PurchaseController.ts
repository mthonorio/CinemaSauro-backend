import AppError from '../errors/AppError';
import { Request, Response } from 'express';
import { purchaseRepository } from '../repositories/purchaseRepository';

export class PurchaseController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { client_id, tickets, snacks, value_total } = request.body;

    const purchase = purchaseRepository.create({
      client_id: client_id,
      tickets: JSON.stringify(tickets),
      snacks: JSON.stringify(snacks),
      value_total: value_total,
    } as any);

    await purchaseRepository.save(purchase);

    const jsonPurchase = {
      ...purchase,
      tickets: tickets,
      snacks: snacks,
    };

    return response.status(201).json(jsonPurchase);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params;

    const purchase = await purchaseRepository.find({
      where: id,
    });

    if (!purchase) {
      throw new AppError('purchase not found', 404);
    }

    return response.json(purchase);
  }

  public async showAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const purchases = await purchaseRepository.find();

    return response.json(purchases);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params;
    const purchase = await purchaseRepository.findOneBy(id);

    if (!purchase) {
      throw new AppError('purchase not found', 404);
    }

    await purchaseRepository.remove(purchase);

    return response.status(204).send();
  }
}
