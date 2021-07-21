import { Command, CommandContext, meta } from "disky";
import axios from "axios";
import { play } from "../voice/play";
import { hasVoiceChannel, isPlaying } from "../voice/guards";
import { Message } from "discord.js";

@meta({
  usage: "random",
  description: "Plays a random meme",
})
export default class RandomCommand implements Command {
  async run(ctx: CommandContext) {
    if (isPlaying(ctx)) return;
    if (!hasVoiceChannel(ctx)) {
      return ctx.msg.reply("You need to join a voice channel first!");
    }
    await this.playMeme(ctx.msg);
  }

  private async playMeme(msg: Message) {
    const res = await axios.get(
      `${process.env.MEME_ARCHIVE_BASE_URL}/memes/random.json`
    );
    await play(res.data.audio, msg.member.voice.channel);
  }
}
