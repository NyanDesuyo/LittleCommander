const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("./database/db.json");
const database = low(adapter);

database.defaults({ info: [], history: [] }).write();

module.exports = (get, author, message) => {
  database
    .get(get)
    .push({
      author: author,
      message: message,
      datetime: Date(),
    })
    .write();
};
