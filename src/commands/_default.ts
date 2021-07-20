import { Command, CommandContext, meta } from "disky";
import axios from "axios";

let epoch = 0;

function debug(event: string) {
  console.debug(event, Date.now() - epoch);
}

@meta({
  usage: "[meme]",
  example: "dennys",
  description: "Plays a meme in the current voice channel",
})
export default class DefaultCommand implements Command {
  async run({ msg, client }: CommandContext) {
    if (msg.member.voice.channel) {
      if (client.voice.connections.has(msg.member.voice.channel.id)) {
        return;
      }
      const name = msg.content.slice(process.env.PREFIX.length);
      try {
        epoch = Date.now();
        debug(`start ${name}`);
        const res = await axios.get(
          `${process.env.MEME_ARCHIVE_BASE_URL}/commands/${name}.json`
        );
        debug("downloaded");
        const audioURL = res.data.audio.startsWith("http")
          ? res.data.audio
          : `${process.env.MEME_ARCHIVE_BASE_URL}/${res.data.audio}`;
        const audioReq = axios.get(audioURL, { responseType: "stream" });
        const connection = await msg.member.voice.channel.join();
        debug("joined");
        const stream = await audioReq;
        const dispatcher = connection.play(stream.data);
        debug("play");
        dispatcher.on("finish", () => {
          connection.disconnect();
        });
        dispatcher.on("error", console.error);
      } catch (e) {
        if (e.response && e.response.status === 404) {
          msg.react("🤷");
        } else {
          console.error(e);
        }
      }
    } else {
      msg.reply("You need to join a voice channel first!");
    }
  }
}
