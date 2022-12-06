import { AppDataSource } from '../data-source';

import { TypeSession } from '../entities/TypeSession';

export const typeSessionRepository = AppDataSource.getRepository(TypeSession);
