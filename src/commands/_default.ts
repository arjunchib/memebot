import { Command, CommandContext, meta } from "disky";
import { Message } from "discord.js";
import { play } from "../voice/play";
import axios from "axios";
import { hasVoiceChannel, isPlaying } from "../voice/guards";

@meta({
  usage: "[meme]",
  example: "dennys",
  description: "Plays a meme in the current voice channel",
})
export default class DefaultCommand implements Command {
  async run(ctx: CommandContext) {
    if (isPlaying(ctx)) return;
    if (!hasVoiceChannel(ctx)) {
      return ctx.msg.reply("You need to join a voice channel first!");
    }
    await this.playMeme(ctx.msg);
  }

  private async playMeme(msg: Message) {
    const name = this.getMemeName(msg.content);
    try {
      const res = await axios.get(
        `${process.env.MEME_ARCHIVE_BASE_URL}/commands/${name}.json`
      );
      await play(res.data.audio, msg.member.voice.channel);
    } catch (e) {
      if (e.response && e.response.status === 404) return msg.react("🤷");
      throw e;
    }
  }

  private getMemeName(content: string) {
    return content.slice(process.env.PREFIX.length);
  }
}
