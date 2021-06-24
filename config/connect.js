const mongoose = require("mongoose");
const dotenv = require("dotenv");
const chalk = require("chalk");

dotenv.config();

module.exports = () => {
  mongoose.connect(
    process.env.DB_CONNECT,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // TEMP
      useFindAndModify: false,
    },
    () => console.log(chalk.blue("Connected to DB!")),
  );
};
