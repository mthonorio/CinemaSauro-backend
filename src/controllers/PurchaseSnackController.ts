import { Request, Response } from 'express';
import { purchaseRepository } from '../repositories/purchaseRepository';
import { purchaseSnackRepository } from '../repositories/purchaseSnackRepository';

export class PurchaseSnackController {
  public async add(request: Request, response: Response): Promise<Response> {
    const { snack_id } = request.body;

    try {
      const purchaseSnack = purchaseSnackRepository.create({
        snack: snack_id,
      } as any);

      await purchaseSnackRepository.save(purchaseSnack);

      return response.status(201).json(purchaseSnack);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params;

    const purchaseSnack = await purchaseSnackRepository.find({
      where: id,
      relations: ['snack', 'purchase'],
    });

    if (!purchaseSnack) {
      return response.status(400).json({ error: 'purchase ticket not found' });
    }

    return response.json(purchaseSnack);
  }

  public async sendToPurchase(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { purchase_id } = request.body;
    const id = request.params;

    const purchaseSnack = await purchaseSnackRepository.findOneBy(id);
    const purchase = await purchaseRepository.findOneBy({ id: purchase_id });

    if (!purchaseSnack) {
      return response.status(400).json({ error: 'purchase snack not found' });
    }

    if (!purchase) {
      return response.status(400).json({ error: 'purchase not found' });
    }

    const purchaseSnackUpdated = {
      ...purchaseSnack,
      purchase: purchase_id,
    };

    await purchaseSnackRepository.save(purchaseSnackUpdated);

    return response.status(204).send();
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const id = request.params;
    const purchaseSnack = await purchaseSnackRepository.findOneBy(id);

    if (!purchaseSnack) {
      return response.status(400).json({ error: 'purchaseSnack not found' });
    }

    await purchaseSnackRepository.remove(purchaseSnack);

    return response.status(204).send();
  }
}
