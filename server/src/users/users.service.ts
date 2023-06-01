import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Raw, In } from 'typeorm';
import { cryptoString } from '../libs/lib';
import * as generator from 'generate-password';
import { RemoveUserDto } from './dto/remove-user.dto';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // 增加
  async create(createUserDto: CreateUserDto): Promise<any> {
    const { name, password, card_no, avatar, createdAt } = createUserDto;
    createUserDto.password = !password
      ? cryptoString(card_no)
      : cryptoString(password); // 默认证件号为初始密码
    createUserDto.createdAt = createdAt || new Date();
    createUserDto.updatedAt = new Date();

    // 重命名 avatar，默认名称：学生姓名-证件号
    createUserDto.avatar = this.renameFile(
      avatar,
      `${name}-${card_no}.${path.extname(avatar)}`,
    );
    console.log(createUserDto.avatar);

    delete createUserDto.id;

    const isExist = await this.usersRepository.count({
      where: {
        name,
      },
    });
    if (isExist > 0) {
      return {
        statusCode: 202,
        message: '已存在',
      };
    }

    return await this.usersRepository.save(createUserDto);
  }

  // 删除
  async delete(removeUserDto: RemoveUserDto): Promise<any> {
    const { ids } = removeUserDto;

    return this.usersRepository.delete(ids);
  }

  // 更新
  async update(updateUserData): Promise<any> {
    const { id, updateUserDto } = updateUserData;
    updateUserDto.updatedAt = new Date();

    // 重命名 avatar，默认名称：学生姓名-证件号
    updateUserDto.avatar = this.renameFile(
      updateUserDto.avatar,
      `${updateUserDto.name}-${updateUserDto.card_no}`,
    );
    console.log(updateUserDto.avatar);

    const isExist = await this.usersRepository.count({
      where: {
        name: updateUserDto.name,
      },
    });
    if (isExist > 1) {
      return {
        statusCode: 201,
        message: '已存在',
      };
    }

    return await this.usersRepository.update(id, updateUserDto);
  }

  // 列表
  async findAll(query: any): Promise<any> {
    const { keyword, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    let params = {
      skip,
      take: limit,
    };

    let whereParams = {};

    if (keyword) {
      whereParams = Object.assign(whereParams, {
        name: Like(`%${keyword}%`),
      });
    }

    params = Object.assign(
      // {
      //   select: ['id', 'name'],
      // },
      params,
      {
        where: whereParams,
      },
      {
        order: {
          updatedAt: 'DESC',
        },
      },
    );

    const [data, total] = await this.usersRepository.findAndCount(params);

    return {
      total,
      data,
    };
  }

  // 查询所有用户
  async findAllUsers(query: any): Promise<any> {
    const [data, total] = await this.usersRepository.findAndCount({
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      total,
      data,
    };
  }

  // 根据用户名查找
  async findOneByName(username: string): Promise<any> {
    return this.usersRepository.findOne({
      name: username,
    });
  }

  // 根据ID查找
  async findOneById(id: string): Promise<any> {
    return this.usersRepository.findOne(id);
  }

  // 更新密码
  async updatePassword(data): Promise<any> {
    const { id, body } = data;
    const user = await this.usersRepository.findOne(id);

    let { oldPassword, password: newPassword } = body;
    oldPassword = cryptoString(oldPassword);
    body.password = cryptoString(newPassword);

    const { password } = user;
    if (password !== oldPassword) {
      return {
        statusCode: 400,
        message: '旧密码不正确。',
      };
    }

    body.updatedAt = new Date();
    delete body.oldPassword;
    delete body.rePassword;

    return await this.usersRepository.update(id, body);
  }

  // 重置密码
  async resetPassword(params): Promise<any> {
    const { id } = params;

    const password = generator.generate({
      length: 10,
      numbers: true,
      symbols: false,
    });

    const data = {
      password: cryptoString(password),
      updatedAt: new Date(),
    };

    const result = await this.usersRepository.update(id, data);

    return {
      password,
      result,
    };
  }

  // 更新头像
  async updateAvatar(params): Promise<any> {
    const { id, updateUserAvatar } = params;
    updateUserAvatar.updatedAt = new Date();
    return await this.usersRepository.update(id, updateUserAvatar);
  }

  // 数量
  async getCount() {
    return await this.usersRepository.count();
  }

  // 根据 pwd 查询用户
  async findOneByPwd(loginUser: LoginUserDto): Promise<any> {
    const { name, password } = loginUser;
    loginUser.password = cryptoString(password);
    const user = await this.usersRepository.findOne({
      where: {
        name,
        password: loginUser.password,
      },
    });
    return user;
  }

  renameFile(filePath: string, newFileName: string): string {
    const directory = path.dirname(filePath);
    const extension = path.extname(filePath);
    const newFilePath = path.join(directory, `${newFileName}${extension}`);
    fs.renameSync(filePath, newFilePath);
    return newFilePath;
  }
}
