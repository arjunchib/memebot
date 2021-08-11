import { Command, CommandContext, meta } from "disky";
import { play } from "../voice/play";
import memeArchive from "../services/meme-archive";
import type { CommandInteraction, VoiceChannel } from "discord.js";

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
    await this.playMeme(ctx.interaction);
  }

  private async playMeme(interaction: CommandInteraction) {
    const name = interaction.options.getString("meme");
    try {
      const res = await memeArchive.get(`/commands/${name}.json`);
      const channels = await interaction.guild.channels.fetch();
      const channel = channels.find(
        (channel) => channel.type === "GUILD_VOICE"
      ) as VoiceChannel;
      Promise.all([
        play({
          url: res.data.audio,
          channel,
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
