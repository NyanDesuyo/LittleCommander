const Note = require("../model/Note");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "noteDelete",
  description: "Delete one Note",
  async execute(msg, args) {
    try {
      const note = await Note.findByIdAndDelete(args);
      const done = new MessageEmbed()
        .setTitle("Result")
        .setFooter("This note have been deleted from Database")
        .setColor(0x00ff00);
      await msg.channel.send(done);
    } catch (err) {
      const error = new MessageEmbed()
        .setTitle("Error!")
        .setDescription(err)
        .setColor(0x00ff00);
      await msg.channel.send(error);
    }
  },
};
