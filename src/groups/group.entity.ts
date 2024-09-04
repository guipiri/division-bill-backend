import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
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
  @ManyToMany(() => User, (user) => user.groups, { cascade: true })
  @JoinTable()
  members: User[];

  @ApiProperty()
  @Column({ type: 'enum', enum: StatusList, default: StatusList.CLOSED })
  status: StatusList;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;
}
