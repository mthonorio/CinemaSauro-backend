import { AppDataSource } from '../data-source';

import { Client } from '../entities/Client';

export const clientRepository = AppDataSource.getRepository(Client).extend({
  async findByCPF(cpf: string): Promise<Client | null> {
    const findClient = await this.findOne({
      where: { cpf },
    });

    return findClient || null;
  },
});
