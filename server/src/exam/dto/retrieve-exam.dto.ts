import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RetrieveExamDto {
  @ApiProperty()
  @IsString()
  id: string;
}
