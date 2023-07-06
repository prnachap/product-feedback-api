import { Strategy } from 'passport-google-oauth20';
import passport from 'passport';
import config from 'config';
import { findAndUpdateUser } from '../service/user.service';

// passport strategy
passport.use(
  new Strategy(
    {
      clientID: config.get<string>('googleClientId'),
      clientSecret: config.get<string>('googleClientSecret'),
      callbackURL: config.get<string>('googleAuthRedirectUri'),
    },
    async function (_accessToken, _refreshToken, profile, done) {
      try {
        const user = await findAndUpdateUser(
          { email: profile.emails?.[0]?.value },
          {
            name: `${profile.name?.familyName} ${profile.name?.givenName}`,
            email: profile.emails?.[0]?.value,
            username: `${profile.name?.familyName?.replace(' ', '')}${profile.name?.givenName}`,
          },
          {
            upsert: true,
            new: true,
          }
        );
        done(null, { id: user?._id });
      } catch (error: any) {
        done(error);
      }
    }
  )
);

// saving the session in the cookie
passport.serializeUser((user, done) => {
  done(null, user);
});

// reading the session from the cookie
passport.deserializeUser(async (user: { id: string }, done) => {
  done(null, user);
});
