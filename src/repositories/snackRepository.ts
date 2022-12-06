import { AppDataSource } from '../data-source';

import { Snack } from '../entities/Snack';

export const snackRepository = AppDataSource.getRepository(Snack);
