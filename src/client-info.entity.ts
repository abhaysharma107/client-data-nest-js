import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClientInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;
}
