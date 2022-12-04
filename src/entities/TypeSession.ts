import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Session } from './Session';

@Entity('type_session')
export class TypeSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Session, session => session.room)
  sessions: Session[];

  @Column()
  name: string;

  @Column()
  discount_percentage: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
