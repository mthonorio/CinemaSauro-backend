import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cast } from './Cast';
import { Section } from './Section';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  // Foreign Key
  @OneToMany(() => Cast, cast => cast.movie)
  cast: Cast[];

  @OneToMany(() => Section, section => section.room)
  sections: Section[];

  @Column()
  title: string;

  @Column()
  censorship: string;

  @Column()
  category: string;

  @Column()
  duration: string;

  @Column()
  production_company: string;

  @Column()
  isPremiere: boolean;

  @Column()
  isNational: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
