import AppError from 'errors/AppError';
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
      throw new AppError('session not found', 404);
    }

    if (session?.room?.capacity > allTickets.length) {
      throw new AppError('This room is full', 404);
    }

    //if there is a ticket already with this seat, then the seat is not available
    for (let i = 0; i < allTickets.length; i++) {
      if (allTickets[i].seat === seat) {
        throw new AppError('seat not available', 404);
      }
    }

    const ticket = ticketRepository.create({
      seat,
      value,
      date_session,
      category,
      session,
    });

    await ticketRepository.save(ticket);

    return response.status(201).json(ticket);
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
      throw new AppError('session not found', 404);
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

    return response.status(201).send(allSeats);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params;

    const ticket = await ticketRepository.findOneBy(id);

    if (!ticket) {
      throw new AppError('ticket not found', 404);
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
      throw new AppError('ticket not found', 404);
    }

    await ticketRepository.remove(ticket);

    return response.status(204).send();
  }
}
