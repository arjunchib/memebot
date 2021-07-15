import { Command } from "disky";

export default new Command({
  usage: "list",
  description: "Lists available memes",
  command({ msg }) {
    msg.reply("Visit memebot.life for a list of memes.");
  },
});
