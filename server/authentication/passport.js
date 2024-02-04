const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/user/users");

module.exports = function (passport, sequelize) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };

        try {
          // Adjust this part to work with MySQL and Sequelize
          const [user, created] = await User.findOrCreate({
            where: { googleId: profile.id },
            defaults: newUser,
          });

          if (!created) {
            // User already exists in the database
            done(null, user);
          } else {
            // New user created in the database
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    // Adjust this part to work with MySQL and Sequelize
    User.findByPk(id)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err, null);
      });
  });
};
