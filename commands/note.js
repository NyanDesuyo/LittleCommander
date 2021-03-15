const Note = require("../model/Note");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "note",
  description: "save load Note",
  async execute(msg, args) {
    switch (args[0]) {
      case "all":
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
        break;
      case "new":
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
        break;
      case "delete":
        try {
          const note = await Note.findByIdAndDelete(args[1]);
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
        break;
      default:
        break;
    }
  },
};
