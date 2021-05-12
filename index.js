"use strict";

// Importing Enviroment Configuration
require("dotenv").config();

// Import Package
// Core
const Discord = require("discord.js");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const fs = require("fs");
const chalk = require("chalk");

// Database
const connectionDB = require("./database/connect");

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

// Database Connection
connectionDB();

// lowDB default Value
db.defaults({ info: [], history: [] }).write();

//const getLogin = db.get("login");
//const getLog = db.get("log");
const saveLowDB = require("./database/lowdb");

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// Discord Lifecycle
// START
client.on("ready", () => {
  console.log(chalk.white(`Logged in as ${client.user.tag}!`));

  client.user
    .setActivity("'!' for commands ", { type: "WATCHING" })
    .then((presence) =>
      console.log(chalk.white(`Activity set "${presence.activities[0].name}"`)),
    )
    .catch((err) => {
      console.log(chalk.red(err));
    });
  saveLowDB("info", "Ready", "ok!");
});

client.on("warn", (warn) => {
  console.log(chalk.yellow("[Warning] :", warn));
  saveLowDB("info", "Warning", warn);
});

client.on("error", (err) => {
  console.log(chalk.red("[Error] : ", err));
  saveLowDB("info", "Error", err);
});

client.on("disconnect", () => {
  console.log(chalk.grey("Reconnecting.. "));

  saveLowDB("info", "Disconnected", "Reconnecting..");
  process.exit(0);
});
// END

// Main Function
client.on("message", async (msg) => {
  // Checking text input
  console.log(`[${msg.author.tag}]: ${msg.content}`);

  saveLowDB("history", msg.author.tag, msg.content);

  if (msg.author.bot || !msg.guild) {
    return;
  }

  if (msg.content.startsWith("!")) {
    const [CMD_NAME, ...args] = msg.content
      .trim()
      .substring("!".length)
      .split(/\s+/);

    // Debugging section
    console.log(chalk.green(`Command: ${CMD_NAME}`));
    console.log(chalk.red(`Argument: ${args}`));

    try {
      await client.commands.get(CMD_NAME).execute(msg, args);
    } catch (err) {
      console.log(chalk.bgRed(err));
      await msg.channel.send("Type '!help' for available command");
    }
  }
});

client.login(process.env.TOKEN);
