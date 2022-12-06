import { Request, Response } from 'express';
import { purchaseRepository } from '../repositories/purchaseRepository';

export class PurchaseController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { client_id } = request.body;

    try {
      const purchase = purchaseRepository.create({
        id_client: 10000,
        value_ticket: 0,
        value_discount_ticket: 0,
        value_total_ticket: 0,
        value_snack: 0,
        value_total_snack: 0,
        value_total_purchase: 0,
        client_id,
      } as any);

      await purchaseRepository.save(purchase);

      return response.status(201).json(purchase);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params;

    const purchase = await purchaseRepository.find({
      where: id,
      relations: ['client', 'purchaseSnack', 'purchaseTicket'],
    });

    if (!purchase) {
      return response.status(400).json({ error: 'purchase not found' });
    }

    return response.json(purchase);
  }

  public async showAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const purchases = await purchaseRepository.find({
      relations: ['client', 'purchaseSnack.snack', 'purchaseTicket.ticket'],
    });

    return response.json(purchases);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params;
    const purchase = await purchaseRepository.findOneBy(id);

    if (!purchase) {
      return response.status(400).json({ error: 'purchase not found' });
    }

    await purchaseRepository.remove(purchase);

    return response.status(204).send();
  }
}
