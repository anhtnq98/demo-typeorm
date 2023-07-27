import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { CreatePhotoDto, UpdatePhotoDto } from './dtos/createPhoto.dto';
import { PhotosService } from './photos.service';

@Controller('photos')
export class PhotosController {
  constructor(public PhotosService: PhotosService) {}
  @Get()
  allPhotos() {
    return this.PhotosService.findAll();
  }

  @Get('/:id')
  onePhoto(@Param('id') id: string) {
    return this.PhotosService.findOne(id);
  }

  @Post()
  createPhoto(@Body() body: CreatePhotoDto) {
    return this.PhotosService.create(body);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() UpdatePhotoDto: UpdatePhotoDto) {
    return this.PhotosService.update(id, UpdatePhotoDto);
  }

  @Delete()
  deletePhoto(@Param() param: string) {
    console.log(param);
    return 'xoa user';
  }
}
