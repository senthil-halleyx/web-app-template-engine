const express = require("express");
const router = express.Router();

module.exports = (params) => {
  const { authorService } = params;

  router.get("/", async (req, res) => {
    const authors = await authorService.getAuthors();
    res.json(authors);
  });

  router.get("/:authorname", async (req, res) => {
    const author = await authorService.getAuthor(req.params.authorname);
    res.json(author);
  });

  return router;
};
