import { Command, CommandContext, meta } from "disky";
import axios from "axios";

@meta({
  usage: "random",
  description: "Plays a random meme",
})
export default class RandomCommand implements Command {
  async run({ msg, client }: CommandContext) {
    if (msg.member.voice.channel) {
      if (client.voice.connections.has(msg.member.voice.channel.id)) {
        return;
      }
      const name = msg.content.slice(1);
      try {
        const res = await axios.get(
          `${process.env.MEME_ARCHIVE_BASE_URL}/memes/random.json`
        );
        const connection = await msg.member.voice.channel.join();
        const dispatcher = connection.play(res.data.audio);
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
  }
}
