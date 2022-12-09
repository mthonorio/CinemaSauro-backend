import { Seeder, SeederFactoryManager, runSeeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import ClientSeeder from './ClientSeeder';
import TypeSessionSeeder from './TypeSessionSeeder';
import SnackSeeder from '../seeds/SnackSeeder';
import SessionAndRoomSeeder from '../seeds/SessionAndRoomSeeder';

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await runSeeder(dataSource, ClientSeeder);
    await runSeeder(dataSource, TypeSessionSeeder);
    await runSeeder(dataSource, SnackSeeder);
    await runSeeder(dataSource, SessionAndRoomSeeder);
  }
}
