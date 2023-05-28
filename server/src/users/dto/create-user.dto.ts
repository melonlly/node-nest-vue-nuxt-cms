import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateUserDto {
  id: string;
  password: string;
  recruit_id: string;
  status: string;
  name: string;
  sex: string;
  nation: string;
  politics: string;
  card_type: string;
  card_no: string;
  base: string;
  base_phone: string;
  born: string;
  phone: string;
  address: string;
  postcode: string;
  email: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}
