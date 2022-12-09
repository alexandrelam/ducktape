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
    this.router.get("/:id", this.userController.getById);
    this.router.post("/", this.userController.create);
    this.router.post("/addFriend", this.userController.addFriend);
    this.router.post("/uploadVideo", this.userController.uploadVideo);
    this.router.get("/:id/videos", this.userController.findAllVideos);
    this.router.delete("/deleteFriend", this.userController.deleteFriend);
    this.router.delete("/deleteVideo", this.userController.deleteVideo);
    this.router.put("/rename", this.userController.rename);
  }
}
