const Post = require("../models/post");
const Comment = require("../models/comment");
module.exports.create = function (req, res) {
  Post.create(
    {
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      user: req.user._id,
    },
    function (err, post) {
      if (err) {
        console.log("Error in creaing a post");
        return;
      }
      return res.redirect("back");
    }
  );
};

module.exports.destroy = function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    //,id means coverting the object id into strings
    if (post.user == req.user.id) {
      post.remove();
      Comment.deleteMany({ post: req.params.id }, function (err) {
        return res.redirect("back");
      });
    } else {
      return res.redirect("back");
    }
  });
};
