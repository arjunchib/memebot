import { Command } from "disky";
import axios from "axios";

export default new Command({
  async command({ msg }) {
    if (msg.member.voice.channel) {
      const name = msg.content.slice(1);
      try {
        const meme = await axios.get(
          `${process.env.MEME_ARCHIVE_BASE_URL}/commands/${name}.json`
        );
        const connection = await msg.member.voice.channel.join();
        const dispatcher = connection.play(meme.data.audio);
        dispatcher.on("finish", () => {
          connection.disconnect();
        });
        dispatcher.on("error", console.error);
      } catch (e) {
        console.error(e);
      }
    } else {
      msg.reply("You need to join a voice channel first!");
    }
  },
});
