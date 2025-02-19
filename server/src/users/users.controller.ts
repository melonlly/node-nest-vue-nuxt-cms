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
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { RemoveUserDto } from './dto/remove-user.dto';
import { RetrieveUserDto } from './dto/retrieve-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdataUserPasswordDto } from './dto/update-user-password.dto';
import { UpdataUserAvatarDto } from './dto/update-user-avatar.dto';
import { JwtAuthGuardUser } from 'src/auth/guards/jwt-auth.guard';
import { Log } from 'src/libs/utils';
import { RecruitService } from 'src/recruit/recruit.service';
@ApiTags('用户')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly recruitService: RecruitService) {}

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
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  // 删除
  @UseGuards(JwtAuthGuardUser)
  @Delete()
  @ApiOperation({ summary: '删除' })
  async remove(
    @Body() removeUserDto: RemoveUserDto,
    @Request() req,
  ): Promise<any> {
    Log({ req });
    return await this.usersService.delete(removeUserDto);
  }

  // 更新
  @UseGuards(JwtAuthGuardUser)
  @Put(':id')
  @ApiOperation({ summary: '更新' })
  async update(
    @Param() params: RetrieveUserDto,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    return await this.usersService.update({
      id: params.id,
      updateUserDto,
    });
  }

  // 列表
  @UseGuards(JwtAuthGuardUser)
  @Get()
  @ApiOperation({ summary: '列表' })
  async findAll(@Query() query: FindUserDto): Promise<User> {
    return await this.usersService.findAll(query);
  }

  @UseGuards(JwtAuthGuardUser)
  @Get('list')
  @ApiOperation({ summary: '列表' })
  async findAllFE(@Query() query: FindUserDto): Promise<User> {
    return await this.usersService.findAll(query);
  }

  @UseGuards(JwtAuthGuardUser)
  @Get('all')
  @ApiOperation({ summary: '查询全部' })
  async findAllUsers(@Query() query: FindUserDto): Promise<User> {
    return await this.usersService.findAllUsers(query);
  }

  // 根据 id 查找
  @UseGuards(JwtAuthGuardUser)
  @Get(':id')
  @ApiOperation({ summary: '根据 id 查找' })
  async findOneById(@Param() params: RetrieveUserDto): Promise<any> {
    const user = await this.usersService.findOneById(params.id);
    delete user.password;
    return user;
  }

  // 根据 card_no 查找
  @UseGuards(JwtAuthGuardUser)
  @Post('/find')
  @ApiOperation({ summary: '根据 card_no 查找' })
  async findOneByCardNo(@Body() params: RetrieveUserDto): Promise<any> {
    console.log(params);

    const user = await this.usersService.findOneByCardNo(params.name);
    delete user.password;
    const recruit = await this.recruitService.findOneById(user.recruit_id);
    return {
      ...user,
      period: recruit.period,
      plan: recruit.plan
    };
  }

  // 根据 id 更新密码
  @UseGuards(JwtAuthGuardUser)
  @Put('password/:id')
  @ApiOperation({ summary: '更新密码' })
  async updatePassword(
    @Param() params: RetrieveUserDto,
    @Body() updataUserPasswordDto: UpdataUserPasswordDto,
  ): Promise<any> {
    return await this.usersService.updatePassword({
      id: params.id,
      body: updataUserPasswordDto,
    });
  }

  // 根据 id 重置密码
  @UseGuards(JwtAuthGuardUser)
  @Put('password/reset/:id')
  @ApiOperation({ summary: '重置密码' })
  async resetPassword(@Param() params: RetrieveUserDto): Promise<any> {
    return await this.usersService.resetPassword(params);
  }

  // 根据 id 设置头像
  @UseGuards(JwtAuthGuardUser)
  @Put('avatar/:id')
  @ApiOperation({ summary: '设置头像' })
  async updateAvatar(
    @Param() params: RetrieveUserDto,
    @Body() updateUserAvatar: UpdataUserAvatarDto,
  ): Promise<any> {
    return await this.usersService.updateAvatar({
      id: params.id,
      updateUserAvatar,
    });
  }

  // 数量
  @UseGuards(JwtAuthGuardUser)
  @Get('list/count')
  @ApiOperation({ summary: '用户数量' })
  async getCount() {
    return await this.usersService.getCount();
  }
}
