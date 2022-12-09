import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { TypeSession } from '../entities/TypeSession';
import AppError from '../errors/AppError';

export default class TypeSessionSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const typeSessionRepository = dataSource.getRepository(TypeSession);

    const typeSessionData = [
      {
        name: 'segunda-feira',
        discount_percentage: 30,
      },
      {
        name: 'terça-feira',
        discount_percentage: 20,
      },
      {
        name: 'quarta-feira',
        discount_percentage: 30,
      },
      {
        name: 'quinta-feira',
        discount_percentage: 20,
      },
      {
        name: 'sexta-feira',
        discount_percentage: 10,
      },
      {
        name: 'sábado',
        discount_percentage: 0,
      },
      {
        name: 'domingo',
        discount_percentage: 0,
      },
    ];

    await Promise.all(
      typeSessionData.map(async (type_session: any) => {
        const { name, discount_percentage } = type_session;

        if (!name) {
          throw new AppError('This name is already exist', 400);
        }

        const newTypeSession = typeSessionRepository.create({
          name,
          discount_percentage,
        });
        await typeSessionRepository.save(newTypeSession);
      }),
    );
  }
}
