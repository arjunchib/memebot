import { Command } from "disky";
import axios from "axios";

export default new Command({
  usage: "![meme]",
  example: "!dennys",
  description: "Plays a meme in the current voice channel",
  async command({ msg, client }) {
    if (msg.member.voice.channel) {
      if (client.voice.connections.has(msg.member.voice.channel.id)) {
        return;
      }
      const name = msg.content.slice(1);
      try {
        const res = await axios.get(
          `${process.env.MEME_ARCHIVE_BASE_URL}/commands/${name}.json`
        );
        const connection = await msg.member.voice.channel.join();
        const dispatcher = connection.play(res.data.audio);
        dispatcher.on("finish", () => {
          connection.disconnect();
        });
        dispatcher.on("error", console.error);
      } catch (e) {
        if (e.response.status === 404) {
          msg.react("🤷");
        } else {
          console.error(e);
        }
      }
    } else {
      msg.reply("You need to join a voice channel first!");
    }
  },
});
