import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, IsUUID, ValidateNested } from 'class-validator';
import { DivisionSumEqualToExpenseAmount } from './division.validator';

export class CreateDivisionDto {
  @ApiProperty()
  @IsUUID()
  userId: string;

  @IsNumber()
  amountBorrowed: number;
}

export class CreateExpenseDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsUUID()
  payingMemberId: string;

  @ApiProperty()
  @DivisionSumEqualToExpenseAmount()
  @ValidateNested({ each: true })
  @Type(() => CreateDivisionDto)
  expenseDivision: CreateDivisionDto[];

  @ApiProperty()
  @IsUUID()
  groupId: string;

  @ApiProperty()
  @IsNumber()
  amount: number;
}

export class UpdateExpenseDto {}
