import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Section } from './Section';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  number: number;

  @Column('text')
  capacity: number;

  @OneToMany(() => Section, section => section.room)
  sections: Section[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
