import { Request, Response } from 'express';
import { purchaseRepository } from '../repositories/purchaseRepository';
import { purchaseTicketRepository } from '../repositories/purchaseTicketRepository';

export class PurchaseTicketController {
  public async add(request: Request, response: Response): Promise<Response> {
    const { ticket_id, session_id } = request.body;

    try {
      const purchaseTicket = purchaseTicketRepository.create({
        ticket: ticket_id,
        session: session_id,
      } as any);

      await purchaseTicketRepository.save(purchaseTicket);

      return response.status(201).json(purchaseTicket);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params;

    const purchaseTicket = await purchaseTicketRepository.find({
      where: id,
      relations: ['ticket', 'session', 'purchase'],
    });

    if (!purchaseTicket) {
      return response.status(400).json({ error: 'purchase ticket not found' });
    }

    return response.json(purchaseTicket);
  }

  public async updateToPurchase(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { purchase_id } = request.body;
    const id = request.params;

    const purchaseTicket = await purchaseTicketRepository.findOneBy(id);
    const purchase = await purchaseRepository.findOneBy({ id: purchase_id });

    if (!purchaseTicket) {
      return response.status(400).json({ error: 'purchaseTicket not found' });
    }

    if (!purchase) {
      return response.status(400).json({ error: 'purchase not found' });
    }

    const purchaseTicketUpdated = {
      ...purchaseTicket,
      purchase: purchase_id,
    };

    await purchaseTicketRepository.save(purchaseTicketUpdated);

    return response.status(204).send();
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const id = request.params;
    const purchaseTicket = await purchaseTicketRepository.findOneBy(id);

    if (!purchaseTicket) {
      return response.status(400).json({ error: 'purchaseTicket not found' });
    }

    await purchaseTicketRepository.remove(purchaseTicket);

    return response.status(204).send();
  }
}
