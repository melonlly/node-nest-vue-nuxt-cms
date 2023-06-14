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
import * as AdmZip from 'adm-zip';
import { promises as fs } from 'fs';
import * as iconvLite from 'iconv-lite';
import { logger } from 'src/libs/utils';

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
    const { filename, path } = upload;
    // console.log('upload', upload, upload.recruit_id);
    console.log('body', body, body.recruit_id, body.period);

    const recruit_id = body.recruit_id; // 所属培训计划
    const period = body.period; // 当前学期
    const timestamp = Date.now(); // 时间戳作为当前上传解压目录

    // 解压上传的文件
    const zip = new AdmZip(path);
    const targetDirectory = `./${baseHost.uploadPath}exams/${timestamp}`;

    try {
      await fs.mkdir(targetDirectory, { recursive: true });

      zip.extractAllTo(targetDirectory, /*overwrite*/ true);

      // zip.getEntries().forEach((entry) => {
      //   console.log(
      //     entry.entryName,
      //     iconvLite.decode(Buffer.from(entry.entryName, 'binary'), 'GBK'),
      //     entry.isDirectory,
      //   );

      //   const rawName = entry.entryName;
      //   const decodedName = iconvLite.decode(
      //     Buffer.from(rawName, 'binary'),
      //     'GBK',
      //   ); // Replace 'GBK' with the correct encoding if necessary

      //   const outputPath = `${targetDirectory}/${decodedName}`;
      //   if (entry.isDirectory) {
      //     fs.mkdir(outputPath, { recursive: true });
      //   } else {
      //     const data = entry.getData();
      //     fs.writeFile(outputPath, data);
      //   }
      // });
      // await fs.unlink(path);
    } catch (error) {
      console.error('Error while extracting the ZIP file:', error);
      // throw error
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
