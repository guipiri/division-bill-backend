import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expense } from './expense.entity';

@Entity()
export class Loan {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.loan)
  member: User;

  @ApiProperty()
  @ManyToOne(() => Expense, (expense) => expense.loan)
  expense: Expense;

  @ApiProperty()
  @Column('float')
  amount_borrowed: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;
}
