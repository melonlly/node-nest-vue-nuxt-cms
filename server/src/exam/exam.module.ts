import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from './exam.entity';
import { ExamController } from './exam.controller';
import { User } from 'src/users/users.entity';
import { Recruit } from 'src/recruit/recruit.entity';
import { RecruitService } from 'src/recruit/recruit.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Exam, User, Recruit])],
  providers: [ExamService, RecruitService, UsersService],
  exports: [ExamService],
  controllers: [ExamController],
})
export class ExamModule {}
