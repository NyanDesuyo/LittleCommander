module.exports = {
  name: "help",
  description: "Display server info",
  // eslint-disable-next-line no-unused-vars
  async execute(msg, args) {
    await msg.channel.send(
      "Click here for more Information" +
        "\n" +
        "https://github.com/NyanDesuyo/LittleCommander/blob/main/README.md",
    );
  },
};
