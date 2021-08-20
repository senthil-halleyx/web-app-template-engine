const express = require("express");
const router = express.Router();

module.exports = () => {
  router.all("/", (req, res, next) => {
    console.log("Hello world");
    next();
  });
  router.get("/", (req, res) => {
    res.render("index", { pageTitle: "Hello world using template engine" });
  });

  return router;
};
