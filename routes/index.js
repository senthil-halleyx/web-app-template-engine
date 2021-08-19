const express = require("express");
const router = express.Router();
const authorsRoute = require("./authors");
const booksRoute = require("./books");

module.exports = (params) => {
  router.get("/", (req, res) => {
    if (!req.session.visitcount) {
      req.session.visitcount = 0;
    }
    req.session.visitcount++;
    // res.render("./pages/index", {
    //   pageTitle: `Welcome to the Node.js web app using template engine - ${req.session.visitcount}`,
    // });

    res.render("layout", {
      pageTitle: `Welcome to the Node.js web app using template engine - ${req.session.visitcount}`,
      template: "index",
    });
  });
  router.use("/authors", authorsRoute(params));
  router.use("/books", booksRoute(params));
  return router;
};
