const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const database = low(adapter);

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
