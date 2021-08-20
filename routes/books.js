const { request } = require("express");
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

module.exports = (params) => {
  const { bookService } = params;

  router.get("/", async (req, res, next) => {
    try {
      const books = await bookService.getBooks();
      const errors = req.session.book ? req.session.book.errors : false;
      req.session.book = {};

      return res.render("layout", {
        pageTitle: `List of available books`,
        template: "books",
        books,
        errors,
      });
    } catch (error) {
      next(error);
    }
  });
  router.get("/:bookname", async (req, res, next) => {
    try {
      const book = await bookService.getBook(req.params.bookname);
      //return res.json(book);
      return res.render("layout", {
        pageTitle: `Book detail`,
        template: "book-detail",
        book,
      });
    } catch (error) {
      next(error);
    }
  });
  router.post(
    "/",
    [
      check("name")
        .trim()
        .isLength({ min: 2 })
        .escape()
        .withMessage("Valid book name is required"),
      check("email")
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage("Valid email is required"),
      check("year")
        .trim()
        .escape()
        .isNumeric()
        .withMessage("Valid year is required"),
      check("ISBN")
        .trim()
        .escape()
        .isAlphanumeric()
        .withMessage("Valid year is required"),
    ],
    (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          req.session.book = { errors: errors.array() };
          return res.redirect("/books");
        }
        // console.log(req.body);
        return res.send("A new book is added");
      } catch (error) {
        next(error);
      }
    }
  );
  return router;
};
