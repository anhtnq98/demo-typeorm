import { IsEmpty } from 'class-validator';

export class CreatePhotoDto {
  @IsEmpty()
  albumId: string;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export class UpdatePhotoDto {
  @IsEmpty()
  albumId: string;
  title: string;
  url: string;
  thumbnailUrl: string;
}
