import Router from "koa-router";
import { UserController } from "../controllers/userController";

export class UserRouter {
  router: Router;
  userController: UserController;

  constructor() {
    this.router = new Router({
      prefix: "/api/v1/users",
    });
    this.userController = new UserController();
    this.routes();
  }

  routes() {
    this.router.get("/", this.userController.findAll);
    this.router.post("/", this.userController.create);
    this.router.get("/:userId", this.userController.getById);
    this.router.patch("/:userId", this.userController.rename);
    this.router.get("/:userId/videos", this.userController.findAllVideos);
    this.router.patch(
      "/:userGoogleId/friends/:friendGoogleId",
      this.userController.addFriend
    );
    this.router.post("/:userId/videos", this.userController.uploadVideo);
    this.router.delete(
      "/:userId/friends/:friendId",
      this.userController.deleteFriend
    );
    this.router.delete(
      "/:userId/videos/:videoId",
      this.userController.deleteVideo
    );
  }
}
