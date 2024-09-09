import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DivisionUsersBelongsToExpenseGroupConstraint } from 'src/expenses/validators/division-users-belongs-to-expense-group.validator';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, DivisionUsersBelongsToExpenseGroupConstraint],
  exports: [UsersService],
})
export class UsersModule {}
