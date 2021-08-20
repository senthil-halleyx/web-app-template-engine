const express = require("express");
const router = express.Router();
const authorsRoute = require("./authors");
const booksRoute = require("./books");

module.exports = (params) => {
  router.get("/", (req, res, next) => {
    try {
      if (!req.session.visitcount) {
        req.session.visitcount = 0;
      }
      req.session.visitcount++;

      return res.render("layout", {
        pageTitle: `Welcome to the Node.js web app using template engine - ${req.session.visitcount}`,
        template: "index",
      });
    } catch (error) {
      next(error);
    }
  });
  router.use("/authors", authorsRoute(params));
  router.use("/books", booksRoute(params));
  return router;
};
