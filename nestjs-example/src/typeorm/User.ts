import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  id: number;

  @Column()
  username: string;

  @Column({
    name: 'email_address',
    nullable: false,
  })
  emailAddress: string;

  @Column()
  password: string;
}
