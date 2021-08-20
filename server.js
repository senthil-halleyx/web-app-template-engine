const express = require("express");
const path = require("path");
const app = express();
const routes = require("./routes");
const cookieSession = require("cookie-session");
const createError = require("http-errors");

const BookService = require("./services/BookService");
const AuthorService = require("./services/AuthorService");
const { request } = require("http");
const { response } = require("express");

const bookService = new BookService("./data/books.json");
const authorService = new AuthorService("./data/authors.json");

//app.set("trust proxy", 1);
app.locals.siteName = "Node.js web application training"; // application level variables --> This will be available throughout the application golbally

app.use((request, response, next) => {
  try {
    response.locals.navigation = [
      { name: "Home", path: "/" },
      { name: "Books", path: "/books" },
      { name: "Authors", path: "/authors" },
    ];
    next();
  } catch (err) {
    next(err);
  }
});

app.use(
  cookieSession({
    name: "session",
    keys: ["user_id"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static(path.join(__dirname, "./static")));

app.use(
  "/",
  routes({ bookService: bookService, authorService: authorService })
);

app.use((request, response, next) => {
  return next(createError(404, "File not found"));
});

app.use((err, request, response, next) => {
  const status = err.status || 500;
  response.locals.message = err.message;
  response.locals.status = status;
  response.status(status);
  response.render("error");
});
app.listen(3000);
