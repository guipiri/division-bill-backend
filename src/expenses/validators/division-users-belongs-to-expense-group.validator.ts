import { BadRequestException, Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from 'src/users/users.service';
import { CreateDivisionDto, CreateExpenseDto } from '../expenses.dto';

@ValidatorConstraint({
  name: 'DivisionUsersBelongsToExpenseGroupConstraint',
  async: true,
})
@Injectable()
export class DivisionUsersBelongsToExpenseGroupConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly usersService: UsersService) {}

  async validate(
    value: CreateDivisionDto[],
    args?: ValidationArguments,
  ): Promise<boolean> {
    const { groupId } = args.object as CreateExpenseDto;
    const groupMembers = (await this.usersService.findByGroupId(groupId)).map(
      (user) => user.id,
    );

    const expenseMembers = value.map((user) => user.userId);

    const allExpenseMembersBelongsToGroup = expenseMembers.every(
      (expenseMember) => groupMembers.includes(expenseMember),
    );

    return allExpenseMembersBelongsToGroup;
  }
  defaultMessage?(): string {
    throw new BadRequestException(
      'Users in expenseDivision must belong to expense group.',
    );
  }
}

export function DivisionUsersBelongsToExpenseGroup(
  validationOptions?: ValidationOptions,
) {
  return function (object: CreateExpenseDto, propertyName: string) {
    registerDecorator({
      name: 'DivisionUsersBelongsToExpenseGroup',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: DivisionUsersBelongsToExpenseGroupConstraint,
    });
  };
}
