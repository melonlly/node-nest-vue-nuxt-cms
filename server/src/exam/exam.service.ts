import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Exam } from './exam.entity';
import { CreateExamDto } from './dto/create-exam.dto';
import { RemoveExamDto } from './dto/remove-exam.dto';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
  ) {}

  // 增加
  async create(createExamDto: CreateExamDto): Promise<any> {
    const { createdAt } = createExamDto;
    createExamDto.createdAt = createdAt || new Date();
    createExamDto.updatedAt = new Date();

    delete createExamDto.id;

    return await this.examRepository.save(createExamDto);
  }

  // 删除
  async delete(removeExamDto: RemoveExamDto): Promise<any> {
    const { ids } = removeExamDto;

    return this.examRepository.delete(ids);
  }

  // 更新
  async update(updateExamData): Promise<any> {
    const { id, updateExamDto } = updateExamData;
    updateExamDto.updatedAt = new Date();

    // const { period, plan } = updateRecruitDto;
    // const isExist = await this.examRepository.count({
    //   where: {
    //     period,
    //     plan,
    //   },
    // });
    // if (isExist > 1) {
    //   return {
    //     statusCode: 201,
    //     message: '已存在',
    //   };
    // }

    return await this.examRepository.update(id, updateExamDto);
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

    const [data, total] = await this.examRepository
      .createQueryBuilder('exam')
      .leftJoinAndSelect('exam.recruit', 'recruit')
      .leftJoinAndSelect('exam.user', 'user')
      .select([
        'exam.id',
        'exam.period',
        'exam.subject',
        'exam.score',
        'recruit.id',
        'recruit.period',
        'recruit.plan',
        'user.id',
        'user.name',
        'user.card_no',
      ])
      .where(whereParams)
      .getManyAndCount();

    return {
      total,
      data,
    };
  }

  // 根据period查找
  async findOneByName(period: string): Promise<any> {
    return this.examRepository.findOne({
      period,
    });
  }

  // 根据ID查找
  async findOneById(id: string): Promise<any> {
    return this.examRepository
      .createQueryBuilder('exam')
      .leftJoinAndSelect('exam.recruit', 'recruit')
      .leftJoinAndSelect('exam.user', 'user')
      .select([
        'exam.id',
        'exam.period',
        'exam.subject',
        'exam.score',
        'recruit.id',
        'recruit.period',
        'recruit.plan',
        'user.id',
        'user.name',
        'user.card_no',
      ])
      .where({ id })
      .getOne();
  }

  // 数量
  async getCount() {
    return await this.examRepository.count();
  }

  async insertExams(exams: Exam[]): Promise<any> {
    return await this.examRepository.save(exams);
  }
}
