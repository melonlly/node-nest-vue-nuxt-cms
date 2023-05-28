import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from './exam.entity';
import { ExamController } from './exam.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Exam])],
  providers: [ExamService],
  exports: [ExamService],
  controllers: [ExamController],
})
export class ExamModule {}
