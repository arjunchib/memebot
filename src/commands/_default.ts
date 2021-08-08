import { Command, CommandContext, meta } from "disky";
import { play } from "../voice/play";
import { hasVoiceChannel, isPlaying } from "../voice/guards";
import memeArchive from "../services/meme-archive";
import type { Message } from "discord.js";

@meta({
  usage: "[meme]",
  example: "dennys",
  description: "Plays a meme in the current voice channel",
})
export default class DefaultCommand implements Command {
  async run(ctx: CommandContext) {
    if (!hasVoiceChannel(ctx)) {
      return ctx.msg.reply("You need to join a voice channel first!");
    }
    if (isPlaying(ctx)) return;
    await this.playMeme(ctx.msg);
  }

  private async playMeme(msg: Message) {
    const name = this.getMemeName(msg.content);
    try {
      const res = await memeArchive.get(`/commands/${name}.json`);
      await play({
        url: res.data.audio,
        channel: msg.member.voice.channel,
        name: res.data.name,
      });
    } catch (e) {
      if (e.response && e.response.status === 404) return msg.react("🤷");
      throw e;
    }
  }

  private getMemeName(content: string) {
    return content.slice(process.env.PREFIX.length);
  }
}
