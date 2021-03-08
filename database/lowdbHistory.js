const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const database = low(adapter);

module.exports = (author, message) => {
  database
    .get("history")
    .push({
      author: author,
      message: message,
      datetime: Date(),
    })
    .write();
};
