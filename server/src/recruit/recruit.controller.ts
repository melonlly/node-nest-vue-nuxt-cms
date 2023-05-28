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
import { RetrieveRecruitDto } from './dto/retrieve-recruit.dto';
import { RecruitService } from './recruit.service';
import { Recruit } from './recruit.entity';
import { CreateRecruitDto } from './dto/create-recruit.dto';
import { RemoveRecruitDto } from './dto/remove-recruit.dto';
import { UpdateRecruitDto } from './dto/update-recruit.dto';
import { FindRecruitDto } from './dto/find-recruit.dto';

@ApiTags('培训计划')
@Controller('api/recruit')
export class RecruitController {
  constructor(private readonly recruitService: RecruitService) {}

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
  async create(@Body() createRecruitDto: CreateRecruitDto): Promise<Recruit> {
    return await this.recruitService.create(createRecruitDto);
  }

  // 删除
  @UseGuards(JwtAuthGuardUser)
  @Delete()
  @ApiOperation({ summary: '删除' })
  async remove(
    @Body() removeRecruitDto: RemoveRecruitDto,
    @Request() req,
  ): Promise<any> {
    Log({ req });
    return await this.recruitService.delete(removeRecruitDto);
  }

  // 更新
  @UseGuards(JwtAuthGuardUser)
  @Put(':id')
  @ApiOperation({ summary: '更新' })
  async update(
    @Param() params: RetrieveRecruitDto,
    @Body() updateRecruitDto: UpdateRecruitDto,
  ): Promise<any> {
    return await this.recruitService.update({
      id: params.id,
      updateRecruitDto,
    });
  }

  // 列表
  @UseGuards(JwtAuthGuardUser)
  @Get()
  @ApiOperation({ summary: '列表' })
  async findAll(@Query() query: FindRecruitDto): Promise<Recruit> {
    return await this.recruitService.findAll(query);
  }

  @UseGuards(JwtAuthGuardUser)
  @Get('list')
  @ApiOperation({ summary: '列表' })
  async findAllFE(@Query() query: FindRecruitDto): Promise<Recruit> {
    return await this.recruitService.findAll(query);
  }

  // 根据 id 查找
  @UseGuards(JwtAuthGuardUser)
  @Get(':id')
  @ApiOperation({ summary: '根据 id 查找' })
  async findOneById(@Param() params: RetrieveRecruitDto): Promise<any> {
    const recruit = await this.recruitService.findOneById(params.id);
    return recruit;
  }

  // 数量
  @UseGuards(JwtAuthGuardUser)
  @Get('list/count')
  @ApiOperation({ summary: '招生计划数量' })
  async getCount() {
    return await this.recruitService.getCount();
  }
}
