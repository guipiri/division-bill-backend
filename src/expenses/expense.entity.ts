import { ApiProperty } from '@nestjs/swagger';
import { Group } from 'src/groups/group.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Loan } from './loan.entity';

@Entity()
export class Expense {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @ManyToOne(() => User)
  paying_member: User;

  @ApiProperty()
  @ManyToMany(() => User)
  @JoinTable()
  members: User[];

  @ApiProperty()
  @OneToMany(() => Loan, (loan) => loan.expense)
  loan: Loan[];

  @ApiProperty()
  @ManyToOne(() => Group)
  group: Group;

  @ApiProperty()
  @Column('float')
  amount: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;
}
