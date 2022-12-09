import Koa from "koa";
import { appDataSource } from "../db";
import { User } from "models/User";
import { Video } from "models/Video";
import { deleteFile } from "../utils/deleteFile";
// server crash without this import
import koaBody from "koa-body";

export class UserController {
  async findAll(ctx: Koa.Context) {
    const users = await appDataSource.getRepository(User).find({
      relations: ["friends", "videos", "friends.videos"],
    });

    ctx.body = users;
  }

  async getById(ctx: Koa.Context) {
    const user = await appDataSource.getRepository(User).findOne({
      where: { id: ctx.params.userId },
      relations: ["friends", "videos"],
    });

    if (!user) {
      ctx.status = 404;
      ctx.body = { message: "User not found" };
      return;
    }

    ctx.body = user;
  }

  async findAllVideos(ctx: Koa.Context) {
    const userId = ctx.params.userId;

    const user = await appDataSource.getRepository(User).find({
      where: { id: userId },
      relations: ["videos", "friends.videos"],
    });

    if (!user.length) {
      ctx.status = 404;
      ctx.body = { message: "User not found" };
    }

    const videos = user[0].friends.reduce<(Video | { userId: number })[]>(
      (acc, friend) => {
        if (friend.videos.length) {
          acc.push(
            ...friend.videos.map((video) => ({ ...video, userId: friend.id }))
          );
        }
        return acc;
      },
      []
    );

    videos.push(...user[0].videos.map((video) => ({ ...video, userId })));

    ctx.body = videos;
  }

  async create(ctx: Koa.Context) {
    try {
      const user = appDataSource.manager.create("User", <User>ctx.request.body);
      await appDataSource.manager.save(user);
      ctx.body = user;
    } catch (error) {
      ctx.status = 400;
      ctx.body = error;
    }
  }

  async addFriend(ctx: Koa.Context) {
    if (ctx.params.userGoogleId === ctx.params.friendGoogleId) {
      ctx.status = 400;
      ctx.body = { message: "You can't add yourself as a friend" };
      return;
    }

    const user = await appDataSource.getRepository(User).findOne({
      where: { googleId: ctx.params.userGoogleId },
      relations: ["friends"],
    });
    const friend = await appDataSource.getRepository(User).findOne({
      where: { googleId: ctx.params.friendGoogleId },
      relations: ["friends"],
    });
    if (!user || !friend) {
      ctx.status = 404;
      ctx.body = "User or friend not found";
      return;
    }

    user.friends.push(friend);
    await appDataSource.manager.save(user);

    friend.friends.push(user);
    await appDataSource.manager.save(friend);

    // return json message
    ctx.body = {
      message: `User ${user.googleId} and User ${friend.googleId} are now friends`,
    };
  }

  async uploadVideo(ctx: Koa.Context) {
    if (!ctx.request.files || !ctx.request.files.video) {
      ctx.status = 400;
      ctx.body = "No file uploaded";
      return;
    }

    if (!ctx.request.body.isFrontCamera) {
      ctx.status = 400;
      ctx.body = "No isFrontCamera field in body";
      return;
    }

    const user = await appDataSource.getRepository(User).findOne({
      where: { id: ctx.params.userId },
    });

    if (!user) {
      ctx.status = 404;
      ctx.body = "User not found";
      return;
    }

    let video = ctx.request.files.video as unknown as Video;
    video.user = user;
    video.isFrontCamera = JSON.parse(ctx.request.body.isFrontCamera);

    try {
      await appDataSource.manager.save(
        appDataSource.manager.create("Video", <Video>video)
      );
    } catch (error) {
      ctx.status = 500;
      ctx.body = "Error saving video";
    }

    ctx.body = video;
  }

  async deleteFriend(ctx: Koa.Context) {
    const user = await appDataSource.getRepository(User).findOne({
      where: { id: ctx.params.userId },
      relations: ["friends"],
    });
    const friend = await appDataSource.getRepository(User).findOne({
      where: { id: ctx.params.friendId },
      relations: ["friends"],
    });
    if (!user || !friend) {
      ctx.status = 404;
      ctx.body = "User or friend not found";
      return;
    }

    user.friends = user.friends.filter((f) => f.id !== friend.id);
    await appDataSource.manager.save(user);

    friend.friends = friend.friends.filter((f) => f.id !== user.id);
    await appDataSource.manager.save(friend);

    ctx.body = {
      message: `User ${user.id} and User ${friend.id} are no longer friends`,
    };
  }

  async deleteVideo(ctx: Koa.Context) {
    const video = await appDataSource.getRepository(Video).findOne({
      where: { id: ctx.params.videoId, user: { id: ctx.params.userId } },
    });

    if (!video) {
      ctx.status = 404;
      ctx.body = "Video not found";
      return;
    }

    try {
      await appDataSource.manager.remove(video);
    } catch (error) {
      ctx.status = 500;
      ctx.body = "Error deleting video";
    }

    try {
      await deleteFile(`./uploads/${video.newFilename}`);
    } catch (error) {
      console.log("Error deleting file", error);
    }

    ctx.body = { message: "Video deleted" };
  }

  async rename(ctx: Koa.Context) {
    const user = await appDataSource.getRepository(User).findOne({
      where: { id: ctx.params.userId },
    });

    if (!user) {
      ctx.status = 404;
      ctx.body = "User not found";
      return;
    }

    if (!ctx.request.body.name) {
      ctx.status;
      ctx.body = "No name field in body";
      return;
    }

    user.name = ctx.request.body.name;

    try {
      await appDataSource.manager.save(user);
    } catch (error) {
      ctx.status = 500;
      ctx.body = "Error renaming user";
    }

    ctx.body = user;
  }
}
