import passport from "koa-passport";
import GoogleStrategy from "passport-google-oauth20";
import { appDataSource } from "./db";
import { User } from "models/User";
import Koa from "koa";

export async function initPassport(app: Koa) {
  app.use(passport.initialize());

  passport.serializeUser((user, done) => {
    done(null, (user as unknown as User).id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await appDataSource.manager.findOne("User", {
        where: { id },
      });

      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  passport.use(
    new GoogleStrategy.Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: `${process.env.API_URL}/api/v1/auth/google/callback`,
      },
      async (_token, _tokenSecret, profile, done) => {
        // Retrieve user from database, if exists
        if (!profile.id) {
          return done(new Error("No profile ID"));
        }

        const user = await appDataSource.manager.findOne("User", {
          where: { googleId: profile.id },
        });
        if (user) {
          done(null, user);
        } else {
          if (
            !profile.name ||
            !profile.name.givenName ||
            !profile.name.familyName
          ) {
            return done(new Error("No name found"));
          }
          let newUser = {
            googleId: profile.id,
            name: profile.name.givenName + " " + profile.name.familyName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            profilePicturePath: "",
          };

          if (profile.photos && profile.photos.length > 0) {
            newUser.profilePicturePath = profile.photos[0].value;
          }

          const savedUser = await appDataSource.manager.save("User", newUser);
          if (savedUser) {
            done(null, savedUser);
          } else {
            done(null, false);
          }
        }
      }
    )
  );
}
