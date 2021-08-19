const fs = require("fs");
const util = require("util");

/**
 * We want to use async/await with fs.readFile - util.promisfy gives us that
 */
const readFile = util.promisify(fs.readFile);

/**
 * Logic for fetching books information
 */
class BookService {
  /**
   * Constructor
   * @param {*} datafile Path to a JSON file that contains the books data
   */
  constructor(datafile) {
    this.datafile = datafile;
  }

  /**
   * Returns a list of books name and short name
   */
  async getBookNames() {
    const data = await this.getData();

    // We are using map() to transform the array we get into another one
    return data.map((book) => {
      return { name: book.name };
    });
  }

  /**
   * Get all artwork
   */
  async getAllBooks() {
    const data = await this.getData();

    // Array.reduce() is used to traverse all books and
    // create an array that contains all books
    const book = data.reduce((acc, elm) => {
      if (elm.book) {
        // eslint-disable-next-line no-param-reassign
        acc = [...acc, ...elm.book];
      }
      return acc;
    }, []);
    return book;
  }

  /**
   * Get all books of a given author
   * @param {*} authorname The books author name
   */
  async getBookByAuthor(authorname) {
    const data = await this.getData();
    const book = data.find((elm) => {
      return elm.author === authorname;
    });
    if (!book || !book.author) return null;
    return book.author;
  }

  /**
   * Get book information provided a bookname
   * @param {*} bookname
   */
  async getBook(bookname) {
    const data = await this.getData();
    const book = data.find((elm) => {
      return elm.name === bookname;
    });
    if (!book) return null;
    return {
      name: book.name,
      author: book.author,
      summary: book.summary,
    };
  }

  /**
   * Get a list of books
   */
  async getBooks() {
    const data = await this.getData();
    return data.map((book) => {
      return {
        name: book.name,
        author: book.author,
        summary: book.summary,
        ISBN: book.ISBN,
        year: book.year,
      };
    });
  }

  /**
   * Fetches books data from the JSON file provided to the constructor
   */
  async getData() {
    const data = await readFile(this.datafile, "utf8");
    return JSON.parse(data).books;
  }
}

module.exports = BookService;
