import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { PhotosModule } from './photos/photos.module';
import { Photo } from './photos/photo.entity';
import { Profile } from './users/entities/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'typeorm',
      entities: [User, Photo, Profile],
      synchronize: true,
    }),
    UsersModule,
    PhotosModule,
  ],
})
export class AppModule {}
