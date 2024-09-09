import { ApiProperty } from '@nestjs/swagger';
import { Group } from 'src/groups/group.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Division } from './division.entity';

@Entity()
export class Expense {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column('float')
  amount: number;

  @Column({ name: 'paying_member_id' })
  payingMemberId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'paying_member_id' })
  payingMember: User;

  @ApiProperty()
  @Column({ name: 'group_id' })
  groupId: string;

  @ManyToOne(() => Group, (group) => group.expenses)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @OneToMany(() => Division, (division) => division.expense)
  division?: Division[];

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt: Date;
}
