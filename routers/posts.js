const express = require("express");
const posts = require("../controllers/posts_controller");

const router = express.Router();

router.get("/post", posts.post);

module.exports = router;
