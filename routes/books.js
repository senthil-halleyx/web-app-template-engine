const express = require("express");
const router = express.Router();

module.exports = (params) => {
  const { bookService } = params;

  router.get("/", async (req, res) => {
    const books = await bookService.getBooks();
    //return res.json(books);
    res.render("layout", {
      pageTitle: `List of books`,
      template: "books",
      books,
    });
  });
  router.get("/:bookname", async (req, res) => {
    const book = await bookService.getBook(req.params.bookname);
    //return res.json(book);
    res.render("layout", {
      pageTitle: `Book detail`,
      template: "book-detail",
      book,
    });
  });
  router.post("/", (req, res) => {
    return res.send("Added new book");
  });
  return router;
};
