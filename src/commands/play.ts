import { Command, CommandContext, meta } from "disky";
import { play } from "../voice/play";
import { hasVoiceChannel, isPlaying } from "../voice/guards";
import memeArchive from "../services/meme-archive";
import type { CommandInteraction, GuildMember } from "discord.js";

@meta({
  name: "play",
  description: "Plays a meme in the current voice channel",
  options: [
    {
      name: "meme",
      type: "STRING",
      description: "The name or alias of the meme",
      required: true,
    },
  ],
})
export default class DefaultCommand implements Command {
  async run(ctx: CommandContext) {
    if (!hasVoiceChannel(ctx)) {
      return ctx.interaction.reply("You need to join a voice channel first!");
    }
    if (isPlaying(ctx)) return;
    await this.playMeme(ctx.interaction);
  }

  private async playMeme(interaction: CommandInteraction) {
    const name = interaction.options.getString("meme");
    try {
      const res = await memeArchive.get(`/commands/${name}.json`);
      Promise.all([
        play({
          url: res.data.audio,
          channel: (interaction.member as GuildMember).voice.channel,
          name: res.data.name,
        }),
        interaction.reply(`Playing ${res.data.name}`),
      ]);
    } catch (e) {
      if (e.response && e.response.status === 404) {
        return interaction.reply("Could not find meme with that name");
      }
      throw e;
    }
  }
}
