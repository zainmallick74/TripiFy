module.exports.renderHome = (req, res) => {
  res.render("listings/homePage", {
     bodyClass: "home-page"
  });
}

