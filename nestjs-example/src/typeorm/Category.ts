import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { User } from './User';

@Entity()
@Tree('closure-table')
export class Category {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @ManyToOne((type) => User, (user) => user.categories)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  name: string;

  @Column({
    nullable: true
  })
  description?: string;

  @TreeChildren()
  children: Category[];

  @TreeParent()
  parent: Category;

  @Column({ nullable: true })
  parentId: number;
}
