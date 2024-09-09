import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expense } from './expense.entity';

@Entity({ name: 'expense_division' })
export class Division {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty()
  @Column('float', { name: 'amount_borrowed' })
  public amountBorrowed: number;

  @ApiProperty()
  @Column({ name: 'user_id' })
  public userId: string;

  @ManyToOne(() => User, (user) => user.expensesDivision)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  public user?: User;

  @ApiProperty()
  @Column({ name: 'expense_id' })
  public expenseId: string;

  @ManyToOne(() => Expense, (expense) => expense.division)
  @JoinColumn({ name: 'expense_id', referencedColumnName: 'id' })
  public expense?: Expense;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  public createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  public updatedAt: Date;
}
