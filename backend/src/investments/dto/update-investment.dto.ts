import { IsString, IsOptional, IsNumber, IsDate, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateInvestmentDto {
  @IsString()
  @IsOptional()
  investmentName?: string;

  @IsString()
  @IsOptional()
  investmentType?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  investedAmount?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  currentValue?: number;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  purchaseDate?: Date;
}
