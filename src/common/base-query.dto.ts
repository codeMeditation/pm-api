import { IsOptional, IsPositive, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class BaseQueryDto {
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsPositive()
  @IsInt()
  public page?: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsPositive()
  @IsInt()
  public count?: number;
}
