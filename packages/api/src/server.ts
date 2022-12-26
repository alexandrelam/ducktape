import Koa from "koa";
import serve from "koa-static";
import koaBody from "koa-body";
import cors from "@koa/cors";
import jwt from "koa-jwt";
import { initPassport } from "./passport";
import nodeCron from "node-cron";
import { appDataSource } from "./db";
import { VideoController } from "./controllers/videoController";
import { UserRouter } from "./routes/users";
import { AuthRouter } from "./routes/auth";

import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

(async () => {
  try {
    await appDataSource.initialize();
  } catch (error) {
    console.log("Error initializing appDataSource", error);
  }

  const app = new Koa({ proxy: true });

  app.use(
    cors({
      origin: process.env.FRONT_URL as string,
      credentials: true,
    })
  );

  app.use(
    koaBody({
      formidable: { uploadDir: "./uploads", keepExtensions: true },
      multipart: true,
    })
  );
  app.use(serve("./uploads"));

  // after this line, all routes are protected
  await initPassport(app);
  app.use(new AuthRouter().router.routes());
  app.use(
    jwt({
      secret: process.env.JWT_SECRET as string,
      debug: true,
    })
  );

  app.use(new UserRouter().router.routes());

  app.listen(8825, () => {
    console.log("Server started on port 8825");
  });
})();

const videoController = new VideoController();
nodeCron.schedule("0 * * * *", async () => {
  await videoController.deleteExpiredVideos();
});
