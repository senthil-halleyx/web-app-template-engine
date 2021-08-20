const express = require("express");
const router = express.Router();

module.exports = (params) => {
  const { authorService } = params;

  router.get("/", async (req, res, next) => {
    try {
      const authors = await authorService.getAuthors();
      return res.json(authors);
    } catch (error) {
      next(error);
    }
  });

  router.get("/:authorname", async (req, res, next) => {
    try {
      const author = await authorService.getAuthor(req.params.authorname);
      return res.json(author);
    } catch (error) {
      next(error);
    }
  });

  return router;
};
