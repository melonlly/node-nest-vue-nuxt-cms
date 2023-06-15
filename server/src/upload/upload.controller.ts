import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { uid } from 'uid';
import * as path from 'path';
import { baseHosts } from '../libs/config';
import { JwtAuthGuardUser } from 'src/auth/guards/jwt-auth.guard';
import { UploadService } from './upload.service';
import { UsersService } from 'src/users/users.service';
import * as AdmZip from 'adm-zip-iconv';
import { promises as fs } from 'fs';
import * as fsEx from 'fs-extra';
import * as iconvLite from 'iconv-lite';
import { logger } from 'src/libs/utils';
import { ExamService } from 'src/exam/exam.service';

const { NODE_ENV } = process.env;
const baseHost = baseHosts[NODE_ENV] || {
  uploadPath: 'public/',
  baseHost: 'http://localhost:3000/',
};

@UseGuards(JwtAuthGuardUser)
@Controller('api/upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly usersService: UsersService,
    private readonly examService: ExamService,
  ) {}

  // 上传照片（单个）
  @Post()
  @UseInterceptors(
    FileInterceptor('upload', {
      storage: diskStorage({
        destination: `./${baseHost.uploadPath}uploads/`,
        filename: (_req, file, cb) => {
          file = file.upload ? file.upload : file;
          return cb(
            null,
            uid(32) + Date.now() + path.extname(file.originalname),
          );
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() upload, @Request() req) {
    const { filename, path, mimetype } = upload;
    upload.uploaded = 1;
    upload.url = path.replace(baseHost.uploadPath, baseHost.baseHost);
    upload.fileName = filename;

    return upload;
  }

  // 上传学生数据（excel）
  @Post('users')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `./${baseHost.uploadPath}excels/`,
        filename: (_req, file, cb) => {
          file = file.upload ? file.upload : file;
          return cb(
            null,
            uid(32) + Date.now() + path.extname(file.originalname),
          );
        },
      }),
    }),
  )
  async uploadUsers(@UploadedFile() upload, @Body() body: any) {
    const { filename, path } = upload;
    // console.log('upload', upload, upload.recruit_id);
    console.log('body', body, body.recruit_id);

    const recruit_id = body.recruit_id; // 所属培训计划
    const excelData = this.uploadService.getExcelData(path); // excel数据（第一个sheet)
    // logger(excelData)

    // 处理表格数据
    const users = this.uploadService.handleExcelData(excelData, recruit_id);
    // logger(users)
    // 批量插入user表
    await this.usersService.insertUsers(users);

    return upload;
  }

  // 上传考试数据（excel）
  @Post('exams')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `./${baseHost.uploadPath}exams/`,
        filename: (_req, file, cb) => {
          file = file.upload ? file.upload : file;
          return cb(
            null,
            uid(32) + Date.now() + path.extname(file.originalname),
          );
        },
      }),
    }),
  )
  async uploadExams(@UploadedFile() upload, @Body() body: any) {
    console.log(`uploadExams`, upload);
    
    const { filename, path } = upload;
    // console.log('upload', upload, upload.recruit_id);
    console.log('body', body, body.recruit_id, body.period);

    const recruit_id = body.recruit_id; // 所属培训计划
    const period = body.period; // 当前学期
    const timestamp = Date.now(); // 时间戳作为当前上传解压目录

    // 解压上传的文件
    const zip = new AdmZip(path, 'GBK');
    const targetDirectory = `./${baseHost.uploadPath}exams/${timestamp}`;
    console.log(__dirname, targetDirectory);
    
    try {
      await fs.mkdir(targetDirectory, { recursive: true });
      zip.extractAllTo(targetDirectory, /*overwrite*/ true);

      const files = await fsEx.readdir(targetDirectory);
      console.log(files);
      files.forEach((file) => {
        console.log(`${targetDirectory}/${file}`);

        const examData = this.uploadService.getExamData(`${targetDirectory}/${file}`);
        console.log(examData);

        const exams = this.uploadService.handleExamData(examData, recruit_id, period);

        this.examService.insertExam(exams)
      });
    } catch (error) {
      logger(error)
    }

    // const excelData = this.uploadService.getExcelData(path); // excel数据（第一个sheet)
    // // logger(excelData)

    // // 处理表格数据
    // const users = this.uploadService.handleExcelData(excelData, recruit_id);
    // // logger(users)
    // // 批量插入user表
    // await this.usersService.insertUsers(users);

    return upload;
  }
}
