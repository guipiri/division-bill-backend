import { ApiProperty } from '@nestjs/swagger';
import { Expense } from 'src/expenses/expense.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

enum StatusList {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

@Entity()
export class Group {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  name: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: StatusList, default: StatusList.CLOSED })
  status: StatusList;

  @ApiProperty()
  @ManyToMany(() => User, (user) => user.groups, { cascade: true })
  @JoinTable({ name: 'group_members' })
  members: User[];

  @ApiProperty()
  @OneToMany(() => Expense, (expense) => expense.group)
  expenses: Expense[];

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt: Date;
}
