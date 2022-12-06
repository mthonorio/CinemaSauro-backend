import { Request, Response } from 'express';
import { roomRepository } from '../repositories/roomRepository';
import { sessionRepository } from '../repositories/sessionRepository';
import { ticketRepository } from '../repositories/ticketRepository';

export class TicketController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { seat, value, date_session, category } = request.body;
    const session_id = request.params;

    const session = await sessionRepository.findOneBy(session_id);
    const allTickets = await ticketRepository.find({
      where: { session: session_id },
    });

    if (!session) {
      return response.status(404).json({ error: 'session not found' });
    }

    if (session?.room?.capacity > allTickets.length) {
      return response.status(400).json({ error: 'This room is full' });
    }

    //if there is a ticket already with this seat, then the seat is not available
    for (let i = 0; i < allTickets.length; i++) {
      if (allTickets[i].seat === seat) {
        return response.status(400).json({ error: 'seat not available' });
      }
    }

    try {
      const ticket = ticketRepository.create({
        seat,
        value,
        date_session,
        category,
        session,
      });

      await ticketRepository.save(ticket);

      return response.status(201).json(ticket);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async allSeats(
    request: Request,
    response: Response,
  ): Promise<Response> {
    //return an array of objects with the seat and a boolean if the seat is available or not
    const session_id = request.params;

    const session = await sessionRepository.findOneBy(session_id);
    const room = await roomRepository.findOne({
      where: {
        id: session?.room?.id,
      },
    });
    const allTickets = await ticketRepository.find({
      where: { session: session_id },
    });

    if (!session) {
      return response.status(404).json({ error: 'session not found' });
    }

    const allSeats = [];

    //loop through all seats in the room and return an array of objects with the seat and a boolean if the seat is available or not
    for (let i = 0; i < room?.capacity!; i++) {
      let seat = i + 1;
      let available = true;

      for (let j = 0; j < allTickets.length; j++) {
        if (allTickets[j].seat === seat) {
          available = false;
        }
      }

      allSeats.push({ seat, available });
    }

    //if there is a ticket already with this seat, then variable the seat is not available
    // for (let i = 0; i < allTickets.length; i++) {
    //   allSeats.push({
    //     seat: allTickets[i].seat,
    //     available: false,
    //   });
    // }

    try {
      return response.status(201).send(allSeats);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params;

    const ticket = await ticketRepository.findOneBy(id);

    if (!ticket) {
      return response.status(400).json({ error: 'ticket not found' });
    }

    return response.json(ticket);
  }

  public async showAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const tickets = await ticketRepository.find({
      relations: ['session', 'session.movie', 'session.type_session'],
    });

    return response.json(tickets);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params;
    const ticket = await ticketRepository.findOneBy(id);

    if (!ticket) {
      return response.status(400).json({ error: 'ticket not found' });
    }

    await ticketRepository.remove(ticket);

    return response.status(204).send();
  }
}
