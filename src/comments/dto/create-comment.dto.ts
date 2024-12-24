import { IsNotEmpty, IsString } from 'class-validator';
import { IsNull } from 'typeorm';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  // @IsString()
  // @IsNull()
  parentId: null | string;
}
