const Note = require("../model/Note");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "noteAdd",
  description: "Display server info",
  async execute(msg, args) {
    const note = new Note({
      user_tag: msg.author.tag,
      user_message: args.join(" "),
      message_created: Date.now(),
    });
    try {
      note.save();
      const good = new MessageEmbed()
        .setTitle("Saved!")
        .setFooter("This note have been added to Database")
        .setColor(0x00ff00);
      await msg.channel.send(good);
    } catch (err) {
      const error = new MessageEmbed()
        .setTitle("Error!")
        .setDescription(err)
        .setColor(0x00ff00);
      await msg.channel.send(error);
    }
  },
};
