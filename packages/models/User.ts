import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Video } from "./Video";

import { IsNotEmpty } from "class-validator";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  googleId: string;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  firstName: string;

  @Column()
  @IsNotEmpty()
  lastName: string;

  @Column()
  profilePicturePath: string;

  @ManyToMany(() => User, { cascade: true })
  @JoinTable()
  friends: User[];

  @OneToMany(() => Video, (video) => video.user)
  @JoinTable()
  videos: Video[];
}
