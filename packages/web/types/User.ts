import { Video } from "./Video";

export type User = {
  id: number;
  googleId: string;
  name: string;
  firstname: string;
  lastname: string;
  profilePicturePath: string;
  friends: User[];
  videos: Video[];
};
