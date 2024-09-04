import { ApiProperty } from '@nestjs/swagger';
import { Loan } from 'src/expenses/loan.entity';
import { Group } from 'src/groups/group.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  name: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({ nullable: true })
  google_id: string;

  @OneToMany(() => Loan, (loan) => loan.member)
  loan: Loan[];

  @ApiProperty()
  @ManyToMany(() => Group, (group) => group.members)
  groups: Group[];

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;
}
