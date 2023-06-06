import { Injectable } from '@nestjs/common';
import { CreateRecruitDto } from './dto/create-recruit.dto';
import { Recruit } from './recruit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { RemoveRecruitDto } from './dto/remove-recruit.dto';

@Injectable()
export class RecruitService {
  constructor(
    @InjectRepository(Recruit)
    private recruitRepository: Repository<Recruit>,
  ) {}

  // 增加
  async create(CreateRecruitDto: CreateRecruitDto): Promise<any> {
    const { period, plan, createdAt } = CreateRecruitDto;
    CreateRecruitDto.createdAt = createdAt || new Date();
    CreateRecruitDto.updatedAt = new Date();

    delete CreateRecruitDto.id;

    const isExist = await this.recruitRepository.count({
      where: {
        period,
        plan,
      },
    });
    if (isExist > 0) {
      return {
        statusCode: 202,
        message: '已存在',
      };
    }

    return await this.recruitRepository.save(CreateRecruitDto);
  }

  // 删除
  async delete(removeRecruitDto: RemoveRecruitDto): Promise<any> {
    const { ids } = removeRecruitDto;

    return this.recruitRepository.delete(ids);
  }

  // 更新
  async update(updateRecruitData): Promise<any> {
    const { id, updateRecruitDto } = updateRecruitData;
    updateRecruitDto.updatedAt = new Date();

    const { period, plan } = updateRecruitDto;
    const isExist = await this.recruitRepository.count({
      where: {
        period,
        plan,
      },
    });
    if (isExist > 1) {
      return {
        statusCode: 201,
        message: '已存在',
      };
    }

    return await this.recruitRepository.update(id, updateRecruitDto);
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
        period: Like(`%${keyword}%`),
      });
    }

    params = Object.assign(
      // {
      //   select: ['id', 'period'],
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

    const [data, total] = await this.recruitRepository.findAndCount(params);

    return {
      total,
      data,
    };
  }

  // 根据period查找
  async findOneByName(period: string): Promise<any> {
    return this.recruitRepository.findOne({
      period,
    });
  }

  // 根据ID查找
  async findOneById(id: string): Promise<any> {
    return this.recruitRepository.findOne(id);
  }

  // 数量
  async getCount() {
    return await this.recruitRepository.count();
  }
}
