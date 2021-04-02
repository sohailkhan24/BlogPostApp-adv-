const Post = require("../models/post");
module.exports.home = function (req, res) {
  // res.cookie()

  // Post.find({}, function (err, posts) {
  //   return res.render("home", {
  //     title: "Home",
  //     posts: posts,
  //   });
  // });

  //populate the user of each post
  Post.find({})
    .populate("user")
    .exec(function (err, posts) {
      return res.render("home", {
        title: "Home",
        posts: posts,
      });
    });
};

//module.exports.actionName =function(req,res);