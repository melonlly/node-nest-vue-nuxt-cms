import { Injectable } from '@nestjs/common';
import { cryptoString } from '../libs/lib';
import * as xlsx from 'xlsx';
import { User } from 'src/users/users.entity';
import { baseHosts } from 'src/libs/config';
import { Exam } from 'src/exam/exam.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const { NODE_ENV } = process.env;
const baseHost = baseHosts[NODE_ENV] || {
  uploadPath: 'public/',
  baseHost: 'http://localhost:3000/',
};

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // 获取excel内容
  getExcelData(excelPath: string): any[] {
    const workbook = xlsx.readFile(excelPath, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);
    return data;
  }
  // 处理表格数据
  handleExcelData(excelData: any[], recruit_id: string): User[] {
    const users = [];
    const mapping = {
      status: '录取状态',
      name: '姓名',
      card_no: '身份证号码',
      sex: '性别',
      nation: '民族',
      politics: '政治面貌',
      base: '中心',
      base_phone: '学习中心电话',
      born: '出生日期',
      phone: '即时通讯',
      address: '通讯地址',
      postcode: '邮政编码',
      email: 'Email',
    };
    // card_type recruit_id password avatar
    excelData.forEach((row) => {
      const user = new User();
      Object.keys(mapping).forEach((key) => {
        user[key] = row[mapping[key]] || '';
      });
      user.card_type = '身份证';
      user.recruit_id = recruit_id;
      user.password = cryptoString('Yc-123456');
      user.avatar = `./${baseHost.uploadPath}uploads/${user.card_no}.jpg`;
      users.push(user);
    });
    return users;
  }
  // 获取考试内容
  getExamData(path: string): any[] {
    const workbook = xlsx.readFile(path, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);
    return data;
  }
  // 处理考试数据
  async handleExamData(
    examData: any[],
    recruit_id: string,
    period: string,
  ): Promise<Exam[]> {
    const username = String(Object.values(examData[0])[2]); // 学生姓名
    const user = await this.usersRepository.findOne({
      name: username,
    });
    const subjects = examData.slice(3); // 科目数据
    const exams = []
    subjects.forEach(row => {
      const exam = new Exam();
      exam.recruit_id = recruit_id;
      exam.user_id = user.id;
      exam.period = period;
      exam.subject = String(Object.values(row)[2]);
      exam.score = row.__EMPTY_1;
    })
    return exams;
  }
}
