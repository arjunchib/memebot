import { Command } from "disky";

export default new Command({
  command({ msg }) {
    msg.reply("Visit memebot.life for a list of memes.");
  },
});
