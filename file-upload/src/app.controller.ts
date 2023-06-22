import { Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Image } from './entities/image.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('photo', {dest: './upload'}))
  uploadSingle(@UploadedFile() file:  Express.Multer.File) {
    console.log(file);
    const image:Image = {
      id: null,
      name: file.originalname,
      dateCreated: new Date(),
      dateUpdated: new Date(),
    }
    this.appService.createImage(image);
  }

  @Post('uploads')
  @UseInterceptors(FilesInterceptor('photos[]', 10, {dest: './uploads'}))
  uploadMultiple(@UploadedFiles() files) {
    console.log(files);
  }
}
