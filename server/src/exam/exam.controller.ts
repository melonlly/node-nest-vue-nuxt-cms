import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Delete,
  Put,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuardUser } from 'src/auth/guards/jwt-auth.guard';
import { Log } from 'src/libs/utils';
import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { Exam } from './exam.entity';
import { RemoveExamDto } from './dto/remove-exam.dto';
import { RetrieveExamDto } from './dto/retrieve-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { FindExamDto } from './dto/find-exam.dto';

@ApiTags('考试')
@Controller('api/exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  // 获取用户信息
  @UseGuards(JwtAuthGuardUser)
  @Get('profile')
  @ApiOperation({ summary: '用户信息' })
  getProfile(@Request() req) {
    return req.user;
  }

  // 增加
  @UseGuards(JwtAuthGuardUser)
  @Post()
  @ApiOperation({ summary: '增加' })
  async create(@Body() createExamDto: CreateExamDto): Promise<Exam> {
    return await this.examService.create(createExamDto);
  }

  // 删除
  @UseGuards(JwtAuthGuardUser)
  @Delete()
  @ApiOperation({ summary: '删除' })
  async remove(
    @Body() removeExamDto: RemoveExamDto,
    @Request() req,
  ): Promise<any> {
    Log({ req });
    return await this.examService.delete(removeExamDto);
  }

  // 更新
  @UseGuards(JwtAuthGuardUser)
  @Put(':id')
  @ApiOperation({ summary: '更新' })
  async update(
    @Param() params: RetrieveExamDto,
    @Body() updateExamDto: UpdateExamDto,
  ): Promise<any> {
    return await this.examService.update({
      id: params.id,
      updateExamDto,
    });
  }

  // 列表
  @UseGuards(JwtAuthGuardUser)
  @Get()
  @ApiOperation({ summary: '列表' })
  async findAll(@Query() query: FindExamDto): Promise<Exam> {
    return await this.examService.findAll(query);
  }

  @UseGuards(JwtAuthGuardUser)
  @Get('list')
  @ApiOperation({ summary: '列表' })
  async findAllFE(@Query() query: FindExamDto): Promise<Exam> {
    return await this.examService.findAll(query);
  }

  // 根据 id 查找
  @UseGuards(JwtAuthGuardUser)
  @Get(':id')
  @ApiOperation({ summary: '根据 id 查找' })
  async findOneById(@Param() params: RetrieveExamDto): Promise<any> {
    const Exam = await this.examService.findOneById(params.id);
    return Exam;
  }

  // 数量
  @UseGuards(JwtAuthGuardUser)
  @Get('list/count')
  @ApiOperation({ summary: '招生计划数量' })
  async getCount() {
    return await this.examService.getCount();
  }
}
