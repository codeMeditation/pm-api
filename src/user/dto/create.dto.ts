import { ArrayUnique, IsNotEmpty, IsUUID, MaxLength } from 'class-validator';
export class CreateDto {
  @IsNotEmpty()
  @MaxLength(50)
  public name: string;

  @ArrayUnique()
  @IsUUID('all', { each: true })
  public roleIds: string[];
}
