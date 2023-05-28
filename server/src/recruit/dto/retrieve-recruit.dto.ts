import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RetrieveRecruitDto {
  @ApiProperty()
  @IsString()
  id: string;
}
