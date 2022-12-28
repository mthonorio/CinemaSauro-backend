import { Request, Response, NextFunction } from 'express';
import { roomRepository } from '../repositories/roomRepository';
import { sessionRepository } from '../repositories/sessionRepository';
import { ticketRepository } from '../repositories/ticketRepository';
import { Ticket } from '../entities/Ticket';
import AppError from '../errors/AppError';

export default async function validateAndCreateTickets(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> {
  const { tickets } = request.body;

  if (!tickets) {
    throw new AppError('tickets not found', 404);
  }

  const ticketsArray = await Promise.all(
    tickets.map(async (ticket: any) => {
      const { session_id, session_hour, seat, value, date_session, category } =
        ticket;

      if (!session_id) {
        throw new AppError('session_id not found', 404);
      }

      const session = await sessionRepository.findOneBy({
        id: session_id,
      });

      if (!session) {
        throw new AppError('session not found', 404);
      }

      const hours = session.timetable
        .split(',')
        .map((time: string) => time.trim());

      if (!hours.includes(session_hour)) {
        throw new AppError('session hour incorrect', 404);
      }

      const allTickets = await ticketRepository.findBy({
        session_id: session_id,
      });

      //if there is a ticket already with this seat, then the seat is not available
      for (let i = 0; i < allTickets.length; i++) {
        if (allTickets[i].session_hour !== session_hour) continue;
        if (allTickets[i].seat === seat) {
          throw new AppError(`seat ${seat} not available`, 400);
        }
      }

      try {
        const newTicket = ticketRepository.create({
          seat,
          session_hour,
          value,
          date_session,
          category,
          session_id: session_id,
        });
        await ticketRepository.save(newTicket);

        return {
          id: newTicket.id,
          value: newTicket.value,
        };
      } catch (err) {
        throw new AppError('Internal server error', 401);
      }
    }),
  );

  request.body.tickets = ticketsArray;

  next();
}
