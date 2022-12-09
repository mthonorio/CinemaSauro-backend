import { Seeder, SeederFactoryManager, runSeeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import ClientSeeder from './ClientSeeder';
import TypeSessionSeeder from './TypeSessionSeeder';

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await runSeeder(dataSource, ClientSeeder);
    await runSeeder(dataSource, TypeSessionSeeder);
  }
}
