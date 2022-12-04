import { AppDataSource } from '../data-source';

import { Actor } from '../entities/Actor';

export const actorRepository = AppDataSource.getRepository(Actor);
