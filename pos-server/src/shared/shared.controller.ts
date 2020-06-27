import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles, Get, Param, Res, HttpStatus, Body } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter, companyImgName, userImgName, productImgName } from '../utils/file-upload.utils';
import { diskStorage } from 'multer';
import * as fs from 'fs';

@Controller('shared')
export class SharedController {

    @Post('companyIMG')
    @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: './files',
          filename: companyImgName
        }),
        fileFilter: imageFileFilter,
      }),
    )
    async uploadedCompanyImg(@UploadedFile() file) {
      const response = {
        originalname: file.originalname,
        filename: file.filename,
      };
      return response;
    }
  

    @Post('userIMG')
    @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: './files',
          filename: userImgName,
        }),
        fileFilter: imageFileFilter,
      }),
    )
    async uploadedUserImg(@UploadedFile() file) {
      const response = {
        originalname: file.originalname,
        filename: file.filename,
      };
      return response;
    }
  
    
    @Post('productIMG')
    @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: './files',
          filename: productImgName,
        }),
        fileFilter: imageFileFilter,
      }),
    )
    async uploadedProductImg(@UploadedFile() file) {
      const response = {
        originalname: file.originalname,
        filename: file.filename,
      };
      return response;
    }

    @Post('deleteIMG')
    async deleteUserImg(@Body() data) {
      const path = data.fileName;
      try{
        await fs.unlinkSync(path);
        return {code: HttpStatus.OK};
      }catch(error){
        return {code: HttpStatus.OK};        
      }
     
    }
  

    @Post('upload')
    @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: './files',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }),
    )
    async uploadedFile(@UploadedFile() file) {
      const response = {
        originalname: file.originalname,
        filename: file.filename,
      };
      return response;
    }
  
    @Post('multiple')
    @UseInterceptors(
      FilesInterceptor('image', 20, {
        storage: diskStorage({
          destination: './files',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }),
    )
    async uploadMultipleFiles(@UploadedFiles() files) {
      const response = [];
      files.forEach(file => {
        const fileReponse = {
          originalname: file.originalname,
          filename: file.filename,
        };
        response.push(fileReponse);
      });
      return response;
    }
  
    @Get(':imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
      return res.sendFile(image, { root: './files' });
    }
}
