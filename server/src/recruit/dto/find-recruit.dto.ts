import { ApiProperty } from '@nestjs/swagger';

export class FindRecruitDto {
  @ApiProperty({
    required: false,
  })
  keyword: string;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}
