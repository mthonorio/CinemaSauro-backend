import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  clientId: number;

  @Column()
  buyId: number;

  @Column()
  movieId: number;

  @Column()
  sectionId: number;

  @Column()
  seatId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
