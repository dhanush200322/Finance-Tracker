import { IsString, IsNotEmpty, IsNumber, IsDate, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInvestmentDto {
  @IsString()
  @IsNotEmpty()
  investmentName: string;

  @IsString()
  @IsNotEmpty()
  investmentType: string;

  @IsNumber()
  @Min(0)
  investedAmount: number;

  @IsNumber()
  @Min(0)
  currentValue: number;

  @Type(() => Date)
  @IsDate()
  purchaseDate: Date;
}
