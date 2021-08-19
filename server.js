const express = require("express");
const path = require("path");
const app = express();
const routes = require("./routes");
const cookieSession = require("cookie-session");

const BookService = require("./services/BookService");
const AuthorService = require("./services/AuthorService");

const bookService = new BookService("./data/books.json");
const authorService = new AuthorService("./data/authors.json");

//app.set("trust proxy", 1);
app.locals.siteName = "Node.js web application training"; // application level variables --> This will be available throughout the application golbally

app.use((request, response, next) => {
  try {
    // const authors = await authorService.getAuthorNames();
    // response.locals.authors = authors;
    response.locals.navigation = [
      { name: "Home", path: "/" },
      { name: "Books", path: "/books" },
      { name: "Authors", path: "/authors" },
    ];
    console.log(response.locals);
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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static(path.join(__dirname, "./static")));

app.use(
  "/",
  routes({ bookService: bookService, authorService: authorService })
);

app.listen(3000);
