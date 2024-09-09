import { BadRequestException } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CreateDivisionDto, CreateExpenseDto } from './expenses.dto';

@ValidatorConstraint({ name: 'DivisionSumEqualToExpense' })
export class DivisionSumEqualToExpenseAmountConstrait
  implements ValidatorConstraintInterface
{
  validate(value: CreateDivisionDto[], args?: ValidationArguments): boolean {
    const expenseAmount = (args.object as CreateExpenseDto).amount;
    const divisionSum = value.reduce(
      (prev, curr) => prev + curr.amountBorrowed,
      0,
    );

    return expenseAmount === divisionSum;
  }
  defaultMessage?(): string {
    throw new BadRequestException(
      'Sum of division values needs to be equal to expense amount',
    );
  }
}

export function DivisionSumEqualToExpenseAmount(
  validationOptions?: ValidationOptions,
) {
  return function (object: CreateExpenseDto, propertyName: string) {
    registerDecorator({
      name: 'divisionSumEqualToExpenseAmount',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: DivisionSumEqualToExpenseAmountConstrait,
    });
  };
}
