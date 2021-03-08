const jikanjs = require("jikanjs");

module.exports = {
  name: "animeSearch",
  description: "Search Anime",
  async execute(msg, args) {
    try {
      await msg.channel.send("Loading...");
      jikanjs
        .search("anime", "kanojo")
        .then((response) => {
          response.episodes.forEach((element) => {
            console.log(
              `${element.episode_id}: ${element.title} - ${element.title_romanji} - ${element.title_japanese}`,
            );
          });
        })
        .catch((err) => {
          console.error(err); // in case a error happens
        });
    } catch (err) {
      await msg.channel.send(err);
    }
  },
};
