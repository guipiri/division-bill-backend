import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Division } from './division.entity';
import { Expense } from './expense.entity';
import { CreateExpenseDto, UpdateExpenseDto } from './expenses.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
    @InjectRepository(Division)
    private divisionRepository: Repository<Division>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto) {
    try {
      const { id: expenseId } =
        await this.expenseRepository.save(createExpenseDto);

      const divisions = createExpenseDto.expenseDivision.map(
        ({ amountBorrowed, userId }) => {
          return { ...new Division(), amountBorrowed, userId, expenseId };
        },
      );

      return await this.divisionRepository.save(divisions);
    } catch (error) {
      throw new BadRequestException(error.detail);
    }
  }

  findAll() {
    return this.expenseRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    console.log(updateExpenseDto);
    return `This action updates a #${id} expense`;
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
