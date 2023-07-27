import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { v4 as uuidv4 } from 'uuid';
import { Profile } from './profile.entity';
@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: string = uuidv4();

  @Column()
  email: string;

  @Column()
  @Exclude() // Giữ lại những trường mà mình muốn giấu đi khi gửi trả về client
  password: string;

  
}
