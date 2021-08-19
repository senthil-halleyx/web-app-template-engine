const fs = require("fs");
const util = require("util");

/**
 * We want to use async/await with fs.readFile - util.promisfy gives us that
 */
const readFile = util.promisify(fs.readFile);

/**
 * Logic for fetching author information
 */
class AuthorService {
  /**
   * Constructor
   * @param {*} datafile Path to a JSON file that contains the books data
   */
  constructor(datafile) {
    this.datafile = datafile;
  }

  /**
   * Returns a list of author names
   */
  async getAuthorNames() {
    const data = await this.getData();

    // We are using map() to transform the array we get into another one
    return data.map((author) => {
      return { name: author.author };
    });
  }

  /**
   * Get author information provided a authorname
   * @param {*} authorname
   */
  async getAuthor(authorname) {
    const data = await this.getData();
    const author = data.find((elm) => {
      return elm.author === authorname;
    });
    if (!author) return null;
    return {
      name: author.author,
      dob: author.dob,
      countr: author.country,
    };
  }

  /**
   * Get a list of authors
   */
  async getAuthors() {
    const data = await this.getData();
    return data.map((author) => {
      return {
        name: author.author,
        dob: author.dob,
        country: author.country,
      };
    });
    console.log(data);
  }

  /**
   * Fetches authors data from the JSON file provided to the constructor
   */
  async getData() {
    const data = await readFile(this.datafile, "utf8");
    return JSON.parse(data).authors;
  }
}
module.exports = AuthorService;
