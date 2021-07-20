"use strict";

// Importing Enviroment Configuration
require("dotenv").config();
const process = require("process");

// Import Package
// Core
const Discord = require("discord.js");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const fs = require("fs");
const chalk = require("chalk");

// Database Connection
const connectionDB = require("./config/connect");

const LowDB = require("./config/lowdb");

async function main() {
  const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
  }

  // clear terminal when restart
  console.clear();

  // Discord Lifecycle
  // START
  client.on("ready", () => {
    console.log(chalk.bgBlueBright.black("🤖 Discord Bot"));
    console.log(chalk.white(`Logged in as ${client.user.tag}!`));

    client.user
      .setActivity("'!' for commands ", { type: "PLAYING" })
      .then((presence) =>
        console.log(
          chalk.white(`Activity set "${presence.activities[0].name}"`),
        ),
      )
      .catch((err) => {
        console.log(chalk.red(err));
      });
    // Main Database
    connectionDB();
    LowDB("info", "Ready", "ok!");
  });

  client.on("warn", (warn) => {
    console.log(chalk.yellow("[Warning] :", warn));
    LowDB("info", "Warning", warn);
  });

  client.on("error", (err) => {
    console.log(chalk.red("[Error] : ", err));
    LowDB("info", "Error", err);
  });

  client.on("disconnect", () => {
    console.log(chalk.grey("Reconnecting.. "));

    LowDB("info", "Disconnected", "Reconnecting..");
    process.exit(0);
  });
  // END

  // Main Function
  client.on("message", async (msg) => {
    // Checking text input
    console.log(`[${msg.author.tag}]: ${msg.content}`);

    LowDB("history", msg.author.tag, msg.content);

    if (msg.author.bot || !msg.guild) {
      return;
    }

    if (msg.content.startsWith("!")) {
      const [CMD_NAME, ...args] = msg.content
        .trim()
        .substring("!".length)
        .split(/\s+/);

      // Debugging section
      console.log(
        chalk.bgGreenBright.black(`Command  :`) + " " + chalk.green(CMD_NAME),
      );
      console.log(
        chalk.bgYellowBright.black(`Argument :`) +
          " " +
          chalk.yellowBright(args),
      );

      try {
        await client.commands.get(CMD_NAME).execute(msg, args);
      } catch (err) {
        console.log(chalk.bgRed.black("Error    :") + " " + chalk.red(err));
        await msg.channel.send("Type '!help' for available command");
      }
    }
  });

  client.login(process.env.TOKEN);
}

main().catch((err) => {
  console.log(err);
});
