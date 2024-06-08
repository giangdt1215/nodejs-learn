import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './Category';

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

  @OneToMany((type) => Category, (category) => category.user)
  categories: Category[];
}
