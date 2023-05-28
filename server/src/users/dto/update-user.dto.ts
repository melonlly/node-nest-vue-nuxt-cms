import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class UpdateUserDto {
  status: string;
  sex: string;
  nation: string;
  politics: string;
  card_type: string;
  base: string;
  base_phone: string;
  born: string;
  phone: string;
  address: string;
  postcode: string;
  email: string;
  updatedAt: Date;
}
