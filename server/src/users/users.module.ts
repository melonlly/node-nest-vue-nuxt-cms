import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UsersController } from './users.controller';
import { RecruitModule } from 'src/recruit/recruit.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RecruitModule],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
})
export class UsersModule {}
