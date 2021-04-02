const express = require("express");
const passport = require("passport");
const posts = require("../controllers/posts_controller");

const router = express.Router();

// router.get("/post", posts.post);
router.post("/create", passport.checkAuthentication, posts.create);

module.exports = router;
