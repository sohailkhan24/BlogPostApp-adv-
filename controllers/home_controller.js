module.exports.home = function (req, res) {
  // res.cookie()
  return res.render("home", {
    title: "Home",
  });
};

//module.exports.actionName =function(req,res);
