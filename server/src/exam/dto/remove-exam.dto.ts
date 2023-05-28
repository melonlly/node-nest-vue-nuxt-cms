import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RemoveExamDto {
  @ApiProperty()
  @IsArray()
  ids: [];
}
