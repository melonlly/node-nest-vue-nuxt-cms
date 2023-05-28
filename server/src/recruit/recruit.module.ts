import { Module } from '@nestjs/common';
import { RecruitService } from './recruit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recruit } from './recruit.entity';
import { RecruitController } from './recruit.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Recruit])],
  providers: [RecruitService],
  exports: [RecruitService],
  controllers: [RecruitController],
})
export class RecruitModule {}
