import { CreatePhotoDto, UpdatePhotoDto } from './dtos/createPhoto.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo) public photoRepository: Repository<Photo>,
  ) {}

  findAll(): Promise<Photo[]> {
    return this.photoRepository.find();
  }

  findOne(id: string): Promise<Photo> {
    return this.photoRepository.findOneBy({ id });
  }

  async create(body: CreatePhotoDto): Promise<Photo> {
    const newPhoto = this.photoRepository.create(body);
    return this.photoRepository.save(newPhoto);
  }

  async update(id: string, UpdatePhotoDto: any) {
    try {
      const findPhoto = await this.photoRepository.findOneBy({ id });
      findPhoto.title = UpdatePhotoDto.title;
      findPhoto.url = UpdatePhotoDto.url;
      findPhoto.thumbnailUrl = UpdatePhotoDto.thumbnailUrl;
      return await this.photoRepository.save(findPhoto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(id: string) {
    try {
      const checkId = await this.photoRepository.findOne({
        where: { id },
      });
      if (!checkId) {
        throw new BadRequestException('Photo not found');
      }
      return await this.photoRepository.remove(checkId);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  
}
