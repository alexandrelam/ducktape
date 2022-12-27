import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
  CreateDateColumn,
} from "typeorm";

import { IsNotEmpty } from "class-validator";
import { User } from "./User";

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.videos)
  @IsNotEmpty()
  @JoinTable()
  user: User;

  @Column()
  @IsNotEmpty()
  isFrontCamera: boolean;

  @Column()
  @IsNotEmpty()
  size: number;

  @Column()
  @IsNotEmpty()
  filepath: string;

  @Column()
  @IsNotEmpty()
  newFilename: string;

  @Column()
  @IsNotEmpty()
  mimetype: string;

  @Column()
  @IsNotEmpty()
  lastModifiedDate: string;

  @Column()
  @IsNotEmpty()
  originalFilename: string;

  @CreateDateColumn()
  createdAt: Date;

  userId: number;

  author: string;
}
