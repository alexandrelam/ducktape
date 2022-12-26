import Koa from "koa";
import Router from "koa-router";
import passport from "koa-passport";
import jwt from "jsonwebtoken";

export class AuthRouter {
  router: Router;
  constructor() {
    this.router = new Router({
      prefix: "/api/v1/auth/google",
    });
    this.routes();
  }

  routes() {
    this.router.get(
      "/",
      passport.authenticate("google", { session: false, scope: ["profile"] })
    );

    this.router.get(
      "/callback",
      passport.authenticate("google", {
        failureRedirect: "/login",
        session: false,
      }),
      (ctx: Koa.Context) => {
        ctx.cookies.set(
          "token",
          jwt.sign({ user: ctx.state.user }, process.env.JWT_SECRET as string, {
            expiresIn: "10 min",
          }),
          {
            httpOnly: false,
            sameSite: "none",
            secure: true,
            domain: ".potionverte.lol",
            expires: new Date(Date.now() + 600000),
          }
        );
        ctx.redirect(process.env.FRONT_URL as string);
      }
    );

    this.router.post("/logout", (ctx: Koa.Context) => {
      ctx.cookies.set("token", "", { httpOnly: false });
      ctx.redirect(process.env.FRONT_URL as string);
    });
  }
}
