const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
// const crypto = require("node:crypto");
const crypto = require("crypto");
const User = require("../models/user");

passport.use(
  new googleStrategy(
    {
      clientID:
        "802329111537-3qumbgjo2jrt2udo4sd3idah1veqkkrm.apps.googleusercontent.com",
      clientSecret: "5QFSKj3yq9SGzhVR3icEU5t8",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("error in oauth", err);
          return;
        }
        console.log(profile);
        if (user) {
          return done(null, user);
        } else {
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log("error in creating user oauth", err);
                return;
              }
              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;

// const passport = require("passport");
// const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
// const crypto = require("crypto");
// const User = require("../models/user");

// // tell passport to use a new strategy for google login
// passport.use(
//   new googleStrategy(
//     {
//       clientID:
//         "802329111537-3qumbgjo2jrt2udo4sd3idah1veqkkrm.apps.googleusercontent.com", // e.g. asdfghjkkadhajsghjk.apps.googleusercontent.com
//       clientSecret: "5QFSKj3yq9SGzhVR3icEU5t8", // e.g. _ASDFA%KFJWIASDFASD#FAD-
//       callbackURL: "http://localhost:8000/users/auth/google/callback",
//     },

//     function (accessToken, refreshToken, profile, done) {
//       // find a user
//       User.findOne({ email: profile.emails[0].value }).exec(function (
//         err,
//         user
//       ) {
//         if (err) {
//           console.log("error in google strategy-passport", err);
//           return;
//         }
//         console.log(accessToken, refreshToken);
//         console.log(profile);

//         if (user) {
//           // if found, set this user as req.user
//           return done(null, user);
//         } else {
//           // if not found, create the user and set it as req.user
//           User.create(
//             {
//               name: profile.displayName,
//               email: profile.emails[0].value,
//               password: crypto.randomBytes(20).toString("hex"),
//             },
//             function (err, user) {
//               if (err) {
//                 console.log(
//                   "error in creating user google strategy-passport",
//                   err
//                 );
//                 return;
//               }

//               return done(null, user);
//             }
//           );
//         }
//       });
//     }
//   )
// );

// module.exports = passport;
