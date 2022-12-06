import { AppDataSource } from '../data-source';

import { PurchaseSnack } from '../entities/PurchaseSnack';

export const purchaseSnackRepository =
  AppDataSource.getRepository(PurchaseSnack);
