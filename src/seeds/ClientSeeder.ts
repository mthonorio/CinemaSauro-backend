import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Client } from '../entities/Client';
import bcrypt from 'bcrypt';

export default class ClientSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const clientRepository = dataSource.getRepository(Client);

    const clientData = {
      name: 'Arthur Dionízio',
      cpf: '12341233251',
      email: 'dionizio@gmail.com',
      password: bcrypt.hashSync('123456', 10),
    };

    const clientExists = await clientRepository.findOneBy({
      email: clientData.email,
    });

    if (!clientExists) {
      const newClient = clientRepository.create(clientData);
      await clientRepository.save(newClient);
    }
  }
}
