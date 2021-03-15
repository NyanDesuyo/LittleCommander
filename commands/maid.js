module.exports = {
  name: "maid",
  description: "Tiddyup discord channel Chat ",
  async execute(msg, args) {
    switch (args[0]) {
      case "clean":
        await msg.delete();
        await msg.channel
          .bulkDelete(args[1], true)
          .then((message) => {
            msg.channel.send(`Bulk deleted ${message.size} message`);
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