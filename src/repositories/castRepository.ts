import { AppDataSource } from '../data-source';

import { Cast } from '../entities/Cast';

export const castRepository = AppDataSource.getRepository(Cast);
