import { IsNotEmpty, IsString } from 'class-validator';
import { CreateDto } from './create.dto';

export class UpdateDto extends CreateDto {
  @IsNotEmpty()
  @IsString()
  public id: string;
}
