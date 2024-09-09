import { ApiProperty } from '@nestjs/swagger';
import { Division } from 'src/expenses/division.entity';
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

  @Column({ nullable: true, name: 'google_id' })
  googleId: string;

  @ApiProperty()
  @ManyToMany(() => Group, (group) => group.members)
  groups: Group[];

  @OneToMany(() => Division, (division) => division.user)
  expensesDivision?: Division[];

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt: Date;
}
