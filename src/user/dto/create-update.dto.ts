import { IsNotEmpty, MaxLength } from 'class-validator';
export class CreateUpdateDto {
  @IsNotEmpty()
  @MaxLength(50)
  public name: string;
}
