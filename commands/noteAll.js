const Note = require("../model/Note");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "noteAll",
  description: "Display server info",
  async execute(msg, args) {
    try {
      const notes = await Note.find();
      const count = await Note.countDocuments();

      msg.channel.send("Total Notes have been Stored: " + count + " Notes");

      notes.forEach((element) => {
        const done = new MessageEmbed()
          .setTitle("Result")
          .setDescription(
            "User Tag: " +
              element.user_tag +
              "\n" +
              "User Message: " +
              element.user_message +
              "\n" +
              "Message Created: " +
              element.message_created +
              "\n",
          )
          .setFooter("Document ID: " + element.id)
          .setColor(0x00ff00);
        msg.channel.send(done);
      });
    } catch (err) {
      const error = new MessageEmbed()
        .setTitle("Error!")
        .setDescription(err)
        .setColor(0xff0000);
      await msg.channel.send(error);
    }
  },
};
