import { AppDataSource } from '../data-source';

import { Ticket } from '../entities/Ticket';

export const ticketRepository = AppDataSource.getRepository(Ticket);
