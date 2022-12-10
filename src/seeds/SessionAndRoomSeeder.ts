import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Room } from '../entities/Room';
import { Session } from '../entities/Session';
import bcrypt from 'bcrypt';

export default class SessionAndRoomSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const roomRepository = dataSource.getRepository(Room);
    const sessionRepository = dataSource.getRepository(Session);

    // Rooms will be created with sessions
    const roomData = [
      {
        number: 5,
        capacity: 80,
      },
      {
        number: 6,
        capacity: 80,
      },
    ];

    for (const room of roomData) {
      const roomExists = await roomRepository.findOneBy({
        number: room.number,
      });

      if (!roomExists) {
        const newRoom = roomRepository.create(room);
        await roomRepository.save(newRoom);

        const sessionData = {
          timetable: '14:00:00',
          date_start: '2020-12-25',
          date_end: '2020-12-31',
          room: { id: newRoom.id },
        };

        const newSession = sessionRepository.create(sessionData);
        await sessionRepository.save(newSession);
      }
    }
  }
}
