const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
//used for session cookie
const session = require("express-session");

const passportJWT = require("./config/passport-jwt-strategy");

const passportGoogle = require("./config/passport-google-oauth2-strategy");
const passportGithub = require("./config/passport-github-oauth-strategy");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo")(session);
const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");

app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("./assets"));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(expressLayouts);
//extract style and scripts from sub pages into layouts

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//mongo stoe is used to store the session cookie in the db
app.use(
  session({
    name: "Codeial",
    //todo change the secret before deployment
    secret: "something",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);

//use exports router
app.use("/", require("./routers"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server:${err}`);
  }

  console.log(`Server is running on port:${port}`);
});
