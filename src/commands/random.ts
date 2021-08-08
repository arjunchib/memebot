import { Command, CommandContext, meta } from "disky";
import { play } from "../voice/play";
import { hasVoiceChannel, isPlaying } from "../voice/guards";
import memeArchive from "../services/meme-archive";
import type { CommandInteraction, GuildMember } from "discord.js";

@meta({
  name: "random",
  description: "Plays a random meme",
})
export default class RandomCommand implements Command {
  async run(ctx: CommandContext) {
    if (!hasVoiceChannel(ctx)) {
      return ctx.interaction.reply("You need to join a voice channel first!");
    }
    if (isPlaying(ctx)) return;
    await this.playMeme(ctx.interaction);
  }

  private async playMeme(interaction: CommandInteraction) {
    const res = await memeArchive.get("/memes/random.json");
    const name = res.data.name;
    interaction.reply(`Playing ${name}`);
    await play({
      url: res.data.audio,
      channel: (interaction.member as GuildMember).voice.channel,
      name,
    });
  }
}
