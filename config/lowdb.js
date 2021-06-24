const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("./database/db.json");
const database = low(adapter);

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

module.exports = (status, message) => {
  database
    .get("info")
    .push({
      status: status,
      message: message,
      datetime: Date(),
    })
    .write();
};
