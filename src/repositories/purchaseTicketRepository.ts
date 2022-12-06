import { AppDataSource } from '../data-source';

import { PurchaseTicket } from '../entities/PurchaseTicket';

export const purchaseTicketRepository =
  AppDataSource.getRepository(PurchaseTicket);
