import { deleteFile } from "../utils/deleteFile";
import { appDataSource } from "../db";
import { Video } from "models/Video";
import { LessThan } from "typeorm";

export class VideoController {
  async deleteExpiredVideos() {
    const videos = await appDataSource.getRepository(Video).find({
      where: {
        createdAt: LessThan(new Date(Date.now() - 1000 * 60 * 60 * 24)),
      },
    });

    if (videos.length) {
      await appDataSource.getRepository(Video).remove(videos);
      Promise.all(
        videos.map(
          async (video) => await deleteFile(`./uploads/${video.newFilename}`)
        )
      );
    }
  }
}
