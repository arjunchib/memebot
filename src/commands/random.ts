import { Command, CommandContext, meta } from "disky";
import { play } from "../voice/play";
import { hasVoiceChannel, isPlaying } from "../voice/guards";
import memeArchive from "../services/meme-archive";
import type { Message } from "discord.js";

@meta({
  usage: "random",
  description: "Plays a random meme",
})
export default class RandomCommand implements Command {
  async run(ctx: CommandContext) {
    if (!hasVoiceChannel(ctx)) {
      return ctx.msg.reply("You need to join a voice channel first!");
    }
    if (isPlaying(ctx)) return;
    await this.playMeme(ctx.msg);
  }

  private async playMeme(msg: Message) {
    const res = await memeArchive.get("/memes/random.json");
    const name = res.data.name;
    msg.channel.send(`Playing ${name}`);
    await play({
      url: res.data.audio,
      channel: msg.member.voice.channel,
      name,
    });
  }
}
