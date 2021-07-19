module.exports = {
  name: "maid",
  description: "Tiddyup discord channel Chat ",
  async execute(msg, args) {
    switch (args[0]) {
      case "ping":
        msg.channel.send(`Pong!`);
        break;

      case "status":
        msg.channel.send("return server status");
        break;

      case "clean":
        await msg.delete();
        await msg.channel
          .bulkDelete(args[1], true)
          .then((message) => {
            msg.channel.send(`Bulk deleted ${message.size + 1} message`);
          })
          .catch((err) => {
            console.log(err);
          });
        break;

      default:
        msg.channel.send(`Wrong Command, Try again`);
        break;
    }
  },
};
