module.exports = {
  name: "help",
  description: "Display server info",
  async execute(msg, args) {
    await msg.channel.send(
      "Click here for more Information\nhttps://github.com/NyanDesuyo/LittleCommander/blob/main/README.md",
    );
  },
};
