import { AppDataSource } from '../data-source';

import { Purchase } from '../entities/Purchase';

export const purchaseRepository = AppDataSource.getRepository(Purchase);
