import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Snack } from '../entities/Snack';
import AppError from '../errors/AppError';

export default class SnackSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const snackRepository = dataSource.getRepository(Snack);

    const snackData = [
      {
        name: 'pipoca',
        value: 15,
      },
      {
        name: 'refrigerante',
        value: 10,
      },
      {
        name: 'chocolate',
        value: 8,
      },
      {
        name: 'Combo: pipoca + refrigerante',
        value: 20,
      },
      {
        name: 'Combo: mini hambúrguer',
        value: 40,
      },
      {
        name: 'Combo: salgadinho + refrigerante',
        value: 35,
      },
      {
        name: 'Combo: sanduíche de pernil + refrigerante',
        value: 60,
      },
    ];

    await Promise.all(
      snackData.map(async (snack: any) => {
        const { name, value } = snack;

        const snackExists = await snackRepository.findOneBy({
          name: name,
        });

        if (!snackExists) {
          const newSnack = snackRepository.create({
            name,
            value,
          });
          await snackRepository.save(newSnack);
        }
      }),
    );
  }
}
